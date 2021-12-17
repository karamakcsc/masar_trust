frappe.ui.form.on("Sales Invoice","refresh", function(frm) {
     frm.toggle_display("naming_series", false);
     frm.toggle_display("is_pos", false);
     frm.toggle_display("is_debit_note", false);
     frm.toggle_display("customer_po_details", false);
     frm.toggle_display("time_sheet_list", false);
     frm.toggle_display("edit_printing_settings", false);
     frm.toggle_display("shipping_rule", false);
     frm.toggle_display("tax_category", false);
     frm.toggle_display("loyalty_points_redemption", false);
     frm.toggle_display("printing_details", false);
     frm.toggle_display("sales_team_section_break", false);
     frm.toggle_display("subscription_section", false);
     frm.toggle_display("update_stock", false);
     frm.toggle_display("more_information", false);
});
