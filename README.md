# Simple FullStack Microservice

# How To Run

1. Read through the README file inside the resto-coreservice repo, once done you can try to run the backend server
2. Then you go to the resto-clientservice to run the frontend ("npm run start"), but make sure to run "npm i" to install the correct dependencies 
3. Voila


resto-microservices/
│
├── resto-coreservice/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
        ├── urls.py
        ├── proxy_view.py
        ├── proxy_views.py
        ├── middleware.py
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── __init__.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
            ├── apps.py
            ├── models.py
            ├── serializers.py
            ├── views.py
│   │   │   └── tests.py
│   │   ├── menu-service/
│   │   │   ├── __init__.py
│   │   │   ├── apps.py
            ├── connector.py
            ├── models.py
            ├── serializers.py
│   │   │   └── views.py
│   │   └── cart-service/
│   │   │   ├── __init__.py
│   │   │   ├── apps.py
            ├── connector.py
            ├── models.py
            ├── serializers.py
│   │   │   └── views.py
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── resto-menuservice/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
        ├── urls.py
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── __init__.py
│   │   ├── menu/
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
            ├── apps.py
            ├── models.py
            ├── serializers.py
            ├── views.py
│   │   │   └── tests.py
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── resto-cartservice/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
        ├── urls.py
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── __init__.py
│   │   ├── cart/
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
            ├── apps.py
            ├── models.py
            ├── serializers.py
            ├── views.py
│   │   │   └── tests.py
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── resto-clientservice/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── MenuList.js
│   │   │   ├── CartList.js
│   │   │   └── Notification.js
│   │   ├── pages/
│   │   │   ├── MenuPage.js
│   │   │   └── CartPage.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── .gitignore
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md

