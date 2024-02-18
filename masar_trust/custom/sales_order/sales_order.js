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

//////////////////////////////////////////////////////////////////////////////////////////////
frappe.ui.form.on("Sales Order Item", "qty", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
       if (d.item_code)  {
         d.total_discount_amount = flt(d.discount_amount * d.qty)
         cur_frm.refresh_field();
       }
});
frappe.ui.form.on("Sales Order Item", "discount_amount", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
      if (d.item_code)  {
        d.total_discount_amount = flt(d.discount_amount * d.qty)
        cur_frm.refresh_field();
      }
});
frappe.ui.form.on("Sales Order Item", "rate", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
      if (d.item_code)  {
        d.total_discount_amount = flt(d.discount_amount * d.qty)
        cur_frm.refresh_field();
      }
});
//////////////////////////////////////////////////////////////////////////////////
frappe.ui.form.on("Sales Order Item", "rate", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
       if (d.item_code)  {
         if (d.price_list_rate > 0){
         d.unit_price_before_discount = flt(d.price_list_rate)
         cur_frm.refresh_field();
       }
       else {
         d.unit_price_before_discount = flt(d.rate)
         cur_frm.refresh_field();
       }
     }
});

frappe.ui.form.on("Sales Order Item", "qty", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
       if (d.item_code)  {
         if (d.price_list_rate > 0){
         d.unit_price_before_discount = flt(d.price_list_rate)
         cur_frm.refresh_field();
       }
       else {
         d.unit_price_before_discount = flt(d.rate)
         cur_frm.refresh_field();
       }
     }
});
frappe.ui.form.on("Sales Order Item", "discount_amount", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
       if (d.item_code)  {
         if (d.price_list_rate > 0){
         d.unit_price_before_discount = flt(d.price_list_rate)
         cur_frm.refresh_field();
       }
       else {
         d.unit_price_before_discount = flt(d.rate)
         cur_frm.refresh_field();
       }
     }
});
///////////////////////////////////////////////////////////////////////////////
frappe.ui.form.on("Sales Order Item", "rate", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
       if (d.item_code)  {
         if (d.price_list_rate > 0){
         d.amount_before_discount = flt(d.price_list_rate * d.qty)
         cur_frm.refresh_field();
       }
       else {
         d.amount_before_discount = flt(d.rate * d.qty)
         cur_frm.refresh_field();
       }
     }
});
frappe.ui.form.on("Sales Order Item", "discount_amount", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
      if (d.item_code)  {
        if (d.price_list_rate > 0){
        d.amount_before_discount = flt(d.price_list_rate * d.qty)
        cur_frm.refresh_field();
      }
      else {
        d.amount_before_discount = flt(d.rate * d.qty)
        cur_frm.refresh_field();
      }
    }
});
frappe.ui.form.on("Sales Order Item", "qty", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
      if (d.item_code)  {
        if (d.price_list_rate > 0){
        d.amount_before_discount = flt(d.price_list_rate * d.qty)
        cur_frm.refresh_field();
      }
      else {
        d.amount_before_discount = flt(d.rate * d.qty)
        cur_frm.refresh_field();
      }
    }
});

//////////////////////////////////////////////////////////////////////////////////
// frappe.ui.form.on("Sales Order Item", {
//    discount_amount:function(frm, cdt, cdn){
//    var d = locals[cdt][cdn];
//    var total = 0;
//    frm.doc.items.forEach(function(d) { total += d.total_discount_amount; });
//    frm.set_value("total_items_discount", total);
//    refresh_field("total_items_discount");
//  },
//    items_remove:function(frm, cdt, cdn){
//    var d = locals[cdt][cdn];
//    var total = 0;
//    frm.doc.items.forEach(function(d) { total += d.total_discount_amount; });
//    frm.set_value("total_items_discount", total);
//    refresh_field("total_items_discount");
//    	}
//    });
//
// frappe.ui.form.on("Sales Order Item", {
//   qty:function(frm, cdt, cdn){
//   var d = locals[cdt][cdn];
//   var total = 0;
//   frm.doc.items.forEach(function(d) { total += d.total_discount_amount; });
//   frm.set_value("total_items_discount", total);
//   refresh_field("total_items_discount");
// },
//   items_remove:function(frm, cdt, cdn){
//   var d = locals[cdt][cdn];
//   var total = 0;
//   frm.doc.items.forEach(function(d) { total += d.total_discount_amount; });
//   frm.set_value("total_items_discount", total);
//   refresh_field("total_items_discount");
//   	}
//   });

frappe.ui.form.on('Sales Order Item', {
    items_remove: function(frm, cdt, cdn) {
        update_total_items_discount(frm);
    },
    qty: function(frm, cdt, cdn) {
        update_total_items_discount(frm);
    },
    discount_amount: function(frm, cdt, cdn) {
        update_total_items_discount(frm);
    },
    rate: function(frm, cdt, cdn) {
        update_total_items_discount(frm);
    },
});

function update_total_items_discount(frm) {
    var total = 0;
    frm.doc.items.forEach(function(d) {
        total += flt(d.total_discount_amount);
    });
    frm.set_value('total_items_discount', total);
}
////////////////////////////////////////////////////////////////
frappe.ui.form.on('Sales Order Item', {
    items_remove: function(frm, cdt, cdn) {
        update_total_amount_before_discount(frm);
    },
    qty: function(frm, cdt, cdn) {
        update_total_amount_before_discount(frm);
    },
    discount_amount: function(frm, cdt, cdn) {
        update_total_amount_before_discount(frm);
    },
    rate: function(frm, cdt, cdn) {
        update_total_amount_before_discount(frm);
    },
});

function update_total_amount_before_discount(frm) {
    var total = 0;
    frm.doc.items.forEach(function(d) {
        total += flt(d.amount_before_discount);
    });
    frm.set_value('total_amount_before_discount', total);
}

/////////////////////////////////////////////////////////////////////////////////

// frappe.ui.form.on('Sales Order', {
//   validate: function(frm) {
//       frm.doc.items.forEach(function(item, index) {
//           if (item.actual_qty <= 0) {
//               frappe.msgprint(`Error: Actual quantity must be greater than zero for item '${item.item_code}' in row ${index + 1}.`);
//               validated = false;
//               return false; 
//           }
//       });
//   }
// });
