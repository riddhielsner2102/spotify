const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const multer = require('multer')
const cors = require("cors");
require("./db/config");
const users = require("./modal/Users");
const product = require("./modal/Product");
const Product = require("./modal/Product");
const Album = require("./modal/album")
const jwt = require('jsonwebtoken');
const fs = require('fs');
const jwt_key = "Elsneradmin"
const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));
// app.get("*", (req, res) => {
//   const filePath = path.join(__dirname, "dist/index.html");
//   if (filePath && fs.existsSync(filePath)) {
//     return res.sendFile(filePath);
//   }
//   return res.send("Website is under maintaince!");
// });

app.post("/signup", async (req, res) => {
  let user = new users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({result}, jwt_key,{expiresIn: '2h'},(err, token) => {
    if(err)
    {
      res.send({ result: "Something went wrong" });

    }
    res.send( {result, auth: token});

  })
  // res.send(result);
});
app.post("/login", async (req, res) => {
  let user = await users.findOne(req.body).select("-password");
  if (user) {
    jwt.sign({user}, jwt_key,{expiresIn: '2h'},(err, token) => {
      if(err)
      {
        res.send({ result: "Something went wrong" });

      }
      res.send( {user, auth: token});

    })
  } else {
    res.send({ result: "No User Found" });
  }
});

app.post("/addproduct",  async (req, res) => {
  console.log(req.body)
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});
app.get("/productlist",verifytoken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products found" });
  }
});
app.delete("/product/:id", verifytoken, async (req, res) => {
  let result = await Product.deleteOne({
    _id: req.params.id,
  });
  res.send(result);
});
app.get("/product/:id", verifytoken, async (req, res) => {
  let result = await Product.findOne({
    _id: req.params.id,
  });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no data found" });
  }
});
app.put('/product/:id',verifytoken, async(req,res)=>{
    console.log(req.body);
    let result = await Product.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new : true}
    )
    res.send({result : result})
})
app.get('/searchdata/:key',verifytoken , async(req,res)=>{
  let result = await Product.find({
    "$or":[
      {
        name: {$regex: req.params.key}
      },
      {
        category: {$regex: req.params.key}
      },
      {
        company: {$regex: req.params.key}
      },
      {
        price: {$regex: req.params.key}
      }
    ]
  });
  res.send(result)

})  
function verifytoken(req, res, next) {
  let token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, jwt_key, (err, decoded) => {
      if (err) {
        res.status(401).send('Please provide a valid token');
      } else {
        // Token is valid; you can access the decoded information using 'decoded'
        // For example, you might want to store it in the request object for later use
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).send('Please provide a token');
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the directory where files will be uploaded
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Rename the uploaded file
  },
});
const upload = multer({ storage });

app.post('/albums/createalbum' , verifytoken, upload.fields([{ name: 'coverImage', maxCount: 1 },
 { name: 'audioFile', maxCount: 1 }
]
 ), async (req, res) => {
  try {
  const { title, artist, releaseDate } = req.body;
  const coverImage = req.files['coverImage'][0].path;
  const audioFile = req.files['audioFile'][0].path; // Get the file path
  const newAlbum = new Album({
    title,
    artist,
    releaseDate,
    coverImage,
    audioFile,
  });
  await newAlbum.save();  
  res.status(201).json({ message: 'Album created successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
}

})
app.put('/albums/updatealbum/:albumId', verifytoken,  upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'audioFile', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, artist, releaseDate } = req.body;
    const albumId = req.params.albumId;

    // Create an update object with the fields to be updated
    const update = {
      title,
      artist,
      releaseDate
    };

    // Check if new coverImage is provided
    if (req.files['coverImage']) {
      update.coverImage = req.files['coverImage'][0].path;
    }

    // Check if new audioFile is provided
    if (req.files['audioFile']) {
      update.audioFile = req.files['audioFile'][0].path;
    }

    // Update the album using updateOne
    const result = await Album.updateOne({ _id: albumId }, update);
    console.log("🚀 ~ file: index.js:198 ~ ]), ~ result:", result)

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Album updated successfully' });
    } else {
      res.status(404).json({ message: 'Album not found or no changes made' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.get('/searchalbum/:key',verifytoken , async(req,res)=>{
  let result = await Album.find({
    "$or":[
      {
        artist: {$regex: req.params.key}
      },
      {
        title: {$regex: req.params.key}
      }
    ]
  });
  res.send(result)

})  
app.delete('/albums/:albumId',verifytoken,  async (req, res) => {
  try {
    const albumId = req.params.albumId;

    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    // Get the file paths of the cover image and audio file
    const coverImagePath = album.coverImage;
    const audioFilePath = album.audioFile;

    // Delete the album from the database
    await Album.findByIdAndDelete(albumId);

    // Delete the associated files from the uploads folder
    fs.unlinkSync(coverImagePath); // Delete cover image
    fs.unlinkSync(audioFilePath); // Delete audio file

    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/albums/getalbums',verifytoken, async(req,res)=>{
  let album = await Album.find();
  if (album.length > 0) {
    res.send({data: album});
  } else {
    res.send({ result: "No Products found" });
  }

})
app.get('/albums/:id', verifytoken,  async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).send({ result: "Album not found" });
    }

    res.send({ data: album });
  } catch (error) {
    console.error(error);
    res.status(500).send({ result: "Server error" });
  }
});
app.listen(5000);
