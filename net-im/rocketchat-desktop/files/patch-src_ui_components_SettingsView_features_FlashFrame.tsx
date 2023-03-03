--- src/ui/components/SettingsView/features/FlashFrame.tsx.orig	2023-01-11 00:40:36 UTC
+++ src/ui/components/SettingsView/features/FlashFrame.tsx
@@ -38,7 +38,7 @@ export const FlashFrame: FC<Props> = (props) => {
             : t('settings.options.flashFrame.titleDarwin')}
         </Field.Label>
       </Field.Row>
-      {process.platform === 'linux' && (
+      {(process.platform === 'linux' || process.platform === 'freebsd') && (
         <Callout
           title={t('settings.options.flashFrame.onLinux')}
           type='warning'
