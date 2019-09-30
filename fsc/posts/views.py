from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.staticfiles.templatetags.staticfiles import static
from posts.models import Post

def posts(request):

    context = {"threads" : Post.objects.all(),
              "page_name" : "posts"}

    return render(request, 'posts/post.html', context=context)