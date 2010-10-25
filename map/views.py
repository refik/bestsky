# Create your views here.
from django.shortcuts import render_to_response
from django.http import HttpResponse

def mainPage(request):
  return render_to_response('map/main_page.html')

def mapData(request):
  print request.POST['width']
  print request.POST['center']
  return HttpResponse('selam')

