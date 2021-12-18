--- chrome/browser/chrome_browser_interface_binders.cc.orig	2021-11-19 04:25:08 UTC
+++ chrome/browser/chrome_browser_interface_binders.cc
@@ -157,7 +157,7 @@
 #include "ui/webui/resources/js/browser_command/browser_command.mojom.h"
 #endif  // defined(OS_ANDROID)
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
 #include "chrome/browser/ui/webui/discards/discards.mojom.h"
 #include "chrome/browser/ui/webui/discards/discards_ui.h"
@@ -648,14 +648,14 @@ void PopulateChromeFrameBinders(
       base::BindRepeating(&BindSpeechRecognitionRecognizerClientHandler));
 #endif
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD)
   if (!render_frame_host->GetParent()) {
     map->Add<chrome::mojom::DraggableRegions>(
         base::BindRepeating(&DraggableRegionsHostImpl::CreateIfAllowed));
   }
 #endif
 
-#if defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_MAC) || \
+#if defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_MAC) || defined(OS_BSD) || \
     defined(OS_WIN)
   if (base::FeatureList::IsEnabled(blink::features::kDesktopPWAsSubApps) &&
       !render_frame_host->GetParent()) {
@@ -982,7 +982,7 @@ void PopulateChromeWebUIFrameBinders(
   }
 #endif
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
   RegisterWebUIControllerInterfaceBinder<discards::mojom::DetailsProvider,
                                          DiscardsUI>(map);
