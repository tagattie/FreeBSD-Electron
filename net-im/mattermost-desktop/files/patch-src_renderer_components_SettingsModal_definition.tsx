--- src/renderer/components/SettingsModal/definition.tsx.orig	2025-05-16 07:09:20 UTC
+++ src/renderer/components/SettingsModal/definition.tsx
@@ -17,6 +17,7 @@ import UpdatesSetting from './components/UpdatesSettin
 import ServerSetting from './components/ServerSetting';
 import SpellCheckerSetting from './components/SpellCheckerSetting';
 import UpdatesSetting from './components/UpdatesSetting';
+import { windowsStore } from 'process';
 
 const getLanguages = async (func: () => Promise<string[]>) => {
     return (await func()).filter((language) => localeTranslations[language]).
@@ -47,7 +48,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'autostart',
                     component: CheckSetting,
-                    condition: window.process.platform === 'win32' || window.process.platform === 'linux',
+                    condition: window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd',
                     props: {
                         label: (
                             <FormattedMessage
@@ -66,7 +67,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'hideOnStart',
                     component: CheckSetting,
-                    condition: window.process.platform === 'win32' || window.process.platform === 'linux',
+                    condition: window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd',
                     props: {
                         label: (
                             <FormattedMessage
@@ -85,7 +86,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'showTrayIcon',
                     component: CheckSetting,
-                    condition: window.process.platform === 'darwin' || window.process.platform === 'linux',
+                    condition: window.process.platform === 'darwin' || window.process.platform === 'linux' || window.process.platform === 'freebsd',
                     props: {
                         label: (
                             <FormattedMessage
@@ -104,7 +105,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'trayIconTheme',
                     component: RadioSetting,
-                    condition: (window.process.platform === 'linux' || window.process.platform === 'win32') && (await window.desktop.getLocalConfiguration()).showTrayIcon,
+                    condition: (window.process.platform === 'linux' || window.process.platform === 'freebsd' || window.process.platform === 'win32') && (await window.desktop.getLocalConfiguration()).showTrayIcon,
                     props: {
                         label: (
                             <FormattedMessage
@@ -146,7 +147,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'minimizeToTray',
                     component: CheckSetting,
-                    condition: window.process.platform === 'linux' || window.process.platform === 'win32',
+                    condition: window.process.platform === 'linux' || window.process.platform === 'freebsd' || window.process.platform === 'win32',
                     props: {
                         label: (
                             <FormattedMessage
@@ -172,7 +173,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'startInFullscreen',
                     component: CheckSetting,
-                    condition: window.process.platform !== 'linux',
+                    condition: (window.process.platform !== 'linux' && window.process.platform !== 'freebsd'),
                     props: {
                         label: (
                             <FormattedMessage
