--- ui/gl/init/gl_factory.cc.orig	2021-09-14 01:52:23 UTC
+++ ui/gl/init/gl_factory.cc
@@ -139,7 +139,7 @@ bool InitializeGLOneOffPlatformHelper(bool init_extens
 }  // namespace
 
 GLImplementationParts GetSoftwareGLForTestsImplementation() {
-#if defined(OS_WIN) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_BSD)
 #if defined(USE_OZONE)
   if (!features::IsUsingOzonePlatform() ||
       ((ui::OzonePlatform::GetPlatformNameForTest() != "wayland") &&
