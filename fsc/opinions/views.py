from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.staticfiles.templatetags.staticfiles import static
from opinions.models import Opinion

def opinions(request):

    context = {"threads" : Opinion.objects.all(),
              "page_name" : "opinions"}

    return render(request, 'opinions/opinions.html', context=context)