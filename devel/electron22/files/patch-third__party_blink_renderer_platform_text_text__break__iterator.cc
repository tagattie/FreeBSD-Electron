--- third_party/blink/renderer/platform/text/text_break_iterator.cc.orig	2023-11-20 22:32:05 UTC
+++ third_party/blink/renderer/platform/text/text_break_iterator.cc
@@ -161,7 +161,9 @@ static const unsigned char kAsciiLineBreakTable[][(kAs
 };
 // clang-format on
 
-#if U_ICU_VERSION_MAJOR_NUM >= 58
+#if U_ICU_VERSION_MAJOR_NUM >= 74
+#define BA_LB_COUNT (U_LB_COUNT - 8)
+#elif U_ICU_VERSION_MAJOR_NUM >= 58
 #define BA_LB_COUNT (U_LB_COUNT - 3)
 #else
 #define BA_LB_COUNT U_LB_COUNT
