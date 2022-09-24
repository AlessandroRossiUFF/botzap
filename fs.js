// https://pt.stackoverflow.com/questions/45620/como-ler-um-arquivo-grande-linha-a-linha-com-javascript-nodejs
/**
 * Node FS Example
 * Node JS Write to File
 */

var fs = require("fs");

var writeStream = fs.createWriteStream("JournalDEV.txt");
writeStream.write("Hi, JournalDEV Users. \n");
writeStream.write("Thank You.");
writeStream.end();

//

function readData(err, data) {
  console.log(data);
  return data;
}

fs.readFile('JournalDEV.txt', 'utf8', readData);

let l2 = ''
fs.readFile('JournalDEV.txt', 'utf-8', function(err, data) {

  let i = 0
  var linhas = data.split(/\r?\n/);
  linhas.forEach(function(linha) {
    //console.log(linha); // aqui podes fazer o que precisas com cada linha

    l2 = linha
    //console.log(l2);
  })

})
let l =
  fs.readFile('JournalDEV.txt', 'utf8', (err, texto) => {
    var linhas = texto.split('\n');
    // agora podes usar dentro desta callback "linha", 
    // como uma array onde cada entrada é uma linha nova
    //console.log(fs);
  });


function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}





// Firstly require a file-system module.
const fs2 = require('fs');

// data container.
let dataBufferContainer = '';

// read the use of fs.readFileSync method.
dataBufferContainer = fs2.readFileSync('JournalDEV.txt');



// convert buffer data to string.
let data = dataBufferContainer.toString();

console.log(data);
// node fs.js
let arrL = [];
let line = 0;
var linhas = data.split(/\r?\n/);
linhas.forEach(function(linha) {
  //console.log(linha); // aqui podes fazer o que precisas com cada linha
  arrL[line] = linha
  line += 1
  //console.log(l2);
})
console.log(arrL[1]);