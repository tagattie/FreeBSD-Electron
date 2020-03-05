--- chrome/browser/policy/browser_signin_policy_handler.cc.orig	2020-03-03 07:02:30 UTC
+++ chrome/browser/policy/browser_signin_policy_handler.cc
@@ -39,7 +39,7 @@ void BrowserSigninPolicyHandler::ApplyPolicySettings(c
     }
     switch (static_cast<BrowserSigninMode>(int_value)) {
       case BrowserSigninMode::kForced:
-#if !defined(OS_LINUX)
+#if !defined(OS_LINUX) && !defined(OS_BSD)
         prefs->SetValue(prefs::kForceBrowserSignin, base::Value(true));
 #endif
         FALLTHROUGH;
