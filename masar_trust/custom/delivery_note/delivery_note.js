frappe.ui.form.on("Delivery Note","refresh", function(frm) {
     //frm.toggle_display("naming_series", false);
     frm.toggle_display("customer_po_details", false);
     frm.toggle_display("currency_and_price_list", false);
     frm.toggle_display("taxes_section", false);
     frm.toggle_display("section_break_49", false);
     //frm.toggle_display("more_info", false);
     frm.toggle_display("printing_details", false);
     frm.toggle_display("subscription_section", false);
     frm.toggle_display("sales_team_section_break", false);
     frm.toggle_display("total", false);
     frm.toggle_display("base_total", false);
     frm.toggle_display("total_net_weight", false);
     frm.toggle_display("total_net_weight", false);
     frm.toggle_display("base_net_total", false);
     frm.toggle_display("taxes_section", false);
     frm.toggle_display("sec_tax_breakup", false);
     frm.toggle_display("section_break_41", false);
     frm.toggle_display("section_break_44", false);
     frm.toggle_display("grand_total", false);
     frm.toggle_display("totals", false);
});

frappe.ui.form.on("Delivery Note",{ before_load:function(frm) {
 var df=frappe.meta.get_docfield("Delivery Note", "naming_series",frm.doc.name);
 df.read_only=1;
frm.refresh_fields();
}
});

frappe.ui.form.on("Delivery Note", {
  branch: function (frm) {
    if (frm.doc.branch == "المعرض الرئيسي (الكرادة)") {
    frm.set_value('naming_series', 'MAT-DN1-.YYYY.-')
    }
    else if (frm.doc.branch == "معرض النجف الاشرف") {
    frm.set_value('naming_series', 'MAT-DN4-.YYYY.-')
     }
     refresh_field("naming_series");
  },
  is_return: function (frm) {
    if (frm.doc.branch == "المعرض الرئيسي (الكرادة)" && frm.doc.is_return == 1) {
    frm.set_value('naming_series', 'MAT-DN1-RET-.YYYY.-')
    }
    else if (frm.doc.branch == "معرض النجف الاشرف" && frm.doc.is_return == 1) {
    frm.set_value('naming_series', 'MAT-DN4-RET-.YYYY.-')
     }
    refresh_field("naming_series");
  }
});

frappe.ui.form.on("Delivery Note",{ before_load:function(frm) {
var df=frappe.meta.get_docfield("Delivery Note Item", "uom",frm.doc.name);
df.hidden=1;
var df=frappe.meta.get_docfield("Delivery Note Item", "rate",frm.doc.name);
df.hidden=1;
var df=frappe.meta.get_docfield("Delivery Note Item", "amount",frm.doc.name);
df.hidden=1;
frm.refresh_fields();
}
});

frappe.ui.form.on('Delivery Note', {
  Validate: function(frm) {
    $.each(frm.doc.items, function(i, d) {
      d.cost_center = frm.doc.cost_center;
      d.customer_sub = frm.doc.customer_sub;
    });
  }
});


frappe.ui.form.on('Delivery Note', {
  cost_center: function(frm) {
    $.each(frm.doc.items, function(i, d) {
      d.cost_center = frm.doc.cost_center;
      d.customer_sub = frm.doc.customer_sub;
      d.project = frm.doc.project_code;
    });
  }
});
frappe.ui.form.on('Delivery Note', {
  cost_center: function(frm) {
    $.each(frm.doc.items, function(i, d) {
      d.customer_sub = frm.doc.customer_sub;
      d.cost_center = frm.doc.cost_center;
      d.project = frm.doc.project_code;
    });
  }
});

frappe.ui.form.on("Delivery Note Item", "items_add", function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];

        if(frm.doc.cost_center != ""){
            d.cost_center = frm.doc.cost_center;
            d.customer_sub = frm.doc.customer_sub;
            d.project = frm.doc.project_code;
        }
  });

  frappe.ui.form.on("Delivery Note", {
  refresh: function(frm) {
  frm.doc.project = frm.doc.project_code;
  }
  });
