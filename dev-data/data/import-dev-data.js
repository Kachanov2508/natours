const fs = require('fs')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel')

dotenv.config({ path: `./config.env` });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('DB connection successful!'))

//Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import data into db
const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('Data success loaded');
    } catch (error) {
        console.log(error)
    }
    process.exit();
}

//Delet al data from db
const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log('Data success deleted')
    } catch (error) {
        console.log(error)
    }
    process.exit();
}

if(process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}