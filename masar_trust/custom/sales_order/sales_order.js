frappe.ui.form.on("Sales Order",{
  refresh: function(frm){ 
    frm.doc.project = frm.doc.project_code;
    HideFields(frm);
    ReqdFields(frm);
    UpdateItems(frm);
  },
  onload: function(frm){ 
    HideFields(frm);
    NamingSeriesReadOnly(frm);
  }, 
  branch:function(frm){
    UpdateNamingSeries(frm);
  }
});
function UpdateItems(frm){
  if (frm.doc.docstatus === 1) {
    if (
      frm.doc.status !== "Closed" &&
      flt(frm.doc.per_delivered, 2) < 100 &&
      flt(frm.doc.per_billed, 2) < 100 &&
      frm.has_perm("write")
    ){
  frm.add_custom_button(__("Update Item"), () => {
    update_child_items({
      frm: frm,
      child_docname: "items",
      child_doctype: "Sales Order Detail",
      cannot_add_row: false,
      has_reserved_stock: frm.doc.__onload && frm.doc.__onload.has_reserved_stock,
    });
  });
  }
}
}
function HideFields(frm){ 
  frm.remove_custom_button('Update Items');
  frm.toggle_display("po_no", false);
  frm.toggle_display("taxes_section", false);
  frm.toggle_display("section_break_40", false);
  frm.toggle_display("coupon_code", false);
  frm.toggle_display("more_info", false);
  frm.toggle_display("printing_details", false);
  frm.toggle_display("subscription_section", false);
  frm.toggle_display("sales_team_section_break", false);
  frm.toggle_display("currency_and_price_list", false);
  frm.toggle_display("order_type", false);
  frm.toggle_display("total_net_weighte", false);
  frm.toggle_display("section_break_40", false);
  frm.toggle_display("base_total_taxes_and_charges", false);
  frm.toggle_display("total_taxes_and_charges", false);
  /// Hid Child
  var df=frappe.meta.get_docfield("Sales Order Item", "gross_profit",frm.doc.name);
  df.hidden=1;
  var df=frappe.meta.get_docfield("Sales Order Item", "valuation_rate",frm.doc.name);
  df.hidden=1;
  var df=frappe.meta.get_docfield("Sales Order Item", "delivery_date",frm.doc.name);
  df.hidden=1;
frm.refresh_fields();
}
function NamingSeriesReadOnly(frm){
  var df=frappe.meta.get_docfield("Sales Order", "naming_series",frm.doc.name);
  df.read_only=1;
  frm.refresh_fields();
}
function UpdateNamingSeries(frm){ 
  if (frm.doc.branch == "المعرض الرئيسي (الكرادة)") {
    frm.set_value('naming_series', 'SAL-ORD1-.YYYY.-')
    frm.set_value('cost_center', '15 - المعرض الرئيسي (الكرادة) - TRUST')
    frm.refresh_fields();
  }
  else if (frm.doc.branch == "معرض النجف الاشرف") {
    frm.set_value('naming_series', 'SAL-ORD4-.YYYY.-')
    frm.set_value('cost_center', '13 - معرض النجف الاشرف - TRUST')
    frm.refresh_fields();
  }
}
function  ReqdFields(frm){
  var df=frappe.meta.get_docfield("Sales Order", "mode_of_payment",frm.doc.name);
  df.reqd=1;
  frm.refresh_fields();
}
frappe.ui.form.on("Sales Order Item", {
  rate: function(frm, cdt, cdn) {
    updateFields(frm, cdt, cdn);
  },
  qty: function(frm, cdt, cdn) {
    updateFields(frm, cdt, cdn);
  },
  discount_amount: function(frm, cdt, cdn) {
    updateFields(frm, cdt, cdn);
  },
  items_remove: function(frm, cdt, cdn) {
    UpdateTotalAmountBeforeDiscount(frm);
    UpdateTotalItemsDiscount(frm);
  }
});

function updateFields(frm, cdt, cdn) {
  TotalDiscountAmount(frm, cdt, cdn);
  UnitPriceBeforeDiscount(frm, cdt, cdn);
  AmountBeforeDiscount(frm, cdt, cdn);
  UpdateTotalAmountBeforeDiscount(frm);
  UpdateTotalItemsDiscount(frm);
}

function TotalDiscountAmount(frm, cdt, cdn) {
  var d = locals[cdt][cdn];
  if (d.item_code) {
    d.total_discount_amount = flt(d.discount_amount || 0) * flt(d.qty || 0);
    cur_frm.refresh_field('total_discount_amount');
  }
}

function UnitPriceBeforeDiscount(frm, cdt, cdn) {
  var d = locals[cdt][cdn];
  if (d.item_code) {
    if (flt(d.price_list_rate) > 0) {
      d.unit_price_before_discount = flt(d.price_list_rate);
    } else {
      d.unit_price_before_discount = flt(d.rate);
    }
    cur_frm.refresh_field('unit_price_before_discount');
  }
}

function AmountBeforeDiscount(frm, cdt, cdn) {
  var d = locals[cdt][cdn];
  if (d.item_code) {
    if (flt(d.price_list_rate) > 0) {
      d.amount_before_discount = flt(d.price_list_rate) * flt(d.qty || 0);
    } else {
      d.amount_before_discount = flt(d.rate) * flt(d.qty || 0);
    }
    cur_frm.refresh_field('amount_before_discount');
  }
}

function UpdateTotalItemsDiscount(frm) {
  var total = 0;
  frm.doc.items.forEach(function(d) {
    total += flt(d.total_discount_amount);
  });
  frm.set_value('total_items_discount', total);
}

function UpdateTotalAmountBeforeDiscount(frm) {
  var total = 0;
  frm.doc.items.forEach(function(d) {
    total += flt(d.amount_before_discount);
  });
  frm.set_value('total_amount_before_discount', total);
}


function update_child_items(opts) {
	const frm = opts.frm;
	const cannot_add_row = typeof opts.cannot_add_row === "undefined" ? true : opts.cannot_add_row;
	const child_docname = typeof opts.cannot_add_row === "undefined" ? "items" : opts.child_docname;
	const child_meta = frappe.get_meta(`${frm.doc.doctype} Item`);
	const has_reserved_stock = opts.has_reserved_stock ? true : false;
	const get_precision = (fieldname) => child_meta.fields.find((f) => f.fieldname == fieldname).precision;

	this.data = frm.doc[opts.child_docname].map((d) => {
		return {
			docname: d.name,
			name: d.name,
			item_code: d.item_code,
			delivery_date: d.delivery_date,
			schedule_date: d.schedule_date,
			conversion_factor: d.conversion_factor,
			qty: d.qty,
			rate: d.rate,
			uom: d.uom,
			fg_item: d.fg_item,
			fg_item_qty: d.fg_item_qty,
      unit_price_before_discount: d.unit_price_before_discount, 
      price_list_rate: d.price_list_rate, 
      amount_before_discount: d.amount_before_discount , 
      discount_amount:d.discount_amount, 
      total_discount_amount: d.total_discount_amount
		};
	});

	const fields = [
		{
			fieldtype: "Data",
			fieldname: "docname",
			read_only: 1,
			hidden: 1,
		},
		{
			fieldtype: "Link",
			fieldname: "item_code",
			options: "Item",
			in_list_view: 1,
			read_only: 0,
			disabled: 0,
			label: __("Item Code"),
			get_query: function () {
				let filters;
				if (frm.doc.doctype == "Sales Order") {
					filters = { is_sales_item: 1 };
				} else if (frm.doc.doctype == "Purchase Order") {
					if (frm.doc.is_subcontracted) {
						if (frm.doc.is_old_subcontracting_flow) {
							filters = { is_sub_contracted_item: 1 };
						} else {
							filters = { is_stock_item: 0 };
						}
					} else {
						filters = { is_purchase_item: 1 };
					}
				}
				return {
					query: "erpnext.controllers.queries.item_query",
					filters: filters,
				};
			},
      onchange: function () {
        dialog.fields_dict.trans_items.df.data.some((doc) => {
          frappe.call({
            method: "masar_trust.custom.sales_order.sales_order.get_price_list_rate",
            args: {
              item_code: doc.item_code,
              price_list: frm.doc.selling_price_list || null
            },
            callback: (r) => {
                
                if (doc.rate === 0 && doc.item_code ){
                  console.log(doc);
                  console.log(r.message);
                  doc.rate = r.message;
                  doc.unit_price_before_discount = r.message; 
                  doc.price_list_rate = r.message;
                }
                else{ 
                  doc.rate = r.message;
                  doc.unit_price_before_discount = r.message; 
                  doc.price_list_rate = r.message;
                }
                dialog.fields_dict.trans_items.grid.refresh();
            },
          });
        });  
      }
		},
		{
			fieldtype: "Link",
			fieldname: "uom",
			options: "UOM",
			read_only: 0,
			label: __("UOM"),
			reqd: 1,
			onchange: function () {
				frappe.call({
					method: "erpnext.stock.get_item_details.get_conversion_factor",
					args: { item_code: this.doc.item_code, uom: this.value },
					callback: (r) => {
						if (!r.exc) {
							if (this.doc.conversion_factor == r.message.conversion_factor) return;

							const docname = this.doc.docname;
							dialog.fields_dict.trans_items.df.data.some((doc) => {
								if (doc.docname == docname) {
									doc.conversion_factor = r.message.conversion_factor;
									dialog.fields_dict.trans_items.grid.refresh();
									return true;
								}
							});
						}
					},
				});
			},
		},
		{
			fieldtype: "Float",
			fieldname: "qty",
			default: 0,
			read_only: 0,
			in_list_view: 1,
			label: __("Qty"),
			precision: get_precision("qty"),
      onchange: function(){
        dialog.fields_dict.trans_items.df.data.forEach((doc) => {
          doc.rate = doc.price_list_rate - doc.discount_amount;
          doc.amount_before_discount = doc.qty * doc.unit_price_before_discount;
          doc.total_discount_amount = doc.qty * doc.discount_amount;
          
          dialog.fields_dict.trans_items.grid.refresh();
      });
      }
		},
		{
			fieldtype: "Currency",
			fieldname: "rate",
			options: "currency",
			default: 0,
			read_only: 0,
			in_list_view: 1,
			label: __("Rate"),
			precision: get_precision("rate"),
		},
    {
      fieldtype: "Column Break"
    }, 
    {
      label: __("Unit Price Before Discount"),
      fieldname:"unit_price_before_discount", 
      fieldtype:"Float", 
      default:0, 
      read_only: 1,
      precision: get_precision("rate"),
      onchange: function(){
        dialog.fields_dict.trans_items.df.data.forEach((doc) => {
          doc.rate = doc.price_list_rate - doc.discount_amount;
          doc.amount_before_discount = doc.qty * doc.unit_price_before_discount;
          doc.total_discount_amount = doc.qty * doc.discount_amount;
          
          dialog.fields_dict.trans_items.grid.refresh();
      });
      }
    } , 
    {
      label:__("Price List Rate"), 
      fieldname:"price_list_rate" , 
      fieldtype:"Float", 
      default: 0, 
      hidden: 1, 
    } , 
    {
      label:__("Amount Before Discount"), 
      fieldname:"amount_before_discount", 
      fieldtype:"Float",
      read_only:1, 
      default:0, 
      precision:get_precision("rate")
    
    },
    {
      label:__("Discount Amount"), 
      fieldname:"discount_amount", 
      fieldtype:"Float", 
      default:0, 
      in_list_view: 1,
      precision:get_precision("rate"), 
      onchange: function(){
        dialog.fields_dict.trans_items.df.data.forEach((doc) => {
          doc.rate = doc.price_list_rate - doc.discount_amount;
          doc.amount_before_discount = doc.qty * doc.unit_price_before_discount;
          doc.total_discount_amount = doc.qty * doc.discount_amount;
          
          dialog.fields_dict.trans_items.grid.refresh();
      });
      }
    }, 
    {
      label:__("Total Discount Amount"), 
      fieldname:"total_discount_amount", 
      fieldtype:"Float", 
      default:0, 
      read_only: 1 ,
      precision:get_precision("rate")
    }
	];
	if (frm.doc.doctype == "Sales Order" || frm.doc.doctype == "Purchase Order") {
		fields.splice(2, 0, {
			fieldtype: "Date",
			fieldname: frm.doc.doctype == "Sales Order" ? "delivery_date" : "schedule_date",
			in_list_view: 1,
			label: frm.doc.doctype == "Sales Order" ? __("Delivery Date") : __("Reqd by date"),
			default: frm.doc.doctype == "Sales Order" ? frm.doc.delivery_date : frm.doc.schedule_date,
			reqd: 1,
		});
		fields.splice(3, 0, {
			fieldtype: "Float",
			fieldname: "conversion_factor",
			label: __("Conversion Factor"),
			precision: get_precision("conversion_factor"),
		});
	}

	if (
		frm.doc.doctype == "Purchase Order" &&
		frm.doc.is_subcontracted &&
		!frm.doc.is_old_subcontracting_flow
	) {
		fields.push(
			{
				fieldtype: "Link",
				fieldname: "fg_item",
				options: "Item",
				reqd: 1,
				in_list_view: 0,
				read_only: 0,
				disabled: 0,
				label: __("Finished Good Item"),
				get_query: () => {
					return {
						filters: {
							is_stock_item: 1,
							is_sub_contracted_item: 1,
							default_bom: ["!=", ""],
						},
					};
				},
			},
			{
				fieldtype: "Float",
				fieldname: "fg_item_qty",
				reqd: 1,
				default: 0,
				read_only: 0,
				in_list_view: 0,
				label: __("Finished Good Item Qty"),
				precision: get_precision("fg_item_qty"),
			}
		);
	}

	let dialog = new frappe.ui.Dialog({
		title: __("Update Items"),
		size: "extra-large",
		fields: [
			{
				fieldname: "trans_items",
				fieldtype: "Table",
				label: "Items",
				cannot_add_rows: cannot_add_row,
				in_place_edit: false,
				reqd: 1,
				data: this.data,
				get_data: () => {
					return this.data;
				},
				fields: fields,
			},
		],
		primary_action: function () {
			if (frm.doctype == "Sales Order" && has_reserved_stock) {
				this.hide();
				frappe.confirm(
					__(
						"The reserved stock will be released when you update items. Are you certain you wish to proceed?"
					),
					() => this.update_items()
				);
			} else {
				this.update_items();
			}
		},
		update_items: function () {
			const trans_items = this.get_values()["trans_items"].filter((item) => !!item.item_code);
			frappe.call({
				method: "masar_trust.custom.sales_order.sales_order.update_child_qty_rate",
				freeze: true,
				args: {
					parent_doctype: frm.doc.doctype,
					trans_items: trans_items,
					parent_doctype_name: frm.doc.name,
					child_docname: child_docname,
				},
				callback: function () {
					frm.reload_doc();
				},
			});
			this.hide();
			refresh_field("items");
		},
		primary_action_label: __("Update"),
	});

	dialog.show();
};
