--- electron/shell/common/node_bindings.cc.orig	2021-01-14 16:50:03 UTC
+++ electron/shell/common/node_bindings.cc
@@ -340,7 +340,7 @@ void NodeBindings::Initialize() {
   node::g_standalone_mode = browser_env_ == BrowserEnvironment::BROWSER;
   node::g_upstream_node_mode = false;
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Get real command line in renderer process forked by zygote.
   if (browser_env_ != BrowserEnvironment::BROWSER)
     ElectronCommandLine::InitializeFromCommandLine();
