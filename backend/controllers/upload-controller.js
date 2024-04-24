const Upload = require('../models/upload-model')
const uuid = require('uuid')
const sizeOf = require('image-size');
const path = require('path');



exports.addPhoto = async (req, res) =>{
    const data = req.body
  
    try{

      const dimensions = sizeOf(req.files['src'][0].path);
      
      const { width, height } = dimensions;

        const createPhoto = new Upload({
            photoId: uuid.v4(),
            photoTittle: data.photoTittle,
            description: data.description,  
            uploadDate: data.uploadData,
            category: data.category,
            fileLocation:[
              {
                src: req.files['src'][0].path,
                width: width,
                height: height
              }
            ],
            userId: data.userId,
            albumId: data.albumId,
            categories: JSON.parse(data.selectedCategories)
        })
        await createPhoto.save();
        res.status(200).json({message: "Data save to database successfully"})
    }catch (error){
    console.error('Error saving data to the database:', error);
    res.status(500).json({ error: 'Error saving data to the database' });
  }
};


exports.getAllPhoto = async ( req, res) =>{

   try{
    const result = await Upload.find({})
    res.json(result);
} catch (error) {
  console.error('Error fetching data:', error);
  res.status(500).json({ error: 'Error fetching data' });
}
};

exports.getPhotoByPhotoId = async (req, res) => {
  const id = req.params.id;
  try {
      const result = await Upload.findOne({ photoId: id });
      if(!result){
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(result);
  } catch (err) { 
      console.error('Error:', err);
      return res.status(500).json({ message: 'An error occurred while fetching user photos' });
  }
};

exports.getPhotoByUserId = async (req, res) => {
  const id = req.params.id;
  try {
      const result = await Upload.find({ userId: id });
      if(!result){
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(result);
  } catch (err) { 
      console.error('Error:', err);
      return res.status(500).json({ message: 'An error occurred while fetching user photos' });
  }
};

exports.getPhotoBycategoryId = async (req, res) => {
  const id = req.params.id;
  try {
      const result = await Upload.find({'categories.categoryId': id });
      if(!result){
        return res.status(404).json({  message: 'No photos found for the specified category' });
    }
    res.json(result);
  } catch (err) { 
      console.error('Error:', err);
      return res.status(500).json({message: 'An error occurred while fetching photos for the specified category' });
  }
};
exports.getPhotoByAlbumId = async (req, res) => {
  const id = req.params.id;
  try {
      const result = await Upload.find({albumId: id });
      if(!result){
        return res.status(404).json({  message: 'No photos found for the specified album' });
    }
    res.json(result);
  } catch (err) { 
      console.error('Error:', err);
      return res.status(500).json({message: 'An error occurred while fetching photos for the specified album' });
  }
};

exports.deletePhoto = async (req, res) =>{
    const id = req.params.id    
    try{
        const result = await Upload.findOneAndDelete({photoId : id})
        if(!result){
            return res.status(404).json({ message: 'Photo not found' });
          }
          res.status(200).json({ message: 'Photo was deleted ' });
        } catch (error) {
          console.error('Error deleting photo:', error);
          res.status(500).json({ error: 'Error deleting photo' });
        }
      };

exports.updateData = async (req, res) =>{
    const id = req.params.id
    updatedData = req.body

    try{
        const result = await Upload.findOneAndUpdate({photoId : id}, {$set: updatedData}, {new: true})
        if (!result) {
            return res.status(404).json({ error: 'data not found' });
          }
          await result.save();
          res.status(200).json({ message: 'Data updated successfully' });
        } catch (error) {
          console.error('Error updating data:', error);
          res.status(500).json({ error: 'Error updating data' });
        }
      };