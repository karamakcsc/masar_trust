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




frappe.ui.form.on("Sales Invoice Item", {
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

// frappe.ui.form.on("Sales Invoice Item", {
//  total_discount_amount: function(frm, cdt, cdn) {
//    var d = locals[cdt][cdn];
//    var total = 0;
// frappe.model.set_value(d.doctype, d.name, "total_items_discount", d.total_items_discount);
// frm.doc.items.forEach(function(d) { total += d.total_discount_amount; });
//        frm.set_value('total_items_discount', total);
//        refresh_field("total_items_discount");
//  }
//
// });
//
// frappe.ui.form.on("Sales Invoice Item", {
//  amount_before_discount: function(frm, cdt, cdn) {
//    var d = locals[cdt][cdn];
//    var total = 0;
// frappe.model.set_value(d.doctype, d.name, "total_items_discount", d.total_items_discount);
// frm.doc.items.forEach(function(d) { total += d.amount_before_discount; });
//        frm.set_value('total_amount_before_discount', total);
//        refresh_field("total_amount_before_discount");
//  }
//
// });


frappe.ui.form.on("Sales Invoice",{
	verify: function(frm) {
		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "Sales Invoice Item",
				filters: {"parent":name}    //user is current user here
			},
			callback: function(r) {
				$.each(frm.doc.items || [], function(i, v) {
					frappe.model.set_value(v.doctype, v.name, "total_amount_before_discount", r.amount_before_discount)
					// frappe.model.set_value(v.doctype, v.name, "email", r.message.email)
					// frappe.model.set_value(v.doctype, v.name, "phone", r.message.phone)
				})
				frm.refresh_field('total_amount_before_discount');
			}
		})
	}
})

frappe.ui.form.on("Sales Invoice",{
	verify: function(frm) {
		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "Sales Invoice Item",
				filters: {"parent":name}    //user is current user here
			},
			callback: function(r) {
				$.each(frm.doc.items || [], function(i, v) {
					frappe.model.set_value(v.doctype, v.name, "total_items_discount", r.total_discount_amount)
					// frappe.model.set_value(v.doctype, v.name, "email", r.message.email)
					// frappe.model.set_value(v.doctype, v.name, "phone", r.message.phone)
				})
				frm.refresh_field('total_discount_amount');
			}
		})
	}
})



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
