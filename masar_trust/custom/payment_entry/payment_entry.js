frappe.ui.form.on("Payment Entry",{ before_load:function(frm) {
  var df=frappe.meta.get_docfield("Payment Entry", "naming_series",frm.doc.name);
  df.read_only=1;
frm.refresh_fields();
}
});

frappe.ui.form.on("Payment Entry","mode_of_payment", function(frm) {
if (frm.doc.mode_of_payment == "نقدي المعرض الرئيسي (الكرادة)") {
  frm.set_value('naming_series', 'ACC-PAY1-.YYYY.-')
  refresh_field("naming_series");
}
else if (frm.doc.mode_of_payment == "نقدي معرض النجف الاشرف"){
  frm.set_value('naming_series', 'ACC-PAY4-.YYYY.-')
  refresh_field("naming_series");
}
else if (frm.doc.mode_of_payment == "نقدي صيانة" ){
  frm.set_value('naming_series', 'ACC-PAYS-.YYYY.-')
  refresh_field("naming_series");
}
});
