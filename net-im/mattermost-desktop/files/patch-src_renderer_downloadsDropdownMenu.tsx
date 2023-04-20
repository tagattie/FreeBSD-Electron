--- src/renderer/downloadsDropdownMenu.tsx.orig	2023-04-04 12:30:25 UTC
+++ src/renderer/downloadsDropdownMenu.tsx
@@ -38,7 +38,7 @@ const DownloadsDropdownMenu = () => {
                     id='renderer.downloadsDropdownMenu.ShowInFinder'
                     defaultMessage='Show in Finder'
                 />);
-        case 'linux':
+        case 'linux': case 'freebsd':
             return (
                 <FormattedMessage
                     id='renderer.downloadsDropdownMenu.ShowInFileManager'
