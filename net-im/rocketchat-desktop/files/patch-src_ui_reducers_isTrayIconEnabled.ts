--- src/ui/reducers/isTrayIconEnabled.ts.orig	2022-01-02 03:58:25 UTC
+++ src/ui/reducers/isTrayIconEnabled.ts
@@ -9,7 +9,7 @@ type IsTrayIconEnabledAction =
   | ActionOf<typeof APP_SETTINGS_LOADED>;
 
 export const isTrayIconEnabled: Reducer<boolean, IsTrayIconEnabledAction> = (
-  state = process.platform !== 'linux',
+  state = (process.platform !== 'linux' && process.platform !== 'freebsd'),
   action
 ) => {
   switch (action.type) {
