var fs = require('fs');
var pretty = require('pretty');
const cheerio = require('cheerio');
var worksHTML = cheerio.load(`
  <ul>
  </ul>
`);
 
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
var path = process.argv[2];
var worksItems = [];

fs.readdir(path, function(err, items) {
    for (var i=0; i<items.length; i++) {
        let indexPath = `${path}/${items[i]}/index.html`;
        fs.exists(indexPath, function(exists){
          if(exists){
            let descFile = indexPath.replace('index.html','description.json');
            if (fs.existsSync(descFile)){
              description = JSON.parse(fs.readFileSync(descFile,'utf8'));
              console.log(description);
            }
            worksItems.push({"path": indexPath, "label": `${description.series} | ${description.title}`});
            indexPath == `${path}/${items[items.length - 1]}/index.html` && writeHTML(); 
          }
        });
    }

    
}); 

function writeHTML(){
  worksItems.map(function(item){
    worksHTML('ul').append(`<li><a href="${item.path}">${item.label}</a></li>`);
  })

  var rootHTMLFile = fs.readFileSync('index.html', 'utf8');
  var rootHTML = cheerio.load(rootHTMLFile);
  rootHTML('.listing').html(worksHTML.html());

  fs.writeFile('index.html', pretty(rootHTML.html(), {ocd: true}), function (err) {
    if (err) 
        return console.log(err);
    console.log('Index written.');
  });
}

 
//console.log(worksItems);
