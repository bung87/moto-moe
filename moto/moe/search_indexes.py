from haystack import indexes
from moto.moe.models import Post

class PostIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.NgramField(document=True, model_attr='description')
    author = indexes.CharField(model_attr='author')
    pub_date = indexes.DateTimeField(model_attr='date_posted')

    def get_model(self):
        return Post