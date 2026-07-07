--- src/ui/components/SettingsView/features/FlashFrame.tsx.orig	2026-07-02 22:53:28 UTC
+++ src/ui/components/SettingsView/features/FlashFrame.tsx
@@ -50,7 +50,7 @@ export const FlashFrame = (props: FlashFrameProps) => 
       onChange={handleChange}
       className={props.className}
     >
-      {process.platform === 'linux' && (
+      {(process.platform === 'linux' || process.platform === 'freebsd') && (
         <Callout
           title={t('settings.options.flashFrame.onLinux')}
           type='warning'
