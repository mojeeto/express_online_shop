import path from "path";
import PDFDocumnet from "pdfkit";
import { PROJECT_DIR } from "./static";

export type InvoiceDataTypeItem = {
  title: string;
  description: string;
  price: number;
  quantity: number;
  amount: number;
};

export type InvoiceDataTypeShipping = {
  email: string;
};

export type InvoiceDataType = {
  shipping: InvoiceDataTypeShipping;
  items: InvoiceDataTypeItem[];
  subtotal: number;
  orderNumber: string;
};

function generateHeader(doc: typeof PDFDocumnet) {
  doc
    .image(path.join(PROJECT_DIR, "utils", "tesla_logo.png"), 50, 45, {
      width: 50,
    })
    .fillColor("#444444")
    .fontSize(20)
    .text("Shop co.", 110, 57)
    .fontSize(10)
    .moveDown();
}

function generateFooter(doc: typeof PDFDocumnet) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      730,
      { align: "center", width: 500 }
    );
}

function generateCustomerInformation(
  doc: typeof PDFDocumnet,
  invoice: InvoiceDataType
) {
  const shipping = invoice.shipping;
  doc
    .text(`Invoice Number: ${invoice.orderNumber}`, 50, 200)
    .text(`Invoice Date: ${formatDate(new Date())}`, 50, 215)
    .text(`Balance Due: ${invoice.subtotal}`, 50, 130)
    .text(`Email: ${shipping.email}`, 300, 200)
    .moveDown();
}

function generateTableRow(
  doc: typeof PDFDocumnet,
  y: number,
  title: string,
  description: string,
  price: number | string,
  quantity: number | string,
  amount: number | string
) {
  doc
    .fontSize(10)
    .text(title, 50, y)
    .text(price.toString(), 280, y, { width: 90, align: "right" })
    .text(quantity.toString(), 370, y, { width: 90, align: "right" })
    .text(amount.toString(), 0, y, { align: "right" });
}

function generateHr(doc: typeof PDFDocumnet, y: number) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function generateInvoiceTable(
  doc: typeof PDFDocumnet,
  invoice: InvoiceDataType
) {
  let i,
    invoiceTableTop = 330;

  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );

  generateHr(doc, invoiceTableTop + 20);

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.title,
      "Description Undifined",
      item.amount / item.quantity,
      item.quantity,
      item.amount
    );
    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );
}

function formatCurrency(cents: number) {
  return "$" + cents;
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

export const createInvoice = (
  invoice: InvoiceDataType,
  writableStream: NodeJS.WritableStream
) => {
  const document = new PDFDocumnet({ margin: 50 });

  generateHeader(document);
  generateCustomerInformation(document, invoice);
  generateInvoiceTable(document, invoice);
  generateFooter(document);

  document.end();
  document.pipe(writableStream);
};
