import pytz

from django.utils import timezone
from six.moves.urllib.parse import unquote

class TimezoneMiddleware(object):
    def process_request(self, request):
        tzname = request.COOKIES.get('timezone')
        if tzname:
            timezone.activate(pytz.timezone(unquote(tzname)))
        else:
            timezone.deactivate()