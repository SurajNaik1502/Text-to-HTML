const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const fs = require('fs');


// Raw input markdown
const rawInput = `
To amend a Purchase Order (PO) in the real estate software, you'll need to use the PO Amendment Form. Here's a breakdown of the process based on the type of amendment you need to make: **1. New Item Addition in PO with New PR from RFQ:** * Go to the Request for Quotation form. * Set the Process Type to "Amend PO". * Enter the Amend PO Number of the PO you want to amend. * The system will retrieve supplier details. * Select the PR No; it will fetch new item details to be added to the existing PO. * Input the item description, specifications, agreed rate, tax details (HSN code, etc.), and any additional charges. * Review and update other necessary fields. * Save the updated entry. * Approve the amendment through the workflow system. **2. Rate Change:** * Open the PO Amendment Form. * Choose the Amendment Type as "Amendment". * Keep the Quantity field unchanged (zero). * Enter the updated rate for the item. * The system will automatically apply the new rate to the balance quantities in the PO. * **Crucially**, ensure that if a Goods Receipt Note (GRN) has been created with some quantity, the purchase bills for that GRN are booked in the system *before* finalizing the rate change. * Save the changes. * Approve the amendment in the workflow system. * The revised rate will only apply to the unbilled quantities of the approved PO balance. **3. PO Short Closure:** * Open the PO Amendment Form. * Choose the Amendment Type as "Amendment". * Identify the balance quantity to be closed. * Enter the quantity in "GRN Closing Qty" to be short-closed. * Save the amendment. * Approve the amendment through the workflow system. **4. Cancellation:** * Open the PO Amendment Form. * Choose the Amendment Type as "Cancellation". * Provide a reason for the cancellation. * Save the amendment. * Approve the cancellation through the workflow system. * The cancellation process does not generate a new amendment number. **Important General Points for All Amendment Types:** * The system workflow requires review and approval for all amendments. * Verify all GRNs, invoices, and other dependencies to avoid errors. * Detailed logs and records are maintained for each amendment.
`;

// Function to preprocess the markdown
function preprocessMarkdown(input) {
  return input
    // Convert section headers like *1. New Item...* or *Important...*
    .replaceAll(/\*\*\d+\..*?\*\*/g, match => `\n\n### ${match}\n`)

    // Bullet point fixer — make sure every * gets a newline before it
    .replaceAll(/\s+\*\s+/g, '\n + ')

    .trim();
}


// Preprocess the raw input
const formattedInput = preprocessMarkdown(rawInput);

// Now render the markdown using MarkdownIt
const body = md.render(formattedInput);

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Converted Output</title>
</head>
<body>
  ${body}
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent.trim(), 'utf8');
