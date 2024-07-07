from django.urls import path
from .views import CartView, CartItemView, CheckoutView

urlpatterns = [
    path('cart/<int:user_id>/', CartView.as_view(), name='cart'),
    path('cart/<int:user_id>/item/<int:item_id>/', CartItemView.as_view(), name='cart-item'),
    path('cart/<int:user_id>/checkout/', CheckoutView.as_view(), name='checkout'),
]
