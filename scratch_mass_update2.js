const fs = require('fs');

const files = [
  "src/app/book-shipment/page.tsx",
  "src/components/CampaignPage.tsx",
  "src/app/admin/(dashboard)/proposal/page.tsx",
  "src/components/DiwaliCampaignPage.tsx",
  "src/components/Hero.tsx",
  "src/app/shopkeeper/bulk-rates/page.tsx",
  "src/components/ShopkeeperPage.tsx",
  "src/components/WinterCampaignPage.tsx"
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace array
  const intlRegex = /const INTERNATIONAL_COUNTRIES = \[\s*[\s\S]*?\];/;
  if (intlRegex.test(content)) {
    content = content.replace(intlRegex, 'import { INTERNATIONAL_COUNTRIES } from "@/lib/countries";');
  }

  // Add import
  if (!content.includes('SearchableCountryDropdown')) {
    content = content.replace(/("use client";|'use client';)/, '$1\nimport SearchableCountryDropdown from "@/components/SearchableCountryDropdown";');
  }

  // To safely replace the select, let's just find the start and end indices manually.
  const selectStartStr = 'value={zoningCountry}';
  const startIdx = content.indexOf('<select', content.lastIndexOf('<select', content.indexOf(selectStartStr)));
  if (startIdx !== -1) {
    const endIdx = content.indexOf('</select>', startIdx) + 9;
    const selectStr = content.substring(startIdx, endIdx);

    // Extract onChange body
    const onChangeMatch = selectStr.match(/onChange=\{\(e\)\s*=>\s*([\s\S]*?)\s*\}/);
    let onChangeBody = onChangeMatch ? onChangeMatch[1] : 'setZoningCountry(e.target.value)';
    
    // Remove wrapping braces if they exist
    if (onChangeBody.startsWith('{') && onChangeBody.endsWith('}')) {
      onChangeBody = onChangeBody.slice(1, -1).trim();
    }
    onChangeBody = onChangeBody.replace(/e\.target\.value/g, 'val');

    // Extract placeholder
    const optionMatch = selectStr.match(/<option value="">\s*([\s\S]*?)\s*<\/option>/);
    let placeholder = optionMatch ? optionMatch[1].trim() : 'destination === "EUROPE" ? t.form_select_euro : t.form_select_country';
    if (placeholder.startsWith('{') && placeholder.endsWith('}')) {
      placeholder = placeholder.slice(1, -1);
    } else {
      placeholder = `"${placeholder}"`;
    }

    const newDropdown = `<SearchableCountryDropdown
                  countries={subCountryOptions}
                  value={zoningCountry}
                  onChange={(val) => { ${onChangeBody} }}
                  placeholder={${placeholder}}
                />`;

    content = content.substring(0, startIdx) + newDropdown + content.substring(endIdx);
    
    // Sometimes there is a <ChevronDown ... /> right after the select in a <div className="relative">.
    // If we replace the select, we might leave a dangling ChevronDown that looks weird.
    // Let's remove the ChevronDown if it exists immediately after.
    const chevronMatch = content.substring(startIdx + newDropdown.length).match(/^\s*<ChevronDown[\s\S]*?\/>/);
    if (chevronMatch) {
      content = content.substring(0, startIdx + newDropdown.length) + content.substring(startIdx + newDropdown.length + chevronMatch[0].length);
    }
    
    console.log(`Updated ${file}`);
  }

  fs.writeFileSync(file, content, 'utf8');
});
console.log('done');
