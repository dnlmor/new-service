from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Cart, CartItem

class CartTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_id = 1
        self.cart = Cart.objects.create(user_id=self.user_id)
        self.cart_item = CartItem.objects.create(
            cart=self.cart,
            menu_item_id=1,
            quantity=2,
            price=10.00
        )

    def test_get_cart(self):
        response = self.client.get(f'/api/cart/{self.user_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user_id'], self.user_id)
        self.assertEqual(len(response.data['items']), 1)

    def test_add_to_cart(self):
        new_item_data = {
            'menu_item_id': 2,
            'quantity': 1,
            'price': 15.00
        }
        response = self.client.post(f'/api/cart/{self.user_id}/', new_item_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data['items']), 2)

    def test_update_cart_item(self):
        update_data = {
            'quantity': 3
        }
        response = self.client.put(f'/api/cart/{self.user_id}/item/{self.cart_item.id}/', update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['items'][0]['quantity'], 3)

    def test_delete_cart_item(self):
        response = self.client.delete(f'/api/cart/{self.user_id}/item/{self.cart_item.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['items']), 0)

    def test_checkout(self):
        response = self.client.post(f'/api/cart/{self.user_id}/checkout/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['items']), 1)  # The cart should be cleared after checkout
        
        # Check if the cart is empty after checkout
        get_response = self.client.get(f'/api/cart/{self.user_id}/')
        self.assertEqual(len(get_response.data['items']), 0)
