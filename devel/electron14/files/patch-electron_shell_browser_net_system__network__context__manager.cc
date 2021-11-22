--- electron/shell/browser/net/system_network_context_manager.cc.orig	2021-11-08 18:41:28 UTC
+++ electron/shell/browser/net/system_network_context_manager.cc
@@ -240,7 +240,7 @@ void SystemNetworkContextManager::OnNetworkServiceCrea
     // The OSCrypt keys are process bound, so if network service is out of
     // process, send it the required key.
     if (content::IsOutOfProcessNetworkService()) {
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
       // c.f.
       // https://source.chromium.org/chromium/chromium/src/+/master:chrome/browser/net/system_network_context_manager.cc;l=515;drc=9d82515060b9b75fa941986f5db7390299669ef1;bpv=1;bpt=1
       const base::CommandLine& command_line =
