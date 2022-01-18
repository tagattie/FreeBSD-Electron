--- chrome/browser/policy/configuration_policy_handler_list_factory.cc.orig	2021-12-14 11:44:58 UTC
+++ chrome/browser/policy/configuration_policy_handler_list_factory.cc
@@ -1399,11 +1399,11 @@ const PolicyToPreferenceMapEntry kSimplePolicyMap[] = 
     base::Value::Type::BOOLEAN },
 #endif // !defined(OS_MAC) && !defined(OS_CHROMEOS)
 
-#if defined(OS_LINUX) || defined(OS_MAC) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_MAC) || defined(OS_CHROMEOS) || defined(OS_BSD)
   { key::kAuthNegotiateDelegateByKdcPolicy,
     prefs::kAuthNegotiateDelegateByKdcPolicy,
     base::Value::Type::BOOLEAN },
-#endif // defined(OS_LINUX) || defined(OS_MAC) || defined(OS_CHROMEOS)
+#endif // defined(OS_LINUX) || defined(OS_MAC) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
 #if !defined(OS_MAC)
   { key::kFullscreenAllowed,
@@ -1517,7 +1517,7 @@ const PolicyToPreferenceMapEntry kSimplePolicyMap[] = 
     base::Value::Type::INTEGER },
 #endif
 
-#if BUILDFLAG(ENABLE_EXTENSIONS) && (defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX))
+#if BUILDFLAG(ENABLE_EXTENSIONS) && (defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD))
   { key::kChromeAppsEnabled,
     extensions::pref_names::kChromeAppsEnabled,
     base::Value::Type::BOOLEAN },
@@ -1780,7 +1780,7 @@ std::unique_ptr<ConfigurationPolicyHandlerList> BuildH
       SimpleSchemaValidatingPolicyHandler::MANDATORY_ALLOWED));
 #endif  // defined(OS_ANDROID)
 
-#if defined(OS_LINUX) || defined(OS_MAC) || defined(OS_WIN) || \
+#if defined(OS_LINUX) || defined(OS_MAC) || defined(OS_WIN) || defined(OS_BSD) || \
     defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
   handlers->AddHandler(
       std::make_unique<
@@ -1788,7 +1788,7 @@ std::unique_ptr<ConfigurationPolicyHandlerList> BuildH
           key::kContextAwareAccessSignalsAllowlist,
           enterprise_connectors::kContextAwareAccessSignalsAllowlistPref,
           chrome_schema));
-#endif  // defined(OS_LINUX) || defined(OS_MAC) || defined(OS_WIN) ||
+#endif  // defined(OS_LINUX) || defined(OS_MAC) || defined(OS_WIN) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS) || defined(OS_FUCHSIA)
 
 #if defined(OS_CHROMEOS)
@@ -2145,14 +2145,14 @@ std::unique_ptr<ConfigurationPolicyHandlerList> BuildH
       SimpleSchemaValidatingPolicyHandler::RECOMMENDED_PROHIBITED,
       SimpleSchemaValidatingPolicyHandler::MANDATORY_ALLOWED));
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_FUCHSIA)
   handlers->AddHandler(std::make_unique<SimpleSchemaValidatingPolicyHandler>(
       key::kWebAppSettings, prefs::kWebAppSettings, chrome_schema,
       SCHEMA_ALLOW_UNKNOWN,
       SimpleSchemaValidatingPolicyHandler::RECOMMENDED_PROHIBITED,
       SimpleSchemaValidatingPolicyHandler::MANDATORY_ALLOWED));
-#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) ||
+#endif  // defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_FUCHSIA)
 
 #endif  // BUILDFLAG(ENABLE_EXTENSIONS)
@@ -2177,7 +2177,7 @@ std::unique_ptr<ConfigurationPolicyHandlerList> BuildH
           policy::key::kSpellcheckLanguageBlocklist));
 #endif  // BUILDFLAG(ENABLE_SPELLCHECK)
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   handlers->AddHandler(std::make_unique<SimpleDeprecatingPolicyHandler>(
       std::make_unique<SimplePolicyHandler>(key::kAllowNativeNotifications,
                                             prefs::kAllowNativeNotifications,
@@ -2185,7 +2185,7 @@ std::unique_ptr<ConfigurationPolicyHandlerList> BuildH
       std::make_unique<SimplePolicyHandler>(key::kAllowSystemNotifications,
                                             prefs::kAllowSystemNotifications,
                                             base::Value::Type::BOOLEAN)));
-#endif  // defined(OS_LINUX)
+#endif  // defined(OS_LINUX) || defined(OS_BSD)
 
   return handlers;
 }
