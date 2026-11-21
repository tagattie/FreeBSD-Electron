--- src/renderer/components/SettingsModal/definition.tsx.orig	2026-11-05 06:34:20 UTC
+++ src/renderer/components/SettingsModal/definition.tsx
@@ -19,6 +19,7 @@ import UpdatesSetting from './components/UpdatesSettin
 import SessionAttributesSetting from './components/SessionAttributesSetting';
 import SpellCheckerSetting from './components/SpellCheckerSetting';
 import UpdatesSetting from './components/UpdatesSetting';
+import { windowsStore } from 'process';
 
 const getLanguages = async (func: () => Promise<string[]>) => {
     return (await func()).filter((language) => localeTranslations[language]).
@@ -49,7 +50,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'autostart',
                     component: CheckSetting,
-                    condition: window.process.platform === 'win32' || window.process.platform === 'linux',
+                    condition: window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd',
                     props: {
                         label: (
                             <FormattedMessage
@@ -68,7 +69,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'hideOnStart',
                     component: CheckSetting,
-                    condition: window.process.platform === 'win32' || window.process.platform === 'linux',
+                    condition: window.process.platform === 'win32' || window.process.platform === 'linux' || window.process.platform === 'freebsd',
                     props: {
                         label: (
                             <FormattedMessage
@@ -87,7 +88,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'showTrayIcon',
                     component: CheckSetting,
-                    condition: window.process.platform === 'darwin' || window.process.platform === 'linux',
+                    condition: window.process.platform === 'darwin' || window.process.platform === 'linux' || window.process.platform === 'freebsd',
                     props: {
                         label: (
                             <FormattedMessage
@@ -106,7 +107,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'trayIconTheme',
                     component: RadioSetting,
-                    condition: (window.process.platform === 'linux' || window.process.platform === 'win32') && (await window.desktop.getLocalConfiguration()).showTrayIcon,
+                    condition: (window.process.platform === 'linux' || window.process.platform === 'freebsd' || window.process.platform === 'win32') && (await window.desktop.getLocalConfiguration()).showTrayIcon,
                     props: {
                         label: (
                             <FormattedMessage
@@ -166,7 +167,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'minimizeToTray',
                     component: CheckSetting,
-                    condition: window.process.platform === 'linux' || window.process.platform === 'win32',
+                    condition: window.process.platform === 'linux' || window.process.platform === 'freebsd' || window.process.platform === 'win32',
                     props: {
                         label: (
                             <FormattedMessage
@@ -192,7 +193,7 @@ const definition: (intl: IntlShape) => Promise<Setting
                 {
                     id: 'startInFullscreen',
                     component: CheckSetting,
-                    condition: window.process.platform !== 'linux',
+                    condition: (window.process.platform !== 'linux' && window.process.platform !== 'freebsd'),
                     props: {
                         label: (
                             <FormattedMessage
