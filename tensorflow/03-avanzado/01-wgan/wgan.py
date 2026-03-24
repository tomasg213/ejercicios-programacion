"""
TensorFlow - Ejercicio 5: Wasserstein GAN (WGAN-GP)
=====================================================
Generación de imágenes sintéticas con GAN
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
import numpy as np
import matplotlib.pyplot as plt

print("=" * 60)
print("Ejercicio 5: Wasserstein GAN (WGAN-GP)")
print("=" * 60)

# ============================================
# 1. CONFIGURACIÓN
# ============================================
LATENT_DIM = 100
IMG_SHAPE = (28, 28, 1)
BATCH_SIZE = 64
EPOCHS = 50
CRITIC_ITERATIONS = 5
LAMBDA = 10

# ============================================
# 2. CARGAR DATOS (MNIST)
# ============================================
print("\n1. CARGANDO DATOS MNIST")
print("-" * 40)

(X_train, _), (_, _) = keras.datasets.mnist.load_data()
X_train = X_train.astype('float32')
X_train = (X_train - 127.5) / 127.5  # Normalizar a [-1, 1]
X_train = np.expand_dims(X_train, axis=-1)

dataset = tf.data.Dataset.from_tensor_slices(X_train)
dataset = dataset.shuffle(10000).batch(BATCH_SIZE)

print(f"Training samples: {X_train.shape[0]}")
print(f"Image shape: {IMG_SHAPE}")

# ============================================
# 3. DEFINIR GENERADOR
# ============================================
print("\n2. DEFINIR GENERADOR")
print("-" * 40)

def build_generator():
    model = models.Sequential([
        # Input: latent_dim
        layers.Dense(7 * 7 * 256, use_bias=False, input_shape=(LATENT_DIM,)),
        layers.BatchNormalization(),
        layers.LeakyReLU(0.2),
        layers.Reshape((7, 7, 256)),
        
        # Upsample
        layers.Conv2DTranspose(128, (4, 4), strides=(1, 1), padding='same', use_bias=False),
        layers.BatchNormalization(),
        layers.LeakyReLU(0.2),
        
        layers.Conv2DTranspose(64, (4, 4), strides=(2, 2), padding='same', use_bias=False),
        layers.BatchNormalization(),
        layers.LeakyReLU(0.2),
        
        # Output: 28x28x1
        layers.Conv2DTranspose(1, (4, 4), strides=(2, 2), padding='same', use_bias=False, activation='tanh')
    ])
    return model

generator = build_generator()
generator.summary()

# ============================================
# 4. DEFINIR CRÍTICO (DISCRIMINADOR)
# ============================================
print("\n3. DEFINIR CRÍTICO")
print("-" * 40)

def build_critic():
    model = models.Sequential([
        # Input: 28x28x1
        layers.Conv2D(64, (4, 4), strides=(2, 2), padding='same', input_shape=IMG_SHAPE),
        layers.LeakyReLU(0.2),
        layers.Dropout(0.3),
        
        layers.Conv2D(128, (4, 4), strides=(2, 2), padding='same'),
        layers.LeakyReLU(0.2),
        layers.Dropout(0.3),
        
        layers.Conv2D(256, (4, 4), strides=(2, 2), padding='same'),
        layers.LeakyReLU(0.2),
        layers.Dropout(0.3),
        
        layers.Flatten(),
        layers.Dense(1)  # Sin sigmoid (WGAN)
    ])
    return model

critic = build_critic()
critic.summary()

# ============================================
# 5. GRADIENT PENALTY
# ============================================
print("\n4. GRADIENT PENALTY (WGAN-GP)")
print("-" * 40)

@tf.function
def gradient_penalty(critic, real_images, fake_images):
    batch_size = tf.shape(real_images)[0]
    epsilon = tf.random.uniform([batch_size, 1, 1, 1], 0.0, 1.0)
    
    interpolated = epsilon * real_images + (1 - epsilon) * fake_images
    
    with tf.GradientTape() as tape:
        tape.watch(interpolated)
        pred = critic(interpolated, training=True)
    
    gradients = tape.gradient(pred, interpolated)
    gradients_norm = tf.sqrt(tf.reduce_sum(tf.square(gradients), axis=[1, 2, 3]))
    gradient_penalty = tf.reduce_mean((gradients_norm - 1.0) ** 2)
    
    return gradient_penalty

# ============================================
# 6. ENTRENAMIENTO
# ============================================
print("\n5. ENTRENAMIENTO")
print("-" * 40)

generator_optimizer = keras.optimizers.Adam(learning_rate=1e-4, beta_1=0.5, beta_2=0.9)
critic_optimizer = keras.optimizers.Adam(learning_rate=1e-4, beta_1=0.5, beta_2=0.9)

@tf.function
def train_step(real_images):
    batch_size = tf.shape(real_images)[0]
    noise = tf.random.normal([batch_size, LATENT_DIM])
    
    # Entrenar crítico
    with tf.GradientTape() as tape:
        fake_images = generator(noise, training=True)
        real_output = critic(real_images, training=True)
        fake_output = critic(fake_images, training=True)
        
        gp = gradient_penalty(critic, real_images, fake_images)
        critic_loss = tf.reduce_mean(fake_output) - tf.reduce_mean(real_output) + LAMBDA * gp
    
    gradients_critic = tape.gradient(critic_loss, critic.trainable_variables)
    critic_optimizer.apply_gradients(zip(gradients_critic, critic.trainable_variables))
    
    # Entrenar generador
    noise = tf.random.normal([batch_size, LATENT_DIM])
    
    with tf.GradientTape() as tape:
        fake_images = generator(noise, training=True)
        fake_output = critic(fake_images, training=True)
        generator_loss = -tf.reduce_mean(fake_output)
    
    gradients_generator = tape.gradient(generator_loss, generator.trainable_variables)
    generator_optimizer.apply_gradients(zip(gradients_generator, generator.trainable_variables))
    
    return critic_loss, generator_loss

# Entrenar
generator_losses = []
critic_losses = []

for epoch in range(EPOCHS):
    epoch_critic_losses = []
    epoch_gen_losses = []
    
    for real_images in dataset:
        for _ in range(CRITIC_ITERATIONS):
            c_loss, g_loss = train_step(real_images)
            epoch_critic_losses.append(c_loss.numpy())
        
        epoch_gen_losses.append(g_loss.numpy())
    
    avg_critic_loss = np.mean(epoch_critic_losses)
    avg_gen_loss = np.mean(epoch_gen_losses)
    critic_losses.append(avg_critic_loss)
    generator_losses.append(avg_gen_loss)
    
    if (epoch + 1) % 10 == 0:
        print(f"Epoch {epoch+1:3d}/{EPOCHS} - Critic Loss: {avg_critic_loss:.4f} - Generator Loss: {avg_gen_loss:.4f}")

# ============================================
# 7. GENERAR IMÁGENES
# ============================================
print("\n6. GENERAR IMÁGENES")
print("-" * 40)

# Generar imágenes
noise = tf.random.normal([16, LATENT_DIM])
generated_images = generator(noise, training=False).numpy()

# Mostrar algunas
fig, axes = plt.subplots(4, 4, figsize=(8, 8))
for i, ax in enumerate(axes.flatten()):
    ax.imshow(generated_images[i].reshape(28, 28), cmap='gray')
    ax.axis('off')

plt.suptitle('Imágenes generadas por WGAN')
plt.tight_layout()
plt.savefig('wgan_generated_images.png', dpi=150)
print("Imágenes guardadas en 'wgan_generated_images.png'")

# Guardar modelos
generator.save('wgan_generator.keras')
critic.save('wgan_critic.keras')
print("Modelos guardados")

print("\n" + "=" * 60)
print("¡Ejercicio completado!")
print("=" * 60)
