--- tabby-terminal/node_modules/xterm/src/common/CircularList.ts.orig	2023-03-07 07:46:24 UTC
+++ tabby-terminal/node_modules/xterm/src/common/CircularList.ts
@@ -4,7 +4,7 @@
  */
 
 import { ICircularList } from 'common/Types';
-import { EventEmitter, IEvent } from 'common/EventEmitter';
+import { EventEmitter } from 'common/EventEmitter';
 import { Disposable } from 'common/Lifecycle';
 
 export interface IInsertEvent {
