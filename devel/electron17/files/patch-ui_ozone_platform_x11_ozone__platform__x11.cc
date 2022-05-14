--- ui/ozone/platform/x11/ozone_platform_x11.cc.orig	2022-05-13 07:19:54 UTC
+++ ui/ozone/platform/x11/ozone_platform_x11.cc
@@ -205,7 +205,7 @@ class OzonePlatformX11 : public OzonePlatform,
       properties->supports_global_application_menus = true;
       properties->app_modal_dialogs_use_event_blocker = true;
       properties->fetch_buffer_formats_for_gmb_on_gpu = true;
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
       properties->supports_vaapi = true;
 #endif
 
