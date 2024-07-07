from django.urls import path
from .views import MenuListView

urlpatterns = [
    path('api/menu/', MenuListView.as_view(), name='menu-list'),
]
