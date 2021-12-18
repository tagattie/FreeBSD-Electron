--- ui/base/resource/resource_bundle.cc.orig	2021-11-19 04:25:48 UTC
+++ ui/base/resource/resource_bundle.cc
@@ -817,7 +817,7 @@ void ResourceBundle::ReloadFonts() {
 }
 
 ResourceScaleFactor ResourceBundle::GetMaxResourceScaleFactor() const {
-#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   return max_scale_factor_;
 #else
   return GetSupportedResourceScaleFactors().back();
@@ -870,7 +870,7 @@ void ResourceBundle::InitSharedInstance(Delegate* dele
   // On platforms other than iOS, 100P is always a supported scale factor.
   // For Windows we have a separate case in this function.
   supported_scale_factors.push_back(k100Percent);
-#if defined(OS_MAC) || defined(OS_LINUX) || defined(OS_CHROMEOS) || \
+#if defined(OS_MAC) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD) || \
     defined(OS_WIN)
   supported_scale_factors.push_back(k200Percent);
 #endif
