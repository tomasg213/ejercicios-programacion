import tensorflow as tf
from tensorflow import keras
from typing import Tuple, List


class CNNClassifier(keras.Model):
    def __init__(self, num_classes: int = 10):
        super(CNNClassifier, self).__init__()
        
        self.conv1 = keras.layers.Conv2D(32, (3, 3), activation='relu', padding='same')
        self.conv2 = keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same')
        self.pool = keras.layers.MaxPooling2D((2, 2))
        self.flatten = keras.layers.Flatten()
        self.fc1 = keras.layers.Dense(128, activation='relu')
        self.dropout = keras.layers.Dropout(0.5)
        self.fc2 = keras.layers.Dense(num_classes, activation='softmax')
    
    def call(self, x):
        x = self.pool(tf.nn.relu(self.conv1(x)))
        x = self.pool(tf.nn.relu(self.conv2(x)))
        x = self.flatten(x)
        x = self.dropout(tf.nn.relu(self.fc1(x)))
        return self.fc2(x)


class CIFAR10Trainer:
    def __init__(self, learning_rate: float = 0.001):
        self.model = CNNClassifier(num_classes=10)
        self.model.compile(
            optimizer=keras.optimizers.Adam(learning_rate),
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
        self.history = None
    
    def get_data(self) -> Tuple[keras.utils.Sequence, keras.utils.Sequence]:
        (x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()
        
        x_train = x_train.astype('float32') / 255.0
        x_test = x_test.astype('float32') / 255.0
        
        return (x_train, y_train), (x_test, y_test)
    
    def train(self, epochs: int = 10, batch_size: int = 64) -> keras.callbacks.History:
        (x_train, y_train), _ = self.get_data()
        
        self.history = self.model.fit(
            x_train, y_train,
            epochs=epochs,
            batch_size=batch_size,
            validation_split=0.1,
            verbose=1
        )
        
        return self.history
    
    def evaluate(self, x_test, y_test):
        return self.model.evaluate(x_test, y_test, verbose=1)
    
    def predict(self, x):
        return self.model.predict(x)