--- src/ui/components/SettingsView/features/FlashFrame.tsx.orig	2023-11-14 12:42:09 UTC
+++ src/ui/components/SettingsView/features/FlashFrame.tsx
@@ -46,7 +46,7 @@ export const FlashFrame: FC<Props> = (props) => {
             : t('settings.options.flashFrame.titleDarwin')}
         </FieldLabel>
       </FieldRow>
-      {process.platform === 'linux' && (
+      {(process.platform === 'linux' || process.platform === 'freebsd') && (
         <Callout
           title={t('settings.options.flashFrame.onLinux')}
           type='warning'
