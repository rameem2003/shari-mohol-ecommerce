const sendEmail = require("../utils/email");

const sendPurchaseConfirmationEmail = async (order) => {
  let html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Invoice</title>
  <style>
    /* General resets for email clients */
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { -ms-interpolation-mode:bicubic; border:0; height:auto; line-height:100%; outline:none; text-decoration:none; }
    body { margin:0; padding:0; width:100% !important; background-color:#f4f4f6; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color:#333333; }
    a { color: inherit; text-decoration: none; }

    /* Container */
    .email-wrap { width:100%; padding:24px 12px; box-sizing:border-box; }
    .email-body { max-width:700px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05); }

    /* Header */
    .header { background: linear-gradient(90deg, #581c87 0%, #6c2fa6 100%); color:white; padding:20px 24px; display:flex; align-items:center; gap:16px; }
    .logo { width:56px; height:56px; border-radius:8px; background:#fff2; display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff; font-size:18px; }
    .brand { font-size:18px; font-weight:700; letter-spacing:0.2px; }
    .preheader { display:none !important; visibility:hidden; opacity:0; height:0; width:0; mso-hide:all; overflow:hidden; }

    /* Body content */
    .content { padding:20px 24px; }
    .greeting { font-size:16px; margin-bottom:8px; }
    .muted { color:#6b6b75; font-size:13px; }
    .invoice-meta { margin-top:12px; display:flex; gap:12px; flex-wrap:wrap; }
    .meta-item { background:#fafafa; border:1px solid #f0eef6; padding:10px 12px; border-radius:6px; font-size:13px; color:#444; }

    /* Items table */
    .items { width:100%; border-collapse:collapse; margin-top:18px; }
    .items th { background:#f8f6fb; padding:12px; text-align:left; font-size:13px; color:#222; border-bottom:1px solid #eee; }
    .items td { padding:12px; border-bottom:1px solid #f2f2f4; font-size:14px; vertical-align:middle; }
    .item-name { font-weight:600; color:#222; }
    .item-meta { color:#6b6b75; font-size:12px; margin-top:6px; }

    /* Totals */
    .totals { width:100%; margin-top:10px; }
    .totals td { padding:8px 12px; font-size:14px; }
    .totals .label { color:#6b6b75; }
    .totals .amount { font-weight:700; text-align:right; }

    /* Billing / Shipping */
    .addresses { display:flex; gap:16px; margin-top:18px; flex-wrap:wrap; }
    .addr { flex:1 1 220px; background:#fbfbfd; padding:12px; border-radius:6px; border:1px solid #f1edf8; font-size:13px; color:#333; }

    /* Button */
    .cta { display:inline-block; margin-top:18px; padding:12px 18px; border-radius:8px; background:#581c87; color:white; font-weight:600; font-size:14px; text-decoration:none; }

    /* Footer */
    .footer { font-size:12px; color:#8a8a94; padding:18px 24px; text-align:center; background:#fbfbfe; border-top:1px solid #f0eef6; }

    /* Responsive */
    @media screen and (max-width:520px) {
      .header { padding:16px; }
      .content { padding:16px; }
      .items th, .items td { padding:10px; font-size:13px; }
      .cta { width:100%; display:inline-block; text-align:center; }
      .invoice-meta { flex-direction:column; }
      .addresses { flex-direction:column; }
    }
  </style>
</head>
<body>
  <!-- Hidden preheader text (preview in inbox) -->
  <div class="preheader">Thank you for your purchase — Invoice {{invoice_number}} from {{store_name}} is attached below.</div>

  <div class="email-wrap">
    <div class="email-body" role="article" aria-roledescription="email">
      <!-- Header -->
      <div class="header">
        <div class="logo" aria-hidden="true">
          <!-- Short text logo; replace with <img> if you have an image -->
     S
        </div>
        <div style="flex:1;">
          <div class="brand">Shari Mohol</div>
          <div style="font-size:13px; margin-top:4px; color:rgba(255,255,255,0.9)">An awsome e-commerce</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:13px; opacity:0.95">Invoice</div>
          <div style="font-weight:700; font-size:16px; margin-top:4px">${
            order?._id
          }</div>
        </div>
      </div>

      <!-- Body -->
      <div class="content">
        <p class="greeting">Hi ${order?.userId?.name},</p>
        <p class="muted">Thanks for your order! We've received payment and your items are being prepared. Below is a summary of your purchase.</p>

        <div class="invoice-meta" aria-hidden="false" role="table">
          <div class="meta-item"><strong>Order:</strong><br>${order?._id}</div>
          <div class="meta-item"><strong>Date:</strong><br>${
            order?.createdAt
          }</div>
          <div class="meta-item"><strong>Payment:</strong><br>${
            order?.paymentMethod
          }</div>
          <div class="meta-item"><strong>Shipping:</strong><br>Courier</div>
        </div>

        <!-- Items table -->
        <table class="items" role="table" aria-label="Order details" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th style="width:56%;">Item</th>
              <th style="width:18%; text-align:right;">Qty</th>
              <th style="width:13%; text-align:right;">Unit</th>
              <th style="width:13%; text-align:right;">Total</th>
            </tr>
          </thead>
          <tbody>
            <!-- Repeat this TR for each item -->
            ${order?.cartItems
              ?.map(
                (item, i) => ` <tr>
              <td>
                <div class="item-name">${item?.product?.name}</div>
    
              </td>
              <td style="text-align:right;">${item?.quantity}</td>
              <td style="text-align:right;">${item?.product?.discountPrice}</td>
              <td style="text-align:right; font-weight:600;">${
                item?.product?.discountPrice * item?.quantity
              }</td>
            </tr>`
              )
              .join("")}
           

       

          </tbody>
        </table>

        <!-- Totals -->
        <table class="totals" cellpadding="0" cellspacing="0" style="margin-top:8px;">
          <tr>
            <td class="label">Subtotal</td>
            <td class="amount">${order?.grandTotal}</td>
          </tr>
          <tr>
            <td class="label">Discount</td>
            <td class="amount">-0</td>
          </tr>
          <tr>
            <td class="label">Shipping</td>
            <td class="amount">0</td>
          </tr>
          <tr>
            <td class="label">Tax</td>
            <td class="amount">0</td>
          </tr>
          <tr>
            <td style="padding-top:10px; border-top:1px solid #f0eef6; font-weight:700;">Total</td>
            <td style="padding-top:10px; border-top:1px solid #f0eef6; text-align:right; font-weight:800; color:#111;">${
              order?.grandTotal
            }</td>
          </tr>
        </table>

        <!-- Addresses -->
        <div class="addresses">
          <div class="addr">
            <strong>Billing</strong><br>
           ${order?.address}<br>
       
          </div>
          <div class="addr">
            <strong>Shipping</strong><br>
            ${order?.address}<br>
           
          </div>
        </div>

        <!-- CTA -->
        <a href="{{view_order_url}}" class="cta" style="display:none; background:#581c87; color:#ffffff;">View Order / Download Invoice</a>

        <!-- Note -->
        <p style="margin-top:16px; font-size:13px; color:#6b6b75;">
          If you have questions about this invoice, reply to this email or contact us at <a href="mailto:info.rolstudio.bd@gmail.com" style="color:#581c87;">info.rolstudio.bd@gmail.com</a>.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div style="margin-bottom:8px;">Shari Mohol — Mirpur • Dhaka, Bagladesh</div>
        <div>Order #${order?._id} • Invoice ${order?._id}</div>
        <div style="margin-top:8px; color:#a0a0aa; font-size:11px;">
          If you did not make this purchase, please contact us immediately.
          <br>
          <a href="{{unsubscribe_url}}" style="color:#9b87bd; text-decoration:underline;">Unsubscribe</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

  await sendEmail(
    order?.userId?.email,
    "Thank you for joining Shari Mohol",
    html
  );
};

module.exports = sendPurchaseConfirmationEmail;
