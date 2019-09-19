from django.shortcuts import render

def projects(request):

    context = {"page_name" : "projects"}

    return render(request, 'projects/projects.html', context=context)