// Copyright (c) 2022, KCSC and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Trust Sales Report"] = {
	"filters": [
							{
								"fieldname": "inv_no",
								"label": __("ID"),
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
								"default": dateutil.year_start()
							 },
							 {
								"fieldname": "to",
								"label": __("To Date"),
								"fieldtype": "Date",
								"width": 80,
								"reqd": 1,
								"default": dateutil.year_end()
							},
							{
								"fieldname": "invoice_type",
								"label": __("Invoice Type"),
								"fieldtype": "Select",
								"options": ["\n","Cash","Credit"],
								"width": 100,
								"reqd": 0,
							},
							{
								"fieldname": "customer_name",
								"label": __("Customer Name"),
								"fieldtype": "Link",
								"options": "Customer",
								"width": 100,
								"reqd": 0,
							},
							// {
							// 	"fieldname": "customer_description",
							// 	"label": __("Customer Description"),
							// 	"fieldtype": "Data",
							// 	//"options": "Customer",
							// 	"width": 100,
							// 	"reqd": 0,
							// },
							// {
							// 	"fieldname": "grand_total",
							// 	"label": __("Grand Total"),
							// 	"fieldtype": "Data",
							// 	"width": 100,
							// 	"reqd": 0,
							// },
							// {
							// 	"fieldname": "total",
							// 	"label": __("Total"),
							// 	"fieldtype": "Data",
							// 	"width": 100,
							// 	"reqd": 0,
							// },
							// {
							// 	"fieldname": "base_total_taxes_and_charges",
							// 	"label": __("Total Tax"),
							// 	"fieldtype": "Data",
							// 	"width": 100,
							// 	"reqd": 0,
							// },
							// {
							// 	"fieldname": "posting_time",
							// 	"label": __("Posting Time"),
							// 	"fieldtype": "Time",
							// 	"width": 100,
							// 	"reqd": 0,
							// },
							{
								"fieldname": "sales_person",
								"label": __("Sales Persone"),
								"fieldtype": "Link",
								"options": "Sales Person",
								"width": 100,
								"reqd": 0,
							},
							{
								"fieldname": "customer_sub",
								"label": __("Customer Sub"),
								"fieldtype": "Link",
								"options": "Customer Sub",
								"width": 100,
								"reqd": 0,
							},
							// {
							// 	"fieldname": "owner",
							// 	"label": __("User Name"),
							// 	"fieldtype": "Link",
							// 	"options": "User",
							// 	"width": 100,
							// 	"reqd": 0,
							// },
							{
								"fieldname": "status",
								"label": __("Status"),
								"fieldtype": "Select",
								"options": ["\n","Draft","Paid","Unpaid","Return","Overdue","Credit Note Issued","Submitted","Partly Paid", "Unpaid and Discounted","Partly Paid and Discounted","Overdue and Discounted","Cancelled","Internal Transfer"],
								"width": 100,
								"reqd": 0,
							},
							{
								"fieldname": "is_return",
								"label": __("Is Return"),
								"fieldtype": "Check",
								//"options": "Is Return",
								"width": 100,
								"reqd": 0,
							}

	]
};
