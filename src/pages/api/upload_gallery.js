import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, formidable will handle it
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public'); // Temporary upload directory
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'File upload failed' });
      return;
    }

    const id = fields.id[0];
    const file = files.file[0];
    console.log("id: " + id);
    console.log("file: " + file.originalFilename);

    // Validate file type
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = path.extname(file.originalFilename).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      res.status(400).json({ error: 'Invalid file type' });
      return;
    }

    // Create directory if it doesn't exist
    const dir = path.join(process.cwd(), "public", "upload", "morgue", id);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Generate a new file name
    const newFileName = `${uuidv4()}${fileExtension}`;
    const newPath = path.join(dir, newFileName);
    // Move file to the target directory
    const oldPath = file.filepath;

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        res.status(500).json({ error: 'Error saving file' });
        return;
      }
    });

    // add to database
    prisma.gallery.create({
        data: {
            morgueId: id,
            image: "/" + path.join("upload", "morgue", id, newFileName)
        }
    }).then((gallery) => {
        res.status(200).json(gallery);
    });
  });
};