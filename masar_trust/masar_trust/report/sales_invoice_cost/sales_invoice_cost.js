// Copyright (c) 2022, KCSC and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Sales Invoice Cost"] = {
	"filters": [
							{
								"fieldname": "inv_no",
								"label": __("Sales Invoice"),
								"fieldtype": "Link",
								"options": "Sales Invoice",
								"width": 100,
								"reqd": 0,
							},
							{
								"fieldname": "from",
								"label": __("From Date"),
								"fieldtype": "Date",
								"width": 80,
								"reqd": 1,
								"default": frappe.datetime.year_start()
							 },
							 {
								"fieldname": "to",
								"label": __("To Date"),
								"fieldtype": "Date",
								"width": 80,
								"reqd": 1,
								"default": frappe.datetime.year_end()
							},
						  {
								"fieldname": "customer_name",
								"label": __("Customer ID"),
								"fieldtype": "Link",
								"options": "Customer",
								"width": 100,
								"reqd": 0,
							},
							{
								"fieldname": "customer_group",
								"label": __("Customer Group"),
								"fieldtype": "Link",
								"options": "Customer Group",
								"width": 100,
								"reqd": 0,
							},
							{
								"fieldname": "item_group",
								"label": __("Item Group"),
								"fieldtype": "Link",
								"options": "Item Group",
								"width": 100,
								"reqd": 0,
							}
	]
};
