from channels.routing import ProtocolTypeRouter
from channels.routing import URLRouter
import wslog.routing

application = ProtocolTypeRouter(
    {
        'websocket': URLRouter(
            wslog.routing.websocket_urlpatterns
        ),
    }
)
