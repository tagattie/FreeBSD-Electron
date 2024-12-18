--- app/src/lib/shells/linux.ts.orig	2024-11-11 20:50:12 UTC
+++ app/src/lib/shells/linux.ts
@@ -43,39 +43,39 @@ function getShellPath(shell: Shell): Promise<string | 
 function getShellPath(shell: Shell): Promise<string | null> {
   switch (shell) {
     case Shell.Gnome:
-      return getPathIfAvailable('/usr/bin/gnome-terminal')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/gnome-terminal')
     case Shell.GnomeConsole:
-      return getPathIfAvailable('/usr/bin/kgx')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/kgx')
     case Shell.Mate:
-      return getPathIfAvailable('/usr/bin/mate-terminal')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/mate-terminal')
     case Shell.Tilix:
-      return getPathIfAvailable('/usr/bin/tilix')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/tilix')
     case Shell.Terminator:
-      return getPathIfAvailable('/usr/bin/terminator')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/terminator')
     case Shell.Urxvt:
-      return getPathIfAvailable('/usr/bin/urxvt')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/urxvt')
     case Shell.Konsole:
-      return getPathIfAvailable('/usr/bin/konsole')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/konsole')
     case Shell.Xterm:
-      return getPathIfAvailable('/usr/bin/xterm')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/xterm')
     case Shell.Terminology:
-      return getPathIfAvailable('/usr/bin/terminology')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/terminology')
     case Shell.Deepin:
-      return getPathIfAvailable('/usr/bin/deepin-terminal')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/deepin-terminal')
     case Shell.Elementary:
-      return getPathIfAvailable('/usr/bin/io.elementary.terminal')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/io.elementary.terminal')
     case Shell.XFCE:
-      return getPathIfAvailable('/usr/bin/xfce4-terminal')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/xfce4-terminal')
     case Shell.Alacritty:
-      return getPathIfAvailable('/usr/bin/alacritty')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/alacritty')
     case Shell.Kitty:
-      return getPathIfAvailable('/usr/bin/kitty')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/kitty')
     case Shell.LXTerminal:
-      return getPathIfAvailable('/usr/bin/lxterminal')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/lxterminal')
     case Shell.Warp:
-      return getPathIfAvailable('/usr/bin/warp-terminal')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/warp-terminal')
     case Shell.BlackBox:
-      return getPathIfAvailable('/usr/bin/blackbox-terminal')
+      return getPathIfAvailable('%%LOCALBASE%%/bin/blackbox-terminal')
     default:
       return assertNever(shell, `Unknown shell: ${shell}`)
   }
