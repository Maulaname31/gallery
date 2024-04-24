const Comment = require('../models/comment-model')
const uuid = require('uuid')


exports.createComment = async( req, res) =>{
    const data = req.body
    try{
        const result = new Comment({
            commentId: uuid.v4(),
            photoId: data.photoId,
            userId: data.userId,
            contentComment: data.contentComment
        })
        await result.save()
        return res.status(201).json({message: "Success created comment"})
    }catch(error){
        console.error('error create comment: ', error)
        return res.status(500).json({ message: 'Failed to create comment', error: error.message });
    }
}

exports.getAllComment = async (req,res) =>{
    try{
        const result = await Comment.find({})
         res.json(result);
    }catch(error){
        console.error('Error fetching comment:', error);
        res.status(500).json({ error: 'Error fetching comment' });
        }
      };

  exports.deleteComment = async(req, res) =>{
        const id = req.params.id
        try{
            const result = await Comment.findOneAndDelete({commentId: id})
            if (!result){
                return res.status(404).json({message : 'Comment not Found'})
              }
              res.status(200).json({ message: 'Comment deleted successfully' });
            }catch(error){
              console.error('Error deleting Comment', error);
              res.status(500).json({error: 'Failed to delete Comment. An error occurred.'})
            }
          }

  exports.deleteCommentbyPhotoId = async(req, res) =>{
        const id = req.params.id
        try{
            const result = await Comment.findOneAndDelete({photoId: id})
            if (!result){
                return res.status(404).json({message : 'Comment not Found'})
              }
              res.status(200).json({ message: 'Comment deleted successfully' });
            }catch(error){
              console.error('Error deleting Comment', error);
              res.status(500).json({error: 'Failed to delete Comment. An error occurred.'})
            }
          }
    
        
    exports.getCommentById = async( req, res) =>{
        const id = req.params.id
        try{
            const result = await Comment.find({photoId: id})
            if(!result){
                return res.status(404).json({ message: 'Comment not found' });
              }
              return res.status(200).json( result );
            }catch(error){
              console.error('Error:', error);
              return res.status(500).json({ message: 'failed to find Comment' });
            }
          }; 
    
    
    exports.updateComment = async (req, res) =>{
        const id = req.params.id
        const updatedData =req.body
        try{
            const result  = await Comment.findOneAndUpdate({commentId: id}, {$set: updatedData}, {new: true})
            if (!result) {
                return res.status(404).json({ error: 'Comment not found' });
              }
              await result.save();
          
              console.log('Comment updated successfully');
          
              res.status(200).json({ message: 'Comment updated successfully' });
            } catch (error) {
              console.error('Error updating Comment:', error);
              res.status(500).json({ error: 'Error updating Comment' });
            }
          };