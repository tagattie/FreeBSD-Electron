--- third_party/angle/src/libANGLE/renderer/driver_utils.h.orig	2020-09-21 18:42:12 UTC
+++ third_party/angle/src/libANGLE/renderer/driver_utils.h
@@ -139,7 +139,7 @@ inline bool IsWindows()
 
 inline bool IsLinux()
 {
-#if defined(ANGLE_PLATFORM_LINUX)
+#if defined(ANGLE_PLATFORM_POSIX)
     return true;
 #else
     return false;
