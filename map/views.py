# Create your views here.
from django.shortcuts import render_to_response

def mainPage(request):
  return render_to_response('map/main_page.html')
