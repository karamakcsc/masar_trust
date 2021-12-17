frappe.ui.form.on("Purchase Receipt","refresh", function(frm) {
     frm.toggle_display("container_number", false);
     frm.toggle_display("apply_putaway_rule", false);
     frm.toggle_display("currency_and_price_list", false);
     frm.toggle_display("raw_material_details", false);
     frm.toggle_display("shipping_rule", false);
     frm.toggle_display("more_info", false);
     frm.toggle_display("transporter_info", false);
     frm.toggle_display("printing_settings", false);
});
