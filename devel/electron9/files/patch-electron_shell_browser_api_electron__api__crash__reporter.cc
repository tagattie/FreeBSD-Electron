--- electron/shell/browser/api/electron_api_crash_reporter.cc.orig	2020-05-28 04:54:52 UTC
+++ electron/shell/browser/api/electron_api_crash_reporter.cc
@@ -80,7 +80,7 @@ void Start(const std::string& submit_url,
            const std::map<std::string, std::string>& global_extra,
            const std::map<std::string, std::string>& extra,
            bool is_node_process) {
-#if !defined(MAS_BUILD)
+#if !defined(MAS_BUILD) && !defined(OS_BSD)
   if (g_crash_reporter_initialized)
     return;
   g_crash_reporter_initialized = true;
@@ -176,13 +176,13 @@ v8::Local<v8::Value> GetUploadedReports(v8::Isolate* i
 #endif
 
 void SetUploadToServer(bool upload) {
-#if !defined(MAS_BUILD)
+#if !defined(MAS_BUILD) && !defined(OS_BSD)
   ElectronCrashReporterClient::Get()->SetCollectStatsConsent(upload);
 #endif
 }
 
 bool GetUploadToServer() {
-#if defined(MAS_BUILD)
+#if defined(MAS_BUILD) || defined(OS_BSD)
   return false;
 #else
   return ElectronCrashReporterClient::Get()->GetCollectStatsConsent();
