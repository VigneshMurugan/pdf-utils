# PDF Utils

A modern web application for PDF utilities including unlock, merge, split and more features.

## Features

- 🔓 **PDF Unlock**: Remove password protection from PDF files
- 🗑️ **Auto Cleanup**: Files are automatically deleted after download for privacy
- 🎨 **Modern UI**: Clean, professional interface inspired by BookMyShow
- ☕ **Support**: Buy me a coffee integration
- 🔒 **Secure**: Rate limiting and file size restrictions
- 📱 **Responsive**: Works on all devices

## Tech Stack

### Backend
- Node.js + Express
- PDF-lib for PDF processing
- Multer for file uploads
- Security middleware (Helmet, CORS, Rate limiting)

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Modern UI components
- Responsive design

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd pdf-utils
```

2. Install dependencies
```bash
npm install
cd server && npm install
cd ../client && npm install
```

3. Start the development server
```bash
npm run dev
```

This will start both the backend server (port 5000) and React frontend (port 3000).

## API Endpoints

### POST /api/unlock-pdf
Unlock a password-protected PDF file.

**Request:**
- `pdf`: PDF file (multipart/form-data)
- `password`: PDF password (string)

**Response:**
```json
{
  "success": true,
  "message": "PDF unlocked successfully",
  "downloadUrl": "/api/download/filename",
  "fileName": "unlocked-document.pdf"
}
```

### GET /api/download/:filename
Download the processed PDF file. File is automatically deleted after download.

## Security Features

- File size limit: 50MB
- Rate limiting: 10 requests per 15 minutes per IP
- Automatic file cleanup after 1 hour
- Only PDF files accepted
- Secure headers with Helmet

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
