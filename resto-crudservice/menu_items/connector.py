from django.db import connection

class DatabaseConnector:
    @staticmethod
    def execute_query(query, params=None):
        with connection.cursor() as cursor:
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            if query.strip().upper().startswith('SELECT'):
                columns = [col[0] for col in cursor.description]
                return [dict(zip(columns, row)) for row in cursor.fetchall()]
            else:
                return cursor.rowcount

    @staticmethod
    def get_menu_items():
        query = "SELECT * FROM contact_service_menuitem"
        return DatabaseConnector.execute_query(query)

    @staticmethod
    def get_menu_item(item_id):
        query = "SELECT * FROM contact_service_menuitem WHERE id = %s"
        result = DatabaseConnector.execute_query(query, [item_id])
        return result[0] if result else None

    @staticmethod
    def create_menu_item(name, price, description, stocks):
        query = """
        INSERT INTO contact_service_menuitem (name, price, description, stocks, created_at, updated_at)
        VALUES (%s, %s, %s, %s, NOW(), NOW())
        """
        return DatabaseConnector.execute_query(query, [name, price, description, stocks])

    @staticmethod
    def update_menu_item(item_id, name, price, description, stocks):
        query = """
        UPDATE contact_service_menuitem
        SET name = %s, price = %s, description = %s, stocks = %s, updated_at = NOW()
        WHERE id = %s
        """
        return DatabaseConnector.execute_query(query, [name, price, description, stocks, item_id])

    @staticmethod
    def delete_menu_item(item_id):
        query = "DELETE FROM contact_service_menuitem WHERE id = %s"
        return DatabaseConnector.execute_query(query, [item_id])
