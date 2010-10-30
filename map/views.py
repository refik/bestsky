# Create your views here.
from django.shortcuts import render_to_response
from django.http import HttpResponse
from map.models import Suggestion
import process, time

def mainPage(request):
  return render_to_response('map/main_page.html')

def mapData(request):
  top = request.POST['top']
  bottom = request.POST['bottom']
  post_id = request.POST['id']
  tp = top.split(',')
  bp = bottom.split(',')
  top_lat = float(tp[0][1:])
  top_lon = float(tp[1][1:-1])
  bot_lat = float(bp[0][1:])
  bot_lon = float(bp[1][1:-1])
  lat_dif = top_lat - bot_lat
  lon_dif = top_lon - bot_lon
  answer = process.calculate((top_lat,top_lon),lat_dif,lon_dif)
  new = Suggestion(unique = int(post_id), coordinates = str(answer))
  new.save()

  return HttpResponse('success')

def getSuggest(request, request_id):
  answer = Suggestion.objects.get(unique = int(request_id))
  copy = answer
  answer.delete()
  return HttpResponse(copy)
