--- packages/lib/models/settings/builtInMetadata.ts.orig	2025-09-01 11:50:43 UTC
+++ packages/lib/models/settings/builtInMetadata.ts
@@ -1830,7 +1830,7 @@ const builtInMetadata = (Setting: typeof SettingType) 
 			appTypes: [AppType.Desktop],
 			label: () => 'Enable keychain support',
 			description: () => 'This is an experimental setting to enable keychain support on Linux',
-			show: () => shim.isLinux(),
+			show: () => (shim.isLinux() || shim.isFreeBSD()),
 			section: 'general',
 			isGlobal: true,
 			advanced: true,
