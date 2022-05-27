--- electron/shell/browser/electron_browser_main_parts.cc.orig	2022-05-24 16:31:07 UTC
+++ electron/shell/browser/electron_browser_main_parts.cc
@@ -64,7 +64,7 @@
 #include "ui/wm/core/wm_state.h"
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 #include "base/environment.h"
 #include "base/threading/thread_task_runner_handle.h"
 #include "ui/gtk/gtk_ui_factory.h"
@@ -159,7 +159,7 @@ std::u16string MediaStringProvider(media::MessageId id
   }
 }
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 // GTK does not provide a way to check if current theme is dark, so we compare
 // the text and background luminosity to get a result.
 // This trick comes from FireFox.
@@ -177,7 +177,7 @@ void UpdateDarkThemeSetting() {
 
 }  // namespace
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 class DarkThemeObserver : public ui::NativeThemeObserver {
  public:
   DarkThemeObserver() = default;
@@ -288,7 +288,7 @@ int ElectronBrowserMainParts::PreCreateThreads() {
 #if defined(USE_AURA)
   screen_ = views::CreateDesktopScreen();
   display::Screen::SetScreenInstance(screen_.get());
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   views::LinuxUI::instance()->UpdateDeviceScaleFactor();
 #endif
 #endif
@@ -305,7 +305,7 @@ int ElectronBrowserMainParts::PreCreateThreads() {
   // happen before the ResourceBundle is loaded
   if (locale.empty())
     l10n_util::OverrideLocaleWithCocoaLocale();
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
   // l10n_util::GetApplicationLocaleInternal uses g_get_language_names(),
   // which keys off of getenv("LC_ALL").
   // We must set this env first to make ui::ResourceBundle accept the custom
@@ -328,7 +328,7 @@ int ElectronBrowserMainParts::PreCreateThreads() {
   ElectronBrowserClient::SetApplicationLocale(app_locale);
   fake_browser_process_->SetApplicationLocale(app_locale);
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Reset to the original LC_ALL since we should not be changing it.
   if (!locale.empty()) {
     if (lc_all)
@@ -375,7 +375,7 @@ void ElectronBrowserMainParts::PostDestroyThreads() {
 }
 
 void ElectronBrowserMainParts::ToolkitInitialized() {
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   auto linux_ui = BuildGtkUi();
   linux_ui->Initialize();
 
@@ -485,7 +485,9 @@ void ElectronBrowserMainParts::PostCreateMainMessageLo
 #endif
 #if defined(OS_LINUX)
   bluez::DBusBluezManagerWrapperLinux::Initialize();
+#endif
 
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Set up crypt config. This needs to be done before anything starts the
   // network service, as the raw encryption key needs to be shared with the
   // network service for encrypted cookie storage.
