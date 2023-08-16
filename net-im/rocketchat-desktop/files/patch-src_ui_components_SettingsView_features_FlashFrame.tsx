--- src/ui/components/SettingsView/features/FlashFrame.tsx.orig	2023-08-03 19:04:03 UTC
+++ src/ui/components/SettingsView/features/FlashFrame.tsx
@@ -39,7 +39,7 @@ export const FlashFrame: FC<Props> = (props) => {
             : t('settings.options.flashFrame.titleDarwin')}
         </Field.Label>
       </Field.Row>
-      {process.platform === 'linux' && (
+      {(process.platform === 'linux' || process.platform === 'freebsd') && (
         <Callout
           title={t('settings.options.flashFrame.onLinux')}
           type='warning'
