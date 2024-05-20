--- waveshell/pkg/shellapi/zshapi.go.orig	2024-05-20 05:56:13 UTC
+++ waveshell/pkg/shellapi/zshapi.go
@@ -224,7 +224,7 @@ func (zshShellApi) GetLocalShellPath() string {
 }
 
 func (zshShellApi) GetLocalShellPath() string {
-	return "/bin/zsh"
+	return "/usr/local/bin/zsh"
 }
 
 func (zshShellApi) GetRemoteShellPath() string {
