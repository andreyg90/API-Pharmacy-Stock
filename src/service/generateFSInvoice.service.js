import fs from "fs/promises";
import path from "path";

export const generateFSInvoice = async (data) => {
  const { invoice, details } = data;

  const header = `----------------------- MY PHARMACY -----------------------
Invoice Number: ${invoice._id}
Client Name: ${invoice.clientName}
Date: ${invoice.dateInvoice}
------------------------------------------------------------
Description                 Qty      Price        Amount
------------------------------------------------------------`;

  const rows = details
    .map((detail) => {
      const description = detail.medicineName.padEnd(25);
      const qty = String(detail.quantity).padStart(5);
      const price = String(detail.unitPrice).padStart(10);
      const amount = String(detail.amount).padStart(12);

      return `${description}${qty}${price}${amount}`;
    })
    .join("\n");

  const footer = `
------------------------------------------------------------
TOTAL: ${invoice.total}
`;

  const content = `${header}
${rows}
${footer}`;

  const filePath = path.join(
    process.cwd(),
    "src",
    "invoices",
    `invoice-${invoice._id}.txt`,
  );

  await fs.writeFile(filePath, content);
};
