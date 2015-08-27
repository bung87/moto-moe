from django.utils import formats
def number_format(value, tsep=',', dsep='.'):
    s = str(value)
    cnt = 0
    numchars = dsep + '0123456789'
    ls = len(s)
    while cnt < ls and s[cnt] not in numchars:
        cnt += 1

    lhs = s[:cnt]
    s = s[cnt:]
    if not dsep:
        cnt = -1
    else:
        cnt = s.rfind(dsep)
    if cnt > 0:
        rhs = dsep + s[cnt+1:]
        s = s[:cnt]
    else:
        rhs = ''

    splt = ''
    while s != '':
        splt = s[-3:] + tsep + splt
        s = s[:-3]

    return lhs + splt[:-1] + rhs

def filesizeformat(bytes):
    """
    Formats the value like a 'human-readable' file size (i.e. 13 KB, 4.1 MB,
    102 bytes, etc).
    """
    try:
        bytes = float(bytes)
    except (TypeError, ValueError, UnicodeDecodeError):
        value = "%(size)d byte", "%(size)d bytes" % {'size': 0}
        return value

    filesize_number_format = lambda value: formats.number_format(round(value, 1),use_l10n=False)

    KB = 1 << 10
    MB = 1 << 20
    GB = 1 << 30
    TB = 1 << 40
    PB = 1 << 50

    if bytes < KB:
        value = "%(size)d byte", "%(size)d bytes" % {'size': bytes}
    elif bytes < MB:
        value = ("%s KB") % filesize_number_format(bytes / KB)
    elif bytes < GB:
        value = ("%s MB") % filesize_number_format(bytes / MB)
    elif bytes < TB:
        value = ("%s GB") % filesize_number_format(bytes / GB)
    elif bytes < PB:
        value = ("%s TB") % filesize_number_format(bytes / TB)
    else:
        value = ("%s PB") % filesize_number_format(bytes / PB)

    return value