--- app/src/lib/editors/linux.ts.orig	2023-04-07 17:53:27 UTC
+++ app/src/lib/editors/linux.ts
@@ -18,52 +18,52 @@ interface ILinuxExternalEditor {
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
     ],
   },
   {
     name: 'Visual Studio Code (Insiders)',
-    paths: ['/snap/bin/code-insiders', '/usr/bin/code-insiders'],
+    paths: ['/snap/bin/code-insiders', '%%LOCALBASE%%/bin/code-insiders'],
   },
   {
     name: 'VSCodium',
     paths: [
-      '/usr/bin/codium',
+      '%%LOCALBASE%%/bin/codium',
       '/var/lib/flatpak/app/com.vscodium.codium',
       '/usr/share/vscodium-bin/bin/codium',
     ],
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
@@ -78,16 +78,17 @@ const editors: ILinuxExternalEditor[] = [
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
     paths: [
       '/snap/bin/phpstorm',
+      '%%LOCALBASE%%/bin/phpstorm',
       '.local/share/JetBrains/Toolbox/scripts/phpstorm',
     ],
   },
@@ -95,17 +96,19 @@ const editors: ILinuxExternalEditor[] = [
     name: 'JetBrains WebStorm',
     paths: [
       '/snap/bin/webstorm',
+      '%%LOCALBASE%%/bin/webstorm',
       '.local/share/JetBrains/Toolbox/scripts/webstorm',
     ],
   },
   {
     name: 'IntelliJ IDEA',
-    paths: ['/snap/bin/idea', '.local/share/JetBrains/Toolbox/scripts/idea'],
+    paths: ['/snap/bin/idea', '%%LOCALBASE%%/bin/idea', '.local/share/JetBrains/Toolbox/scripts/idea'],
   },
   {
     name: 'JetBrains PyCharm',
     paths: [
       '/snap/bin/pycharm',
+      '%%LOCALBASE%%/bin/pycharm',
       '.local/share/JetBrains/Toolbox/scripts/pycharm',
     ],
   },
@@ -113,40 +116,41 @@ const editors: ILinuxExternalEditor[] = [
     name: 'Android Studio',
     paths: [
       '/snap/bin/studio',
+      '%%LOCALBASE%%/bin/studio',
       '.local/share/JetBrains/Toolbox/scripts/studio',
     ],
   },
   {
     name: 'Emacs',
-    paths: ['/snap/bin/emacs', '/usr/local/bin/emacs', '/usr/bin/emacs'],
+    paths: ['/snap/bin/emacs', '%%LOCALBASE%%/bin/emacs'],
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
     name: 'Geany',
-    paths: ['/usr/bin/geany'],
+    paths: ['%%LOCALBASE%%/bin/geany'],
   },
   {
     name: 'Mousepad',
-    paths: ['/usr/bin/mousepad'],
+    paths: ['%%LOCALBASE%%/bin/mousepad'],
   },
   {
     name: 'IntelliJ PhpStorm',
