--- chrome/browser/ui/signin/dice_web_signin_interceptor_delegate.cc.orig	2021-11-19 04:25:10 UTC
+++ chrome/browser/ui/signin/dice_web_signin_interceptor_delegate.cc
@@ -57,7 +57,7 @@ class ForcedEnterpriseSigninInterceptionHandle
  private:
   void ShowEnterpriseProfileInterceptionDialog(const AccountInfo& account_info,
                                                SkColor profile_color) {
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     BUILDFLAG(IS_CHROMEOS_LACROS)
     if (base::FeatureList::IsEnabled(kAccountPoliciesLoadedWithoutSync)) {
       browser_->signin_view_controller()->ShowModalEnterpriseConfirmationDialog(
