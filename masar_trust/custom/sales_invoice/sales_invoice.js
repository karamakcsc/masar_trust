frappe.ui.form.on("Sales Invoice","refresh", function(frm) {
     frm.toggle_display("naming_series", false);
     //frm.toggle_display("is_pos", false);
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
     //frm.toggle_display("update_stock", false);
     frm.toggle_display("more_information", false);
});

frappe.ui.form.on("Sales Invoice", {
  branch: function (frm) {
    if (frm.doc.branch == "المعرض الرئيسي (الكرادة)") {
    frm.set_value('naming_series', 'ACC-SINV1-.YYYY.-')
    frm.set_value('cost_center', '15 - المعرض الرئيسي (الكرادة) - TRUST')
    }
    else if (frm.doc.branch == "معرض النجف الاشرف") {
    frm.set_value('naming_series', 'ACC-SINV4-.YYYY.-')
    frm.set_value('cost_center', '13 - معرض النجف الاشرف - TRUST')
     }
     refresh_field("naming_series");
  },
  is_return: function (frm) {
    if (frm.doc.branch == "المعرض الرئيسي (الكرادة)" && frm.doc.is_return == 1) {
    frm.set_value('naming_series', 'ACC-SINV1-RET-.YYYY.-')
    frm.set_value('cost_center', '15 - المعرض الرئيسي (الكرادة) - TRUST')
    }
    else if (frm.doc.branch == "معرض النجف الاشرف" && frm.doc.is_return == 1) {
    frm.set_value('naming_series', 'ACC-SINV4-RET-.YYYY.-')
    frm.set_value('cost_center', '13 - معرض النجف الاشرف - TRUST')
     }
    refresh_field("naming_series");
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////
frappe.ui.form.on("Sales Invoice Item", "qty", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
       if (d.item_code)  {
         d.total_discount_amount = flt(d.discount_amount * d.qty)
         cur_frm.refresh_field();
       }
});
frappe.ui.form.on("Sales Invoice Item", "discount_amount", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
      if (d.item_code)  {
        d.total_discount_amount = flt(d.discount_amount * d.qty)
        cur_frm.refresh_field();
      }
});
frappe.ui.form.on("Sales Invoice Item", "rate", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
      if (d.item_code)  {
        d.total_discount_amount = flt(d.discount_amount * d.qty)
        cur_frm.refresh_field();
      }
});
//////////////////////////////////////////////////////////////////////////////////
frappe.ui.form.on("Sales Invoice Item", "rate", function(frm, cdt, cdn) {
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

frappe.ui.form.on("Sales Invoice Item", "qty", function(frm, cdt, cdn) {
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
frappe.ui.form.on("Sales Invoice Item", "discount_amount", function(frm, cdt, cdn) {
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
frappe.ui.form.on("Sales Invoice Item", "rate", function(frm, cdt, cdn) {
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
frappe.ui.form.on("Sales Invoice Item", "discount_amount", function(frm, cdt, cdn) {
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
frappe.ui.form.on("Sales Invoice Item", "qty", function(frm, cdt, cdn) {
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
// frappe.ui.form.on("Sales Invoice Item", {
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
// frappe.ui.form.on("Sales Invoice Item", {
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

frappe.ui.form.on('Sales Invoice Item', {
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
frappe.ui.form.on('Sales Invoice Item', {
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
//////////////////////******************************///////////////////////////////

// frappe.ui.form.on("Sales Invoice Item", {
//    discount_amount:function(frm, cdt, cdn){
//    var d = locals[cdt][cdn];
//    var total = 0;
//    frm.doc.items.forEach(function(d) { total += d.amount_before_discount; });
//    frm.set_value("total_amount_before_discount", total);
//    refresh_field("total_amount_before_discount");
//  },
//    items_remove:function(frm, cdt, cdn){
//    var d = locals[cdt][cdn];
//    var total = 0;
//    frm.doc.items.forEach(function(d) { total += d.amount_before_discount; });
//    frm.set_value("total_amount_before_discount", total);
//    refresh_field("total_amount_before_discount");
//    	}
//    });
//
//  frappe.ui.form.on("Sales Invoice Item", {
//     qty:function(frm, cdt, cdn){
//     var d = locals[cdt][cdn];
//     var total = 0;
//     frm.doc.items.forEach(function(d) { total += d.amount_before_discount; });
//     frm.set_value("total_amount_before_discount", total);
//     refresh_field("total_amount_before_discount");
//   },
//     items_remove:function(frm, cdt, cdn){
//     var d = locals[cdt][cdn];
//     var total = 0;
//     frm.doc.items.forEach(function(d) { total += d.amount_before_discount; });
//     frm.set_value("total_amount_before_discount", total);
//     refresh_field("total_amount_before_discount");
//     	}
//     });
////////////////////////////////////////////////////////////////////////////////////
// frappe.ui.form.on("Sales Invoice", "refresh", function(frm) {
//     frm.add_custom_button(__("Print All Invoices"), function() {
//         // When this button is clicked, do this
//         var myWin = window.open('http://104.131.91.208:8000/printview?doctype=Sales%20Invoice&name='+cur_frm.doc.name+'&trigger_print=1&format=Sales%20Invoice%20for%20Customer&no_letterhead=0&letterhead=Trust%20international&settings=%7B%7D&_lang=ar');
//         var myWin = window.open('http://104.131.91.208:8000/printview?doctype=Sales%20Invoice&name='+cur_frm.doc.name+'&trigger_print=1&format=Sales%20Invoice%20for%20Accounting&no_letterhead=0&letterhead=Trust%20international&settings=%7B%7D&_lang=ar');
//  }, __("Print Invoices"));
// });

// frappe.ui.form.on("Sales Invoice", "refresh", function(frm) {
//     frm.add_custom_button(__("Print Customer Invoice"), function() {
//         // When this button is clicked, do this
//         var myWin = window.open('http://104.131.91.208:8000/printview?doctype=Sales%20Invoice&name='+cur_frm.doc.name+'&trigger_print=1&format=Sales%20Invoice%20for%20Customer&no_letterhead=0&letterhead=Trust%20international&settings=%7B%7D&_lang=ar');
//         // var myWin = window.open('http://104.131.91.208:8000/printview?doctype=Sales%20Invoice&name='+cur_frm.doc.name+'&trigger_print=1&format=Sales%20Invoice%20for%20Accounting&no_letterhead=0&letterhead=Trust%20international&settings=%7B%7D&_lang=ar');
//  }, __("Print Invoices"));
// });
//
// frappe.ui.form.on("Sales Invoice", "refresh", function(frm) {
//     frm.add_custom_button(__("Print Accounting Invoice"), function() {
//         // When this button is clicked, do this
//         // var myWin = window.open('http://104.131.91.208:8000/printview?doctype=Sales%20Invoice&name='+cur_frm.doc.name+'&trigger_print=1&format=Sales%20Invoice%20for%20Customer&no_letterhead=0&letterhead=Trust%20international&settings=%7B%7D&_lang=ar');
//         var myWin = window.open('http://104.131.91.208:8000/printview?doctype=Sales%20Invoice&name='+cur_frm.doc.name+'&trigger_print=1&format=Sales%20Invoice%20for%20Accounting&no_letterhead=0&letterhead=Trust%20international&settings=%7B%7D&_lang=ar');
//  }, __("Print Invoices"));
// });
//
// frappe.ui.form.on('Sales Invoice', {
// 	refresh(frm) {
// 	    // if (frappe.user_roles.indexOf("Sales User") ==-1) {
// 	        $("button[data-original-title=Print]").hide();
// 	     // }
// 	}
// });
///////////////////////////////////////////////////


//////////////////from mahmoud //////////////////////




// frappe.ui.form.on("Sales Invoice", {
//   on_submit: function(frm) {
//       frappe.call({
//           method: "masar_trust.custom.sales_invoice.sales_invoice.financial_allocation",
//           args: {
//               customer_sub: frm.doc.customer_sub,
//               date_range: frm.doc.posting_date,
//               grand_total: frm.doc.grand_total,
//               cost_center: frm.doc.cost_center
//           },
//           callback: function(r) {
//               if (r.message && r.message.length > 0) {
//                   frappe.msgprint(r.message);
//               } 
//           }
//       });
//   }
// });

