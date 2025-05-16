--- src/renderer/components/SettingsModal/components/NotificationSetting.tsx.orig	2025-05-16 07:08:27 UTC
+++ src/renderer/components/SettingsModal/components/NotificationSetting.tsx
@@ -81,7 +81,7 @@ export default function NotificationSetting({
                         id='renderer.components.settingsPage.flashWindow.description'
                         defaultMessage='If enabled, the taskbar icon will flash for a few seconds when a new message is received.'
                     />
-                    {window.process.platform === 'linux' &&
+                    {(window.process.platform === 'linux' || window.process.platform === 'freebsd') &&
                     <>
                         <br/>
                         <em>
