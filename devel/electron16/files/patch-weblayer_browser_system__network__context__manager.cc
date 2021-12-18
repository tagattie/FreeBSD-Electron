--- weblayer/browser/system_network_context_manager.cc.orig	2021-11-19 04:25:48 UTC
+++ weblayer/browser/system_network_context_manager.cc
@@ -69,10 +69,10 @@ void SystemNetworkContextManager::ConfigureDefaultNetw
   network_context_params->user_agent = user_agent;
 // TODO(crbug.com/1052397): Revisit once build flag switch of lacros-chrome is
 // complete.
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_WIN)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_WIN) || defined(OS_BSD)
   // We're not configuring the cookie encryption on these platforms yet.
   network_context_params->enable_encrypted_cookies = false;
-#endif  // (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) ||
+#endif  // (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || deined(OS_BSD) ||
         // defined(OS_WIN)
 }
 
