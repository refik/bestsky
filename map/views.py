# Create your views here.
from django.shortcuts import render_to_response
from django.http import HttpResponse
import process

def mainPage(request):
  return render_to_response('map/main_page.html')

def mapData(request):
  top = request.POST['top']
  bottom = request.POST['bottom']
  tp = top.split(',')
  bp = bottom.split(',')
  top_lat = float(tp[0][1:])
  top_lon = float(tp[1][1:-1])
  bot_lat = float(bp[0][1:])
  bot_lon = float(bp[1][1:-1])
  lat_dif = top_lat - bot_lat
  lon_dif = top_lon - bot_lon
  print process.calculate((top_lat,top_lon),lat_dif,lon_dif)
  return HttpResponse('success')

def getSuggest(request, request_id):
  answer = request_id * 2
  return HttpResponse(answer)
