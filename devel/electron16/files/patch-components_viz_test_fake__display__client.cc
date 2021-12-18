--- components/viz/test/fake_display_client.cc.orig	2021-11-19 04:25:15 UTC
+++ components/viz/test/fake_display_client.cc
@@ -23,7 +23,7 @@ void FakeDisplayClient::CreateLayeredWindowUpdater(
     mojo::PendingReceiver<mojom::LayeredWindowUpdater> receiver) {}
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 void FakeDisplayClient::DidCompleteSwapWithNewSize(const gfx::Size& size) {}
 #endif
 
