from django.db import models

# Create your models here.
class Suggestion(models.Model):
  unique = models.IntegerField()
  coordinates = models.CharField(max_length = 1000)
  def __unicode__(self):
    return self.coordinates


