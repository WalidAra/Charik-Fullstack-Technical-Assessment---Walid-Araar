from django.db import models

class Association(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)
    deal_id = models.CharField(max_length=100)

    def __str__(self):
        return self.email
