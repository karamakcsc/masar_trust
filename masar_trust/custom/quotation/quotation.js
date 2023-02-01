//////////////////////////////////////////////////////////////////////////////////////////////
frappe.ui.form.on("Quotation Item", "qty", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
       if (d.item_code)  {
         d.total_discount_amount = flt(d.discount_amount * d.qty)
         cur_frm.refresh_field();
       }
});
frappe.ui.form.on("Quotation Item", "discount_amount", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
      if (d.item_code)  {
        d.total_discount_amount = flt(d.discount_amount * d.qty)
        cur_frm.refresh_field();
      }
});
frappe.ui.form.on("Quotation Item", "rate", function(frm, cdt, cdn) {
		  var d = locals[cdt][cdn];
      if (d.item_code)  {
        d.total_discount_amount = flt(d.discount_amount * d.qty)
        cur_frm.refresh_field();
      }
});
//////////////////////////////////////////////////////////////////////////////////
frappe.ui.form.on("Quotation Item", "rate", function(frm, cdt, cdn) {
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

frappe.ui.form.on("Quotation Item", "qty", function(frm, cdt, cdn) {
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
frappe.ui.form.on("Quotation Item", "discount_amount", function(frm, cdt, cdn) {
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
frappe.ui.form.on("Quotation Item", "rate", function(frm, cdt, cdn) {
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
frappe.ui.form.on("Quotation Item", "discount_amount", function(frm, cdt, cdn) {
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
frappe.ui.form.on("Quotation Item", "qty", function(frm, cdt, cdn) {
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

frappe.ui.form.on('Quotation Item', {
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
frappe.ui.form.on('Quotation Item', {
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
