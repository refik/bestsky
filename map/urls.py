from django.conf.urls.defaults import *

urlpatterns = patterns('bestsky.map.views',
  (r'^$', 'mainPage'),
)
