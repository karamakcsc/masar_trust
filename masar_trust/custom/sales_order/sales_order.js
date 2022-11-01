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
     //frm.toggle_display("set_warehouse", false);
     frm.toggle_display("currency_and_price_list", false);
     frm.toggle_display("order_type", false);
     frm.toggle_display("total_net_weighte", false);
     frm.toggle_display("section_break_40", false);
     frm.toggle_display("base_total_taxes_and_charges", false);
     frm.toggle_display("total_taxes_and_charges", false);
     });

frappe.ui.form.on("Sales Order",{ before_load:function(frm) {
 var df=frappe.meta.get_docfield("Sales Order", "naming_series",frm.doc.name);
 df.read_only=1;
frm.refresh_fields();
}
});

frappe.ui.form.on("Sales Order","branch", function(frm) {
if (frm.doc.branch == "المعرض الرئيسي (الكرادة)") {
  frm.set_value('naming_series', 'SAL-ORD1-.YYYY.-')
  frm.set_value('cost_center', '15 - المعرض الرئيسي (الكرادة) - TRUST')
  frm.refresh_fields();
}
else if (frm.doc.branch == "معرض النجف الاشرف") {
  frm.set_value('naming_series', 'SAL-ORD4-.YYYY.-')
  frm.set_value('cost_center', '13 - معرض النجف الاشرف - TRUST')
  frm.refresh_fields();
}
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
var df=frappe.meta.get_docfield("Sales Order", "mode_of_payment",frm.doc.name);
df.reqd=1;
frm.refresh_fields();
}
});

frappe.ui.form.on("Sales Order", {
refresh: function(frm) {
frm.doc.project = frm.doc.project_code;
}
});

frappe.ui.form.on("Sales Order Item", {
    rate: function(frm,cdt, cdn){
    calculate_total(frm, cdt, cdn);
    },
    discount_amount: function(frm, cdt, cdn){
    calculate_total(frm, cdt, cdn);
  }
});
  var calculate_total = function(frm, cdt, cdn) {
  var child = locals[cdt][cdn];
  frappe.model.set_value(cdt, cdn, "unit_price_before_discount", child.rate + child.discount_amount);
  frappe.model.set_value(cdt, cdn, "amount_before_discount", child.unit_price_before_discount * child.qty);
  frappe.model.set_value(cdt, cdn, "total_discount_amount", child.discount_amount * child.qty);
}

frappe.ui.form.on("Sales Order Item", {
    discount_amount: function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var total = 0;
    frappe.model.set_value(d.doctype, d.name, "total_items_discount", d.total_items_discount);
    frm.doc.items.forEach(function(d) { total += d.total_discount_amount; });
    frm.set_value('total_items_discount', total);
    refresh_field("total_items_discount");
  }
});

frappe.ui.form.on("Sales Order Item", {
    discount_amount: function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var total = 0;
    frappe.model.set_value(d.doctype, d.name, "total_items_discount", d.total_items_discount);
    frm.doc.items.forEach(function(d) { total += d.amount_before_discount; });
    frm.set_value('total_amount_before_discount', total);
    refresh_field("total_amount_before_discount");
  }
});



// frappe.ui.form.on("Sales Order",{
// 	verify: function(frm) {
// 		frappe.call({
// 			method: "frappe.client.get",
// 			args: {
// 				doctype: "Sales Order Item",
// 				filters: {"parent":name}    //user is current user here
// 			},
// 			callback: function(r) {
// 				$.each(frm.doc.items || [], function(i, v) {
// 					frappe.model.set_value(v.doctype, v.name, "total_amount_before_discount", r.amount_before_discount)
// 					// frappe.model.set_value(v.doctype, v.name, "email", r.message.email)
// 					// frappe.model.set_value(v.doctype, v.name, "phone", r.message.phone)
// 				})
// 				frm.refresh_field('items');
// 			}
// 		})
// 	}
// })
//
//
// frappe.ui.form.on("Sales Order",{
// 	verify: function(frm) {
// 		frappe.call({
// 			method: "frappe.client.get",
// 			args: {
// 				doctype: "Sales Order Item",
// 				filters: {"parent":name}    //user is current user here
// 			},
// 			callback: function(r) {
// 				$.each(frm.doc.items || [], function(i, v) {
// 					frappe.model.set_value(v.doctype, v.name, "total_items_discount", r.total_discount_amount)
// 					// frappe.model.set_value(v.doctype, v.name, "email", r.message.email)
// 					// frappe.model.set_value(v.doctype, v.name, "phone", r.message.phone)
// 				})
// 				frm.refresh_field('items');
// 			}
// 		})
// 	}
// })
