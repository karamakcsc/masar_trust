frappe.ui.form.on("Delivery Note","refresh", function(frm) {
     //frm.toggle_display("naming_series", false);
     frm.toggle_display("customer_po_details", false);
     frm.toggle_display("currency_and_price_list", false);
     frm.toggle_display("taxes_section", false);
     frm.toggle_display("section_break_49", false);
     //frm.toggle_display("more_info", false);
     frm.toggle_display("printing_details", false);
     frm.toggle_display("subscription_section", false);
     frm.toggle_display("sales_team_section_break", false);
     frm.toggle_display("total", false);
     frm.toggle_display("base_total", false);
     frm.toggle_display("total_net_weight", false);
     frm.toggle_display("total_net_weight", false);
     frm.toggle_display("base_net_total", false);
     frm.toggle_display("taxes_section", false);
     frm.toggle_display("sec_tax_breakup", false);
     frm.toggle_display("section_break_41", false);
     frm.toggle_display("section_break_44", false);
     frm.toggle_display("grand_total", false);
     frm.toggle_display("totals", false);
});

frappe.ui.form.on("Delivery Note",{ before_load:function(frm) {
var df=frappe.meta.get_docfield("Delivery Note Item", "uom",frm.doc.name);
df.hidden=1;
var df=frappe.meta.get_docfield("Delivery Note Item", "rate",frm.doc.name);
df.hidden=1;
var df=frappe.meta.get_docfield("Delivery Note Item", "amount",frm.doc.name);
df.hidden=1;
frm.refresh_fields();
}
});

// frappe.ui.form.on('Delivery Note', {
//   Validate: function(frm) {
//     $.each(frm.doc.items, function(i, d) {
//       d.cost_center = frm.doc.cost_center;
//     });
//   }
// });
//
//
// frappe.ui.form.on('Delivery Note', {
//   cost_center: function(frm) {
//     $.each(frm.doc.items, function(i, d) {
//       d.cost_center = frm.doc.cost_center;
//     });
//   }
// });
//
//
// frappe.ui.form.on("Delivery Note Item", "items_add", function(frm, cdt, cdn) {
//     var d = locals[cdt][cdn];
//
//         if(frm.doc.cost_center != ""){
//             d.cost_center = frm.doc.cost_center;
//         }
//   });