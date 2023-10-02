--- electron/shell/browser/api/electron_api_app.cc.orig	2023-09-28 10:31:06 UTC
+++ electron/shell/browser/api/electron_api_app.cc
@@ -698,7 +698,7 @@ void App::OnWillFinishLaunching() {
 }
 
 void App::OnFinishLaunching(base::Value::Dict launch_info) {
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
   // Set the application name for audio streams shown in external
   // applications. Only affects pulseaudio currently.
   media::AudioManager::SetGlobalAppName(Browser::Get()->GetName());
@@ -1032,7 +1032,7 @@ void App::SetPath(gin_helper::ErrorThrower thrower,
 }
 
 void App::SetDesktopName(const std::string& desktop_name) {
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
   auto env = base::Environment::Create();
   env->SetVar("CHROME_DESKTOP", desktop_name);
 #endif
@@ -1421,7 +1421,7 @@ std::vector<gin_helper::Dictionary> App::GetAppMetrics
       pid_dict.Set("name", process_metric.second->name);
     }
 
-#if !BUILDFLAG(IS_LINUX)
+#if !BUILDFLAG(IS_LINUX) && !BUILDFLAG(IS_BSD)
     auto memory_info = process_metric.second->GetMemoryInfo();
 
     gin_helper::Dictionary memory_dict = gin::Dictionary::CreateEmpty(isolate);
@@ -1713,7 +1713,7 @@ gin::ObjectTemplateBuilder App::GetObjectTemplateBuild
       .SetMethod(
           "removeAsDefaultProtocolClient",
           base::BindRepeating(&Browser::RemoveAsDefaultProtocolClient, browser))
-#if !BUILDFLAG(IS_LINUX)
+#if !BUILDFLAG(IS_LINUX) && !BUILDFLAG(IS_BSD)
       .SetMethod(
           "getApplicationInfoForProtocol",
           base::BindRepeating(&Browser::GetApplicationInfoForProtocol, browser))
@@ -1771,7 +1771,7 @@ gin::ObjectTemplateBuilder App::GetObjectTemplateBuild
       .SetMethod("getJumpListSettings", &App::GetJumpListSettings)
       .SetMethod("setJumpList", &App::SetJumpList)
 #endif
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
       .SetMethod("isUnityRunning",
                  base::BindRepeating(&Browser::IsUnityRunning, browser))
 #endif
