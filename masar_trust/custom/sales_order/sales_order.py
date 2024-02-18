import frappe
from frappe.model.document import Document
#Stop SO ##SIAM
def on_submit(self,name):
    get_actual_qty(self.name)

@frappe.whitelist()
def get_actual_qty(name):
    # Fetching the length of the table matching the sales order name and item code
    data = frappe.db.sql("""
        SELECT tsoi.item_code, tsoi.warehouse, tsoi.qty
        FROM `tabSales Order` tso 
        INNER JOIN `tabSales Order Item` tsoi ON tsoi.parent = tso.name
        WHERE tso.name = %s
    """, (name), as_dict=True)
    # frappe.msgprint (str(data),"siam")
    for item in data:
        actual_qty = frappe.db.sql("""
            SELECT tb.actual_qty
            FROM `tabBin` tb
            WHERE tb.item_code = %s AND tb.warehouse = %s
        """, (item.get('item_code'), item.get('warehouse')), as_list=True)
        # frappe.throw(str(reserved_stock))
        if actual_qty:
            actual_qty = float(actual_qty[0][0])
        else:
            frappe.throw(f"Waring: {item.get('item_code')} should have QTY .")

        if item.get('qty') > actual_qty:
            frappe.throw(f"STOP: Quantity should not Exceed Actual Quantity {item.get('item_code')}.")
        else:
            None