--- third_party/angle/src/libANGLE/renderer/driver_utils.h.orig	2020-03-03 07:05:28 UTC
+++ third_party/angle/src/libANGLE/renderer/driver_utils.h
@@ -115,7 +115,7 @@ inline bool IsWindows()
 
 inline bool IsLinux()
 {
-#if defined(ANGLE_PLATFORM_LINUX)
+#if defined(ANGLE_PLATFORM_POSIX)
     return true;
 #else
     return false;
