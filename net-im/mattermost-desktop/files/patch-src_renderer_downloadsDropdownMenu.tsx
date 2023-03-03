--- src/renderer/downloadsDropdownMenu.tsx.orig	2023-03-03 01:52:42 UTC
+++ src/renderer/downloadsDropdownMenu.tsx
@@ -53,7 +53,7 @@ const DownloadsDropdownMenu = () => {
                     id='renderer.downloadsDropdownMenu.ShowInFinder'
                     defaultMessage='Show in Finder'
                 />);
-        case 'linux':
+        case 'linux': case 'freebsd':
             return (
                 <FormattedMessage
                     id='renderer.downloadsDropdownMenu.ShowInFileManager'
