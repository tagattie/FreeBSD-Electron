--- electron/spec-main/api-power-monitor-spec.ts.orig	2023-01-17 21:24:40 UTC
+++ electron/spec-main/api-power-monitor-spec.ts
@@ -14,7 +14,7 @@ import { promisify } from 'util';
 describe('powerMonitor', () => {
   let logindMock: any, dbusMockPowerMonitor: any, getCalls: any, emitSignal: any, reset: any;
 
-  ifdescribe(process.platform === 'linux' && process.env.DBUS_SYSTEM_BUS_ADDRESS != null)('when powerMonitor module is loaded with dbus mock', () => {
+  ifdescribe((process.platform === 'linux' || process.platform === 'freebsd') && process.env.DBUS_SYSTEM_BUS_ADDRESS != null)('when powerMonitor module is loaded with dbus mock', () => {
     before(async () => {
       const systemBus = dbus.systemBus();
       const loginService = systemBus.getService('org.freedesktop.login1');
