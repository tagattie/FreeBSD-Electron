--- tools/json_schema_compiler/model.py.orig	2021-09-14 01:52:21 UTC
+++ tools/json_schema_compiler/model.py
@@ -871,6 +871,7 @@ class Platforms(object):
   """Enum of the possible platforms.
   """
   CHROMEOS = _PlatformInfo("chromeos")
+  FREEBSD = _PlatformInfo("freebsd")
   LACROS = _PlatformInfo("lacros")
   LINUX = _PlatformInfo("linux")
   MAC = _PlatformInfo("mac")
