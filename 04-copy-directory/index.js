const path = require('path');
const fsp = require('fs').promises;



//проверяем наличие копии
async function isExist(dir){
  try {
    await fsp.access(dir);
  } catch (e) {
    return false;
  }
  return true;
}

async function copyDir(input,output) {
  //заново переписываем 'copy-file'
  if(await isExist(output)){
    await fsp.rm(output, { recursive: true });
  }


  const entries = await fsp.readdir(input,{withFileTypes:true});
  await fsp.mkdir(output , { recursive: true });
  // const copy = await fsp.readdir(output,{withFileTypes:true});


  for(let file of entries) {
    const inputPath = path.join(input,file.name);
    const outputPath = path.join(output,file.name);


    if(file.isDirectory()) {
      await copyDir(inputPath,outputPath);
    } else {
      await fsp.copyFile(inputPath,outputPath);
      //более старый вариант
      // fs.createReadStream(inputPath).pipe(fs.createWriteStream(outputPath));
    }
  }

  // console.log(copy[0]);
}



if (module.parent) {  
  exports.copy = copyDir;
} else {  
  const output = path.join(__dirname, 'files-copy') ;
  const input = path.join(__dirname,'files');
  
  copyDir(input,output);
  console.log('create "files-copy "');
}  

