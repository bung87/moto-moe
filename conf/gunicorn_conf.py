import multiprocessing

bind = "127.0.0.1:8000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_connections = 3000
keepalive = 1
daemon = True
loglevel = 'info'
pidfile = '/var/run/moe.pid'
errorlog = '/var/log/gunicorn.error.log'
accesslog = '/var/log/gunicorn.access.log'
