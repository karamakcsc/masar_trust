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



// frappe.ui.form.on("Purchase Order", "refresh", function(frm) {
//        frm.set_query("item_code", "items", function(doc, cdt, cdn) {
//       	var d = locals[cdt][cdn];
//       	return {
//       		query: "masar_trust.custom.purchase_order.purchase_order.get_item_supplier",
//       		filters:{
//       				'supplier': doc.supplier
//       		}
//       	}
//       })
// });



// frappe.ui.form.on("Purchase Order", {
//   supplier: function(frm) {
//     if(frm.doc.items.length > 0){
//       frm.clear_table("items");
//       frm.refresh_fields();
//     }
//   }
// });


