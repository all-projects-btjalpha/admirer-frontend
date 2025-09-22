import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";
import { FaFileInvoice } from "react-icons/fa6";

interface InvoiceItem {
  name: string;
  price: string;
  qty: number;
  GST: string;
  total: string;
}

interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface OrderData {
  invoiceNo: string;
  orderDate: string;
  paymentType: string;
  orderId: string;
  customer: CustomerDetails;
  items: InvoiceItem[];
  total: string;
  gst: string;
  totalAmount: string;
}

interface InvoiceProps {
  order: OrderData;
}

const Invoice: React.FC<InvoiceProps> = ({ order }) => {
  const downloadInvoice = async () => {
    const doc = new jsPDF();

    // --- LOGO ---
    const logoImg = new Image();
    logoImg.src = "/logo/admirer_logo.png";
    await new Promise((res) => (logoImg.onload = res));
    doc.addImage(logoImg, "PNG", 14, 10, 40, 20);

    // --- INVOICE META (Right of Logo) ---
    doc.setFontSize(11);
    doc.text(`Invoice Number : ${order.invoiceNo}`, 14, 44);
    doc.text(`Date : ${order.orderDate}`, 14, 50);
    doc.text(`Payment Mode : ${order.paymentType.toUpperCase()}`, 14, 56);
    doc.text(`Order ID : ${order.orderId}`, 14, 62);

    // --- COMPANY INFO (Below Invoice Info) ---
    doc.setFont("helvetica", "bold");
    doc.text("BTJ Alpha Technology Pvt Ltd", 130, 38);
    doc.setFont("helvetica", "normal");
    doc.text("Phone: 0120-4525483", 130, 44);
    doc.text("Email: support@admirer.in", 130, 50);
    doc.text("CIN: U62099UP2025PTC215855", 130, 56);
    doc.text("GSTIN: 09AANCB2020R1ZB", 130, 62);

    // Y position below logo and company section
    let currentY = 70;

    // SHIPPING & BILLING (SIDE BY SIDE)
    const sectionWidth = 80;
    const leftX = 14;
    const rightX = 114;

    const renderCustomerBox = (
      x: number,
      y: number,
      title: string,
      customer: CustomerDetails
    ): number => {
      let tempY = y + 6;
      let boxHeight = 6; // height for title line

      if (customer.name) boxHeight += 6;
      if (customer.phone) boxHeight += 5;

      if (customer.email) {
        const emailLines = doc.splitTextToSize(`Email : ${customer.email}`, 75);
        boxHeight += emailLines.length * 5;
      }

      if (customer.address) {
        const addressLines = doc.splitTextToSize(
          `Address : ${customer.address}`,
          75
        );
        boxHeight += addressLines.length * 5;
      }

      // Draw background dynamically based on boxHeight
      doc.setFillColor(255, 230, 221);
      doc.rect(x, y, sectionWidth, boxHeight + 5, "F");

      // Draw content now
      let lineY = y + 6;
      doc.setFontSize(11);
      doc.setTextColor(0, 102, 204);
      doc.text(`${title} :`, x + 3, lineY);
      doc.setTextColor(0);
      doc.setFontSize(10);

      if (customer.name)
        doc.text(`Name : ${customer.name}`, x + 3, (lineY += 6));
      if (customer.phone)
        doc.text(`Mobile No. : ${customer.phone}`, x + 3, (lineY += 5));
      if (customer.email) {
        const emailLines = doc.splitTextToSize(`Email : ${customer.email}`, 75);
        emailLines.forEach((line: string | string[]) => {
          doc.text(line, x + 3, (lineY += 5));
        });
      }
      if (customer.address) {
        const addressLines = doc.splitTextToSize(
          `Address : ${customer.address}`,
          75
        );
        addressLines.forEach((line: string | string[]) => {
          doc.text(line, x + 3, (lineY += 5));
        });
      }

      return lineY;
    };

    // Draw both sections
    const shippingBottomY = renderCustomerBox(
      leftX,
      currentY,
      "Shipping Details",
      order.customer
    );
    const billingBottomY = renderCustomerBox(
      rightX,
      currentY,
      "Billing Details",
      order.customer
    );
    currentY = Math.max(shippingBottomY, billingBottomY) + 10;

    // Table
    autoTable(doc, {
      startY: currentY,
      head: [["Product", "Unit Price", "Quantity", "Amount"]],
      body: order.items.map((item) => [
        item.name,
        item.price,
        item.qty.toString(),
        item.total,
      ]),
      styles: {
        fontSize: 10,
        cellWidth: "wrap", // important
      },
      headStyles: {
        fillColor: [130, 130, 130],
        textColor: 255,
      },
      alternateRowStyles: { fillColor: [255, 241, 234] },

      columnStyles: {
        0: { cellWidth: 110 }, // Product
        1: { cellWidth: 25, halign: "center" }, // Unit Price
        2: { cellWidth: 20, halign: "center" }, // Quantity
        3: { cellWidth: 25, halign: "right" }, // Amount
      },
    });

    // Total
    const finalY = (doc as any).lastAutoTable?.finalY || currentY;

    // Amount Row
    doc.setFillColor(255, 230, 221);
    doc.rect(14, finalY + 5, 180, 10, "F");
    doc.setFontSize(10);
    doc.setFont("helvetica");
    doc.text("Amount", 16, finalY + 12);
    doc.text(order.total, 192, finalY + 12, { align: "right" });

    // GST Row
    doc.setFillColor(255, 230, 221);
    doc.rect(14, finalY + 16, 180, 10, "F");
    doc.setFontSize(10);
    doc.setFont("helvetica");
    doc.text("GST", 16, finalY + 23);
    doc.text(order.gst, 192, finalY + 23, { align: "right" });

    // Total Row
    doc.setFillColor(255, 230, 221);
    doc.rect(14, finalY + 27, 180, 10, "F");
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount (Inc. All Taxes)", 16, finalY + 34);
    doc.text(order.totalAmount, 192, finalY + 34, { align: "right" });

    // Dashed Line and Computer Generated Text
    const lineY = finalY + 60;
    const lineStartX = 10;
    const lineEndX = 200;

    // Set dashed line
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.setLineDashPattern([1, 1], 0); // dashed line pattern
    doc.line(lineStartX, lineY, lineEndX, lineY); // draw line

    // Reset dash pattern to solid
    doc.setLineDashPattern([], 0);

    // Add text above line
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
      "***This is computer generated invoice***",
      doc.internal.pageSize.getWidth() / 2,
      lineY - 4,
      {
        align: "center",
      }
    );

    // Save PDF
    doc.save("invoice.pdf");
  };

  return (
    <div className="flex gap-3" onClick={downloadInvoice}>
      <FaFileInvoice className="h-5 w-5" />

      <span className="text-[16px] font-medium cursor-pointer text-[#7b48a5]">
        Download Invoice
      </span>
    </div>
  );
};

export default Invoice;
