--- chrome/browser/pdf/pdf_extension_test.cc.orig	2021-09-14 01:51:50 UTC
+++ chrome/browser/pdf/pdf_extension_test.cc
@@ -737,11 +737,11 @@ IN_PROC_BROWSER_TEST_F(PDFPluginDisabledTest, DirectNa
 }
 
 // TODO(crbug.com/1201401): fix flakiness and reenable
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #define MAYBE_EmbedPdfPlaceholderWithCSP DISABLED_EmbedPdfPlaceholderWithCSP
 #else
 #define MAYBE_EmbedPdfPlaceholderWithCSP EmbedPdfPlaceholderWithCSP
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 IN_PROC_BROWSER_TEST_F(PDFPluginDisabledTest,
                        MAYBE_EmbedPdfPlaceholderWithCSP) {
   // Navigate to a page with CSP that uses <embed> to embed a PDF as a plugin.
@@ -2268,7 +2268,7 @@ IN_PROC_BROWSER_TEST_F(PDFExtensionClipboardTest,
 }
 
 // Flaky on Linux (https://crbug.com/1121446)
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 #define MAYBE_CombinedShiftArrowPresses DISABLED_CombinedShiftArrowPresses
 #else
 #define MAYBE_CombinedShiftArrowPresses CombinedShiftArrowPresses
