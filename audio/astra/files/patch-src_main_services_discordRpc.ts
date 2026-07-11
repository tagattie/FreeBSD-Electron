--- src/main/services/discordRpc.ts.orig	2026-07-11 07:31:23 UTC
+++ src/main/services/discordRpc.ts
@@ -477,7 +477,7 @@ export class DiscordRpcService {
       endpointDirectories.add(normalized)
     }
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
       // AppImage builds often need XDG runtime sockets before /tmp fallbacks.
       addLinuxRuntimeRoot(process.env.XDG_RUNTIME_DIR)
 
@@ -500,7 +500,7 @@ export class DiscordRpcService {
     addEndpointDirectory('/tmp')
     addEndpointDirectory(tmpdir())
 
-    const socketPrefixes = process.platform === 'linux'
+    const socketPrefixes = (process.platform === 'linux' || process.platform === 'freebsd')
       ? DISCORD_LINUX_SOCKET_PREFIXES
       : ['discord-ipc']
 
