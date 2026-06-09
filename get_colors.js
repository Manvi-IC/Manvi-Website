const { Jimp } = require('jimp');

async function getColors(filePath) {
  try {
    const img = await Jimp.read(filePath);
    const colors = {};
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      // Skip mostly white or mostly black/dark
      if ((r > 240 && g > 240 && b > 240) || (r < 30 && g < 30 && b < 30)) return;
      
      const hex = r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
      colors[hex] = (colors[hex] || 0) + 1;
    });
    
    const sorted = Object.entries(colors).sort((a, b) => b[1] - a[1]);
    console.log('File:', filePath);
    console.log('Top colors:', sorted.slice(0, 15).map(c => '#' + c[0] + ' (' + c[1] + ')'));
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  const files = [
    'media_1ad81f7d-4215-4170-9def-c2bd1e810ebf_1780995872544.png',
    'media_1ad81f7d-4215-4170-9def-c2bd1e810ebf_1780995875163.png'
  ];
  for (let file of files) {
    await getColors('C:\\Users\\altaf\\.gemini\\antigravity-ide\\brain\\1ad81f7d-4215-4170-9def-c2bd1e810ebf\\.tempmediaStorage\\' + file);
  }
}
run();
