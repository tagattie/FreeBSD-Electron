--- src/ui/components/SettingsView/features/FlashFrame.tsx.orig	2023-12-01 20:28:07 UTC
+++ src/ui/components/SettingsView/features/FlashFrame.tsx
@@ -47,7 +47,7 @@ export const FlashFrame: FC<Props> = (props) => {
             : t('settings.options.flashFrame.titleDarwin')}
         </FieldLabel>
       </FieldRow>
-      {process.platform === 'linux' && (
+      {(process.platform === 'linux' || process.platform === 'freebsd') && (
         <Callout
           title={t('settings.options.flashFrame.onLinux')}
           type='warning'
