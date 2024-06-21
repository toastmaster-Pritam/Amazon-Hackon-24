from model_factory.description_validator import Description_Validator
from model_factory.image_validator import Image_Validator

class Update_Validator:
    def __init__(self, text_model=None, image_model=None, threshold=0.7):
        self.description_validator  = Description_Validator(model_name=text_model)
        self.image_validator        = Image_Validator(model_name=image_model)
        self.threshold              = threshold
    
    def validate(self, text1, text2, image_path_1, image_path_2, threshold=None, return_score=False):
        description_similarity  = self.description_validator.similarity_score(text1, text2)
        image_similarity        = self.image_validator.similarity_score(image_path_1, image_path_2)
        similarity_score        = 0.75 * description_similarity + 0.25 * image_similarity
        
        if threshold is None: threshold=self.threshold
        label = True if similarity_score >= threshold else False
        
        if return_score:
            return {'score':similarity_score, 'label':label}
        else:
            return {'label':label}