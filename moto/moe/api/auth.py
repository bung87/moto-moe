from moe_auth.auth.views import Login as BaseLogin
from moto.moe.api.serializers import UserDetailSerializer

class Login(BaseLogin):
    response_serializer = UserDetailSerializer