const fs = require('fs');
const files = [
  'src/app/book-shipment/page.tsx', 
  'src/components/CampaignPage.tsx', 
  'src/app/admin/(dashboard)/proposal/page.tsx', 
  'src/components/DiwaliCampaignPage.tsx', 
  'src/components/Hero.tsx', 
  'src/app/shopkeeper/bulk-rates/page.tsx', 
  'src/components/ShopkeeperPage.tsx', 
  'src/components/WinterCampaignPage.tsx'
];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  // It looks like `placeholder={"destination === "EUROPE" ? ... "}`
  c = c.replace(/placeholder=\{"(destination === [\s\S]*?)\"\}/g, 'placeholder={$1}');
  fs.writeFileSync(f, c, 'utf8');
  console.log('fixed', f);
});
