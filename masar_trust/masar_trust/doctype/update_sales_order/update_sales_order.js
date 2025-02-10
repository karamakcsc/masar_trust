// // Copyright (c) 2025, KCSC and contributors
// // For license information, please see license.txt

// frappe.ui.form.on("Update Sales Order", {
//     setup: function(frm) {
//         filter_field(frm);
//     },
//     refresh: function(frm) {
//         filter_field(frm);
//     },
//     onload: function(frm) {
//         filter_field(frm);
//     },
// });


// function filter_field(frm) {
//     frm.set_query('sales_order', 'sales_orders', function() {
//         return {
//             filters: [
//                 ['Sales Order', 'docstatus', '=', 1],
//                 ['Sales Order', 'status', 'not in', ['Completed', 'Closed']]
//             ]
//         };
//     });
// }