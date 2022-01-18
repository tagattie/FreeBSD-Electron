--- chrome/browser/chrome_browser_interface_binders.cc.orig	2021-12-14 11:44:57 UTC
+++ chrome/browser/chrome_browser_interface_binders.cc
@@ -94,7 +94,7 @@
 #include "chrome/browser/ui/webui/reset_password/reset_password_ui.h"
 #endif  // BUILDFLAG(FULL_SAFE_BROWSING)
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     BUILDFLAG(IS_CHROMEOS_ASH)
 #include "chrome/browser/ui/webui/connectors_internals/connectors_internals.mojom.h"
 #include "chrome/browser/ui/webui/connectors_internals/connectors_internals_ui.h"
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
@@ -690,7 +690,7 @@ void PopulateChromeWebUIFrameBinders(
   RegisterWebUIControllerInterfaceBinder<federated_learning::mojom::PageHandler,
                                          FlocInternalsUI>(map);
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     BUILDFLAG(IS_CHROMEOS_ASH)
   RegisterWebUIControllerInterfaceBinder<
       connectors_internals::mojom::PageHandler,
@@ -982,7 +982,7 @@ void PopulateChromeWebUIFrameBinders(
   }
 #endif
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
   RegisterWebUIControllerInterfaceBinder<discards::mojom::DetailsProvider,
                                          DiscardsUI>(map);
