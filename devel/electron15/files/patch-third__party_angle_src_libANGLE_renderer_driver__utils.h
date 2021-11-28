--- third_party/angle/src/libANGLE/renderer/driver_utils.h.orig	2021-10-08 06:29:10 UTC
+++ third_party/angle/src/libANGLE/renderer/driver_utils.h
@@ -173,7 +173,7 @@ inline bool IsWindows()
 
 inline bool IsLinux()
 {
-#if defined(ANGLE_PLATFORM_LINUX)
+#if defined(ANGLE_PLATFORM_POSIX)
     return true;
 #else
     return false;
