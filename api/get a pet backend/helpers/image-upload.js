const multer = require('multer');
const path = require('path');

//destination to store the images
const imageStorage = multer.diskStorage({
    destination: function(req, file, callback){
        let folder = '';

        if(req.baseUrl.includes('users')){
            folder = 'users';
        }else if(req.baseUrl.includes('pets')){
            folder = 'pets';
        };

        callback(null, `public/images/${folder}`);
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, callback){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return callback(new Error('Formato inválido! Envie um arquivo jpg ou png'));
        }
        callback(undefined, true);
    }
});

module.exports = { imageUpload }