const fs = require('fs');
const path = require('path');
const readline = require('readline');
//stdin = input;
const { stdin: input, stdout:output } = require('process');

// При выполнении команды node 02-write-file в папке 02-write-file создаётся текстовый файл
fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
    if (err) throw err;
  }
);

const rl = readline.createInterface({ input, output });

function rlClose(){
  console.log('Удачи в изучении Node.js!');  
  rl.close();
}

//отслеживаем при нажатии ctrl+c
rl.on('SIGINT', () => {
  rlClose();
});

//в консоль выводится приглашение на ввод текста
rl.question('Привет!!Введите какой-то текст\n', (input) => {

  //проверка текста на 'exit'
  if(input == 'exit'){
    rlClose();
    return;
  } 
  //первый ввод
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    input,
    (err) => {
      if (err) throw err;
      console.log('Файл "text.txt" был изменен');
    }
  );
  // запись далее отслежываем enter и вводим текст (line = смена строки)
  rl.on('line', (input) => {
    if(input == 'exit'){
      rlClose();
      return;
    } 
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      `\n${input}`,
      err => {
        if (err) throw err;
        console.log('Файл "text.txt" был изменен');
      }
    );
  });
});


