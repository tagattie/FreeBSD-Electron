--- third_party/angle/src/libANGLE/renderer/driver_utils.h.orig	2021-09-14 01:58:21 UTC
+++ third_party/angle/src/libANGLE/renderer/driver_utils.h
@@ -172,7 +172,7 @@ inline bool IsWindows()
 
 inline bool IsLinux()
 {
-#if defined(ANGLE_PLATFORM_LINUX)
+#if defined(ANGLE_PLATFORM_POSIX)
     return true;
 #else
     return false;
