--- base/test/test_suite.cc.orig	2021-12-14 11:44:55 UTC
+++ base/test/test_suite.cc
@@ -68,7 +68,7 @@
 #include "base/test/test_support_android.h"
 #endif
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #include "third_party/test_fonts/fontconfig_util_linux.h"
 #endif
 
@@ -220,7 +220,7 @@ class CheckForLeakedGlobals : public testing::EmptyTes
 };
 
 // base::Process is not available on iOS
-#if !defined(OS_IOS)
+#if !defined(OS_IOS) && !defined(OS_BSD)
 class CheckProcessPriority : public testing::EmptyTestEventListener {
  public:
   CheckProcessPriority() { CHECK(!IsProcessBackgrounded()); }
@@ -358,14 +358,14 @@ void TestSuite::PreInitialize() {
   testing::GTEST_FLAG(catch_exceptions) = false;
 #endif
   EnableTerminationOnHeapCorruption();
-#if (defined(OS_LINUX) || defined(OS_CHROMEOS)) && defined(USE_AURA)
+#if (defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)) && defined(USE_AURA)
   // When calling native char conversion functions (e.g wrctomb) we need to
   // have the locale set. In the absence of such a call the "C" locale is the
   // default. In the gtk code (below) gtk_init() implicitly sets a locale.
   setlocale(LC_ALL, "");
   // We still need number to string conversions to be locale insensitive.
   setlocale(LC_NUMERIC, "C");
-#endif  // (defined(OS_LINUX) || defined(OS_CHROMEOS)) && defined(USE_AURA)
+#endif  // (defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)) && defined(USE_AURA)
 
   // On Android, AtExitManager is created in
   // testing/android/native_test_wrapper.cc before main() is called.
@@ -615,7 +615,7 @@ void TestSuite::Initialize() {
   // TODO(jshin): Should we set the locale via an OS X locale API here?
   i18n::SetICUDefaultLocale("en_US");
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   test_fonts::SetUpFontconfig();
 #endif
 
@@ -628,7 +628,7 @@ void TestSuite::Initialize() {
   if (check_for_leaked_globals_)
     listeners.Append(new CheckForLeakedGlobals);
   if (check_for_thread_and_process_priority_) {
-#if !defined(OS_IOS)
+#if !defined(OS_IOS) && !defined(OS_BSD)
     listeners.Append(new CheckProcessPriority);
 #endif
   }
