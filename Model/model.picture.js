const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
    quote : {type:String},
    photo : {type:String},
    device : {type:String},
    commentsCount : {type:Number},
    userId : {type:String}
},{
    versionKey : false
})

const PictureModel = mongoose.model('picture',pictureSchema);

module.exports = {PictureModel};
