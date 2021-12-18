--- electron/shell/browser/api/electron_api_app.cc.orig	2021-12-03 01:46:05 UTC
+++ electron/shell/browser/api/electron_api_app.cc
@@ -702,7 +702,7 @@ void App::OnWillFinishLaunching() {
 }
 
 void App::OnFinishLaunching(const base::DictionaryValue& launch_info) {
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   // Set the application name for audio streams shown in external
   // applications. Only affects pulseaudio currently.
   media::AudioManager::SetGlobalAppName(Browser::Get()->GetName());
@@ -1027,7 +1027,7 @@ void App::SetPath(gin_helper::ErrorThrower thrower,
 }
 
 void App::SetDesktopName(const std::string& desktop_name) {
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   auto env = base::Environment::Create();
   env->SetVar("CHROME_DESKTOP", desktop_name);
 #endif
@@ -1395,7 +1395,7 @@ std::vector<gin_helper::Dictionary> App::GetAppMetrics
       pid_dict.Set("name", process_metric.second->name);
     }
 
-#if !defined(OS_LINUX)
+#if !defined(OS_LINUX) && !defined(OS_BSD)
     auto memory_info = process_metric.second->GetMemoryInfo();
 
     gin_helper::Dictionary memory_dict = gin::Dictionary::CreateEmpty(isolate);
@@ -1722,7 +1722,7 @@ gin::ObjectTemplateBuilder App::GetObjectTemplateBuild
       .SetMethod(
           "removeAsDefaultProtocolClient",
           base::BindRepeating(&Browser::RemoveAsDefaultProtocolClient, browser))
-#if !defined(OS_LINUX)
+#if !defined(OS_LINUX) && !defined(OS_BSD)
       .SetMethod(
           "getApplicationInfoForProtocol",
           base::BindRepeating(&Browser::GetApplicationInfoForProtocol, browser))
@@ -1779,7 +1779,7 @@ gin::ObjectTemplateBuilder App::GetObjectTemplateBuild
       .SetMethod("getJumpListSettings", &App::GetJumpListSettings)
       .SetMethod("setJumpList", &App::SetJumpList)
 #endif
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
       .SetMethod("isUnityRunning",
                  base::BindRepeating(&Browser::IsUnityRunning, browser))
 #endif
