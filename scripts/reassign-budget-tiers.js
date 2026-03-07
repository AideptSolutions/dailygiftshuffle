const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'products.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Map of product id → new budget tier based on actual prices
// $100–$149.99 → 100to150
// $150–$249.99 → 150to250
// $250+        → 250plus
const reassignments = {
  // $100–$149.99
  'couples-100-3':  '100to150', // Star Map $119.99
  'her-100-3':      '100to150', // Birthstone Bracelet $149.99
  'mom-100-3':      '100to150', // Weighted Blanket $129.99
  'kids-100-1':     '100to150', // LEGO Technic $129.99
  'kids-100-2':     '100to150', // Balance Bike $119.99
  'friends-100-2':  '100to150', // Ember Mug $149.99
  'friends-100-3':  '100to150', // Wine Tasting Set $139.99
  'pets-100-1':     '100to150', // Pet GPS Tracker $129.99
  'tech-100-1':     '100to150', // Raspberry Pi Kit $119.99
  'diy-100-1':      '100to150', // Smart Thermostat $129.99
  'lux-100-1':      '100to150', // Hotel Bathrobe $129.99

  // $150–$249.99
  'her-100-4':      '150to250', // Cashmere Sweater $189.99
  'him-100-1':      '150to250', // Ray-Ban Aviators $179.99
  'him-100-3':      '150to250', // Leather Weekender $249.99
  'mom-100-1':      '150to250', // Spa Day $199.99
  'mom-100-2':      '150to250', // Nespresso $179.99
  'dad-100-1':      '150to250', // Milwaukee Drill Kit $199.99
  'teens-100-2':    '150to250', // Beats Headphones $249.99
  'couples-100-2':  '150to250', // Sonos Speaker $249.99
  'pets-100-2':     '150to250', // Furbo Camera $169.99
  'fit-100-2':      '150to250', // Infrared Sauna Blanket $199.99
  'lux-100-2':      '150to250', // Watch Winder Box $189.99

  // $250+
  'her-100-1':      '250plus',  // KitchenAid Mixer $399.99
  'her-100-2':      '250plus',  // Dyson Airwrap $599.99
  'him-100-2':      '250plus',  // Traeger Grill $349.99
  'dad-100-2':      '250plus',  // Weber Spirit Grill $499.99
  'teens-100-1':    '250plus',  // Nintendo Switch OLED $349.99
  'baby-100-1':     '250plus',  // SNOO Bassinet $499.99
  'baby-100-2':     '250plus',  // Convertible Crib $299.99
  'couples-100-1':  '250plus',  // Hot Air Balloon $299.99
  'couples-100-4':  '250plus',  // Robot Vacuum $399.99
  'friends-100-1':  '250plus',  // YETI Cooler $325.99
  'fit-100-1':      '250plus',  // Oura Ring $299.99
};

let changeCount = 0;
for (const [id, newTier] of Object.entries(reassignments)) {
  // Match the product entry line containing this id and budgetTier:'100plus'
  const regex = new RegExp(`(\\{ id:'${id}',[^}]+budgetTier:)'100plus'`, 'g');
  const before = content;
  content = content.replace(regex, `$1'${newTier}'`);
  if (content !== before) {
    changeCount++;
    console.log(`✓ ${id} → ${newTier}`);
  } else {
    console.log(`⚠ No match for: ${id}`);
  }
}

// Also handle kit-100-1 and fin-100-1 which we know are $250+ range
const extraReassignments = {
  'kit-100-1': '250plus',  // Le Creuset Dutch Oven ~$350
  'fin-100-1': '150to250', // Standing Desk Converter ~$150-200
};

for (const [id, newTier] of Object.entries(extraReassignments)) {
  const regex = new RegExp(`(\\{ id:'${id}',[^}]+budgetTier:)'100plus'`, 'g');
  const before = content;
  content = content.replace(regex, `$1'${newTier}'`);
  if (content !== before) {
    changeCount++;
    console.log(`✓ ${id} → ${newTier}`);
  } else {
    console.log(`⚠ No match for: ${id}`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`\nDone. ${changeCount} products reassigned.`);

// Check if any '100plus' remain
const remaining = (content.match(/budgetTier:'100plus'/g) || []).length;
console.log(`Remaining '100plus' entries: ${remaining}`);
