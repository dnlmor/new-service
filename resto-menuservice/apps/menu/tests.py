from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import MenuItem

class MenuItemTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.menu_item_data = {
            'name': 'Test Item',
            'price': '9.99',
            'description': 'Test Description',
            'stocks': 10
        }
        self.menu_item = MenuItem.objects.create(
            name='Existing Item',
            price='10.99',
            description='Existing Description',
            stocks=5
        )

    def test_create_menu_item(self):
        response = self.client.post('/api/menu/', self.menu_item_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MenuItem.objects.count(), 2)

    def test_get_menu_items(self):
        response = self.client.get('/api/menu/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_menu_item(self):
        response = self.client.get(f'/api/menu/{self.menu_item.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Existing Item')

    def test_update_menu_item(self):
        updated_data = {
            'name': 'Updated Item',
            'price': '11.99',
            'description': 'Updated Description',
            'stocks': 15
        }
        response = self.client.put(f'/api/menu/{self.menu_item.id}/', updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Updated Item')
        self.assertEqual(response.data['stocks'], 15)

    def test_delete_menu_item(self):
        response = self.client.delete(f'/api/menu/{self.menu_item.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(MenuItem.objects.count(), 0)
