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
	if(filters.get('inv_no')):conditions += f" AND tsii.parent LIKE '%{filters.get('inv_no')}' "
	if(filters.get('item_group')):conditions += f" AND tsii.item_group='{filters.get('item_group')}' "
	if(filters.get('customer_name')):conditions += f" AND tsi.customer_name LIKE '%{filters.get('customer_name')}' "

	#SQL Query
	data = frappe.db.sql(f""" Select tsii.parent as `Sales Invoice`, tsi.posting_date as `Posting Date`, tsi.customer_name as `Customer Name`,tsii.item_code as `Item Code` ,tsii.item_name as `Item Name`,tsii.description as `Item Description`, tsii.item_group as `Item Group` ,tdvn.parent as `Delivery Note`,tsii.qty as `QTY`, tsii.rate as `Sales Rate`, tsii.net_rate as `Net Sales Rate Per Unit`,
IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference,tdvn.stock_value_difference)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference,tdvn.stock_value_difference)) / tsii.qty as `Cost Per Unit`,tsii.amount as `Sales Amount`, tsii.net_amount as `Net Sales Amount`,
tdvn.stock_value_difference `Cost By Delivery Note` ,tsle.stock_value_difference `Cost By Sales Invoice`,
IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference,tdvn.stock_value_difference)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference,tdvn.stock_value_difference)) as `Invoiced Cost`,
(tsii.net_amount + IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference,tdvn.stock_value_difference)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference,tdvn.stock_value_difference))) as `Gross Profit Amount`,
Round((tsii.net_amount + IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference,tdvn.stock_value_difference)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference,tdvn.stock_value_difference))) / tsii.net_amount * 100,3) as `Gross Profit Percentage`, tsii.discount_amount as `Discount Per Unit`,
(tsii.discount_amount * tsii.qty) as `Total Discount Amount`,(tsii.amount - tsii.net_amount) as `Additional Discount Amount`
From `tabSales Invoice Item` tsii
left JOIN `tabSales Invoice` tsi on  tsii.parent = tsi.name
Left Join `tabStock Ledger Entry` tsle on tsii.name = tsle.voucher_detail_no and tsii.parent = tsle.voucher_no
left join (select tdni.parent,tdni.name,(tsle2.stock_value_difference / tsle2.actual_qty) as UnitCost,tsle2.stock_value_difference
		   from `tabDelivery Note Item` tdni
		   inner join `tabStock Ledger Entry` tsle2 on tdni.name = tsle2.voucher_detail_no and tdni.parent = tsle2.voucher_no) as tdvn on tsii.delivery_note =tdvn.parent and tsii.dn_detail = tdvn.name
Where tsii.docstatus =1 AND
							(tsi.posting_date BETWEEN '{_from}' AND '{to}')
							 {conditions};""")
	return data

def get_columns():
	return [
	   "Sales Invoice: Link/Sales Invoice:200",
	   "Posting Date: Date/ Posting Date:120",
	   "Customer Name: Link/Customer:120",
	   "Item Code: Link/Item:200",
	   "Item Name: Link/Item:200",
	   "Item Description: Data:200",
	   "Item Group: Data:200",
	   "Delivery Note: Link/Delivery Note:200",
	   "QTY: Data:150",
	   "Sales Rate: Data:200",
	   "Net Sales Rate Per Unit: Data:200",
	   "Cost Per Unit: Data:200",
	   "Sales Amount: Data:200",
	   "Net Sales Amount: Data:200",
	   "Cost By Delivery Note: Data:200",
	   "Cost By Sales Invoice: Data:200",
	   "Invoice Cost: Data:200",
	   #"Unit Cost: Data:200",
	   "Gross Profit Amount: Data:200",
	   "Gross Profit Percentage: Percent:200",
	   "Discount Per Unit: Data:200",
	   "Total Discount Amount: Data:200",
	   "Additional Discount Amount: Data:200"

	]
