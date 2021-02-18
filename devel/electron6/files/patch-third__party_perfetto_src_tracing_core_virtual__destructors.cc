--- third_party/perfetto/src/tracing/core/virtual_destructors.cc.orig	2019-09-10 11:16:55 UTC
+++ third_party/perfetto/src/tracing/core/virtual_destructors.cc
@@ -30,8 +30,8 @@ namespace perfetto {
 Consumer::~Consumer() = default;
 Producer::~Producer() = default;
 TracingService::~TracingService() = default;
-TracingService::ConsumerEndpoint::~ConsumerEndpoint() = default;
-TracingService::ProducerEndpoint::~ProducerEndpoint() = default;
+ConsumerEndpoint::~ConsumerEndpoint() = default;
+ProducerEndpoint::~ProducerEndpoint() = default;
 SharedMemory::~SharedMemory() = default;
 SharedMemory::Factory::~Factory() = default;
 SharedMemoryArbiter::~SharedMemoryArbiter() = default;
