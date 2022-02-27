# Copyright (c) 2013, KCSC and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
from frappe import _
import frappe

def execute(filters=None):
	return get_columns(), get_data(filters)

def get_data(filters):
	_from, to = filters.get('from'), filters.get('to') #date range
    #Conditions
	conditions = " AND 1=1 "
	#if(filters.get('ref_no')):conditions += f" AND tpe.name LIKE '%{filters.get('ref_no')}' "
	if(filters.get('payment_type')):conditions += f" AND payment_type='{filters.get('payment_type')}' "
	if(filters.get('party_type')):conditions += f" AND party_type='{filters.get('party_type')}' "
	if(filters.get('party')):conditions += f" AND tpe.party LIKE '%{filters.get('party')}' "
	if(filters.get('mode_of_payment')):conditions += f" AND tpe.mode_of_payment='{filters.get('mode_of_payment')}' "
	#if(filters.get('cost_center')):conditions += f" AND tpe.cost_center LIKE '%{filters.get('cost_center')}' "
	if(filters.get('cost_center')):conditions += f" AND tpe.cost_center='{filters.get('cost_center')}' "
	#if(filters.get('is_return')):conditions += f" AND is_return='{filters.get('is_return')}' "
	#if(filters.get('status')):conditions += f" AND tpe.status='{filters.get('status')}' "

	#SQL Query
	# data = frappe.db.sql(f"""SELECT name, payment_type, party_type, party, mode_of_payment, posting_date, paid_amount,
	#                          paid_from_account_balance, paid_to_account_currency, total_cheques_amount, status, owner
    #                              FROM `tabPayment Entry`
	# 						WHERE (posting_date BETWEEN '{_from}' AND '{to}')
	# 						 {conditions};""")

	data = frappe.db.sql(f"""SELECT tpe.name, tpe.payment_type, tpe.party, tpe.mode_of_payment, tpe.customer_sub, tpe.paid_amount, tpe.cost_center
							FROM `tabPayment Entry` tpe
							LEFT Join `tabCustomer` tc ON tpe.party_name = tc.name
							WHERE tc.customer_group != 'Employees' AND (posting_date BETWEEN '{_from}' AND '{to}')
							 {conditions};""")
	return data

def get_columns():
	return [
	   "Name: Link/Payment Entry:200",
	   "Payment Type: Data:120",
	   # "Party Type: Data:150",
	   "Party Name: Link/Customer:200",
	   "Mode of Payment: Data:200",
	   "Customer Sub: Link/Customer Sub:200",
	   "Paid Amount: Currency:120",
	   # "Account Balance: Currency:150",
	   # "Account Currency: Currency:150",
	   #"Total Cheques Amount: Currency:200",
	   "Cost Center: Data:200"
	   #"Status:150",
	   #"User:200"
	]
