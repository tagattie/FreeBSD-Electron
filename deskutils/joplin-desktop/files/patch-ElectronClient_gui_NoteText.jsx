--- ElectronClient/gui/NoteText.jsx.orig	2020-02-26 10:58:05 UTC
+++ ElectronClient/gui/NoteText.jsx
@@ -271,7 +271,7 @@ class NoteTextComponent extends React.Component {
 				this.selectionRange_ = null;
 			} else {
 				this.selectionRange_ = ranges[0];
-				if (process.platform === 'linux') {
+				if (process.platform === 'linux' || process.platform === 'freebsd') {
 					const textRange = this.textOffsetSelection();
 					if (textRange.start != textRange.end) {
 						clipboard.writeText(this.state.note.body.slice(
