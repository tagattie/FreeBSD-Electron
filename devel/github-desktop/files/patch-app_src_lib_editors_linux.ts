--- app/src/lib/editors/linux.ts.orig	2023-12-20 15:09:37 UTC
+++ app/src/lib/editors/linux.ts
@@ -18,30 +18,30 @@ const editors: ILinuxExternalEditor[] = [
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
@@ -90,15 +90,16 @@ const editors: ILinuxExternalEditor[] = [
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
+      '%%LOCALBASE%%/bin/phpstorm',
       '/snap/bin/phpstorm',
       '.local/share/JetBrains/Toolbox/scripts/phpstorm',
     ],
@@ -106,17 +107,19 @@ const editors: ILinuxExternalEditor[] = [
   {
     name: 'JetBrains WebStorm',
     paths: [
+      '%%LOCALBASE%%/bin/webstorm',
       '/snap/bin/webstorm',
       '.local/share/JetBrains/Toolbox/scripts/webstorm',
     ],
   },
   {
     name: 'IntelliJ IDEA',
-    paths: ['/snap/bin/idea', '.local/share/JetBrains/Toolbox/scripts/idea'],
+    paths: ['%%LOCALBASE%%/bin/idea', '/snap/bin/idea', '.local/share/JetBrains/Toolbox/scripts/idea'],
   },
   {
     name: 'IntelliJ IDEA Ultimate Edition',
     paths: [
+      '%%LOCALBASE%%/bin/intellij-idea-ultimate',
       '/snap/bin/intellij-idea-ultimate',
       '.local/share/JetBrains/Toolbox/scripts/intellij-idea-ultimate',
     ],
@@ -124,6 +127,7 @@ const editors: ILinuxExternalEditor[] = [
   {
     name: 'IntelliJ Goland',
     paths: [
+      '%%LOCALBASE%%/bin/goland',
       '/snap/bin/goland',
       '.local/share/JetBrains/Toolbox/scripts/goland',
     ],
@@ -131,6 +135,7 @@ const editors: ILinuxExternalEditor[] = [
   {
     name: 'JetBrains PyCharm',
     paths: [
+      '%%LOCALBASE%%/bin/pycharm',
       '/snap/bin/pycharm',
       '.local/share/JetBrains/Toolbox/scripts/pycharm',
     ],
@@ -144,35 +149,35 @@ const editors: ILinuxExternalEditor[] = [
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
   {
     name: 'Pulsar',
-    paths: ['/usr/bin/pulsar'],
+    paths: ['%%LOCALBASE%%/bin/pulsar'],
   },
 ]
 
