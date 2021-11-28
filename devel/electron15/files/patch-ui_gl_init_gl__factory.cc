--- ui/gl/init/gl_factory.cc.orig	2021-10-08 06:26:48 UTC
+++ ui/gl/init/gl_factory.cc
@@ -171,7 +171,7 @@ bool InitializeGLOneOffPlatformHelper(bool init_extens
 }  // namespace
 
 GLImplementationParts GetSoftwareGLForTestsImplementation() {
-#if defined(OS_WIN) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_BSD)
   return GetSoftwareGLImplementation();
 #else
   return GetLegacySoftwareGLImplementation();
