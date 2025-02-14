from . import __version__ as app_version

app_name = "masar_trust"
app_title = "Masar Trust"
app_publisher = "KCSC"
app_description = "Trust"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "info@kcsc.com.jo"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/masar_trust/css/masar_trust.css"
# app_include_js = "/assets/masar_trust/js/masar_trust.js"

# include js, css files in header of web template
# web_include_css = "/assets/masar_trust/css/masar_trust.css"
# web_include_js = "/assets/masar_trust/js/masar_trust.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "masar_trust/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "masar_trust.install.before_install"
# after_install = "masar_trust.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "masar_trust.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
    # "Sales Order": {
	# 	# "on_update": "method",
	# 	"on_submit": "masar_trust.custom.sales_order.sales_order.on_submit"
	# 	# "on_trash": "method"
    # }

	 "Purchase Order": {
		# "on_update": "method",
		"on_submit": "masar_trust.custom.purchase_order.purchase_order.on_submit"
		# "on_trash": "method"
    }
}



doctype_js = {
    "Purchase Order" : "custom/purchase_order/purchase_order.js",
    "Sales Order" : "custom/sales_order/sales_order.js",
    "Delivery Note" : "custom/delivery_note/delivery_note.js",
    "Sales Invoice" : "custom/sales_invoice/sales_invoice.js",
    "Purchase Receipt" : "custom/purchase_receipt/purchase_receipt.js",
    "Purchase Invoice" : "custom/purchase_invoice/purchase_invoice.js",
    "Journal Entry" : "custom/journal_entry/journal_entry.js",
    "POS Invoice" : "custom/pos_invoice/pos_invoice.js",
    "Payment Entry" : "custom/payment_entry/payment_entry.js",
    "Stock Entry" : "custom/stock_entry/stock_entry.js",
    "Quotation" : "custom/quotation/quotation.js"
}
# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"masar_trust.tasks.all"
# 	],
# 	"daily": [
# 		"masar_trust.tasks.daily"
# 	],
# 	"hourly": [
# 		"masar_trust.tasks.hourly"
# 	],
# 	"weekly": [
# 		"masar_trust.tasks.weekly"
# 	]
# 	"monthly": [
# 		"masar_trust.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "masar_trust.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "masar_trust.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "masar_trust.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


fixtures = [
    {"dt": "Custom Field", "filters": [
        [
            "name", "in", [
                  "Item-item_model",
                  "Item-item_name_ar",
                  "Item-specs",
                  "Item-pump",
                  "Item-on_off",
                  "Item-gas",
                  "Item-weight_kg",
                  "Item-weight_ton",
                  "Item-air_condition_specs",
                  "Item-column_break_30",
                  "item-refrigerator_specs",
                  "item-type_ref_freezer",
                  "item-door_ref_freezer",
                  "item-column_break_ref",
                  "item-size_ref_freezer",
                  "item-color_ref_freezer",
                  "item-heaters_cookers_specs",
                  "item-type_heater_cookers",
                  "item-shape_heaters_cookers",
                  "item-column_break_43",
                  "item-color_heaters_cookers",
                  "item-size_heaters_cookers",
                  "item-generators_others",
                  "item-type_generators",
                  "item-size_generators",
                  "Item-column_break_48",
                  "Item-vrf_specs",
                  "Item-type_vrf",
                  "Item-electricity_vrf",
                  "Item-column_break_53",
    	          "Item-weight_vrf",
    	          "Purchase Receipt-container_number",
    	          "Item-others",
    	          "Sales Order-mode_of_payment",
                  "Item-tv_column_break",
                  "Item-smart_tv",
                  "Item-screen_tv",
                  "Item-size_tv",
                  "Item-tv_specs",
                  "Journal Entry-accounting_dimensions",
                  "Journal Entry-cost_center",
                  "Journal Entry-column_break_14",
                  "Journal Entry-customer_sub",
                  "Journal Entry-project",
                  "Journal Entry Account-section_break_13",
                  #"Sales Order-accounting_dimensions",
                  # "Sales Order-cost_center",
                  # "Sales Order-dimensions_column",
                  "Sales Order-customer_sub",
                  # "Sales Order-section_break_52",
                  # "Sales Order-project_code",
                  # "Delivery Note-project_code",
                  # "Delivery Note-column_break_52",
                  # "Delivery Note-section_break_56",
                  #"Delivery Note-accounting_dimensions",
                  #"Delivery Note-cost_center",
                  "Sales Order-branch",
                  "Delivery Note-branch",
                  "Payment Entry-customer_sub",
                  "Sales Invoice-section_break_190",
                  "Sales Invoice-notes",
                  "Sales Invoice-notes",
                  "Delivery Note-notes",
                  "Delivery Note-mode_of_payment",
                  "Sales Invoice-mode_of_payment",
                  "Sales Invoice-customer_sub",
                  "Sales Invoice Item-unit_price_before_discount",
                  "Sales Invoice Item-amount_before_discount",
                  "Sales Invoice Item-total_discount_amount",
                  "Sales Invoice-total_items_discount",
                  "Sales Invoice-total_amount_before_discount",
                  "Delivery Note-total_items_discount",
                  "Delivery Note Item-amount_before_discount",
                  "Delivery Note Item-total_discount_amount",
                  "Delivery Note Item-unit_price_before_discount",
                  "Delivery Note-total_amount_before_discount",
                  "Sales Order-total_items_discount",
                  "Sales Order-total_amount_before_discount",
                  "Sales Order Item-unit_price_before_discount",
                  "Sales Order Item-amount_before_discount",
                  "Sales Order Item-total_discount_amount",
                  "Quotation-total_items_discount",
                  "Quotation-total_amount_before_discount",
                  "Quotation Item-unit_price_before_discount",
                  "Quotation Item-amount_before_discount",
                  "Quotation Item-total_discount_amount",
                  "Payment Entry-payment_category",
                  "Quotation-quotation_total_amount"

                  ]
        ]
    ]},
    {
        "doctype": "Property Setter",
        "filters": [
            [
                "name",
                "in",
                [
                    "Journal Entry-voucher_type-options"
                ]
            ]
        ]
    }
]


from erpnext.accounts.report.general_ledger import  general_ledger as erp_gl
from masar_trust.override import general_ledger

erp_gl.get_result_as_list = general_ledger.get_result_as_list_override
	