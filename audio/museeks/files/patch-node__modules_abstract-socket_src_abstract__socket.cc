--- node_modules/abstract-socket/src/abstract_socket.cc.orig	2020-01-24 04:47:14 UTC
+++ node_modules/abstract-socket/src/abstract_socket.cc
@@ -1,4 +1,4 @@
-#if !defined(__linux__)
+#if !defined(__linux__) && !defined(__FreeBSD__)
 # error "Only Linux is supported"
 #endif
 
