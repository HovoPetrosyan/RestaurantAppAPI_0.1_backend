from rest_framework.schemas import get_schema_view
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from rest_framework.documentation import include_docs_urls
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/products/', include('base.urls.product_urls')),
    path('api/users/', include('base.urls.user_urls')),
    path('api/orders/', include('base.urls.order_urls')),
    path('api/tables/', include('base.urls.table_urls')),
    path('docs/',include_docs_urls(title='RestaurantAPI')),
    path('schema', get_schema_view(
        title='RestaurantAPI',
        description="API for Restaurant",
        version="1.0.0",
        ),name='openapi-schema'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)