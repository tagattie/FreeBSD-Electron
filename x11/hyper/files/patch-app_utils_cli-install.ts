--- app/utils/cli-install.ts.orig	2026-05-29 05:26:48 UTC
+++ app/utils/cli-install.ts
@@ -145,7 +145,7 @@ export const installCLI = async (withNotification: boo
     } catch (err) {
       logNotify(withNotification, 'Hyper CLI installation failed', `Failed to add Hyper CLI path to user PATH ${err}`);
     }
-  } else if (process.platform === 'darwin' || process.platform === 'linux') {
+  } else if (process.platform === 'darwin' || process.platform === 'linux' || process.platform === 'freebsd') {
     // AppImages are mounted on run at a temporary path, don't create symlink
     if (process.env['APPIMAGE']) {
       console.log('Skipping CLI symlink creation as it is an AppImage install');
