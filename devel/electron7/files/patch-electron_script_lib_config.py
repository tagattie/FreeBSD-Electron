--- electron/script/lib/config.py.orig	2019-12-17 05:39:13 UTC
+++ electron/script/lib/config.py
@@ -21,6 +21,7 @@ BASE_URL = os.getenv('LIBCHROMIUMCONTENT_MIRROR') or \
 PLATFORM = {
   'cygwin': 'win32',
   'darwin': 'darwin',
+  'freebsd12': 'freebsd',
   'linux': 'linux',
   'linux2': 'linux',
   'win32': 'win32',
