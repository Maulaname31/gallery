const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
  try {
    const data = req.body;
    const password = data.password;

    const hashPw = await bcrypt.hash(password, 10);

    let email = data.email.toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const user = new User({
      userId: uuid.v4(),
      username: data.username,
      email: email,
      role: data.role,
      fullName: data.fullName,
      address: data.address,
      password: hashPw,
    });

  
    await user.save();

    return res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};
   

 exports.getAll = async (req, res) =>{

   try{
    const result = await User.find({})
    res.json(result);
} catch (error) {
  console.error('Error fetching data:', error);
  res.status(500).json({ error: 'Error fetching data' });
}
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed. Incorrect password" });
    }

  
    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        role: user.role,
        username: user.username
      },
      process.env.JWT_SECRET, 
      { 
        expiresIn: '1h', 
      }
    );

    return res.status(200).json({
      message: 'Authentication Success',
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Authentication failed' });
  }
};

exports.deleteUser = async (req, res) =>{
  const id = req.params.id
  try{
    const result = await User.findOneAndDelete({userId : id})
    if (!result){
      return res.status(404).json({message : 'user not Found'})
    }
    res.status(200).json({ message: 'user deleted successfully' });
  }catch(error){
    console.error('Error fetching Item', error);
    res.status(500).json({error: 'Failed to delete user. An error occurred.'})
  }
}

exports.changeRole = async (req, res) =>{
  const id = req.params.id
  const{newRole} = req.body;
  try{
    const user = await User.findOneAndUpdate(
      { userId : id }, 
      { $set: { role: newRole } }, 
      { new: true } 
    );

    if(!user){
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    return res.status(200).json({ message: 'Peran pengguna berhasil diubah', user });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat mengubah peran pengguna' });
  }
}; 

exports.getOne = async (req, res)=>{
  const id = req.params.id
  try{
    const result = await User.findOne({userId: id})
    if(!result){
      return res.status(404).json({ message: 'user Not found' });
    }
    return res.status(200).json(result);
  }catch(error){
    console.error('Error:', error);
    return res.status(500).json({ message: 'error find user' });
  }
}; 

exports.updateUser  = async (req, res)=>{
  const id = req.params.id
  const {password, ...updatedData } = req.body;
  
  try {
    if(password){
      const hashPw = await bcrypt.hash(password, 10);
      updatedData.password = hashPw;
      
    }
    const result = await User.findOneAndUpdate(
      { userId : id },
      { $set: { ...updatedData} },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: 'user not found' });
    }

    res.status(200).json({ message: 'user updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
};