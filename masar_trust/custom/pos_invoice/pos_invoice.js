frappe.ui.form.on("POS Invoice",{ before_load:function(frm) {
  var df=frappe.meta.get_docfield("POS Invoice", "naming_series",frm.doc.name);
  df.read_only=1;
frm.refresh_fields();
}
});

frappe.ui.form.on("POS Invoice","pos_profile", function(frm) {
if (frm.doc.pos_profile == "المعرض الرئيسي (الكرادة)") {
  frm.set_value('naming_series', 'ACC-PSINV1-.YYYY.-')
  refresh_field("naming_series");
}
else if (frm.doc.pos_profile == "معرض النجف الاشرف") {
  frm.set_value('naming_series', 'ACC-PSINV4-.YYYY.-')
  refresh_field("naming_series");
}
});
