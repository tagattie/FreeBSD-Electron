--- src/renderer/downloadsDropdownMenu.tsx.orig	2025-11-18 12:31:15 UTC
+++ src/renderer/downloadsDropdownMenu.tsx
@@ -39,7 +39,7 @@ const DownloadsDropdownMenu = () => {
                     id='renderer.downloadsDropdownMenu.ShowInFinder'
                     defaultMessage='Show in Finder'
                 />);
-        case 'linux':
+        case 'linux': case 'freebsd':
             return (
                 <FormattedMessage
                     id='renderer.downloadsDropdownMenu.ShowInFileManager'
