const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');

const mongoUser = process.env.MONGO_ROOT_USER;
const mongoPass = process.env.MONGO_ROOT_PASS;
const mongoDb = process.env.MONGO_INITDB_DATABASE;

const app = express();
const port = 3002;

// MongoDB connection
mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@mongodb:27017/${mongoDb}?authSource=admin`);

const conn = mongoose.connection;
let bucket;

conn.once('open', () => {
  bucket = new GridFSBucket(conn.db, { bucketName: 'images' });
  console.log('GridFSBucket initialized');
});

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to upload images
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');

  const uploadStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
  });

  uploadStream.end(req.file.buffer);
  uploadStream.on('finish', () => {
    res.send({ message: 'Image uploaded', filename: req.file.originalname });
  });
  uploadStream.on('error', (err) => {
    res.status(500).send(err.message);
  });
});

// Optional: Endpoint to retrieve images
app.get('/images/:filename', (req, res) => {
  const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
  downloadStream.on('error', () => res.status(404).json({ error: 'Image not found' }));
  downloadStream.on('file', (file) => res.set('Content-Type', file.contentType));
  downloadStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Backend-service running on port ${port}`);
});