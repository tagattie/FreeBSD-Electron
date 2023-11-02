--- app/src/lib/editors/linux.ts.orig	2023-10-08 17:33:18 UTC
+++ app/src/lib/editors/linux.ts
@@ -18,30 +18,30 @@ interface ILinuxExternalEditor {
 const editors: ILinuxExternalEditor[] = [
   {
     name: 'Atom',
-    paths: ['/snap/bin/atom', '/usr/bin/atom'],
+    paths: ['/snap/bin/atom', '%%LOCALBASE%%/bin/atom'],
   },
   {
     name: 'Neovim',
-    paths: ['/usr/bin/nvim'],
+    paths: ['%%LOCALBASE%%/bin/nvim'],
   },
   {
     name: 'Neovim-Qt',
-    paths: ['/usr/bin/nvim-qt'],
+    paths: ['%%LOCALBASE%%/bin/nvim-qt'],
   },
   {
     name: 'Neovide',
-    paths: ['/usr/bin/neovide'],
+    paths: ['%%LOCALBASE%%/bin/neovide'],
   },
   {
     name: 'gVim',
-    paths: ['/usr/bin/gvim'],
+    paths: ['%%LOCALBASE%%/bin/gvim'],
   },
   {
     name: 'Visual Studio Code',
     paths: [
       '/usr/share/code/bin/code',
       '/snap/bin/code',
-      '/usr/bin/code',
+      '%%LOCALBASE%%/bin/code-oss',
       '/mnt/c/Program Files/Microsoft VS Code/bin/code',
       '/var/lib/flatpak/app/com.visualstudio.code/current/active/export/bin/com.visualstudio.code',
       '.local/share/flatpak/app/com.visualstudio.code/current/active/export/bin/com.visualstudio.code',
@@ -71,11 +71,11 @@ const editors: ILinuxExternalEditor[] = [
   },
   {
     name: 'Sublime Text',
-    paths: ['/usr/bin/subl'],
+    paths: ['%%LOCALBASE%%/bin/subl'],
   },
   {
     name: 'Typora',
-    paths: ['/usr/bin/typora'],
+    paths: ['%%LOCALBASE%%/bin/typora'],
   },
   {
     name: 'SlickEdit',
@@ -90,11 +90,11 @@ const editors: ILinuxExternalEditor[] = [
     // Code editor for elementary OS
     // https://github.com/elementary/code
     name: 'Code',
-    paths: ['/usr/bin/io.elementary.code'],
+    paths: ['%%LOCALBASE%%/bin/io.elementary.code'],
   },
   {
     name: 'Lite XL',
-    paths: ['/usr/bin/lite-xl'],
+    paths: ['%%LOCALBASE%%/bin/lite-xl'],
   },
   {
     name: 'JetBrains PhpStorm',
@@ -130,31 +130,31 @@ const editors: ILinuxExternalEditor[] = [
   },
   {
     name: 'Emacs',
-    paths: ['/snap/bin/emacs', '/usr/local/bin/emacs', '/usr/bin/emacs'],
+    paths: ['/snap/bin/emacs', '%%LOCALBASE%%/bin/emacs', '/usr/bin/emacs'],
   },
   {
     name: 'Kate',
-    paths: ['/usr/bin/kate'],
+    paths: ['%%LOCALBASE%%/bin/kate'],
   },
   {
     name: 'GEdit',
-    paths: ['/usr/bin/gedit'],
+    paths: ['%%LOCALBASE%%/bin/gedit'],
   },
   {
     name: 'GNOME Text Editor',
-    paths: ['/usr/bin/gnome-text-editor'],
+    paths: ['%%LOCALBASE%%/bin/gnome-text-editor'],
   },
   {
     name: 'GNOME Builder',
-    paths: ['/usr/bin/gnome-builder'],
+    paths: ['%%LOCALBASE%%/bin/gnome-builder'],
   },
   {
     name: 'Notepadqq',
-    paths: ['/usr/bin/notepadqq'],
+    paths: ['%%LOCALBASE%%/bin/notepadqq'],
   },
   {
     name: 'Mousepad',
-    paths: ['/usr/bin/mousepad'],
+    paths: ['%%LOCALBASE%%/bin/mousepad'],
   },
 ]
 
