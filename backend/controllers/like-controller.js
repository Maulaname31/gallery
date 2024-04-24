const Like = require('../models/like-model')
const uuid = require('uuid')

exports.addLike = async (req, res) =>{
    const data = req.body
    try{
        const result = new Like({
            likeId: uuid.v4(),
            userId: data.userId,
            photoId: data.photoId
        })
        await result.save()
        return res.status(201).json({message: "Success add Like"})
    }catch(error){
        console.error('error add Like: ', error)
        return res.status(500).json({ message: 'Failed to add Like', error: error.message });
    }
}

exports.getByPhotoId = async ( req, res) =>{
    const id = req.params.id
    try{
        const result = await Like.find({photoId : id})
        if(!result){
            return res.status(404).json({ message: 'Like not found' });
        }
        return res.status(200).json(result);
    }catch(error){
        console.error('Error fetching Like:', error);
        res.status(500).json({ error: 'Error fetching Like' });
      }
 };

 exports.unLike = async(req, res) =>{
    const id = req.params.id
    try{
        const result = await Like.findOneAndDelete({userId : id})
        if(!result){
            return res.status(404).json({ message: 'like not found' });
          }
          res.status(200).json({ message: 'unlike ' });
        } catch (error) {
            console.error('Error deleting photo:', error);
            res.status(500).json({ error: 'Error deleting photo' });
          }
        };

 exports.deleteLikeByPhotoId = async(req, res) =>{
    const id = req.params.id
    try{
        const result = await Like.findOneAndDelete({photoId : id})
        if(!result){
            return res.status(404).json({ message: 'like not found' });
          }
          res.status(200).json({ message: 'unlike ' });
        } catch (error) {
            console.error('Error deleting photo:', error);
            res.status(500).json({ error: 'Error deleting photo' });
          }
        };

