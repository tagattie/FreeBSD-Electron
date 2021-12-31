--- app/utils/cli-install.ts.orig	2021-12-30 13:30:19 UTC
+++ app/utils/cli-install.ts
@@ -138,7 +138,7 @@ export const installCLI = async (withNotification: boo
     } catch (err) {
       logNotify(withNotification, 'Hyper CLI installation failed', `Failed to add Hyper CLI path to user PATH ${err}`);
     }
-  } else if (process.platform === 'darwin' || process.platform === 'linux') {
+  } else if (process.platform === 'darwin' || process.platform === 'linux' || process.platform === 'freebsd') {
     // AppImages are mounted on run at a temporary path, don't create symlink
     if (process.env['APPIMAGE']) {
       console.log('Skipping CLI symlink creation as it is an AppImage install');
