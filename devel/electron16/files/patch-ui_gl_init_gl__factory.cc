--- ui/gl/init/gl_factory.cc.orig	2021-11-19 04:25:48 UTC
+++ ui/gl/init/gl_factory.cc
@@ -167,7 +167,7 @@ bool InitializeGLOneOffPlatformHelper(bool init_extens
 }  // namespace
 
 GLImplementationParts GetSoftwareGLImplementationForPlatform() {
-#if defined(OS_WIN) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_BSD)
   return GetSoftwareGLImplementation();
 #else
   return GetLegacySoftwareGLImplementation();
