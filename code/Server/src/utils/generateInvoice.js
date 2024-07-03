import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateInvoice = (invoice, outputPath) => {
  let doc = new PDFDocument({ margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(outputPath);
};

const generateHeader = (doc) => {
  const logoPath = path.join(__dirname, '../../assets/logo.jpg');
  doc
    .image(logoPath, 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text('Hazbin Hotel', 110, 57)
    .fontSize(10)
    .text('Hazbin Hotel', 200, 50, { align: 'right' })
    .text('Jaco', 200, 65, { align: 'right' })
    .text('Costa Rica', 200, 80, { align: 'right' })
    .moveDown();
};

const generateCustomerInformation = (doc, invoice) => {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text('Invoice', 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text('Email:', 50, customerInformationTop)
    .text(invoice.shipping.name, 150, customerInformationTop)
    .text('Invoice Number:', 50, customerInformationTop + 15)
    .font('Helvetica-Bold')
    .text(invoice.invoice_nr, 150, customerInformationTop + 15)
    .font('Helvetica')
    .text('Invoice Date:', 50, customerInformationTop + 30)
    .text(formatDate(new Date()), 150, customerInformationTop + 30)
    .text('Balance Due:', 50, customerInformationTop + 45)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 45
    )
    .font('Helvetica-Bold')
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font('Helvetica')
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(invoice.shipping.city + ', ' + invoice.shipping.state + ', ' + invoice.shipping.country, 300, customerInformationTop + 30)
    .text(invoice.shipping.postal_code, 300, customerInformationTop + 45)
    .moveDown();

  generateHr(doc, 282);
};

const generateInvoiceTable = (doc, invoice) => {
  let i;
  const invoiceTableTop = 330;

  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    invoiceTableTop,
    'Item',
    'Description',
    'Unit Cost',
    'Quantity',
    'Line Total'
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font('Helvetica');

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    '',
    '',
    'Subtotal',
    '',
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    '',
    '',
    'Paid To Date',
    '',
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    duePosition,
    '',
    '',
    'Balance Due',
    '',
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font('Helvetica');
};

const generateFooter = (doc) => {
  doc
    .fontSize(10)
    .text(
      'Payment is due within 15 days. Thank you for your business.',
      50,
      780,
      { align: 'center', width: 500 }
    );
};

const generateTableRow = (
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) => {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: 'right' })
    .text(quantity, 370, y, { width: 90, align: 'right' })
    .text(lineTotal, 0, y, { align: 'right' });
};

const generateHr = (doc, y) => {
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
};

const formatCurrency = (amount) => {
  return '$' + amount
};

const formatDate = (date) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
};

export default generateInvoice;



