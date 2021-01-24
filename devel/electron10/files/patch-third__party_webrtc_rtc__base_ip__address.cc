--- third_party/webrtc/rtc_base/ip_address.cc.orig	2020-09-21 18:42:22 UTC
+++ third_party/webrtc/rtc_base/ip_address.cc
@@ -11,6 +11,9 @@
 #if defined(WEBRTC_POSIX)
 #include <netinet/in.h>
 #include <sys/socket.h>
+#if defined(WEBRTC_BSD)
+#include <sys/types.h>
+#endif
 #ifdef OPENBSD
 #include <netinet/in_systm.h>
 #endif
