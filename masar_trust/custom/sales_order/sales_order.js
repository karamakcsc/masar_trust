frappe.ui.form.on("Sales Order","refresh", function(frm) {
     //frm.toggle_display("naming_series", false);
     frm.toggle_display("po_no", false);
     frm.toggle_display("taxes_section", false);
     frm.toggle_display("section_break_40", false);
     frm.toggle_display("coupon_code", false);
     frm.toggle_display("more_info", false);
     frm.toggle_display("printing_details", false);
     frm.toggle_display("subscription_section", false);
     frm.toggle_display("sales_team_section_break", false);
     frm.toggle_display("set_warehouse", false);
     frm.toggle_display("currency_and_price_list", false);
     frm.toggle_display("order_type", false);
     frm.toggle_display("total_net_weighte", false);
     frm.toggle_display("section_break_40", false);
     frm.toggle_display("base_total_taxes_and_charges", false);
     frm.toggle_display("total_taxes_and_charges", false);
     });

frappe.ui.form.on("Sales Order",{ before_load:function(frm) {
  var df=frappe.meta.get_docfield("Sales Order Item", "gross_profit",frm.doc.name);
  df.hidden=1;
  var df=frappe.meta.get_docfield("Sales Order Item", "valuation_rate",frm.doc.name);
  df.hidden=1;
  var df=frappe.meta.get_docfield("Sales Order Item", "delivery_date",frm.doc.name);
  df.hidden=1;
frm.refresh_fields();
}
});

frappe.ui.form.on("Sales Order",{ before_load:function(frm) {
  var df=frappe.meta.get_docfield("Sales Order", "naming_series",frm.doc.name);
  df.read_only=1;
frm.refresh_fields();
}
});
frappe.ui.form.on("Sales Order",{ before_load:function(frm) {
var df=frappe.meta.get_docfield("Sales Order", "mode_of_payment",frm.doc.name);
df.reqd=1;
frm.refresh_fields();
}
});
