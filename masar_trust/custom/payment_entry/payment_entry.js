frappe.ui.form.on("Payment Entry",{ before_load:function(frm) {
  var df=frappe.meta.get_docfield("Payment Entry", "naming_series",frm.doc.name);
  df.read_only=1;
  var df=frappe.meta.get_docfield("Payment Entry", "branch",frm.doc.name);
  df.read_only=1;
  var df=frappe.meta.get_docfield("Payment Entry", "cost_center",frm.doc.name);
  df.read_only=1;
frm.refresh_fields();
}
});

frappe.ui.form.on("Payment Entry","mode_of_payment", function(frm) {
if (frm.doc.mode_of_payment == "نقدي المعرض الرئيسي (الكرادة)") {
  frm.set_value('naming_series', 'ACC-PAY1-.YYYY.-')
  frm.set_value('branch', 'المعرض الرئيسي (الكرادة)')
  frm.set_value('cost_center', '15 - المعرض الرئيسي (الكرادة) - TRUST')
  frm.refresh_fields();
}
else if (frm.doc.mode_of_payment == "نقدي معرض النجف الاشرف"){
  frm.set_value('naming_series', 'ACC-PAY4-.YYYY.-')
  frm.set_value('branch', 'معرض النجف الاشرف')
  frm.set_value('cost_center', '13 - معرض النجف الاشرف - TRUST')
  frm.refresh_fields();
}
else if (frm.doc.mode_of_payment == "نقدي صيانة" ){
  frm.set_value('naming_series', 'ACC-PAYS-.YYYY.-')
  frm.set_value('branch', 'قسم الصيانة')
  frm.set_value('cost_center', '11 - مركز الصيانة - TRUST')
  frm.refresh_fields();
}
});
