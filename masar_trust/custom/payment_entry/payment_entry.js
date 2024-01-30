frappe.ui.form.on("Payment Entry",{ before_load:function(frm) {
  var df=frappe.meta.get_docfield("Payment Entry", "naming_series",frm.doc.name);
  df.read_only=1;
frm.refresh_fields();
}
});

frappe.ui.form.on("Payment Entry","mode_of_payment", function(frm) {
if (frm.doc.mode_of_payment == "نقدي المعرض الرئيسي (الكرادة)") {
  frm.set_value('naming_series', 'ACC-REC1-.YYYY.-')
  frm.set_value('branch', 'المعرض الرئيسي (الكرادة)')
  frm.set_value('cost_center', '15 - المعرض الرئيسي (الكرادة) - TRUST')
  frm.refresh_fields();
}
else if (frm.doc.mode_of_payment == "نقدي معرض النجف الاشرف"){
  frm.set_value('naming_series', 'ACC-REC4-.YYYY.-')
  frm.set_value('branch', 'معرض النجف الاشرف')
  frm.set_value('cost_center', '13 - معرض النجف الاشرف - TRUST')
  frm.refresh_fields();
}
else if (frm.doc.mode_of_payment == "نقدي صيانة" ){
  frm.set_value('naming_series', 'ACC-RECS-.YYYY.-')
  frm.set_value('branch', 'قسم الصيانة')
  frm.set_value('cost_center', '11 - مركز الصيانة - TRUST')
  frm.refresh_fields();
}
else if (frm.doc.mode_of_payment == "Cheque" ){
  frm.set_value('naming_series', 'ACC-PAYC-.YYYY.-')
  frm.refresh_fields();
}
});
////////////   mahmoud code 
////////////// to calculate the Total Allocated Amount from Unallocated Amount 
frappe.ui.form.on("Payment Entry", {
  base_received_amount: function(frm) {
    frappe.call({
      method: "masar_trust.custom.payment_entry.payment_entry.received_amount_cal",
      args: {
        received_amount: frm.doc.received_amount,
        target_exchange_rate: frm.doc.target_exchange_rate
      },
      callback: function(r) {
        frm.set_value("paid_amount", r.message);
      }
    });
  },
  after_save: function(frm) {
    if (frm.doc.paid_amount != frm.doc.unallocated_amount) {
      frappe.msgprint("Please Check The Received Amount Value. It's Not Correct");
    }
  },
  validate: function(frm) {
    if (frm.doc.paid_amount != frm.doc.unallocated_amount) {
      frappe.msgprint("Please Check The Received Amount Value. It's Not Correct");
    }
  }
});
