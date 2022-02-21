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

// frappe.ui.form.on("Sales Invoice",{ before_load:function(frm) {
//  var df=frappe.meta.get_docfield("Sales Invoice", "naming_series",frm.doc.name);
//  df.read_only=1;
// frm.refresh_fields();
// }
// });

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
