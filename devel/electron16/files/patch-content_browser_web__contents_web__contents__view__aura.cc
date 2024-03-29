--- content/browser/web_contents/web_contents_view_aura.cc.orig	2021-12-18 06:49:11 UTC
+++ content/browser/web_contents/web_contents_view_aura.cc
@@ -158,7 +158,7 @@ class WebDragSourceAura : public content::WebContentsO
   DISALLOW_COPY_AND_ASSIGN(WebDragSourceAura);
 };
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_WIN)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_WIN) || defined(OS_BSD)
 // Fill out the OSExchangeData with a file contents, synthesizing a name if
 // necessary.
 void PrepareDragForFileContents(const DropData& drop_data,
@@ -241,7 +241,7 @@ void PrepareDragData(const DropData& drop_data,
   if (!drop_data.download_metadata.empty())
     PrepareDragForDownload(drop_data, provider, web_contents);
 #endif
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_WIN)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_WIN) || defined(OS_BSD)
   // We set the file contents before the URL because the URL also sets file
   // contents (to a .URL shortcut).  We want to prefer file content data over
   // a shortcut so we add it first.
@@ -1229,7 +1229,7 @@ void WebContentsViewAura::OnMouseEvent(ui::MouseEvent*
     // Linux window managers like to handle raise-on-click themselves.  If we
     // raise-on-click manually, this may override user settings that prevent
     // focus-stealing.
-#if !defined(OS_LINUX) && !defined(OS_CHROMEOS)
+#if !defined(OS_LINUX) && !defined(OS_CHROMEOS) && !defined(OS_BSD)
     // It is possible for the web-contents to be destroyed while it is being
     // activated. Use a weak-ptr to track whether that happened or not.
     // More in https://crbug.com/1040725
