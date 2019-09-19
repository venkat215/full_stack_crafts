from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.staticfiles.templatetags.staticfiles import static

def home(request):

    context = {"page_name" : "home"}

    return render(request, 'main_webapp/home.html', context=context)

def info(request):

    context = {'dev_img_src': static("img\\dp.jpg"),
               'ktop_img_src': static("img\\ktop.jpg"),
               "page_name" : "info"}

    return render(request, 'main_webapp/info.html', context=context)