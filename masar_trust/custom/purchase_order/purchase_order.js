frappe.ui.form.on("Purchase Order","refresh", function(frm) {
     frm.toggle_display("apply_tds", false);
     frm.toggle_display("schedule_date", false);
     frm.toggle_display("currency_and_price_list", false);
     frm.toggle_display("shipping_rule", false);
     frm.toggle_display("column_break5", false);
     //frm.toggle_display("more_info", false);
     frm.toggle_display("subscription_section", false);
     frm.toggle_display("more_info", false);
});

 
