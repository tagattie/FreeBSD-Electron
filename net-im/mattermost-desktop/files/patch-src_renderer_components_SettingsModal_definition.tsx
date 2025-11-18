--- src/renderer/components/SettingsModal/definition.tsx.orig	2025-11-18 12:31:15 UTC
+++ src/renderer/components/SettingsModal/definition.tsx
@@ -18,6 +18,7 @@ import UpdatesSetting from './components/UpdatesSettin
 import ServerSetting from './components/ServerSetting';
 import SpellCheckerSetting from './components/SpellCheckerSetting';
 import UpdatesSetting from './components/UpdatesSetting';
+import { windowsStore } from 'process';
 
 const getLanguages = async (func: () => Promise<string[]>) => {
     return (await func()).filter((language) => localeTranslations[language]).
@@ -48,7 +49,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'autostart',
                     component: CheckSetting,
-                    condition: window.process.platform === 'win32' || window.process.platform === 'linux',
+                    condition: window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd',
                     props: {
                         label: (
                             <FormattedMessage
@@ -67,7 +68,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'hideOnStart',
                     component: CheckSetting,
-                    condition: window.process.platform === 'win32' || window.process.platform === 'linux',
+                    condition: window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd',
                     props: {
                         label: (
                             <FormattedMessage
@@ -86,7 +87,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'showTrayIcon',
                     component: CheckSetting,
-                    condition: window.process.platform === 'darwin' || window.process.platform === 'linux',
+                    condition: window.process.platform === 'darwin' || window.process.platform === 'linux' || window.process.platform === 'freebsd',
                     props: {
                         label: (
                             <FormattedMessage
@@ -105,7 +106,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'trayIconTheme',
                     component: RadioSetting,
-                    condition: (window.process.platform === 'linux' || window.process.platform === 'win32') && (await window.desktop.getLocalConfiguration()).showTrayIcon,
+                    condition: (window.process.platform === 'linux' || window.process.platform === 'freebsd' || window.process.platform === 'win32') && (await window.desktop.getLocalConfiguration()).showTrayIcon,
                     props: {
                         label: (
                             <FormattedMessage
@@ -165,7 +166,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'minimizeToTray',
                     component: CheckSetting,
-                    condition: window.process.platform === 'linux' || window.process.platform === 'win32',
+                    condition: window.process.platform === 'linux' || window.process.platform === 'freebsd' || window.process.platform === 'win32',
                     props: {
                         label: (
                             <FormattedMessage
@@ -191,7 +192,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'startInFullscreen',
                     component: CheckSetting,
-                    condition: window.process.platform !== 'linux',
+                    condition: (window.process.platform !== 'linux' && window.process.platform !== 'freebsd'),
                     props: {
                         label: (
                             <FormattedMessage
