// // Copyright (c) 2016, KCSC and contributors
// // For license information, please see license.txt
// /* eslint-disable */
//
// frappe.query_reports["AR-Report"] = {
// 	"filters": [
// 							// {
// 							// 	"fieldname": "ref_no",
// 							// 	"label": __("Ref. Number"),
// 							// 	"fieldtype": "Link",
// 							// 	"options": "Payment Entry",
// 							// 	"width": 100,
// 							// 	"reqd": 0,
// 							// },
// 							{
// 								"fieldname": "from",
// 								"label": __("From Date"),
// 								"fieldtype": "Date",
// 								"width": 80,
// 								"reqd": 1,
// 								"default": dateutil.year_start()
// 							 },
// 							 {
// 								"fieldname": "to",
// 								"label": __("To Date"),
// 								"fieldtype": "Date",
// 								"width": 80,
// 								"reqd": 1,
// 								"default": dateutil.year_end()
// 							},
// 						  {
// 								"fieldname": "payment_type",
// 								"label": __("Payment Type"),
// 								"fieldtype": "Select",
// 								"options": ["\n","Receive","Pay","Internal Transfer"],
// 								"width": 100,
// 								"reqd": 0,
// 							},
// 							{
// 								"fieldname": "customer_sub",
// 								"label": __("Customer Sub"),
// 								"fieldtype": "Link",
// 								"options": "Customer Sub",
// 								"width": 100,
// 								"reqd": 0,
// 							},
// 							{
// 								"fieldname": "party",
// 								"label": __("Party Name"),
// 								"fieldtype": "Data",
// 								// "options": "Sales Person",
// 								"width": 100,
// 								"reqd": 0,
// 							},
// 							{
// 								"fieldname": "mode_of_payment",
// 								"label": __("Mode of Payment"),
// 								"fieldtype": "Select",
// 								"options": ["\n","Cash","Cheque","Promissory","Cash&Cheque","Transfer"],
// 								"width": 100,
// 								"reqd": 0,
// 							},
// 							{
// 								"fieldname": "cost_center",
// 								"label": __("Cost Center"),
// 								"fieldtype": "Link",
// 								"options": "Cost Center",
// 								"width": 100,
// 								"reqd": 0,
// 							}
// 							// {
// 							// 	"fieldname": "owner",
// 							// 	"label": __("User Name"),
// 							// 	"fieldtype": "Link",
// 							// 	"options": "Employee",
// 							// 	"width": 100,
// 							// 	"reqd": 0,
// 							// },
// 							// {
// 							// 	"fieldname": "status",
// 							// 	"label": __("Status"),
// 							// 	"fieldtype": "Select",
// 							// 	"options": ["\n","Draft","Paid","Unpaid","Return","Overdue","Credit Note Issued","Submitted","Partly Paid", "Unpaid and Discounted","Partly Paid and Discounted","Overdue and Discounted","Cancelled","Internal Transfer"],
// 							// 	"width": 100,
// 							// 	"reqd": 0,
// 							// }
//
// 	]
// };


// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["AR-Report"] = {
	"filters": [
		{
			"fieldname":"report_date",
			"label": __("Posting Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.get_today()
		},
		{
			"fieldname":"range1",
			"label": __("Ageing Range 1"),
			"fieldtype": "Int",
			"default": "30",
			"reqd": 1
		},
		{
			"fieldname":"range2",
			"label": __("Ageing Range 2"),
			"fieldtype": "Int",
			"default": "60",
			"reqd": 1
		},
		{
			"fieldname":"range3",
			"label": __("Ageing Range 3"),
			"fieldtype": "Int",
			"default": "90",
			"reqd": 1
		},
		{
			"fieldname":"range4",
			"label": __("Ageing Range 4"),
			"fieldtype": "Int",
			"default": "120",
			"reqd": 1
		},
		{
			"fieldname":"cost_center",
			"label": __("Cost Center"),
			"fieldtype": "Link",
			"options": "Cost Center",
			get_query: () => {
				var company = frappe.query_report.get_filter_value('company');
				return {
					filters: {
						'company': company
					}
				}
			}
		},
		{
			"fieldname":"customer",
			"label": __("Customer"),
			"fieldtype": "Link",
			"options": "Customer"
		},
		{
			"fieldname":"customer_group",
			"label": __("Customer Group"),
			"fieldtype": "Link",
			"options": "Customer Group"
		},
		{
			"fieldname":"sales_partner",
			"label": __("Sales Partner"),
			"fieldtype": "Link",
			"options": "Sales Partner"
		},
		{
			"fieldname":"sales_person",
			"label": __("Sales Person"),
			"fieldtype": "Link",
			"options": "Sales Person"
		},
		{
			"fieldname":"customer_sub",
			"label": __("Customer Sub"),
			"fieldtype": "Link",
			"options": "Customer Sub"
		}
	],

	// onload: function(report) {
	// 	report.page.add_inner_button(__("Accounts Receivable"), function() {
	// 		var filters = report.get_values();
	// 		frappe.set_route('query-report', 'Accounts Receivable', { company: filters.company });
	// 	});
	// }
}

erpnext.utils.add_dimensions('Accounts Receivable Summary', 9);
