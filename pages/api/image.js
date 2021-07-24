import formidable from 'formidable';
const fs = require('fs');
const uploadDir = './public/images';

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req, res) => {

  if (req.method === 'GET') {
    const files = fs.readdirSync(uploadDir);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ files }, null, 2));

  } else if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
      fs.rename(file.image.path, form.uploadDir + "/" + file.image.name, () => {
        const files = fs.readdirSync(uploadDir);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ files }, null, 2));
      });
    });
  }

};