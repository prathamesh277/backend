const mongoose = require('mongoose')
const url='mongodb+srv://prathamesh:G4mzIfdkB5KFufh3@cluster0.sqgnq.mongodb.net/FirstDatabase?retryWrites=true&w=majority';

mongoose.connect(url).then(()=>{
   console.log(`connection successful`); }).catch((e)=>{
   console.log(e) })