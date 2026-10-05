const fs = require('fs');
let content = fs.readFileSync('src/app/book-shipment/page.tsx', 'utf8');
const match = content.match(/<select[^>]*value=\{zoningCountry\}[\s\S]*?<\/select>/);
if (match) {
  content = content.replace(match[0], `<SearchableCountryDropdown countries={subCountryOptions} value={zoningCountry} onChange={(val) => setZoningCountry(val)} placeholder="Select Country" />`);
  fs.writeFileSync('src/app/book-shipment/page.tsx', content, 'utf8');
  console.log('updated book-shipment');
} else {
  console.log('still not found');
}
