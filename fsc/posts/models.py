from django.db import models
from django.utils import timezone
from users.models import User
from django.contrib.staticfiles.templatetags.staticfiles import static

class Post(models.Model):

    topic = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = "posts"
    
    def __str__(self):
        return self.topic