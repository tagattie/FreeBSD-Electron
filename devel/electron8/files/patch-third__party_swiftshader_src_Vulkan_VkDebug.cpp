--- third_party/swiftshader/src/Vulkan/VkDebug.cpp.orig	2020-03-03 07:10:20 UTC
+++ third_party/swiftshader/src/Vulkan/VkDebug.cpp
@@ -33,7 +33,7 @@ namespace {
 
 bool IsUnderDebugger()
 {
-#if defined(PTRACE) && !defined(__APPLE__) && !defined(__MACH__)
+#if defined(PTRACE) && !defined(__APPLE__) && !defined(__MACH__) && !defined(__FreeBSD__)
 	static bool checked = false;
 	static bool res = false;
 
