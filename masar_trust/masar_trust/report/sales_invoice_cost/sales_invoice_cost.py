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
	if(filters.get('customer_group')):conditions += f" AND tc.customer_group='{filters.get('customer_group')}' "

	#SQL Query
	# data = frappe.db.sql(f""" Select `Sales Invoice`,`Posting Date`,`Customer Name`,`Item Code` ,`Item Name`,
	#       `Item Description`, `Item Group` ,`Delivery Note`,`Invoice QTY`,`Delivery Note QTY`,`Sales Rate`,`Net Sales Rate Per Unit`, IF(`Cost Per Unit`>=0,`Cost Per Unit`,-1 * `Cost Per Unit`) `Cost Per Unit`,`Sales Amount`, `Net Sales Amount`,`Net Sales Amount`,
	#                                                  `Cost By Delivery Note` ,`Cost By Sales Invoice`,`Invoiced Cost`,`Gross Profit Amount`,`Gross Profit Percentage`,
	#                                                  `Discount Per Unit`,`Total Discount Amount`,`Additional Discount Amount`
	# 												 From
	# 												 (
	# 												 Select tsii.parent as `Sales Invoice`, tsi.posting_date as `Posting Date`, tsi.customer_name as `Customer Name`,tsii.item_code as `Item Code` ,tsii.item_name as `Item Name`,
	#                                                  tsii.description as `Item Description`, tsii.item_group as `Item Group` ,tdvn.parent as `Delivery Note`,tsii.qty as `Invoice QTY`,tdvn.qty as `Delivery Note QTY`, tsii.rate as `Sales Rate`, tsii.net_rate as `Net Sales Rate Per Unit`,
	#                                                   Round(IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
	#                                                   tdvn.stock_value_difference/tdvn.qty)),3)  as `Cost Per Unit`,
	#                                                  tsii.amount as `Sales Amount`, tsii.net_amount as `Net Sales Amount`,Round(IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
	#                                                   tdvn.stock_value_difference/tdvn.qty)) * tsii.qty,3) `Cost By Delivery Note` ,tsle.stock_value_difference `Cost By Sales Invoice`,
	#                                                   Round(IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
	#                                                   tdvn.stock_value_difference/tdvn.qty)) * tsii.qty,3) as `Invoiced Cost`,(tsii.net_amount + IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference,tdvn.stock_value_difference)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,
	#                                                   tsle.stock_value_difference,tdvn.stock_value_difference))) as `Gross Profit Amount`,
	#                                                  Round((tsii.net_amount + IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference,tdvn.stock_value_difference)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference,tdvn.stock_value_difference))) / tsii.net_amount * 100,3) as `Gross Profit Percentage`,
	#                                                  tsii.discount_amount as `Discount Per Unit`,(tsii.discount_amount * tsii.qty) as `Total Discount Amount`,(tsii.amount - tsii.net_amount) as `Additional Discount Amount`
	#                                                  From `tabSales Invoice Item` tsii
	#                                                  left JOIN `tabSales Invoice` tsi on  tsii.parent = tsi.name
	#                                                  Left Join `tabStock Ledger Entry` tsle on tsii.name = tsle.voucher_detail_no and tsii.parent = tsle.voucher_no
	#                                                  left join (select tdni.parent,tdni.name,(tsle2.stock_value_difference / tsle2.actual_qty) as UnitCost,tsle2.stock_value_difference,qty
	#                                                  from `tabDelivery Note Item` tdni
	#                                                  inner join `tabStock Ledger Entry` tsle2 on tdni.name = tsle2.voucher_detail_no and tdni.parent = tsle2.voucher_no) as tdvn on tsii.delivery_note =tdvn.parent and tsii.dn_detail = tdvn.name
	#                                                  Where tsii.docstatus =1  AND (tsi.posting_date BETWEEN '{_from}' AND '{to}')
	# 						 {conditions}) as t;""")

	data = frappe.db.sql(f""" Select tsii.parent as `Sales Invoice`, tsi.posting_date as `Posting Date`, tsi.customer as `Customer ID`,tc.customer_group AS `Customer Group`,tsi.customer_sub AS `Customer Sub`, tsii.item_code as `Item Code` ,tsii.item_name as `Item Name`,
								tsii.description as `Item Description`, tsii.item_group as `Item Group` ,tdvn.parent as `Delivery Note`,tsii.qty as `Invoice QTY`,tdvn.qty as `Delivery Note QTY`, tsii.rate as `Sales Rate`, tsii.net_rate as `Net Sales Rate Per Unit`,
								Round(IF(IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)) >=0, IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)), -1 * (IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)))),3)  as `Cost Per Unit`,
								tsii.amount as `Sales Amount`, tsii.net_amount as `Net Sales Amount`,Round(IF(IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)) >=0, IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)), -1 * (IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)))) *  tsii.qty, 3)`Invoice Cost` ,Round((tsii.net_amount - (IF(IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)) >=0, IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)), -1 * (IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)))) *  tsii.qty )),3) as `Gross Profit Amount`,
								(((tsii.net_amount - (IF(IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)) >=0, IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)), -1 * (IF(IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference /tsle.actual_qty ,tdvn.stock_value_difference/tdvn.qty)IS NULL,0,IF(tdvn.stock_value_difference IS NULL,tsle.stock_value_difference/tsle.actual_qty ,
								tdvn.stock_value_difference/tdvn.qty)))) *  tsii.qty )) /tsii.net_amount) * 100)  as `Gross Profit Percentage`,
								tsii.discount_amount as `Discount Per Unit`,(tsii.discount_amount * tsii.qty) as `Total Discount Amount`,(tsii.amount - tsii.net_amount) as `Additional Discount Amount`
								, tst.sales_person AS `Sales Person`
								From `tabSales Invoice Item` tsii
								left JOIN `tabSales Invoice` tsi on  tsii.parent = tsi.name
								Left Join `tabStock Ledger Entry` tsle on tsii.name = tsle.voucher_detail_no and tsii.parent = tsle.voucher_no
								left join (select tdni.parent,tdni.name,(tsle2.stock_value_difference / tsle2.actual_qty) as UnitCost,tsle2.stock_value_difference,qty
								from `tabDelivery Note Item` tdni
								inner join `tabStock Ledger Entry` tsle2 on tdni.name = tsle2.voucher_detail_no and tdni.parent = tsle2.voucher_no) as tdvn on tsii.delivery_note =tdvn.parent and tsii.dn_detail = tdvn.name
								LEFT JOIN `tabCustomer` tc ON tsi.customer = tc.name
								LEFT JOIN `tabSales Team` tst ON tst.parent = tsi.name
								Where tsii.docstatus =1 AND
							(tsi.posting_date BETWEEN '{_from}' AND '{to}')
							 {conditions};""")
	return data





	# return data

def get_columns():
	return [
	   "Sales Invoice: Link/Sales Invoice:200",
	   "Posting Date: Date/ Posting Date:120",
	   "Customer ID: Link/Customer:120",
	   "Customer Group: Link/Customer Group:120", 
       "Customer Sub: Link/Customer Sub:120",
	   "Item Code: Link/Item:200",
	   "Item Name: Link/Item:200",
	   "Item Description: Data:200",
	   "Item Group: Data:200",
	   "Delivery Note: Link/Delivery Note:200",
	   "Invoice QTY: Data:150",
	   "Delivery Note QTY: Data:150",
	   "Sales Rate: Data:200",
	   "Net Sales Rate Per Unit: Data:200",
	   "Cost Per Unit: Data:200",
	   "Sales Amount: Data:200",
	   "Net Sales Amount: Data:200",
	   "Invoice Cost: Data:200",
	   # "Cost By Sales Invoice: Data:200",
	   # "Invoice Cost: Data:200",
	   #"Unit Cost: Data:200",
	   "Gross Profit Amount: Data:200",
	   "Gross Profit Percentage: Percent:200",
	   "Discount Per Unit: Data:200",
	   "Total Discount Amount: Data:200",
	   "Additional Discount Amount: Data:200", 
	   "Sales Person: Link/Sales Person:120"

	]
