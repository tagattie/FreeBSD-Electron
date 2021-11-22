--- third_party/dawn/src/common/Platform.h.orig	2021-09-14 01:58:21 UTC
+++ third_party/dawn/src/common/Platform.h
@@ -53,6 +53,11 @@
 #    define DAWN_PLATFORM_EMSCRIPTEN 1
 #    define DAWN_PLATFORM_POSIX 1
 
+#elif defined(__FreeBSD__)
+#    define DAWN_PLATFORM_FREEBSD 1
+#    define DAWN_PLATFORM_LINUX 1
+#    define DAWN_PLATFORM_POSIX 1
+
 #else
 #    error "Unsupported platform."
 #endif
