--- src/ui/reducers/isTrayIconEnabled.ts.orig	2023-01-11 00:40:36 UTC
+++ src/ui/reducers/isTrayIconEnabled.ts
@@ -13,7 +13,7 @@ type IsTrayIconEnabledAction =
   | ActionOf<typeof APP_SETTINGS_LOADED>;
 
 export const isTrayIconEnabled: Reducer<boolean, IsTrayIconEnabledAction> = (
-  state = process.platform !== 'linux',
+  state = (process.platform !== 'linux' && process.platform !== 'freebsd'),
   action
 ) => {
   switch (action.type) {
