const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/adoptapet');
    console.log('conectado');
}

main().catch((error) => console.log(error));

module.exports = mongoose;