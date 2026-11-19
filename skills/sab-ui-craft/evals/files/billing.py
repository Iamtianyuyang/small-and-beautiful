def invoice_total(invoice):
    total = 0
    for item in invoice["line_items"]:
        total += item["price"] * item["qty"]
    return total


def format_invoice(invoice):
    amount = invoice_total(invoice)
    return f"Invoice {invoice['id']}: {amount:.2f}"
