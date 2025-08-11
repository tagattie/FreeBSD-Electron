--- app/node_modules/node-pty/src/unix/pty.cc.orig	2025-08-11 05:29:28 UTC
+++ app/node_modules/node-pty/src/unix/pty.cc
@@ -41,6 +41,7 @@
 #include <util.h>
 #elif defined(__FreeBSD__)
 #include <libutil.h>
+#include <termios.h>
 #endif
 
 /* Some platforms name VWERASE and VDISCARD differently */
