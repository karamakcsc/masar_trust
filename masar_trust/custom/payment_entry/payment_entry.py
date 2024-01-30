import frappe 




########## from mahmoud 
######## to calculate the Total Allocated Amount from Unallocated Amount 
@frappe.whitelist()
def received_amount_cal(received_amount , target_exchange_rate):
    paid_amount = float()
    paid_amount = float(received_amount) * float(target_exchange_rate)

    return paid_amount