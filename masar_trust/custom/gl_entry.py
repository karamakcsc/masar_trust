# def exclude_payroll_general_ledger(user):
#
#         if not user: user = frappe.session.user
#
#         if user != 'Administrator' and 'Admin' not in frappe.get_roles():
#
#             return """(name ='Iraq Services' in (select name from `tabSupplier Group`
#
#                  where account = (select 21110000 - Creditors - TRUST from `tabCompany`
#
#                             where name = company)))"""
