# Copyright (c) 2025, KCSC and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from erpnext.selling.doctype.sales_order.sales_order import SalesOrder
update_status = SalesOrder.update_status


class BulkUpdateSalesOrder(Document):
    def on_submit(self):
        self.update_so_status()
    
    def update_so_status(self):
        for so in self.sales_orders:
            so_doc = frappe.get_doc("Sales Order", so.sales_order)
            update_status(so_doc, self.status)
        frappe.msgprint("The status of the selected Sales Order(s) has been successfully updated.", alert=True, indicator="green")
