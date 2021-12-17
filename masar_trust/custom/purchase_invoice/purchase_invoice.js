frappe.ui.form.on("Purchase Invoice","refresh", function(frm) {
     frm.toggle_display("tax_id", false);
     frm.toggle_display("apply_tds", false);
     frm.toggle_display("currency_and_price_list", false);
     frm.toggle_display("update_stock", false);
     frm.toggle_display("shipping_rule", false);
     frm.toggle_display("more_info", false);
     frm.toggle_display("subscription_section", false);
     frm.toggle_display("printing_settings", false);
});
