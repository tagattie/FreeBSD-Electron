--- src/main/exceptionHandler.ts.orig	2026-05-29 12:05:34 UTC
+++ src/main/exceptionHandler.ts
@@ -6,7 +6,7 @@
 // The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
-import { app, clipboard, crashReporter, dialog, ipcMain } from 'electron'
+import { app, clipboard, dialog, ipcMain } from 'electron'
 import os from 'os'
 import log from 'electron-log'
 import { createAndOpenGitHubIssueUrl } from './utils/createGitHubIssue'
@@ -123,15 +123,6 @@ const setupExceptionHandler = (): void => {
   // renderer process error handler
   ipcMain.on('mt::handle-renderer-error', (_e, error: Error) => {
     handleError(ERROR_MSG_RENDERER(), error, 'renderer')
-  })
-
-  // start crashReporter to save core dumps to temporary folder
-  crashReporter.start({
-    companyName: 'marktext',
-    productName: 'marktext',
-    submitURL: 'http://0.0.0.0/',
-    uploadToServer: false,
-    compress: true
   })
 }
 
