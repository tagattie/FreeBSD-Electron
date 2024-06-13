--- electron/script/lib/config.py.orig	2024-02-14 21:53:19 UTC
+++ electron/script/lib/config.py
@@ -8,6 +8,9 @@ PLATFORM = {
   'cygwin': 'win32',
   'msys': 'win32',
   'darwin': 'darwin',
+  'freebsd13': 'freebsd',
+  'freebsd14': 'freebsd',
+  'freebsd15': 'freebsd',
   'linux': 'linux',
   'linux2': 'linux',
   'win32': 'win32',
