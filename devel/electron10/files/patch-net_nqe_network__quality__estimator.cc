--- net/nqe/network_quality_estimator.cc.orig	2020-09-21 18:39:21 UTC
+++ net/nqe/network_quality_estimator.cc
@@ -105,7 +105,7 @@ nqe::internal::NetworkID DoGetCurrentNetworkID(
       case NetworkChangeNotifier::ConnectionType::CONNECTION_ETHERNET:
         break;
       case NetworkChangeNotifier::ConnectionType::CONNECTION_WIFI:
-#if defined(OS_ANDROID) || defined(OS_LINUX) || defined(OS_WIN)
+#if defined(OS_ANDROID) || defined(OS_LINUX) || defined(OS_WIN) || defined(OS_BSD)
         network_id.id = GetWifiSSID();
 #endif
         break;
