from erpnext.accounts.report.general_ledger.general_ledger import  get_balance
import frappe 
def get_result_as_list_override(data, filters):
	balance, _balance_in_account_currency = 0, 0

	for d in data:
		if not d.get("posting_date"):
			balance, _balance_in_account_currency = 0, 0

		balance = get_balance(d, balance, "debit", "credit")
		d["balance"] = balance

		d["account_currency"] = filters.account_currency
		if d.get('voucher_type'):
				if d['voucher_type'] == 'Journal Entry':
					des = frappe.db.sql(
                         """
							SELECT user_remark 
							FROM `tabJournal Entry Account` tjea 
							WHERE parent = %s
							AND account = %s
							HAVING SUM(debit) = %s
							AND SUM(credit) = %s
					""", (d['voucher_no'] ,d['account'] ,d['debit'] , d['credit'] ))
					if des and des[0] and des[0][0]:	
						d['remarks'] =des[0][0]
					else:
						user_remark = frappe.db.sql(
                         """
								SELECT user_remark 
								FROM `tabJournal Entry Account` tjea 
								WHERE parent = %s
								AND account = %s
								AND debit = %s
								AND credit = %s
							""", (d['voucher_no'] ,d['account'] ,d['debit'] , d['credit'] ))
						if user_remark and user_remark[0] and user_remark[0][0]:	
							d['remarks'] =user_remark[0][0]
					if 'Reference #' in d['remarks'] :
						part_before_reference = d['remarks'].split('Reference #')[0]
						d['remarks'] = part_before_reference
	return data
