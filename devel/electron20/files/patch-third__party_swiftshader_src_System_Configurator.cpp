--- third_party/swiftshader/src/System/Configurator.cpp.orig	2022-08-01 19:10:00 UTC
+++ third_party/swiftshader/src/System/Configurator.cpp
@@ -38,6 +38,9 @@ namespace sw {
 
 Configurator::Configurator(const std::string &filePath)
 {
+#if defined(__OpenBSD__) || defined(__FreeBSD__)
+	return;
+#endif
 	std::fstream file(filePath, std::ios::in);
 	if(file.fail())
 	{
