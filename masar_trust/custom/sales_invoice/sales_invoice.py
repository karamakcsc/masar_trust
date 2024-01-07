# import frappe
# import frappe.utils

# @frappe.whitelist()
# def financial_allocation(customer_sub, date_range, grand_total, cost_center):
#     sql_query = """
#         SELECT customer_sub, valid_date AS date_range, percentage, company, rebate_expense, rebate_provision
#         FROM `tabRebate Rule` trr
#         WHERE trr.customer_sub = %s
#         AND trr.docstatus = 1
#         AND %s BETWEEN trr.from_date AND trr.valid_date;
#     """
#     results = frappe.db.sql(sql_query, (customer_sub, date_range), as_dict=True)

#     if results:
#         created_entries = []

#         for result in results:
#             grand_total = float(grand_total)
#             name = frappe.get_value("Sales Invoice", {"customer_sub": customer_sub}, "name")
#             customer = frappe.get_value("Sales Invoice", {"customer_sub": customer_sub}, "customer")
#             amount = grand_total * result['percentage'] / 100

#             jv = frappe.new_doc("Journal Entry")
#             jv.posting_date = date_range or frappe.utils.nowdate()
#             jv.company = result['company']
#             jv.user_remark = f"Sales Invoice No:{name}/Percentage:%{result['percentage']}/Customer Sub:{customer_sub}/Customer:{customer}/Grand Total:{grand_total}"
#             jv.multi_currency = 0
#             jv.cost_center = cost_center
#             jv.customer_sub = customer_sub

#             jv.append("accounts", {
#                 "account": result['rebate_expense'],
#                 "cost_center": cost_center,
#                 "customer_sub": customer_sub,
#                 "debit_in_account_currency": amount,
#                 "user_remark": f"Sales Invoice No:{name}/Percentage:%{result['percentage']}/Customer Sub:{customer_sub}/Customer:{customer}/Grand Total:{grand_total}"
#             })

#             jv.append("accounts", {
#                 "account": result['rebate_provision'],
#                 "cost_center": cost_center,
#                 "customer_sub": customer_sub,
#                 "credit_in_account_currency": amount,
#                 "user_remark": f"Sales Invoice No:{name}/Percentage:%{result['percentage']}/Customer Sub:{customer_sub}/Customer:{customer}/Grand Total:{grand_total}"
#             })

#             jv.insert(ignore_permissions=True)
#             jv.submit()

#             created_entries.append(jv.name)

#         return f"Journal Entries created for {len(results)} Journal Entry: {', '.join(created_entries)}"

#     else:
#         return "No rule found for the given criteria."




