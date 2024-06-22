import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from torch import cuda

class Review_Classifier:
    def __init__(self, model_name='distilbert', return_bool=False):
        
        self.model_path={'distilbert':'theArijitDas/distilbert-finetuned-fake-reviews',}
        
        self.label2bool = {'REAL':False, 'FAKE':True}
        
        # List of AI-related keywords
        self.ai_keywords = [
            "AI chatbot", "Generated by AI", "Machine learning", "Artificial intelligence", "Deep learning",
            "As a language model", "Powered by AI", "As an AI assistant", "Trained by neural networks",
            "As an AI model", "Based on AI technology", "AI-generated", "AI-powered", "Algorithmic content",
            "Automated text", "Computer-generated", "Generated by machine", "Created by AI", "Synthetic text",
            "AI-driven", "Using natural language processing", "As an AI language model", "AI system", "AI-based",
            "AI assistance", "Generated by machine learning", "AI capabilities", "AI algorithms", "Produced by AI",
            "Automated response", "As an artificial intelligence", "With AI support", "AI-generated content",
            "AI-enhanced", "Using deep learning", "Generated using algorithms", "Created by machine learning",
            "Produced by machine learning", "Automated generation", "Computer-generated response", "AI-based content",
            "AI-generated text", "Machine-produced", "AI-processed", "AI-generated response", "With machine learning",
            "By artificial intelligence", "AI-created", "Neural network", "Generated by a computer",
            "Automated content creation", "Created by algorithms", "Synthesized text", "AI-crafted",
            "Text produced by AI", "AI content generation", "Programmatically generated", "Generated by neural networks",
            "AI-assisted", "AI text generator", "Generated by NLP", "As a neural network", "AI text creation",
            "Machine learning model", "AI-generated language", "Automated writing", "NLP-generated", "Text by AI",
            "AI-produced", "AI-enabled", "Algorithm-driven content", "As an intelligent system", "Machine-authored",
            "AI text", "AI machine learning", "AI language processing", "Text generated by AI", "Automated AI",
            "AI language model", "Generated with AI", "Algorithmic text", "AI-authored", "With artificial intelligence",
            "By machine learning algorithms", "AI-generated phrases", "Computer-created", "AI neural networks",
            "Machine-generated text", "Automated neural network", "AI content", "AI-powered generation",
            "AI textual content", "AI natural language", "Machine-generated content", "AI-driven text",
            "Neural network-generated", "AI output", "Generated by artificial intelligence", "Automated generation by AI",
            "AI synthetic text", "AI bot",
        ]
        
        self.return_bool = return_bool
        self.model = self.load_model(model_name)
    
    def load_model(self, model_name):
        tokenizer = AutoTokenizer.from_pretrained(self.model_path[model_name])
        model = AutoModelForSequenceClassification.from_pretrained(self.model_path[model_name])

        return pipeline("text-classification", model=model, tokenizer=tokenizer, top_k=None,
                        truncation=True, max_length=tokenizer.model_max_length,
                        device = 0 if cuda.is_available() else -1)
    
    def classify_with_model(self, text, return_bool=None):
        if return_bool is None: return_bool=self.return_bool
        
        label = self.model(text)[0][0]['label']
        if return_bool: return self.label2bool[label]
        return label
    
    def classify_by_keyword(self, text, return_bool=None):
        if return_bool is None: return_bool=self.return_bool
        
        text = text.lower()
        label = 'REAL'
        for keyword in self.ai_keywords:
            if keyword.lower() in text:
                label = 'FAKE'

        if return_bool: return self.label2bool[label]
        return label
    
    def hybrid_classify(self, text, return_bool=None):
        if return_bool is None: return_bool=self.return_bool
        
        if self.classify_by_keyword(text, return_bool=True):
            label = 'FAKE'
        else:
            label = self.classify_with_model(text, return_bool=False)

        if return_bool: return self.label2bool[label]
        return label
    
    def rate_product(self, reviews, return_frac=False):
        pred_with_model = np.array(list(map(lambda x: self.classify_with_model(x, return_bool=True), reviews)))
        pred_by_keyword = np.array(list(map(lambda x: self.classify_by_keyword(x, return_bool=True), reviews)))
        pred = pred_with_model|pred_by_keyword
        fake, total = sum(pred), len(pred)
        if return_frac: return round(fake/total, 4)
        return {'Total': total, 'Real': total-fake, 'Fake': fake}
    
    def all_review_scores(self, reviews):
        if isinstance(reviews, str): reviews=[reviews]
        return self.model(reviews)