frappe.ui.form.on("Stock Entry", {
  from_warehouse: function (frm) {
    if (frm.doc.from_warehouse == "المعرض الرئيسي (الكرادة) - TRUST" && frm.doc.stock_entry_type == "Material Transfer") {
      frm.set_value('naming_series', 'TR-01-.YYYY.-')

      frm.refresh_fields();
    }
    else if (frm.doc.from_warehouse == "معرض النجف الاشرف - TRUST" && frm.doc.stock_entry_type == "Material Transfer") {
        frm.set_value('naming_series', 'TR-04-.YYYY.-')
         }
         refresh_field("naming_series");
   }
 });
 frappe.ui.form.on("Stock Entry", {
   from_warehouse: function (frm) {
     if (frm.doc.from_warehouse == "مستودعات العقبة - TRUST" && frm.doc.stock_entry_type == "Material Transfer") {
       frm.set_value('naming_series', 'TR-AQ-.YYYY.-')

       frm.refresh_fields();
     }
     else if (frm.doc.from_warehouse == "مستودع خيرات دجلة - TRUST" && frm.doc.stock_entry_type == "Material Transfer") {
         frm.set_value('naming_series', 'TR-DJ.YYYY.-')
          }
          refresh_field("naming_series");
    }
  });
  frappe.ui.form.on("Stock Entry", {
    from_warehouse: function (frm) {
      if (frm.doc.from_warehouse == "مركز الصيانة - TRUST" && frm.doc.stock_entry_type == "Material Transfer") {
        frm.set_value('naming_series', 'TR-SC-.YYYY.-')

        frm.refresh_fields();
      }
      else if (frm.doc.from_warehouse == "مستودعات الزعفرانية - TRUST" && frm.doc.stock_entry_type == "Material Transfer") {
          frm.set_value('naming_series', 'TR-Z3-.YYYY.-')
           }
           refresh_field("naming_series");
     }
   });
   frappe.ui.form.on("Stock Entry", {
     from_warehouse: function (frm) {
   if (frm.doc.from_warehouse == "UMM QASR-PORT - TRUST" && frm.doc.stock_entry_type == "Material Transfer") {
       frm.set_value('naming_series', 'TR-UM-.YYYY.-')
        }
        refresh_field("naming_series");
  }
  });
  frappe.ui.form.on("Stock Entry", {
    stock_entry_type: function (frm) {
  if (frm.doc.stock_entry_type == "Material Issue") {
      frm.set_value('naming_series', 'MAT-ISU-.YYYY.-')
       }
       refresh_field("naming_series");
  }
    });
  frappe.ui.form.on("Stock Entry", {
    stock_entry_type: function (frm) {
  if (frm.doc.stock_entry_type == "Material Receipt") {
      frm.set_value('naming_series', 'MAT-RCV-.YYYY.-')
       }
       refresh_field("naming_series");
  }
    });
