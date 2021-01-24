--- ui/views/style/platform_style.cc.orig	2020-09-21 18:40:09 UTC
+++ ui/views/style/platform_style.cc
@@ -74,7 +74,7 @@ gfx::Range PlatformStyle::RangeToDeleteBackwards(const
 
 #endif  // OS_MACOSX
 
-#if !BUILDFLAG(ENABLE_DESKTOP_AURA) || !defined(OS_LINUX)
+#if !BUILDFLAG(ENABLE_DESKTOP_AURA) || (!defined(OS_LINUX) && !defined(OS_BSD))
 // static
 std::unique_ptr<Border> PlatformStyle::CreateThemedLabelButtonBorder(
     LabelButton* button) {
