const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { PDFDocument } = require('pdf-lib');

const app = express();

// Middleware
app.use(helmet());

// CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:3002',
    'https://pdf-utils-frontend.vercel.app',
    'https://pdf-utils-frontend-nrwrmtks8-vigneshmurugans-projects.vercel.app',
    /\.vercel\.app$/,  // Allow all Vercel preview deployments
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Create uploads directory for Vercel
const uploadsDir = '/tmp/uploads';
fs.ensureDirSync(uploadsDir);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    cb(null, `${uniqueId}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PDF Utils API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'PDF Utils API is running' });
});

// PDF unlock endpoint
app.post('/api/unlock-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    if (!req.body.password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const inputPath = req.file.path;
    const outputFileName = `unlocked-${req.file.filename}`;
    const outputPath = path.join(uploadsDir, outputFileName);

    try {
      // Read the PDF file
      const pdfBytes = await fs.readFile(inputPath);
      
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(pdfBytes, { 
        password: req.body.password,
        ignoreEncryption: false 
      });

      // Save the unlocked PDF
      const unlockedPdfBytes = await pdfDoc.save();
      await fs.writeFile(outputPath, unlockedPdfBytes);

      // Clean up original file
      await fs.unlink(inputPath);

      res.json({
        success: true,
        message: 'PDF unlocked successfully',
        downloadUrl: `/api/download/${outputFileName}`,
        fileName: `unlocked-${req.file.originalname}`
      });

    } catch (pdfError) {
      // Clean up uploaded file
      await fs.unlink(inputPath);
      
      if (pdfError.message.includes('password') || pdfError.message.includes('encrypted')) {
        return res.status(400).json({ error: 'Invalid password or PDF is not encrypted' });
      }
      
      throw pdfError;
    }

  } catch (error) {
    console.error('Error unlocking PDF:', error);
    res.status(500).json({ error: 'Failed to unlock PDF. Please try again.' });
  }
});

// Download endpoint
app.get('/api/download/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);

    // Check if file exists
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set headers for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename.replace('unlocked-', '').replace(/^[^-]+-/, '')}"`);

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // Delete file after download
    fileStream.on('end', async () => {
      try {
        await fs.unlink(filePath);
        console.log('File deleted after download:', filename);
      } catch (error) {
        console.error('Error deleting file after download:', error);
      }
    });

    fileStream.on('error', (error) => {
      console.error('Error streaming file:', error);
      res.status(500).json({ error: 'Error downloading file' });
    });

  } catch (error) {
    console.error('Error in download route:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// Donation link endpoint (secure)
app.get('/api/donation-link', (req, res) => {
  res.json({ 
    url: process.env.DONATION_URL || 'https://www.buymeacoffee.com/vignesh328g',
    platform: 'buymeacoffee'
  });
});

// Export for Vercel
module.exports = app;
