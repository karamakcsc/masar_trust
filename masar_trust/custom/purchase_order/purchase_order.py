import frappe


def on_submit(self , name):
    check_item_code_supplier(self.name , self.supplier)


@frappe.whitelist()
def check_item_code_supplier(name , supplier):
    supplier_items = frappe.db.sql("""
        SELECT 
            ti.item_code, 
            ti.description, 
            tis.supplier 
        FROM `tabItem` ti
        INNER JOIN `tabItem Supplier` tis ON tis.parent = ti.name
        WHERE tis.supplier = %s
    """, (supplier), as_dict=True)

    supplier_item_codes = {item['item_code'] for item in supplier_items}

    po_items = frappe.db.sql("""
        SELECT 
            tpoi.item_code , tpoi.idx
        FROM `tabPurchase Order` tpo 
        INNER JOIN `tabPurchase Order Item` tpoi ON tpoi.parent = tpo.name 
        WHERE tpo.name = %s
    """, (name), as_dict=True)
    msg_print = False
    error_message = f"Error: The following items are not available for the specified supplier ({supplier}):"
    for items in po_items:
           item_code = items.get('item_code')
           idx = items.get('idx')
           if item_code  not in supplier_item_codes:
                error_message += f"\n- Item '{item_code}' in row {idx}" 
                msg_print = True
    if msg_print:
          frappe.throw(error_message)
            