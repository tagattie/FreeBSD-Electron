--- tools/json_schema_compiler/model.py.orig	2020-03-03 07:04:26 UTC
+++ tools/json_schema_compiler/model.py
@@ -605,7 +605,7 @@ class Platforms(object):
   """
   CHROMEOS = _PlatformInfo("chromeos")
   CHROMEOS_TOUCH = _PlatformInfo("chromeos_touch")
-  LINUX = _PlatformInfo("linux")
+  LINUX = _PlatformInfo("bsd")
   MAC = _PlatformInfo("mac")
   WIN = _PlatformInfo("win")
 
