--- ui/gtk/printing/print_dialog_gtk.cc.orig	2021-11-21 11:49:08 UTC
+++ ui/gtk/printing/print_dialog_gtk.cc
@@ -409,7 +409,7 @@ void PrintDialogGtk::ShowDialog(
   // Since we only generate PDF, only show printers that support PDF.
   // TODO(thestig) Add more capabilities to support?
   GtkPrintCapabilities cap = static_cast<GtkPrintCapabilities>(
-      GTK_PRINT_CAPABILITY_GENERATE_PDF | GTK_PRINT_CAPABILITY_PAGE_SET |
+      GTK_PRINT_CAPABILITY_GENERATE_PS | GTK_PRINT_CAPABILITY_GENERATE_PDF | GTK_PRINT_CAPABILITY_PAGE_SET |
       GTK_PRINT_CAPABILITY_COPIES | GTK_PRINT_CAPABILITY_COLLATE |
       GTK_PRINT_CAPABILITY_REVERSE);
   gtk_print_unix_dialog_set_manual_capabilities(GTK_PRINT_UNIX_DIALOG(dialog_),
