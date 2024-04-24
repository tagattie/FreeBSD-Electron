--- waveshell/pkg/base/base.go.orig	2024-03-29 20:28:49 UTC
+++ waveshell/pkg/base/base.go
@@ -235,7 +235,7 @@ func ValidGoArch(goos string, goarch string) bool {
 }
 
 func ValidGoArch(goos string, goarch string) bool {
-	return (goos == "darwin" || goos == "linux") && (goarch == "amd64" || goarch == "arm64")
+	return (goos == "darwin" || goos == "linux" || goos == "freebsd") && (goarch == "amd64" || goarch == "arm64")
 }
 
 func GoArchOptFile(version string, goos string, goarch string) string {
