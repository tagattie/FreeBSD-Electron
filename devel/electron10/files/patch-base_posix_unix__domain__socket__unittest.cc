--- base/posix/unix_domain_socket_unittest.cc.orig	2020-09-21 18:39:01 UTC
+++ base/posix/unix_domain_socket_unittest.cc
@@ -8,6 +8,9 @@
 #include <stdint.h>
 #include <sys/socket.h>
 #include <sys/types.h>
+#if defined(OS_BSD)
+#include <signal.h>
+#endif
 #include <unistd.h>
 
 #include "base/bind.h"
