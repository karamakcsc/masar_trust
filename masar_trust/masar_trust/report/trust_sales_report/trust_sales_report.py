# Copyright (c) 2022, KCSC and contributors
# For license information, please see license.txt

# import frappe

from __future__ import unicode_literals
from frappe import _
import frappe

def execute(filters=None):
	return get_columns(), get_data(filters)

def get_data(filters):
	_from, to = filters.get('from'), filters.get('to') #date range
    #Conditions
	conditions = " AND 1=1 "
	if(filters.get('inv_no')):conditions += f" AND tsi.name LIKE '%{filters.get('inv_no')}' "
	if(filters.get('invoice_type')):conditions += f" AND tsi.invoice_type='{filters.get('invoice_type')}' "
	if(filters.get('customer_name')):conditions += f" AND tsi.customer_name LIKE '%{filters.get('customer_name')}' "
	if(filters.get('customer_sub')):conditions += f" AND tsi.customer_sub LIKE '%{filters.get('customer_sub')}' "
	if(filters.get('sales_person')):conditions += f" AND tst.sales_person='{filters.get('sales_person')}' "
	if(filters.get('is_return')):conditions += f" AND tsi.is_return='{filters.get('is_return')}' "
	if(filters.get('status')):conditions += f" AND tsi.status='{filters.get('status')}' "

	#SQL Query
	data = frappe.db.sql(f"""Select tsi.name, tsi.branch, tsi.customer_name, tsi.net_total, tsi.total_taxes_and_charges, tsi.grand_total,
									tsi.posting_date,tsi.is_return,
									IF(ISNULL(tst.sales_person) =0 ,tst.sales_person ,''), tsi.customer_sub, tsi.status, tsi.owner
							FROM `tabSales Invoice` tsi
							LEFT Join `tabSales Team` tst ON tsi.name =tst.parent and tst.parenttype = 'Sales Invoice'
							WHERE (posting_date BETWEEN '{_from}' AND '{to}')
							 {conditions};""")
	return data

def get_columns():
	return [
	   "Name: Link/Sales Invoice:200",
	   "Branch: Data:100",
	   "Customer Name: Link/Customer:200",
	   "Total: Currency:120",
	   "Total Tax: Currency:120",
	   "Grand Total: Currency:120",
	   "Posting Date: Date/Posting Date:120",
	   #"Posting Time: Time/Posting Time:100",
	   "Is Return: Check/Is Return:130",
	   "Sales Person: Link/Sales Person:150",
	   "Customer Sub",
	   "User:150",
	   "Status:150"
	]
