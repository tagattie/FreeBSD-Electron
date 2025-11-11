--- app/utils/cli-install.ts.orig	2025-08-31 08:00:06 UTC
+++ app/utils/cli-install.ts
@@ -141,7 +141,7 @@ export const installCLI = async (withNotification: boo
     } catch (err) {
       logNotify(withNotification, 'Hyper CLI installation failed', `Failed to add Hyper CLI path to user PATH ${err}`);
     }
-  } else if (process.platform === 'darwin' || process.platform === 'linux') {
+  } else if (process.platform === 'darwin' || process.platform === 'linux' || process.platform === 'freebsd') {
     // AppImages are mounted on run at a temporary path, don't create symlink
     if (process.env['APPIMAGE']) {
       console.log('Skipping CLI symlink creation as it is an AppImage install');
