--- chrome/browser/ui/views/chrome_views_delegate_linux.cc.orig	2023-01-26 11:40:11 UTC
+++ chrome/browser/ui/views/chrome_views_delegate_linux.cc
@@ -23,7 +23,7 @@ bool IsDesktopEnvironmentUnity() {
   return desktop_env == base::nix::DESKTOP_ENVIRONMENT_UNITY;
 }
 
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 int GetWindowIconResourceId() {
 #if BUILDFLAG(GOOGLE_CHROME_BRANDING)
   switch (chrome::GetChannel()) {
@@ -67,7 +67,7 @@ views::NativeWidget* ChromeViewsDelegate::CreateNative
                               delegate);
 }
 
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 gfx::ImageSkia* ChromeViewsDelegate::GetDefaultWindowIcon() const {
   ui::ResourceBundle& rb = ui::ResourceBundle::GetSharedInstance();
   return rb.GetImageSkiaNamed(GetWindowIconResourceId());
