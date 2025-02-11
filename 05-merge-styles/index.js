const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;



async function bundleCss(input,output){

  const entries = await fsp.readdir(input,{withFileTypes:true});
  //перебор файлов
  for(let entry of entries) {
    //поток чтения
    const inputCss = fs.createReadStream(path.join(input,entry.name));
    //разрешение файла
    let extension = path.extname(entry.name);
    //проверка на файл и разрешение .css
    if(entry.isFile() && extension == '.css'){
      //Объединение потоков чтения-записи
      inputCss.pipe(output);
    }
  }
}

if (module.parent) {  
  exports.css = bundleCss;
} else {  
  //поток записи в bundle.css
  const output = fs.createWriteStream(path.join(__dirname,'project-dist','bundle.css'));
  const input = path.join(__dirname,'styles');
  
  bundleCss(input,output); 
  console.log('bundle.css complete, open index.html in your browser');
}  


// //create bundle.css
// fs.writeFile(path.join(__dirname,'project-dist','bundle.css'),
// '',
// (err) => {
//   if (err) throw err;
// }
// );



