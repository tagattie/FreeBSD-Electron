--- chrome/browser/enterprise/connectors/device_trust/signals/signals_service_factory.cc.orig	2021-11-19 04:25:08 UTC
+++ chrome/browser/enterprise/connectors/device_trust/signals/signals_service_factory.cc
@@ -13,7 +13,7 @@
 #include "chrome/browser/enterprise/connectors/device_trust/signals/signals_service_impl.h"
 #include "chrome/browser/profiles/profile.h"
 
-#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_MAC)
+#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_MAC) || defined(OS_BSD)
 #include "base/check.h"
 #include "chrome/browser/enterprise/connectors/device_trust/signals/decorators/browser/browser_signals_decorator.h"
 #include "chrome/browser/enterprise/signals/device_info_fetcher.h"
@@ -21,7 +21,7 @@
 #include "components/enterprise/browser/controller/browser_dm_token_storage.h"
 #include "components/policy/core/common/cloud/machine_level_user_cloud_policy_manager.h"
 #include "components/policy/core/common/cloud/machine_level_user_cloud_policy_store.h"
-#endif  // defined(OS_LINUX) || defined(OS_WIN) || defined(OS_MAC)
+#endif  // defined(OS_LINUX) || defined(OS_WIN) || defined(OS_MAC) || defined(OS_BSD)
 
 #if BUILDFLAG(IS_CHROMEOS_ASH)
 #include "chrome/browser/browser_process_platform_part.h"
@@ -43,7 +43,7 @@ std::unique_ptr<SignalsService> CreateSignalsService(
       g_browser_process->local_state(), profile->GetPrefs(),
       policy_blocklist_service));
 
-#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_MAC)
+#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_MAC) || defined(OS_BSD)
   policy::ChromeBrowserPolicyConnector* browser_policy_connector =
       g_browser_process->browser_policy_connector();
   DCHECK(browser_policy_connector);
@@ -53,7 +53,7 @@ std::unique_ptr<SignalsService> CreateSignalsService(
       browser_policy_connector->machine_level_user_cloud_policy_manager()
           ->store(),
       enterprise_signals::DeviceInfoFetcher::CreateInstance()));
-#endif  // defined(OS_LINUX) || defined(OS_WIN) || defined(OS_MAC)
+#endif  // defined(OS_LINUX) || defined(OS_WIN) || defined(OS_MAC) || defined(OS_BSD)
 
 #if BUILDFLAG(IS_CHROMEOS_ASH)
   decorators.push_back(std::make_unique<AshSignalsDecorator>(
