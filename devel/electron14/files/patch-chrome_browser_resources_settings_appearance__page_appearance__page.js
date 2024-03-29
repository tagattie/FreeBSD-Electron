--- chrome/browser/resources/settings/appearance_page/appearance_page.js.orig	2021-09-14 01:51:51 UTC
+++ chrome/browser/resources/settings/appearance_page/appearance_page.js
@@ -153,7 +153,7 @@ class SettingsAppearancePageElement extends SettingsAp
             'prefs.autogenerated.theme.policy.color.controlledBy)',
       },
 
-      // <if expr="is_linux and not chromeos and not lacros">
+      // <if expr="is_posix and not chromeos and not lacros">
       /**
        * Whether to show the "Custom Chrome Frame" setting.
        * @private
@@ -177,7 +177,7 @@ class SettingsAppearancePageElement extends SettingsAp
       'themeChanged_(' +
           'prefs.extensions.theme.id.value, useSystemTheme_, isForcedTheme_)',
 
-      // <if expr="is_linux and not chromeos">
+      // <if expr="is_posix and not chromeos">
       // NOTE: this pref only exists on Linux.
       'useSystemThemePrefChanged_(prefs.extensions.theme.use_system.value)',
       // </if>
@@ -273,7 +273,7 @@ class SettingsAppearancePageElement extends SettingsAp
     this.appearanceBrowserProxy_.useDefaultTheme();
   }
 
-  // <if expr="is_linux and not chromeos">
+  // <if expr="is_posix and not chromeos">
   /**
    * @param {boolean} useSystemTheme
    * @private
@@ -356,10 +356,10 @@ class SettingsAppearancePageElement extends SettingsAp
     }
 
     let i18nId;
-    // <if expr="is_linux and not chromeos and not lacros">
+    // <if expr="is_posix and not chromeos and not lacros">
     i18nId = useSystemTheme ? 'systemTheme' : 'classicTheme';
     // </if>
-    // <if expr="not is_linux or chromeos or lacros">
+    // <if expr="not is_posix or chromeos or lacros">
     i18nId = 'chooseFromWebStore';
     // </if>
     this.themeSublabel_ = this.i18n(i18nId);
