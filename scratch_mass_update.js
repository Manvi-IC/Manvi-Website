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
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');

  // 1. Replace INTERNATIONAL_COUNTRIES array with import
  // But wait, some files might have EUROPE_COUNTRIES as well. Let's just replace INTERNATIONAL_COUNTRIES.
  // The array starts with `const INTERNATIONAL_COUNTRIES = [` and ends with `];`
  const intlRegex = /const INTERNATIONAL_COUNTRIES = \[\s*[\s\S]*?\];/;
  if (intlRegex.test(content)) {
    content = content.replace(intlRegex, 'import { INTERNATIONAL_COUNTRIES } from "@/lib/countries";');
  } else if (!content.includes('import { INTERNATIONAL_COUNTRIES }')) {
    console.log(`Could not find INTERNATIONAL_COUNTRIES array in ${file}`);
  }

  // 2. Add import for SearchableCountryDropdown
  if (!content.includes('SearchableCountryDropdown')) {
    // Add it after the first import or 'use client';
    content = content.replace(/("use client";|'use client';)/, '$1\nimport SearchableCountryDropdown from "@/components/SearchableCountryDropdown";');
  }

  // 3. Replace the select element for zoningCountry
  const selectRegex = /<select[^>]*value=\{zoningCountry\}[\s\S]*?onChange=\{\(e\)\s*=>\s*\{([\s\S]*?)\}\}[\s\S]*?<\/select>/;
  const match = content.match(selectRegex);
  
  if (match) {
    let onChangeBody = match[1];
    // Replace setZoningCountry(e.target.value) with setZoningCountry(val)
    onChangeBody = onChangeBody.replace(/e\.target\.value/g, 'val');
    
    // Some files might use t.form_select_euro or "Select Country"
    // Let's just use what's inside the <option value="">...</option>
    const optionMatch = match[0].match(/<option value="">\s*([\s\S]*?)\s*<\/option>/);
    let placeholder = optionMatch ? optionMatch[1].trim() : 'destination === "EUROPE" ? t.form_select_euro : t.form_select_country';

    // It's possible placeholder is JSX, let's keep it as JSX if it is
    if (placeholder.startsWith('{') && placeholder.endsWith('}')) {
      placeholder = placeholder.slice(1, -1);
    }

    const newDropdown = `<SearchableCountryDropdown
                  countries={subCountryOptions}
                  value={zoningCountry}
                  onChange={(val) => {${onChangeBody}}}
                  placeholder={${placeholder}}
                />`;
                
    content = content.replace(match[0], newDropdown);
    console.log(`Updated select in ${file}`);
  } else {
    console.log(`Could not find zoningCountry select in ${file}`);
  }

  fs.writeFileSync(file, content, 'utf8');
});
console.log('done');
