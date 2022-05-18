const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;

const cssBundle = require('../05-merge-styles').css;
const copyDir = require('../04-copy-directory').copy;




async function htmlBuilder() {
  //создаем папку 'project-dist'
  await fsp.mkdir(path.join(__dirname,'project-dist') , { recursive: true });
  //    console.log('Cоздана папка "project-dist"');
  //читаем исходный template.html
  fs.readFile(path.join(__dirname,'template.html'),'utf-8' ,(err,html)=>{
    if (err) throw err;
    //используя регулярки находим компоненты в html,записваем в массив
    let components =  html.match(/{[^{}]+(?=})|$/g).join('').slice(1).split('{');
    // console.log(components);
    //в цикле меняем компонент с помощью replace 
    for(let i = 0;i<components.length;i++){
      const input = fs.createReadStream(path.join(__dirname,'components',`${components[i]}.html`), 'utf8');
      const output = fs.createWriteStream(path.join(__dirname,'project-dist','index.html'));

      input.on('data', chunk => {
        html = html.replace(`{{${components[i]}}}`, chunk);
        output.write(html);
      });
      input.on('error', error => console.log('Error', error.message));
    }
  });
}

htmlBuilder();


//Merge styles
const outputStyles = fs.createWriteStream(path.join(__dirname,'project-dist','style.css'));
const inputStyles = path.join(__dirname,'styles');

cssBundle(inputStyles, outputStyles);

//copy dir
const outputCopy = path.join(__dirname, 'project-dist','assets') ;
const inputCopy = path.join(__dirname,'assets');

copyDir(inputCopy,outputCopy, 'assets');





console.log('Cоздана папка "project-dist"');
console.log('Cоздан "index.html"'); 
console.log('скопирована папка "assets"');
console.log('style.css complete, open index.html in your browser');