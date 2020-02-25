--- src/main/exceptionHandler.js.orig	2020-02-24 06:17:18 UTC
+++ src/main/exceptionHandler.js
@@ -6,7 +6,7 @@
 // The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
-import { app, clipboard, crashReporter, dialog, ipcMain } from 'electron'
+import { app, clipboard, dialog, ipcMain } from 'electron'
 import os from 'os'
 import log from 'electron-log'
 import { createAndOpenGitHubIssueUrl } from './utils/createGitHubIssue'
@@ -107,14 +107,6 @@ const setupExceptionHandler = () => {
   // renderer process error handler
   ipcMain.on('AGANI::handle-renderer-error', (e, error) => {
     handleError(ERROR_MSG_RENDERER, error, 'renderer')
-  })
-
-  // start crashReporter to save core dumps to temporary folder
-  crashReporter.start({
-    companyName: 'marktext',
-    productName: 'marktext',
-    submitURL: 'http://0.0.0.0/',
-    uploadToServer: false
   })
 }
 
