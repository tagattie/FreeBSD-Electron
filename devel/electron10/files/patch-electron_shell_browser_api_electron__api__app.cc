--- electron/shell/browser/api/electron_api_app.cc.orig	2021-01-14 16:50:03 UTC
+++ electron/shell/browser/api/electron_api_app.cc
@@ -613,7 +613,7 @@ void App::OnWillFinishLaunching() {
 }
 
 void App::OnFinishLaunching(const base::DictionaryValue& launch_info) {
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Set the application name for audio streams shown in external
   // applications. Only affects pulseaudio currently.
   media::AudioManager::SetGlobalAppName(Browser::Get()->GetName());
@@ -933,7 +933,7 @@ void App::SetPath(gin_helper::ErrorThrower thrower,
 }
 
 void App::SetDesktopName(const std::string& desktop_name) {
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   std::unique_ptr<base::Environment> env(base::Environment::Create());
   env->SetVar("CHROME_DESKTOP", desktop_name);
 #endif
@@ -1276,7 +1276,7 @@ std::vector<gin_helper::Dictionary> App::GetAppMetrics
     pid_dict.Set("creationTime",
                  process_metric.second->process.CreationTime().ToJsTime());
 
-#if !defined(OS_LINUX)
+#if !defined(OS_LINUX) && !defined(OS_BSD)
     auto memory_info = process_metric.second->GetMemoryInfo();
 
     gin_helper::Dictionary memory_dict = gin::Dictionary::CreateEmpty(isolate);
@@ -1543,7 +1543,7 @@ void App::BuildPrototype(v8::Isolate* isolate,
       .SetMethod("getJumpListSettings", &App::GetJumpListSettings)
       .SetMethod("setJumpList", &App::SetJumpList)
 #endif
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
       .SetMethod("isUnityRunning",
                  base::BindRepeating(&Browser::IsUnityRunning, browser))
 #endif
