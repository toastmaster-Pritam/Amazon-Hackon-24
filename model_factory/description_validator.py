from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from warnings import filterwarnings
filterwarnings("ignore")

models = ["MPNet-base-v2", "DistilRoBERTa-v1", "MiniLM-L12-v2", "MiniLM-L6-v2"]
models_info = {
    "MPNet-base-v2": {
        "model_size": "420MB",
        "model_url": "sentence-transformers/all-mpnet-base-v2",
        "efficiency": "Moderate",
        "chunk_size": 512
    },
    "DistilRoBERTa-v1": {
        "model_size": "263MB",
        "model_url": "sentence-transformers/all-distilroberta-v1",
        "efficiency": "High",
        "chunk_size": 512
    },
    "MiniLM-L12-v2": {
        "model_size": "118MB",
        "model_url": "sentence-transformers/all-MiniLM-L12-v2",
        "efficiency": "High",
        "chunk_size": 512
    },
    "MiniLM-L6-v2": {
        "model_size": "82MB",
        "model_url": "sentence-transformers/all-MiniLM-L6-v2",
        "efficiency": "Very High",
        "chunk_size": 512
    }
}

class Description_Validator:
    def __init__(self, model_name=None):
        if model_name is None: model_name="DistilRoBERTa-v1"
        
        self.model_info     = models_info[model_name]
        model_url           = self.model_info["model_url"]
        
        self.model          = SentenceTransformer(model_url)
        self.tokenizer      = AutoTokenizer.from_pretrained(model_url)
        self.chunk_size     = self.model_info["chunk_size"]

    def tokenize_and_chunk(self, text):
        tokens = self.tokenizer(text, truncation=False, padding=True, add_special_tokens=False)['input_ids']
        token_chunks = [tokens[i:i+self.chunk_size] for i in range(0, len(tokens), self.chunk_size)]
        return token_chunks

    def get_average_embedding(self, text):
        token_chunks = self.tokenize_and_chunk(text)
        chunk_embeddings = []
        for chunk in token_chunks:
            chunk_embedding = self.model.encode(self.tokenizer.decode(chunk), show_progress_bar=False)
            chunk_embeddings.append(chunk_embedding)
        return np.mean(chunk_embeddings, axis=0)
    
    def similarity_score(self, desc1, desc2):
        embedding1 = self.get_average_embedding(desc1).reshape(1, -1)
        embedding2 = self.get_average_embedding(desc2).reshape(1, -1)
        similarity = cosine_similarity(embedding1, embedding2)
        return similarity[0][0]