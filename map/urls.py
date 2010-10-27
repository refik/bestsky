from django.conf.urls.defaults import *

urlpatterns = patterns('bestsky.map.views',
  (r'^$', 'mainPage'),
  (r'^map_data/$', 'mapData'),
  (r'^get/(?P<request_id>\d+)/$', 'getSuggest'),
)
