from transformers import CLIPProcessor, CLIPModel, ViTImageProcessor, ViTModel
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity

from warnings import filterwarnings
filterwarnings("ignore")

models = ["CLIP-ViT Base", "ViT Base", "DINO ViT-S16"]
models_info = {
    "CLIP-ViT Base": {
        "model_size": "386MB",
        "model_url": "openai/clip-vit-base-patch32",
        "efficiency": "High",
    },
    "ViT Base": {
        "model_size": "304MB",
        "model_url": "google/vit-base-patch16-224",
        "efficiency": "High",
    },
    "DINO ViT-S16": {
        "model_size": "1.34GB",
        "model_url": "facebook/dino-vits16",
        "efficiency": "Moderate",
    },
}

class Image_Validator:
    def __init__(self, model_name=None):
        if model_name is None: model_name="ViT Base"
        
        self.model_info = models_info[model_name]
        model_url       = self.model_info["model_url"]
        
        if model_name == "CLIP-ViT Base":
            self.model              = CLIPModel.from_pretrained(model_url)
            self.processor          = CLIPProcessor.from_pretrained(model_url)
            
        elif model_name == "ViT Base":
            self.model              = ViTModel.from_pretrained(model_url)
            self.feature_extractor  = ViTImageProcessor.from_pretrained(model_url)
            
        elif model_name == "DINO ViT-S16":
            self.model              = ViTModel.from_pretrained(model_url)
            self.feature_extractor  = ViTImageProcessor.from_pretrained(model_url)
    
    def get_image_embedding(self, image_path):
        image = Image.open(image_path)
        
        # Process image according to the model
        if hasattr(self, 'processor'):  # CLIP models
            inputs  = self.processor(images=image, return_tensors="pt")
            outputs = self.model.get_image_features(**inputs)
            
        elif hasattr(self, 'feature_extractor'):  # ViT models
            inputs  = self.feature_extractor(images=image, return_tensors="pt")
            outputs = self.model(**inputs).last_hidden_state
        
        return outputs
    
    def similarity_score(self, image_path_1, image_path_2):
        embedding1 = self.get_image_embedding(image_path_1).reshape(1, -1)
        embedding2 = self.get_image_embedding(image_path_2).reshape(1, -1)
        similarity = cosine_similarity(embedding1.detach().numpy(), embedding2.detach().numpy())
        return similarity[0][0]