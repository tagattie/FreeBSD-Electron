--- src/ui/components/SettingsView/features/FlashFrame.tsx.orig	2024-01-30 23:48:22 UTC
+++ src/ui/components/SettingsView/features/FlashFrame.tsx
@@ -53,7 +53,7 @@ export const FlashFrame = (props: FlashFrameProps) => 
           onChange={handleChange}
         />
       </FieldRow>
-      {process.platform === 'linux' && (
+      {(process.platform === 'linux' || process.platform === 'freebsd') && (
         <Callout
           title={t('settings.options.flashFrame.onLinux')}
           type='warning'
