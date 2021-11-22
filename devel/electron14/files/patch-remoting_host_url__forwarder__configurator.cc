--- remoting/host/url_forwarder_configurator.cc.orig	2021-09-14 01:52:00 UTC
+++ remoting/host/url_forwarder_configurator.cc
@@ -13,7 +13,7 @@ UrlForwarderConfigurator::UrlForwarderConfigurator() =
 
 UrlForwarderConfigurator::~UrlForwarderConfigurator() = default;
 
-#if !defined(OS_LINUX)
+#if !defined(OS_LINUX) && !defined(OS_BSD)
 
 // static
 UrlForwarderConfigurator* UrlForwarderConfigurator::GetInstance() {
@@ -22,6 +22,6 @@ UrlForwarderConfigurator* UrlForwarderConfigurator::Ge
   return nullptr;
 }
 
-#endif  // !defined(OS_LINUX)
+#endif  // !defined(OS_LINUX) && !defined(OS_BSD)
 
 }  // namespace remoting
