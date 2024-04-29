--- electron/shell/browser/api/electron_api_app.cc.orig	2024-04-16 14:29:17 UTC
+++ electron/shell/browser/api/electron_api_app.cc
@@ -592,7 +592,7 @@ void App::OnFinishLaunching(base::Value::Dict launch_i
 }
 
 void App::OnFinishLaunching(base::Value::Dict launch_info) {
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
   // Set the application name for audio streams shown in external
   // applications. Only affects pulseaudio currently.
   media::AudioManager::SetGlobalAppName(Browser::Get()->GetName());
@@ -923,7 +923,7 @@ void App::SetDesktopName(const std::string& desktop_na
 }
 
 void App::SetDesktopName(const std::string& desktop_name) {
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
   auto env = base::Environment::Create();
   env->SetVar("CHROME_DESKTOP", desktop_name);
 #endif
@@ -1306,7 +1306,7 @@ std::vector<gin_helper::Dictionary> App::GetAppMetrics
       pid_dict.Set("name", process_metric.second->name);
     }
 
-#if !BUILDFLAG(IS_LINUX)
+#if !BUILDFLAG(IS_LINUX) && !BUILDFLAG(IS_BSD)
     auto memory_info = process_metric.second->GetMemoryInfo();
 
     auto memory_dict = gin_helper::Dictionary::CreateEmpty(isolate);
@@ -1689,7 +1689,7 @@ gin::ObjectTemplateBuilder App::GetObjectTemplateBuild
       .SetMethod(
           "removeAsDefaultProtocolClient",
           base::BindRepeating(&Browser::RemoveAsDefaultProtocolClient, browser))
-#if !BUILDFLAG(IS_LINUX)
+#if !BUILDFLAG(IS_LINUX) && !BUILDFLAG(IS_BSD)
       .SetMethod(
           "getApplicationInfoForProtocol",
           base::BindRepeating(&Browser::GetApplicationInfoForProtocol, browser))
@@ -1747,7 +1747,7 @@ gin::ObjectTemplateBuilder App::GetObjectTemplateBuild
       .SetMethod("getJumpListSettings", &App::GetJumpListSettings)
       .SetMethod("setJumpList", &App::SetJumpList)
 #endif
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
       .SetMethod("isUnityRunning",
                  base::BindRepeating(&Browser::IsUnityRunning, browser))
 #endif
