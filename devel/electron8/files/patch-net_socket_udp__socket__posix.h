--- net/socket/udp_socket_posix.h.orig	2020-03-03 07:03:11 UTC
+++ net/socket/udp_socket_posix.h
@@ -33,7 +33,7 @@
 
 #if defined(__ANDROID__) && defined(__aarch64__)
 #define HAVE_SENDMMSG 1
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
 #define HAVE_SENDMMSG 1
 #else
 #define HAVE_SENDMMSG 0
