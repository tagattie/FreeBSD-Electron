--- extensions/browser/browser_context_keyed_service_factories.cc.orig	2020-03-03 07:03:03 UTC
+++ extensions/browser/browser_context_keyed_service_factories.cc
@@ -71,7 +71,7 @@ void EnsureBrowserContextKeyedServiceFactoriesBuilt() 
   HidDeviceManager::GetFactoryInstance();
   IdleManagerFactory::GetInstance();
   ManagementAPI::GetFactoryInstance();
-#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_MACOSX)
+#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_MACOSX) || defined(OS_BSD)
   NetworkingPrivateEventRouterFactory::GetInstance();
 #endif
   PowerAPI::GetFactoryInstance();
