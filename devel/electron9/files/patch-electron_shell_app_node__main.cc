--- electron/shell/app/node_main.cc.orig	2020-05-18 21:17:08 UTC
+++ electron/shell/app/node_main.cc
@@ -83,7 +83,7 @@ void CrashReporterStart(gin_helper::Dictionary options
 
 v8::Local<v8::Value> GetParameters(v8::Isolate* isolate) {
   std::map<std::string, std::string> keys;
-#if !defined(MAS_BUILD)
+#if !defined(MAS_BUILD) && !defined(OS_BSD)
   electron::crash_keys::GetCrashKeys(&keys);
 #endif
   return gin::ConvertToV8(isolate, keys);
@@ -96,7 +96,7 @@ int NodeMain(int argc, char* argv[]) {
   v8_crashpad_support::SetUp();
 #endif
 
-#if !defined(MAS_BUILD)
+#if !defined(MAS_BUILD) && !defined(OS_BSD)
   ElectronCrashReporterClient::Create();
 #endif
 
@@ -104,7 +104,7 @@ int NodeMain(int argc, char* argv[]) {
   crash_reporter::InitializeCrashpad(false, "node");
 #endif
 
-#if !defined(MAS_BUILD)
+#if !defined(MAS_BUILD) && !defined(OS_BSD)
   crash_keys::SetCrashKeysFromCommandLine(
       *base::CommandLine::ForCurrentProcess());
   crash_keys::SetPlatformCrashKey();
