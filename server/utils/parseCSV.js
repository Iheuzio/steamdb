const fs = require('fs');

//USE THIS TO REMOVE THE COMMAS FROM THE GENRES COLUMN IN THE CSV FILES

function removeCommasInQuotes(inputFile, outputFile) {
  const data = fs.readFileSync(inputFile, 'utf8');
  const lines = data.split('\n');
  lines.pop();

  const modifiedLines = lines.map(line => {
    
    try{
      const modifiedData = line.replace(/(".*?")/g, (match) => {
        // Replace commas inside quotes
        return match.replace(/,/g, '');
    });
      console.log(modifiedData);
    }
    catch(e){
      console.log('Something went wrong', e);
    }
    
  });

  const modifiedData = modifiedLines.join('\n');

  fs.writeFileSync(outputFile, modifiedData, 'utf8');
}

//IFFE to run the above method
(async () => {
  removeCommasInQuotes('./dataset/dataset_limited.csv', './dataset/dataset_limited.csv');
})();