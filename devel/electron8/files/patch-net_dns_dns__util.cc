--- net/dns/dns_util.cc.orig	2020-03-03 07:03:11 UTC
+++ net/dns/dns_util.cc
@@ -38,6 +38,8 @@ const uint16_t kFlagNamePointer = 0xc000;
 
 }  // namespace
 
+#include <sys/socket.h>
+
 #if defined(OS_POSIX)
 #include <netinet/in.h>
 #if !defined(OS_NACL)
