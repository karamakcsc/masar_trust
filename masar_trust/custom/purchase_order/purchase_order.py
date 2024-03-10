import frappe
# import erpnext
# import math
# from frappe.utils import flt, get_datetime, getdate, date_diff, cint, nowdate, get_link_to_form, time_diff_in_hours
# from frappe import throw, msgprint, _

# @frappe.whitelist(allow_guest=True)
# def get_item_supplier(doctype, txt, searchfield, start, page_len, filters):
#     #return frappe.db.sql("""Select item_code from `tabItem` where default_supplier = %s""", 'Supplier001')
#     return frappe.db.sql("""Select item_code  , description from `tabItem` ti
# 							inner join `tabItem Supplier` tis
#     						on tis.parent = ti.name
# 							Where tis.supplier = %s""", ((filters.get("supplier"))))

def on_submit(self , name):
    check_item_code_supplier(self)

@frappe.whitelist()
def check_item_code_supplier(self):
    supplier_items = frappe.db.sql("""
        SELECT 
            ti.item_code, 
            ti.description, 
            tis.supplier 
        FROM `tabItem` ti
        INNER JOIN `tabItem Supplier` tis ON tis.parent = ti.name
        WHERE tis.supplier = %s
    """, (self.supplier), as_dict=True)

    supplier_item_codes = {item['item_code'] for item in supplier_items}

    po_items = frappe.db.sql("""
        SELECT 
            tpoi.item_code , tpoi.idx
        FROM `tabPurchase Order` tpo 
        INNER JOIN `tabPurchase Order Item` tpoi ON tpoi.parent = tpo.name 
        WHERE tpo.name = %s
    """, (self.name), as_dict=True)
    msg_print = False
    error_message = f"Error: The following items are not available for the specified supplier ({self.supplier}):"
    for items in po_items:
           item_code = items.get('item_code')
           idx = items.get('idx')
           if item_code  not in supplier_item_codes:
                error_message += f"\n- Item '{item_code}' in row {idx}" 
                msg_print = True
    if msg_print:
          frappe.throw(error_message)
            