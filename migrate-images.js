const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const uploadImages = async () => {
  const imagesDir = path.join(__dirname, '../frontend/public/sketches');
  const files = fs.readdirSync(imagesDir);
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const form = new FormData();
    form.append('image', fs.createReadStream(filePath));
    await axios.post('http://localhost:3002/upload', form, {
      headers: form.getHeaders(),
    });
    console.log(`Uploaded ${file}`);
  }
};

uploadImages().catch(console.error);