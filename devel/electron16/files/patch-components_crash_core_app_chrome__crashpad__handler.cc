--- components/crash/core/app/chrome_crashpad_handler.cc.orig	2021-11-19 04:25:13 UTC
+++ components/crash/core/app/chrome_crashpad_handler.cc
@@ -6,5 +6,9 @@
 extern "C" int CrashpadHandlerMain(int argc, char* argv[]);
 
 int main(int argc, char* argv[]) {
+#if defined(__OpenBSD__) || defined(__FreeBSD__)
+  return -1;
+#else
   return CrashpadHandlerMain(argc, argv);
+#endif
 }
