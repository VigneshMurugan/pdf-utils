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
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
fs.ensureDirSync(uploadsDir);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Ensure uploads directory exists for Vercel
if (process.env.VERCEL) {
  fs.ensureDirSync(uploadsDir);
}

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
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// Clean up old files (run every hour)
setInterval(() => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) return;
    
    files.forEach(file => {
      const filePath = path.join(uploadsDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;
        
        const now = new Date().getTime();
        const fileTime = new Date(stats.mtime).getTime();
        const hourAgo = 60 * 60 * 1000; // 1 hour in milliseconds
        
        if (now - fileTime > hourAgo) {
          fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting file:', err);
            else console.log('Deleted old file:', file);
          });
        }
      });
    });
  });
}, 60 * 60 * 1000); // Run every hour

// API Routes
app.post('/api/unlock-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const { password } = req.body;
    if (!password) {
      // Clean up uploaded file
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ error: 'Password is required' });
    }

    const inputPath = req.file.path;
    const outputFileName = `unlocked-${req.file.filename}`;
    const outputPath = path.join(uploadsDir, outputFileName);

    try {
      // Read the encrypted PDF
      const pdfBytes = await fs.readFile(inputPath);
      
      // Load the PDF document with password
      const pdfDoc = await PDFDocument.load(pdfBytes, { password });
      
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PDF Utils API is running' });
});

// Donation link endpoint (secure)
app.get('/api/donation-link', (req, res) => {
  res.json({ 
    url: process.env.DONATION_URL || 'https://www.buymeacoffee.com/vignesh328g',
    platform: 'buymeacoffee'
  });
});

// Server-side donation button HTML (most secure)
app.get('/api/donation-button', (req, res) => {
  const donationUrl = process.env.DONATION_URL || 'https://www.buymeacoffee.com/vignesh328g';
  
  const buttonHtml = `
    <div class="card bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200" style="padding: 1rem; text-align: center; border-radius: 0.5rem; border: 1px solid #fbbf24;">
      <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
        <span style="font-size: 1.5rem;">☕</span>
        <span style="font-size: 1rem; color: #ef4444; margin-left: 0.5rem;">❤️</span>
      </div>
      <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">
        Enjoying PDF Utils?
      </h3>
      <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem;">
        Support the development of this free tool by buying me a coffee!
      </p>
      <a href="${donationUrl}" target="_blank" rel="noopener noreferrer" 
         style="display: inline-flex; align-items: center; background-color: #eab308; color: white; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.5rem; text-decoration: none; transition: background-color 0.2s;"
         onmouseover="this.style.backgroundColor='#ca8a04'" 
         onmouseout="this.style.backgroundColor='#eab308'">
        <span style="margin-right: 0.5rem;">☕</span>
        <span>Buy me a coffee</span>
      </a>
      <p style="font-size: 0.75rem; color: #9ca3af; margin-top: 1rem;">
        Your support helps keep this service free and ad-free
      </p>
    </div>
  `;
  
  res.send(buttonHtml);
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 50MB.' });
    }
  }
  
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
