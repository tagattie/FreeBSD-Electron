--- components/sync_device_info/local_device_info_util.cc.orig	2020-03-03 07:02:58 UTC
+++ components/sync_device_info/local_device_info_util.cc
@@ -19,7 +19,7 @@ std::string GetPersonalizableDeviceNameInternal();
 sync_pb::SyncEnums::DeviceType GetLocalDeviceType() {
 #if defined(OS_CHROMEOS)
   return sync_pb::SyncEnums_DeviceType_TYPE_CROS;
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
   return sync_pb::SyncEnums_DeviceType_TYPE_LINUX;
 #elif defined(OS_ANDROID) || defined(OS_IOS)
   return ui::GetDeviceFormFactor() == ui::DEVICE_FORM_FACTOR_TABLET
