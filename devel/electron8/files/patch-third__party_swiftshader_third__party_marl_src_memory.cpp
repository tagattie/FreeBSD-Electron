--- third_party/swiftshader/third_party/marl/src/memory.cpp.orig	2020-03-03 07:10:30 UTC
+++ third_party/swiftshader/third_party/marl/src/memory.cpp
@@ -19,7 +19,7 @@
 
 #include <cstring>
 
-#if defined(__linux__) || defined(__APPLE__)
+#if defined(__linux__) || defined(__APPLE__) || defined(__FreeBSD__)
 #include <sys/mman.h>
 #include <unistd.h>
 namespace {
