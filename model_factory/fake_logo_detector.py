import torch
import numpy as np
import gradio as gr
from PIL import Image
import multiprocessing
import tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.applications import InceptionV3


# function to return model
def create_model():
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

clf_model = create_model()
clf_model.load_weights('modelac90.weights.h5')

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def classify_logo(inp_image):
    pil_img = Image.fromarray(inp_image).resize((200,200), resample=0)
    image = np.array(pil_img).astype(np.float16)/255.0
    new_img = np.expand_dims(image, axis=0)
    predictions = clf_model.predict(new_img)
    labels = ['Adidas Fake', 'Adidas Real', 'Allen Solly Fake', 'Allen Solly Real',
              'Puma Fake', 'Puma Real', 'Us Polo Fake', 'Us Polo Real']
    pred_dict = {}
    for i in range(len(labels)):
        pred_dict[labels[i]] = predictions[0][i]
    return pred_dict

def fake_logo_detection(input_image):
    print("Input image shape => ", input_image.shape)
    return classify_logo(input_image)

