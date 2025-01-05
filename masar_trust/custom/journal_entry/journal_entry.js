// frappe.ui.form.on("Journal Entry",{ before_load:function(frm) {
//   var df=frappe.meta.get_docfield("Journal Entry", "naming_series",frm.doc.name);
//   df.read_only=1;
// frm.refresh_fields();
// }
// });
/// Series Selection///
frappe.ui.form.on("Journal Entry","voucher_type", function(frm) {

});
frappe.ui.form.on("Journal Entry" , {
  refresh: function(frm){
    GetSeries(frm);
  }, 
  onload:function(frm){
    GetSeries(frm);
  } ,
  setup: function(frm){
    GetSeries(frm);
  } ,
  voucher_type:function(frm){
    GetSeries(frm);
  }
});

frappe.ui.form.on("Journal Entry","refresh", function(frm) {
     frm.toggle_display("finance_book", false);
     });

     frappe.ui.form.on('Journal Entry', {
       Validate: function(frm) {
         $.each(frm.doc.accounts, function(i, d) {
           d.cost_center = frm.doc.cost_center;
           d.customer_sub = frm.doc.customer_sub;
           d.project = frm.doc.project;
         });
       }
     });


     frappe.ui.form.on('Journal Entry', {
       cost_center: function(frm) {
         $.each(frm.doc.accounts, function(i, d) {
           d.cost_center = frm.doc.cost_center;
           d.customer_sub = frm.doc.customer_sub;
           d.project = frm.doc.project;
         });
       }
     });


     frappe.ui.form.on("Journal Entry Account", "accounts_add", function(frm, cdt, cdn) {
         var d = locals[cdt][cdn];

             if(frm.doc.cost_center != ""){
                 d.cost_center = frm.doc.cost_center;
                 d.customer_sub = frm.doc.customer_sub;
                 d.project = frm.doc.project;
             }
       });
//

function GetSeries(frm){
  if(frm.doc.__islocal === 1 ) {
  if (frm.doc.voucher_type == "Cash Entry-Baghdad") {
    frm.set_value('naming_series', 'ACC-BC-.YYYY.-')
    refresh_field("naming_series");
  }
  else if (frm.doc.voucher_type == "Depreciation Entry") {
    frm.set_value('naming_series', 'ACC-DP-.YYYY.-')
    refresh_field("naming_series");
  }
  else if (frm.doc.voucher_type == "Discount Entry") {
    frm.set_value('naming_series', 'ACC-DIS-.YYYY.-')
    refresh_field("naming_series");
  }
  else if (frm.doc.voucher_type == "Bank Entry") {
    frm.set_value('naming_series', 'ACC-BE-.YYYY.-')
    refresh_field("naming_series");
  }
  else {
    frm.set_value('naming_series', 'ACC-JV-.YYYY.-')
    refresh_field("naming_series");
    }
}
}