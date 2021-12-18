--- services/network/network_sandbox_hook_linux.h.orig	2021-11-19 04:25:21 UTC
+++ services/network/network_sandbox_hook_linux.h
@@ -10,7 +10,13 @@
 #include "base/component_export.h"
 #include "sandbox/linux/syscall_broker/broker_command.h"
 #include "sandbox/linux/syscall_broker/broker_file_permission.h"
+#if defined(OS_OPENBSD)
+#include "sandbox/policy/openbsd/sandbox_openbsd.h"
+#elif defined(OS_FREEBSD)
+#include "sandbox/policy/freebsd/sandbox_freebsd.h"
+#else
 #include "sandbox/policy/linux/sandbox_linux.h"
+#endif
 
 namespace network {
 
