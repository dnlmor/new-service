from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import MenuItem
from .serializers import MenuItemSerializer

class MenuListView(APIView):
    def get(self, request):
            menu_items = Menu.objects.all()
            serializer = MenuSerializer(menu_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MenuItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MenuItemView(APIView):
    def get_object(self, item_id):
        try:
            return MenuItem.objects.get(pk=item_id)
        except MenuItem.DoesNotExist:
            return None

    def get(self, request, item_id):
        menu_item = self.get_object(item_id)
        if menu_item is not None:
            serializer = MenuItemSerializer(menu_item)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, item_id):
        menu_item = self.get_object(item_id)
        if menu_item is not None:
            serializer = MenuItemSerializer(menu_item, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, item_id):
        menu_item = self.get_object(item_id)
        if menu_item is not None:
            menu_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)
