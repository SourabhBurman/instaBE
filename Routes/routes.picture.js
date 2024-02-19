const express = require('express');
const { PictureModel } = require('../Model/model.picture');
const { auth } = require('../Middleware/auth');
const pictureRoute = express.Router();

pictureRoute.post('/',auth,async(req,res)=> {
  const payload = req.body;
  try{
       const post = new PictureModel(payload);
       await post.save();
       res.status(200).send({msg:"new post successfully added",post})
  } catch(err) {
    res.status(400).send({err})
  }
})

pictureRoute.get('/',auth,async(req,res)=> {
    const userId = req.body.userId;
    const query = {
        userId
    };
    if(req.query.device) {
        query.device = req.query.device
    }
    try{
         const album = await PictureModel.find(query).skip(req.query.page * 1).limit(3);
         res.status(200).send({msg:"list of all the pictures",album})
    } catch(err) {
      res.status(400).send({err})
    }
  })

  pictureRoute.get('/:id',auth,async(req,res)=> {
    const userId = req.body.userId;
    const {id} = req.params;
    try{
         const picture = await PictureModel.findOne({_id:id});
         if(picture.userId==userId) {
     res.status(200).send({picture})
         } else {
            res.status(200).send({msg:"Sorry you are not authorized to view this picture"})
         }
    } catch(err) {
      res.status(400).send({err})
    }
  })


  pictureRoute.patch('/:id',auth,async(req,res)=> {
    const userId = req.body.userId;
    const {id} = req.params;
    try{
         const picture = await PictureModel.findOne({_id:id});
         if(picture.userId==userId) {
            const newpost = await PictureModel.findByIdAndUpdate({_id:id},req.body);
            res.status(200).send({msg:"post upddated successfull"})
         } else {
            res.status(200).send({msg:"Sorry you are not authorized to update this picture"})
         }
    } catch(err) {
      res.status(400).send({err})
    }
  })

  pictureRoute.delete('/:id',auth,async(req,res)=> {
    const userId = req.body.userId;
    const {id} = req.params;
    try{
         const picture = await PictureModel.findOne({_id:id});
         if(picture.userId==userId) {
            const newpost = await PictureModel.findByIdAndDelete({_id:id});
            res.status(200).send({msg:"post deleted successfull"})
         } else {
            res.status(200).send({msg:"Sorry you are not authorized to delete this picture"})
         }
    } catch(err) {
      res.status(400).send({err})
    }
  })


module.exports = {pictureRoute}