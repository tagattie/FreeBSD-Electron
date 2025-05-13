--- packages/lib/models/settings/builtInMetadata.ts.orig	2025-05-12 13:45:57 UTC
+++ packages/lib/models/settings/builtInMetadata.ts
@@ -1695,7 +1695,7 @@ const builtInMetadata = (Setting: typeof SettingType) 
 			appTypes: [AppType.Desktop],
 			label: () => 'Enable keychain support',
 			description: () => 'This is an experimental setting to enable keychain support on Linux',
-			show: () => shim.isLinux(),
+			show: () => (shim.isLinux() || shim.isFreeBSD()),
 			section: 'general',
 			isGlobal: true,
 			advanced: true,
