--- electron/shell/app/node_main.cc.orig	2020-06-18 16:52:13 UTC
+++ electron/shell/app/node_main.cc
@@ -42,7 +42,7 @@ bool AllowWasmCodeGenerationCallback(v8::Local<v8::Con
 
 namespace electron {
 
-#if !defined(OS_LINUX)
+#if !defined(OS_LINUX) && !defined(OS_BSD)
 void AddExtraParameter(const std::string& key, const std::string& value) {
   crash_reporter::CrashReporter::GetInstance()->AddExtraParameter(key, value);
 }
@@ -116,7 +116,7 @@ int NodeMain(int argc, char* argv[]) {
         gin::Dictionary::CreateEmpty(gin_env.isolate());
     reporter.SetMethod("start", &crash_reporter::CrashReporter::StartInstance);
 
-#if !defined(OS_LINUX)
+#if !defined(OS_LINUX) && !defined(OS_BSD)
     reporter.SetMethod("addExtraParameter", &AddExtraParameter);
     reporter.SetMethod("removeExtraParameter", &RemoveExtraParameter);
 #endif
