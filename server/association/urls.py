from django.urls import path
from .views import create_association ,get_all_associations

urlpatterns = [
    path('create/', create_association, name='create_association'),
    path('all/', get_all_associations, name='all_associations'),
]
