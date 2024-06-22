import torch
import numpy as np
from PIL import Image
import multiprocessing
import tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.applications import InceptionV3
from IPython.display import display

from warnings import filterwarnings
filterwarnings("ignore") 
# function to return model

class Fake_Logo_Detector:
    def __init__(self,weight):
       self.weights = weight

    def create_model(self):
        inp_shape = (200,200,3)
        base_model = InceptionV3(input_shape=inp_shape, include_top=False, weights='imagenet')
        x = layers.Flatten()(base_model.output)
        x = layers.Dense(256, activation='relu')(x)
        x = layers.Dropout(0.5)(x)
        output = layers.Dense(8, activation='softmax')(x)
        clf_model = Model(inputs=base_model.input, outputs=output)
        clf_model.compile(optimizer=Adam(learning_rate=0.0001),
                        loss='categorical_crossentropy',
                        metrics=['accuracy'])
        return clf_model

    def classify_logo(self,inp_image_path):
        inp_image = Image.open(inp_image_path)
        pil_img = inp_image.resize((200,200), resample=0)
        image = np.array(pil_img).astype(np.float16)/255.0
        new_img = np.expand_dims(image, axis=0)
        clf_model = self.create_model()
        clf_model.load_weights(self.weights)
        predictions = clf_model.predict(new_img)
        labels = ['Adidas Fake', 'Adidas Real', 'Allen Solly Fake', 'Allen Solly Real',
                'Puma Fake', 'Puma Real', 'Us Polo Fake', 'Us Polo Real']
        pred_dict = {}
        for i in range(len(labels)):
            pred_dict[labels[i]] = predictions[0][i]
        sorted_pred_dict = dict(sorted(pred_dict.items(), key=lambda item: item[1], reverse=True))
        return sorted_pred_dict

    def fake_logo_detection(self,input_image_path):
        return self.classify_logo(input_image_path)
