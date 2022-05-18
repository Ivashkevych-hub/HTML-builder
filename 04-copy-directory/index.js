const path = require('path');
const fsp = require('fs').promises;


async function copyDir(input,output) {

  const entries = await fsp.readdir(input,{withFileTypes:true});
  await fsp.mkdir(output , { recursive: true });

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



if (module.parent) {  
  exports.copy = copyDir;
} else {  
  const output = path.join(__dirname, 'Copy') ;
  const input = path.join(__dirname,'files');
  
  copyDir(input,output);
  console.log('folder "Copy" complete');
}  

