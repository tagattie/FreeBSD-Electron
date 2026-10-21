--- packages/desktop/src/main/exceptionHandler.ts.orig	2026-10-21 04:24:51 UTC
+++ packages/desktop/src/main/exceptionHandler.ts
@@ -6,7 +6,7 @@
 // The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
-import { app, clipboard, crashReporter, dialog, ipcMain } from 'electron'
+import { app, clipboard, dialog, ipcMain } from 'electron'
 import os from 'os'
 import log from 'electron-log'
 import { t } from './i18n'
@@ -100,13 +100,13 @@ const setupExceptionHandler = (): void => {
     handleError(ERROR_MSG_RENDERER(), error, 'renderer')
   })
 
-  crashReporter.start({
-    companyName: 'MarkText',
-    productName: 'MarkText',
-    submitURL: 'http://0.0.0.0/',
-    uploadToServer: false,
-    compress: true
-  })
+  // crashReporter.start({
+  //   companyName: 'MarkText',
+  //   productName: 'MarkText',
+  //   submitURL: 'http://0.0.0.0/',
+  //   uploadToServer: false,
+  //   compress: true
+  // })
 }
 
 export const initExceptionLogger = (): void => {
