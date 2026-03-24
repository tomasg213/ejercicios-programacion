"""
TensorFlow - Ejercicio 6: Seq2Seq con Attention
================================================
Traducción de texto usando modelo seq2seq con механизм внимания
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models, preprocessing
import numpy as np
import random

print("=" * 60)
print("Ejercicio 6: Seq2Seq con Attention para Traducción")
print("=" * 60)

# ============================================
# 1. DATOS DE EJEMPLO (Español -> Inglés)
# ============================================
print("\n1. PREPARANDO DATOS")
print("-" * 40)

# Dataset simple (en producción usar dataset más grande)
spanish_sentences = [
    'hola', 'buenos días', 'buenas noches', 'cómo estás', 'muy bien',
    'gracias', 'de nada', 'adiós', 'hasta luego', 'me llamo',
    'cuál es tu nombre', 'dónde vives', 'hablas inglés', 'entiendo',
    'no entiendo', 'por favor', 'lo siento', 'tengo hambre', 'tengo sed'
]

english_sentences = [
    'hello', 'good morning', 'good night', 'how are you', 'very well',
    'thanks', 'you are welcome', 'goodbye', 'see you later', 'my name is',
    'what is your name', 'where do you live', 'do you speak english', 'i understand',
    'i do not understand', 'please', 'i am sorry', 'i am hungry', 'i am thirsty'
]

# Tokenización
spanish_tokenizer = preprocessing.text.Tokenizer(filters='')
spanish_tokenizer.fit_on_texts(spanish_sentences)
spanish_vocab_size = len(spanish_tokenizer.word_index) + 1

english_tokenizer = preprocessing.text.Tokenizer(filters='')
english_tokenizer.fit_on_texts(english_sentences)
english_vocab_size = len(english_tokenizer.word_index) + 1

# Secuencias de entrada (español)
encoder_input_data = spanish_tokenizer.texts_to_sequences(spanish_sentences)
encoder_input_data = preprocessing.sequence.pad_sequences(encoder_input_data, padding='post')

# Secuencias de salida (inglés) - con start y end tokens
decoder_input_data = []
decoder_output_data = []

for sentence in english_sentences:
    decoder_input_data.append('<sos> ' + sentence)
    decoder_output_data.append(sentence + ' <eos>')

decoder_input_tokenizer = preprocessing.text.Tokenizer(filters='')
decoder_input_tokenizer.fit_on_texts(decoder_input_data)
decoder_input_vocab_size = len(decoder_input_tokenizer.word_index) + 1

decoder_output_tokenizer = preprocessing.text.Tokenizer(filters='')
decoder_output_tokenizer.fit_on_texts(decoder_output_data)
decoder_output_vocab_size = len(decoder_output_tokenizer.word_index) + 1

decoder_input_data = decoder_input_tokenizer.texts_to_sequences(decoder_input_data)
decoder_input_data = preprocessing.sequence.pad_sequences(decoder_input_data, padding='post')

decoder_output_data = decoder_output_tokenizer.texts_to_sequences(decoder_output_data)
decoder_output_data = preprocessing.sequence.pad_sequences(decoder_output_data, padding='post')

MAX_LEN = max(len(encoder_input_data[0]), len(decoder_input_data[0]))

print(f"Spanish vocab size: {spanish_vocab_size}")
print(f"English vocab size: {decoder_output_vocab_size}")
print(f"Max sequence length: {MAX_LEN}")

# ============================================
# 2. DEFINIR ENCODER con Bidirectional LSTM
# ============================================
print("\n2. DEFINIR ARQUITECTURA")
print("-" * 40)

EMBEDDING_DIM = 64
LSTM_UNITS = 128

# Encoder
encoder_inputs = keras.Input(shape=(None,), dtype='int32')
encoder_embedding = layers.Embedding(spanish_vocab_size, EMBEDDING_DIM)(encoder_inputs)
encoder_outputs, forward_h, forward_c, backward_h, backward_c = layers.Bidirectional(
    layers.LSTM(LSTM_UNITS, return_sequences=True, return_state=True)
)(encoder_embedding)

# Combine bidirectional states
state_h = layers.Concatenate()([forward_h, backward_h])
state_c = layers.Concatenate()([forward_c, backward_c])
encoder_states = [state_h, state_c]

# Decoder
decoder_inputs = keras.Input(shape=(None,), dtype='int32')
decoder_embedding = layers.Embedding(decoder_input_vocab_size, EMBEDDING_DIM * 2)(decoder_inputs)
decoder_lstm = layers.LSTM(LSTM_UNITS * 2, return_sequences=True, return_state=True)
decoder_outputs, _, _ = decoder_lstm(decoder_embedding, initial_state=encoder_states)

# Attention
attention = layers.AdditiveAttention()([decoder_outputs, encoder_outputs])
decoder_concat = layers.Concatenate()([decoder_outputs, attention])

# Output
decoder_dense = layers.Dense(decoder_output_vocab_size, activation='softmax')
decoder_outputs = decoder_dense(decoder_concat)

# ============================================
# 3. CREAR Y ENTRENAR MODELO
# ============================================
print("\n3. ENTRENAMIENTO")
print("-" * 40)

model = keras.Model([encoder_inputs, decoder_inputs], decoder_outputs)
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
model.summary()

# Entrenar
model.fit(
    [encoder_input_data, decoder_input_data],
    decoder_output_data,
    epochs=100,
    batch_size=16,
    verbose=1
)

# ============================================
# 4. INFERENCIA
# ============================================
print("\n4. TRADUCCIÓN")
print("-" * 40)

# Crear modelos de inferencia
encoder_model = keras.Model(encoder_inputs, [encoder_outputs, encoder_states])

decoder_state_input_h = keras.Input(shape=(LSTM_UNITS * 2,))
decoder_state_input_c = keras.Input(shape=(LSTM_UNITS * 2,))
decoder_states_inputs = [decoder_state_input_h, decoder_state_input_c]

decoder_outputs, state_h, state_c = decoder_lstm(
    decoder_embedding, initial_state=decoder_states_inputs
)
attention_output, attention_state = attention([decoder_outputs, encoder_outputs])
decoder_concat = layers.Concatenate()([decoder_outputs, attention_output])
outputs = decoder_dense(decoder_concat)

decoder_model = keras.Model(
    [decoder_inputs] + decoder_states_inputs,
    [outputs, state_h, state_c]
)

def translate(input_seq):
    # Encode
    encoder_out, states = encoder_model.predict(input_seq, verbose=0)
    
    # Decode
    target_seq = np.zeros((1, 1))
    target_seq[0, 0] = decoder_input_tokenizer.word_index['<sos>']
    
    decoded_sentence = ''
    
    for _ in range(MAX_LEN):
        output_tokens, h, c = decoder_model.predict(
            [target_seq, states[0], states[1]], verbose=0
        )
        
        sampled_token_index = np.argmax(output_tokens[0, -1, :])
        sampled_word = decoder_output_tokenizer.index_word.get(sampled_token_index, '')
        
        if sampled_word == '<eos>':
            break
        
        decoded_sentence += ' ' + sampled_word
        
        target_seq = np.zeros((1, 1))
        target_seq[0, 0] = sampled_token_index
        states = [h, c]
    
    return decoded_sentence.strip()

# Traducir algunas frases
print("\nTraducciones:")
for i, spanish in enumerate(spanish_sentences[:10]):
    input_seq = encoder_input_data[i:i+1]
    translation = translate(input_seq)
    print(f"  ES: {spanish:20s} -> EN: {translation}")

print("\n" + "=" * 60)
print("¡Ejercicio completado!")
print("=" * 60)
