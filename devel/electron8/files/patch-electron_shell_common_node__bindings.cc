--- electron/shell/common/node_bindings.cc.orig	2020-06-18 16:52:13 UTC
+++ electron/shell/common/node_bindings.cc
@@ -262,7 +262,7 @@ void NodeBindings::Initialize() {
   node::g_standalone_mode = browser_env_ == BrowserEnvironment::BROWSER;
   node::g_upstream_node_mode = false;
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Get real command line in renderer process forked by zygote.
   if (browser_env_ != BrowserEnvironment::BROWSER)
     ElectronCommandLine::InitializeFromCommandLine();
