--- ui/base/ui_base_features.cc.orig	2019-04-08 08:33:23 UTC
+++ ui/base/ui_base_features.cc
@@ -111,7 +111,7 @@ const base::Feature kEnableAutomaticUiAdjustmentsForTo
     "EnableAutomaticUiAdjustmentsForTouch", base::FEATURE_ENABLED_BY_DEFAULT};
 #endif  // defined(OS_WIN) || defined(OS_CHROMEOS)
 
-#if defined(OS_WIN) || defined(OS_MACOSX) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_MACOSX) || defined(OS_LINUX) || defined(OS_BSD)
 // Enables stylus appearing as touch when in contact with digitizer.
 const base::Feature kDirectManipulationStylus = {
     "DirectManipulationStylus",
@@ -121,7 +121,7 @@ const base::Feature kDirectManipulationStylus = {
     base::FEATURE_DISABLED_BY_DEFAULT
 #endif
 };
-#endif  // defined(OS_WIN) || defined(OS_MACOSX) || defined(OS_LINUX)
+#endif  // defined(OS_WIN) || defined(OS_MACOSX) || defined(OS_LINUX) || defined(OS_BSD)
 
 const base::Feature kMash = {"Mash", base::FEATURE_DISABLED_BY_DEFAULT};
 
