const Album = require('../models/album-model')
const uuid = require('uuid')

exports.createAlbum = async(req, res) =>{
    const data = req.body
    const coverPhotoPath = req.files['coverPhoto'] && req.files['coverPhoto'][0] ? req.files['coverPhoto'][0].path : '';
    try{
        const result = new Album({
            albumId: uuid.v4(),
            albumName: data.albumName,
            description: data.description,
            coverPhoto: coverPhotoPath,
            createdAt: data.createdAt,
            userId: data.userId
        })
        await result.save() 
        return res.status(201).json({message:'Succsess Create Album'})
    }catch(error){
        console.error('error create album: ', error)
        return res.status(500).json({ message: 'Failed to create Album', error: error.message });
    }
  }
  
  exports.updateAlbum = async (req, res) =>{
      const id = req.params.id
      const data = req.body;


      const updatedData = {
          ...(data.albumName && { albumName: data.albumName }),
          ...(data.description && { description: data.description }),
          ...(data.createdAt && { createdAt: data.createdAt }),
          ...(data.userId && { userId: data.userId }),
      };
  
      if (req.files['coverPhoto'] && req.files['coverPhoto'][0]) {
          updatedData.coverPhoto = req.files['coverPhoto'][0].path;
      }
      try{
          const result  = await Album.findOneAndUpdate({albumId: id}, {$set: updatedData}, {new: true})
          if (!result) {
              return res.status(404).json({ error: 'Album not found' });
            }
            await result.save();
        
            console.log('Album updated successfully');
        
            res.status(200).json({ message: 'Album updated successfully' });
          } catch (error) {
            console.error('Error updating Album:', error);
            res.status(500).json({ error: 'Error updating Album' });
          }
        };

  exports.getAllAlbum = async (req, res) =>{
    try{
        const result = await Album.find({})
        res.json(result)
    }catch(error){
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
    }
  };

  exports.deleteAlbum = async(req, res) =>{
    const id = req.params.id
    try{
        const result = await Album.findOneAndDelete({albumId: id})
        if (!result){
            return res.status(404).json({message : 'album not Found'})
          }
          res.status(200).json({ message: 'album deleted successfully' });
        }catch(error){
          console.error('Error deleting album', error);
          res.status(500).json({error: 'Failed to delete album. An error occurred.'})
        }
      }

    
exports.getAlbumById = async( req, res) =>{
    const id = req.params.id
    try{
        const result = await Album.findOne({albumId: id})
        if(!result){
            return res.status(404).json({ message: 'album not found' });
          }
          return res.status(200).json({ message: 'album Found', result });
        }catch(error){
          console.error('Error:', error);
          return res.status(500).json({ message: 'failed to find album' });
        }
      }; 
exports.getAlbumByUserId = async( req, res) =>{
    const id = req.params.id
    try{
        const result = await Album.find({userId: id})
        if(!result){
            return res.status(404).json({ message: 'album not found' });
          }
          return res.json(result);
        }catch(error){
          console.error('Error:', error);
          return res.status(500).json({ message: 'failed to find album' });
        }
      }; 

