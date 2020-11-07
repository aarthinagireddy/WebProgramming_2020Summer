const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/vektor' , { useNewUrlParser: true ,
  //  useUnifiedTopology: true});

mongoose.connect('mongodb+srv://Reddy123:Reddy123@cluster0-ixqwt.mongodb.net/db1?retryWrites=true&w=majority')
    .then(() => console.log('connection successful'))
var models_path = path.join(__dirname, './../models');
// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
   }
})
