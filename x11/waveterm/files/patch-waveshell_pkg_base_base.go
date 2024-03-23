--- waveshell/pkg/base/base.go.orig	2024-03-23 04:06:21 UTC
+++ waveshell/pkg/base/base.go
@@ -299,7 +299,7 @@ func ValidGoArch(goos string, goarch string) bool {
 }
 
 func ValidGoArch(goos string, goarch string) bool {
-	return (goos == "darwin" || goos == "linux") && (goarch == "amd64" || goarch == "arm64")
+	return (goos == "darwin" || goos == "linux" || goos == "freebsd") && (goarch == "amd64" || goarch == "arm64")
 }
 
 func GoArchOptFile(version string, goos string, goarch string) string {
