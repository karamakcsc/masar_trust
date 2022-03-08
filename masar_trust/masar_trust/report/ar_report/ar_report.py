# # Copyright (c) 2013, KCSC and contributors
# # For license information, please see license.txt
#
# from __future__ import unicode_literals
# from frappe import _
# import frappe
#
# def execute(filters=None):
# 	return get_columns(), get_data(filters)
#
# def get_data(filters):
# 	_from, to = filters.get('from'), filters.get('to') #date range
#     #Conditions
# 	conditions = " AND 1=1 "
# 	#if(filters.get('ref_no')):conditions += f" AND tpe.name LIKE '%{filters.get('ref_no')}' "
# 	if(filters.get('payment_type')):conditions += f" AND payment_type='{filters.get('payment_type')}' "
# 	if(filters.get('party_type')):conditions += f" AND party_type='{filters.get('party_type')}' "
# 	if(filters.get('party')):conditions += f" AND tpe.party LIKE '%{filters.get('party')}' "
# 	if(filters.get('mode_of_payment')):conditions += f" AND tpe.mode_of_payment='{filters.get('mode_of_payment')}' "
# 	#if(filters.get('cost_center')):conditions += f" AND tpe.cost_center LIKE '%{filters.get('cost_center')}' "
# 	if(filters.get('cost_center')):conditions += f" AND tpe.cost_center='{filters.get('cost_center')}' "
# 	#if(filters.get('is_return')):conditions += f" AND is_return='{filters.get('is_return')}' "
# 	#if(filters.get('status')):conditions += f" AND tpe.status='{filters.get('status')}' "
#
# 	#SQL Query
# 	# data = frappe.db.sql(f"""SELECT name, payment_type, party_type, party, mode_of_payment, posting_date, paid_amount,
# 	#                          paid_from_account_balance, paid_to_account_currency, total_cheques_amount, status, owner
#     #                              FROM `tabPayment Entry`
# 	# 						WHERE (posting_date BETWEEN '{_from}' AND '{to}')
# 	# 						 {conditions};""")
#
# 	data = frappe.db.sql(f"""SELECT tpe.name, tpe.payment_type, tpe.party, tpe.mode_of_payment, tpe.customer_sub, tpe.paid_amount, tpe.cost_center
# 							FROM `tabPayment Entry` tpe
#
# 							WHERE tpe.cost_center != 'Amman - TRUST' AND (posting_date BETWEEN '{_from}' AND '{to}')
# 							 {conditions};""")
# 	return data
#
# def get_columns():
# 	return [
# 	   "Name: Link/Payment Entry:200",
# 	   "Payment Type: Data:120",
# 	   # "Party Type: Data:150",
# 	   "Party Name: Link/Customer:200",
# 	   "Mode of Payment: Data:200",
# 	   "Customer Sub: Link/Customer Sub:200",
# 	   "Paid Amount: Currency:120",
# 	   # "Account Balance: Currency:150",
# 	   # "Account Currency: Currency:150",
# 	   #"Total Cheques Amount: Currency:200",
# 	   "Cost Center: Data:200"
# 	   #"Status:150",
# 	   #"User:200"
# 	]



# # Copyright (c) 2013, KCSC and contributors
# # For license information, please see license.txt
#
# from __future__ import unicode_literals
# from frappe import _
# import frappe
#
# def execute(filters=None):
# 	return get_columns(), get_data(filters)
#
# def get_data(filters):
# 	_from, to = filters.get('from'), filters.get('to') #date range
#     #Conditions
# 	conditions = " AND 1=1 "
# 	#if(filters.get('ref_no')):conditions += f" AND tpe.name LIKE '%{filters.get('ref_no')}' "
# 	if(filters.get('payment_type')):conditions += f" AND payment_type='{filters.get('payment_type')}' "
# 	if(filters.get('party_type')):conditions += f" AND party_type='{filters.get('party_type')}' "
# 	if(filters.get('party')):conditions += f" AND tpe.party LIKE '%{filters.get('party')}' "
# 	if(filters.get('mode_of_payment')):conditions += f" AND tpe.mode_of_payment='{filters.get('mode_of_payment')}' "
# 	#if(filters.get('cost_center')):conditions += f" AND tpe.cost_center LIKE '%{filters.get('cost_center')}' "
# 	if(filters.get('cost_center')):conditions += f" AND tpe.cost_center='{filters.get('cost_center')}' "
# 	#if(filters.get('is_return')):conditions += f" AND is_return='{filters.get('is_return')}' "
# 	#if(filters.get('status')):conditions += f" AND tpe.status='{filters.get('status')}' "
#
# 	#SQL Query
# 	# data = frappe.db.sql(f"""SELECT name, payment_type, party_type, party, mode_of_payment, posting_date, paid_amount,
# 	#                          paid_from_account_balance, paid_to_account_currency, total_cheques_amount, status, owner
#     #                              FROM `tabPayment Entry`
# 	# 						WHERE (posting_date BETWEEN '{_from}' AND '{to}')
# 	# 						 {conditions};""")
#
# 	data = frappe.db.sql(f"""SELECT tpe.name, tpe.payment_type, tpe.party, tpe.mode_of_payment, tpe.customer_sub, tpe.paid_amount, tpe.cost_center
# 							FROM `tabPayment Entry` tpe
#
# 							WHERE tpe.cost_center != 'Amman - TRUST' AND (posting_date BETWEEN '{_from}' AND '{to}')
# 							 {conditions};""")
# 	return data
#
# def get_columns():
# 	return [
# 	   "Name: Link/Payment Entry:200",
# 	   "Payment Type: Data:120",
# 	   # "Party Type: Data:150",
# 	   "Party Name: Link/Customer:200",
# 	   "Mode of Payment: Data:200",
# 	   "Customer Sub: Link/Customer Sub:200",
# 	   "Paid Amount: Currency:120",
# 	   # "Account Balance: Currency:150",
# 	   # "Account Currency: Currency:150",
# 	   #"Total Cheques Amount: Currency:200",
# 	   "Cost Center: Data:200"
# 	   #"Status:150",
# 	   #"User:200"
# 	]



# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors and contributors
# For license information, please see license.txt


import frappe
from frappe import _, scrub
from frappe.utils import cint, flt
from six import iteritems

from erpnext.accounts.party import get_partywise_advanced_payment_amount
from erpnext.accounts.report.accounts_receivable.accounts_receivable import ReceivablePayableReport


def execute(filters=None):
	args = {
		"party_type": "Customer",
		"naming_by": ["Selling Settings", "cust_master_name"],
	}

	return AccountsReceivableSummary(filters).run(args)

class AccountsReceivableSummary(ReceivablePayableReport):
	def run(self, args):
		self.party_type = args.get('party_type')
		self.party_naming_by = frappe.db.get_value(args.get("naming_by")[0], None, args.get("naming_by")[1])
		self.get_columns()
		self.get_data(args)
		return self.columns, self.data

	def get_data(self, args):
		self.data = []
		self.get_sales_invoices_or_customers_based_on_sales_person()

		self.receivables = ReceivablePayableReport(self.filters).run(args)[1]

		self.get_party_total(args)

		party_advance_amount = get_partywise_advanced_payment_amount(self.party_type,
			self.filters.report_date, self.filters.show_future_payments, self.filters.company) or {}

		if self.filters.show_gl_balance:
			gl_balance_map = get_gl_balance(self.filters.report_date)

		for party, party_dict in iteritems(self.party_total):
			if party_dict.outstanding == 0:
				continue

			row = frappe._dict()

			row.party = party
			if self.party_naming_by == "Naming Series":
				row.party_name = frappe.get_cached_value(self.party_type, party, scrub(self.party_type) + "_name")

			row.update(party_dict)

			# Advance against party
			row.advance = party_advance_amount.get(party, 0)

			# In AR/AP, advance shown in paid columns,
			# but in summary report advance shown in separate column
			row.paid -= row.advance

			if self.filters.show_gl_balance:
				row.gl_balance = gl_balance_map.get(party)
				row.diff = flt(row.outstanding) - flt(row.gl_balance)

			self.data.append(row)

	def get_party_total(self, args):
		self.party_total = frappe._dict()

		for d in self.receivables:
			self.init_party_total(d)

			# Add all amount columns
			for k in list(self.party_total[d.party]):
				if k not in ["currency", "sales_person", "customer_sub"]:

					self.party_total[d.party][k] += d.get(k)

			# set territory, customer_group, sales person etc
			self.set_party_details(d)

	def init_party_total(self, row):
		self.party_total.setdefault(row.party, frappe._dict({
			"invoiced": 0.0,
			"paid": 0.0,
			"credit_note": 0.0,
			"outstanding": 0.0,
			"range1": 0.0,
			"range2": 0.0,
			"range3": 0.0,
			"range4": 0.0,
			"range5": 0.0,
			"total_due": 0.0
			#"sales_person": []
		}))
	def set_party_details(self, row):
		self.party_total[row.party].currency = row.currency
		# data = { user : 1, name : Max , three : 4}
		# is_admin = data.get( admin , False)
		for key in ('territory', 'customer_group', 'supplier_group', 'sales_person', 'customer_sub'):
			if row.get(key):
				self.party_total[row.party][key] = row.get(key)

		if row.sales_person:
			self.party_total[row.party].sales_person.append(row.sales_person)

	def get_columns(self):
		self.columns = []
		self.add_column(label=_(self.party_type), fieldname='party',
			fieldtype='Link', options=self.party_type, width=180)

		if self.party_naming_by == "Naming Series":
			self.add_column(_('{0} Name').format(self.party_type),
				fieldname = 'party_name', fieldtype='Data')

		credit_debit_label = "Credit Note" if self.party_type == 'Customer' else "Debit Note"

		self.add_column(_('Advance Amount'), fieldname='advance')
		self.add_column(_('Invoiced Amount'), fieldname='invoiced')
		self.add_column(_('Paid Amount'), fieldname='paid')
		self.add_column(_(credit_debit_label), fieldname='credit_note')
		self.add_column(_('Outstanding Amount'), fieldname='outstanding')
		if self.filters.show_gl_balance:
			self.add_column(_('GL Balance'), fieldname='gl_balance')
			self.add_column(_('Difference'), fieldname='diff')

		self.setup_ageing_columns()

		if self.party_type == "Customer":
			self.add_column(label=_('Territory'), fieldname='territory', fieldtype='Link',
				options='Territory')
			self.add_column(label=_('Customer Group'), fieldname='customer_group', fieldtype='Link',
				options='Customer Group')

		else:
			self.add_column(label=_('Supplier Group'), fieldname='supplier_group', fieldtype='Link',
				options='Supplier Group')

		self.add_column(label=_('Currency'), fieldname='currency', fieldtype='Link',
			options='Currency', width=80)
		self.add_column(label=_('Customer Sub'), fieldname='customer_sub', fieldtype='Data')
		self.add_column(label=_('Sales Person'), fieldname='sales_person', fieldtype='Data')
	def setup_ageing_columns(self):
		for i, label in enumerate(["0-{range1}".format(range1=self.filters["range1"]),
			"{range1}-{range2}".format(range1=cint(self.filters["range1"])+ 1, range2=self.filters["range2"]),
			"{range2}-{range3}".format(range2=cint(self.filters["range2"])+ 1, range3=self.filters["range3"]),
			"{range3}-{range4}".format(range3=cint(self.filters["range3"])+ 1, range4=self.filters["range4"]),
			"{range4}-{above}".format(range4=cint(self.filters["range4"])+ 1, above=_("Above"))]):
				self.add_column(label=label, fieldname='range' + str(i+1))

		# Add column for total due amount
		self.add_column(label="Total Amount Due", fieldname='total_due')

def get_gl_balance(report_date):
	return frappe._dict(frappe.db.get_all("GL Entry", fields=['party','sum(debit -  credit)'],
		filters={'posting_date': ("<=", report_date), 'is_cancelled': 0}, group_by='party', as_list=1))




# def get_data(filters):
# 		#SQL Query
# 	data = frappe.db.sql("""SELECT tsi.customer_sub
# 							FROM `tabSales Invoice` tsi
# 							LEFT Join `tabRepayment Schedule` pa ON tsi.customer =pa.parent;""")
# 	return data
# 	#for key1 in ('customer_sub'):
# 		#if row.get(key1):
# 			#cs.customer_sub[row.cs][key1] = row.get(key1)
# def get_columns():
# 	return [
# 	   "hhhh: Link/Sales Invoice:200"]
