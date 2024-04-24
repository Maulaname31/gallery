const Category = require('../models/category-model')
const uuid = require('uuid')

exports.createCategory = async (req, res)=>{
    const data = req.body
    try{
        const category = new Category({
            categoryId: uuid.v4(),
            nameCategory: data.nameCategory,

        })
        await category.save()

        return res.status(200).json({message: 'successfull create category'})
    }catch(error){
        console.error('Error Create category:', error);
        return res.status(500).json({ message: 'Failed to create category', error: error.message });
      }
    };

exports.getAll = async (req, res) =>{
    try{
        const result = await Category.find({})
        res.json(result)
    }catch(error){
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
    }
  };

exports.deleteCategory = async(req, res) =>{
    const id = req.params.id
    try{
        const result = await Category.findOneAndDelete({categoryId: id})
        if (!result){
            return res.status(404).json({message : 'category not Found'})
          }
          res.status(200).json({ message: 'category deleted successfully' });
        }catch(error){
          console.error('Error deleting category', error);
          res.status(500).json({error: 'Failed to delete category. An error occurred.'})
        }
      }

exports.getCategoryById = async( req, res) =>{
    const id = req.params.id
    try{
        const result = await Category.findOne({categoryId: id})
        if(!result){
            return res.status(404).json({ message: 'Category not found' });
          }
          return res.status(200).json({ message: 'category Found', result });
        }catch(error){
          console.error('Error:', error);
          return res.status(500).json({ message: 'failed to find category' });
        }
      }; 
      
exports.updateCategory = async (req, res) =>{
    const id = req.params.id
    const updatedData =req.body
    try{
        const result  = await Category.findOneAndUpdate({categoryId: id}, {$set: updatedData}, {new: true})
        if (!result) {
            return res.status(404).json({ error: 'Category not found' });
          }
          await result.save();
      
          console.log('Category updated successfully');
      
          res.status(200).json({ message: 'Category updated successfully' });
        } catch (error) {
          console.error('Error updating Category:', error);
          res.status(500).json({ error: 'Error updating Category' });
        }
      };