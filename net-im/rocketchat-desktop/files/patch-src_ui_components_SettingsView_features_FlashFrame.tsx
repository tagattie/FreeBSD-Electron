--- src/ui/components/SettingsView/features/FlashFrame.tsx.orig	2022-01-02 03:56:37 UTC
+++ src/ui/components/SettingsView/features/FlashFrame.tsx
@@ -36,7 +36,7 @@ export const FlashFrame: FC<Props> = (props) => {
           {t('settings.options.flashFrame.title')}
         </Field.Label>
       </Field.Row>
-      {process.platform === 'linux' && (
+      {(process.platform === 'linux' || process.platform === 'freebsd') && (
         <Callout
           title={t('settings.options.flashFrame.onLinux')}
           type='warning'
