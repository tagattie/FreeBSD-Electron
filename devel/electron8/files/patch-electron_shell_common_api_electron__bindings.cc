--- electron/shell/common/api/electron_bindings.cc.orig	2020-06-18 16:52:13 UTC
+++ electron/shell/common/api/electron_bindings.cc
@@ -287,7 +287,7 @@ void ElectronBindings::DidReceiveMemoryDump(
     if (base::GetCurrentProcId() == dump.pid()) {
       mate::Dictionary dict = mate::Dictionary::CreateEmpty(isolate);
       const auto& osdump = dump.os_dump();
-#if defined(OS_LINUX) || defined(OS_WIN)
+#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_BSD)
       dict.Set("residentSet", osdump.resident_set_kb);
 #endif
       dict.Set("private", osdump.private_footprint_kb);
