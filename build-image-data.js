
console.log(">>> build-image-data.js 腳本開始執行 <<<");
// build-image-data.js
const fs = require('fs');
const path = require('path');

const baseImagePath = 'img'; // 您的圖片根目錄
const outputFilePath = 'scripts/image-data.js'; // 生成的 JS 檔案路徑
const projectFolders = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13']; // 您的專案資料夾名稱

let imageGroups = [];

console.log('--- 開始生成圖片數據 ---');

projectFolders.forEach(folder => {
  const fullFolderPath = path.join(__dirname, baseImagePath, folder); // 構建完整路徑
  const imagesInFolder = [];

  try {
    const files = fs.readdirSync(fullFolderPath); // 同步讀取資料夾內容
    files.forEach(file => {
      // 檢查是否是圖片檔案（您可以根據需要添加更多副檔名）
      if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        imagesInFolder.push(path.join(baseImagePath, folder, file).replace(/\\/g, '/')); // 確保路徑斜槓正確
      }
    });
    imageGroups.push(imagesInFolder);
    console.log(`- 資料夾 '${folder}' 已處理，找到 ${imagesInFolder.length} 張圖片。`);
  } catch (error) {
    console.warn(`- 無法讀取資料夾 '${folder}' 或資料夾不存在。錯誤: ${error.message}`);
    imageGroups.push([]); // 如果資料夾不存在，則添加一個空陣列
  }
});

// 將數據寫入一個 JavaScript 檔案
const jsContent = `
// 這個檔案是自動生成的，請勿手動修改！
const imageGroups = ${JSON.stringify(imageGroups, null, 2)};
`;

// 確保輸出目錄存在
const outputDir = path.dirname(outputFilePath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFilePath, jsContent, 'utf8');

console.log(`圖片數據已成功生成到: ${outputFilePath}`);
console.log('--- 圖片數據生成完成 ---');