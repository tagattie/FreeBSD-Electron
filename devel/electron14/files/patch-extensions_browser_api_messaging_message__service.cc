--- extensions/browser/api/messaging/message_service.cc.orig	2021-09-14 01:51:57 UTC
+++ extensions/browser/api/messaging/message_service.cc
@@ -64,7 +64,7 @@ namespace {
 
 const char kReceivingEndDoesntExistError[] =
     "Could not establish connection. Receiving end does not exist.";
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
 const char kMissingPermissionError[] =
     "Access to native messaging requires nativeMessaging permission.";
@@ -380,7 +380,7 @@ void MessageService::OpenChannelToNativeApp(
   if (!opener_port->IsValidPort())
     return;
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
   bool has_permission = extension->permissions_data()->HasAPIPermission(
       mojom::APIPermissionID::kNativeMessaging);
@@ -432,12 +432,12 @@ void MessageService::OpenChannelToNativeApp(
   channel->opener->IncrementLazyKeepaliveCount();
 
   AddChannel(std::move(channel), receiver_port_id);
-#else   // !(defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) ||
+#else   // !(defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS))
   const char kNativeMessagingNotSupportedError[] =
       "Native Messaging is not supported on this platform.";
   opener_port->DispatchOnDisconnect(kNativeMessagingNotSupportedError);
-#endif  // !(defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) ||
+#endif  // !(defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) ||
         // defined(OS_CHROMEOS))
 }
 
