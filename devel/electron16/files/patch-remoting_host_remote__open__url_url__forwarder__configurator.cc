--- remoting/host/remote_open_url/url_forwarder_configurator.cc.orig	2021-11-19 04:25:20 UTC
+++ remoting/host/remote_open_url/url_forwarder_configurator.cc
@@ -13,7 +13,7 @@ UrlForwarderConfigurator::UrlForwarderConfigurator() =
 
 UrlForwarderConfigurator::~UrlForwarderConfigurator() = default;
 
-#if !defined(OS_LINUX) && !defined(OS_WIN)
+#if !defined(OS_LINUX) && !defined(OS_WIN) && !defined(OS_BSD)
 
 // static
 std::unique_ptr<UrlForwarderConfigurator> UrlForwarderConfigurator::Create() {
