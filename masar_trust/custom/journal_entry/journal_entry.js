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
