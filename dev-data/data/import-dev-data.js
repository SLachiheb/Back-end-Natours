const fs = require('fs');

const Tour = require('../../models/tourModel');

const tours = fs.readFileSync('tours-simple.json', 'utf8');

// READ JSON FILE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Successfully Loaded !');
  } catch (error) {
    console.log(error);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Successfully Deleted !');
  } catch (error) {
    console.log(error);
  }
};
