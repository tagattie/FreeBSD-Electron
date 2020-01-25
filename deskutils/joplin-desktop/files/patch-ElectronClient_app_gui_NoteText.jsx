--- ElectronClient/app/gui/NoteText.jsx.orig	2020-01-21 05:45:13 UTC
+++ ElectronClient/app/gui/NoteText.jsx
@@ -270,7 +270,7 @@ class NoteTextComponent extends React.Component {
 				this.selectionRange_ = null;
 			} else {
 				this.selectionRange_ = ranges[0];
-				if (process.platform === 'linux') {
+				if (process.platform === 'linux' || process.platform === 'freebsd') {
 					const textRange = this.textOffsetSelection();
 					if (textRange.start != textRange.end) {
 						clipboard.writeText(this.state.note.body.slice(
