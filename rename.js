var fs = require('fs')
var removeSapces = true;
const rename = function renameFiles(){
     let inputDir = 'build/img';
     let outputDir = 'renamed/img';
     let outNamedMapDir = 'renamed/name'
     let length = 0;
    
     if(fs.existsSync(outputDir)){
        deleteFolderRecursive(outputDir)
     }
     
    fs.mkdirSync(outputDir,{recursive: true})

    if(fs.existsSync(outNamedMapDir)){
        deleteFolderRecursive(outNamedMapDir)
     }

     fs.mkdirSync(outNamedMapDir,{recursive: true})

    return fs.readdirSync(inputDir).forEach(file => {
        console.log(`====================`);
        console.log('\x1b[36m%s\x1b[0m',`Old Name: ${file}`);
        console.log('\x1b[33m%s\x1b[0m',`Renamed: ${removeSapces === true ? file.split('.')[0].replaceAll(' ','_') : file.split('.')[0]}.png`);
        console.log(`====================`);
         fs.renameSync(`${inputDir}/${file}`,`${outputDir}/${removeSapces === true ? file.split('.')[0].replaceAll(' ','_') : file.split('.')[0]}.png`,(err) => {
            if(err) {throw err;}
         });
    })
}

var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
          var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
      }
  };

module.exports = rename;