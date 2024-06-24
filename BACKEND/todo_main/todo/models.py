from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User


class Todo(models.Model):
    class ProrityChoice(models.TextChoices):
        LOW = 'L', _('LOW')
        MEDIUM = 'M', _('MEDIUM')
        HIGH = 'H', _('HIGH')
    
    class StatusChoice(models.TextChoices):
        PENDING = 'P', _('PENDING')
        INPROGRESS = 'IP', _('IN PROGRESS')
        COMPLETED = 'C', _('COMPLETED')
        DEFERRED = 'D', _('DEFERRRED')
        
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    start_time = models.TimeField()
    end_time = models.TimeField()
    priority = models.CharField(max_length=1, choices=ProrityChoice, default=ProrityChoice.MEDIUM)
    status = models.CharField(max_length=2, choices=StatusChoice, default=StatusChoice.PENDING)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return self.title
    