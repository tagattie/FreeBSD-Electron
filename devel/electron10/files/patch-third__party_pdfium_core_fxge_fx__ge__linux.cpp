--- third_party/pdfium/core/fxge/fx_ge_linux.cpp.orig	2020-09-21 18:42:18 UTC
+++ third_party/pdfium/core/fxge/fx_ge_linux.cpp
@@ -155,9 +155,8 @@ std::unique_ptr<SystemFontInfoIface> SystemFontInfoIfa
     const char** pUserPaths) {
   auto pInfo = std::make_unique<CFX_LinuxFontInfo>();
   if (!pInfo->ParseFontCfg(pUserPaths)) {
-    pInfo->AddPath("/usr/share/fonts");
-    pInfo->AddPath("/usr/share/X11/fonts/Type1");
-    pInfo->AddPath("/usr/share/X11/fonts/TTF");
+    pInfo->AddPath("/usr/local/share/fonts/Type1");
+    pInfo->AddPath("/usr/local/share/fonts/TTF");
     pInfo->AddPath("/usr/local/share/fonts");
   }
   return std::move(pInfo);
