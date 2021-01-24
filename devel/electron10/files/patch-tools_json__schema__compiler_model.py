--- tools/json_schema_compiler/model.py.orig	2020-09-21 18:40:00 UTC
+++ tools/json_schema_compiler/model.py
@@ -605,7 +605,7 @@ class Platforms(object):
   """
   CHROMEOS = _PlatformInfo("chromeos")
   CHROMEOS_TOUCH = _PlatformInfo("chromeos_touch")
-  LINUX = _PlatformInfo("linux")
+  LINUX = _PlatformInfo("bsd")
   MAC = _PlatformInfo("mac")
   WIN = _PlatformInfo("win")
 
