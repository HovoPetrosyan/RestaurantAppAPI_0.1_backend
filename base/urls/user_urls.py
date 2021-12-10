from django.urls import path
from base.views import user_views as views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # # path('register/', views.registerUser, name='register'),
    # path('current_user/', views.getUserProfile, name='getUserProfile'),
    path('all/', views.getUsers, name='users'),
    # path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]