// Copyright (c) 2023, KCSC and contributors
// For license information, please see license.txt

frappe.ui.form.on('Discount Document', {
	// refresh: function(frm) {

	// }
});


frappe.ui.form.on("Discount Document", {
  branch: function (frm) {
    if (frm.doc.branch == "المعرض الرئيسي (الكرادة)") {
    frm.set_value('naming_series', 'DIS1-.YYYY.-')
    }
    else if (frm.doc.branch == "معرض النجف الاشرف") {
    frm.set_value('naming_series', 'DIS4-.YYYY.-')
     }
     refresh_field("naming_series");
  }
});
