import frappe
import erpnext
import math
from frappe.utils import flt, get_datetime, getdate, date_diff, cint, nowdate, get_link_to_form, time_diff_in_hours
from frappe import throw, msgprint, _

@frappe.whitelist()
def get_item_supplier(doctype, txt, searchfield, start, page_len, filters):
    #return frappe.db.sql("""Select item_code from `tabItem` where default_supplier = %s""", 'Supplier001')
    return frappe.db.sql("""Select item_code from `tabItem` ti
							inner join `tabItem Supplier` tis
    						on tis.parent = ti.name
							Where tis.supplier = %s""", (filters.get("supplier")))
