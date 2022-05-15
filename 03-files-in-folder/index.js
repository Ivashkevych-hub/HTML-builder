const path = require('path');
const fs = require('fs');
const dirName = path.join(__dirname,'secret-folder');
  

fs.readdir(dirName,
  {withFileTypes: true},
  (err, files) => {
    if (err) throw err;

    files.forEach(item =>{
      let file = path.join(dirName,item.name);
      fs.stat(file, function() {
        return function(err, stats) {
        
          if(stats.isFile()){ //проверка isFile
            let extension = path.extname(file); //разрешение
            let basename = path.basename(file); //полное имя с разрешением
            let fileName = basename.slice( 0, - extension.length ); 
            let size = stats.size / 1024;

            console.log(`${fileName} ${extension} ${size} kb`);
          }            
        };
      }(file));       
    });
  });




// files.forEach(file => {
//   if(!file.isDirectory()){

//     let fil = path.join(dirName,file.name);
//     console.log(path.extname(fil));

//     fs.stat(fil, function(f) {
//       return function(err, stats) {
//         console.log(f);
//         console.log(stats['size']);
//       }
//     }(fil));

//   }
// });