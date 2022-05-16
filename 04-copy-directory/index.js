const path = require('path');
const fsp = require('fs').promises;


const output = path.join(__dirname, 'Copy') ;
const input = path.join(__dirname,'files');



async function copyDir(input,output) {
  const entries = await fsp.readdir(input,{withFileTypes:true});
  await fsp.mkdir(output , { recursive: true });
  console.log('Папка "Copy" создана');
  for(let entry of entries) {
    const inputPath = path.join(input,entry.name);
    const outputPath = path.join(output,entry.name);

    if(entry.isDirectory()) {
      await copyDir(inputPath,outputPath);
    } else {
      await fsp.copyFile(inputPath,outputPath);
    }
  }
}

copyDir(input,output);