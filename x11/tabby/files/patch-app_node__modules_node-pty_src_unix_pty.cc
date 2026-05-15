--- app/node_modules/node-pty/src/unix/pty.cc.orig	2026-05-15 12:42:35 UTC
+++ app/node_modules/node-pty/src/unix/pty.cc
@@ -112,7 +112,7 @@ struct ExitEvent {
   int exit_code = 0, signal_code = 0;
 };
 
-#if defined(__linux__)
+#if defined(__linux__) || defined(__FreeBSD__) || defined(__OpenBSD__)
 
 static int
 SetCloseOnExec(int fd) {
@@ -135,6 +135,11 @@ pty_close_inherited_fds() {
   if (syscall(SYS_close_range, 3, ~0U, CLOSE_RANGE_CLOEXEC) == 0) {
     return;
   }
+  #endif
+
+  #if defined(__FreeBSD__) || defined(__OpenBSD__)
+  closefrom(3);
+  return;
   #endif
 
   int fd;
