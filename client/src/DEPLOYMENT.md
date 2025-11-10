# 🚀 Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Environment Variables**: Prepare your production values

## 📦 Backend Deployment

### 1. Deploy Backend to Vercel

```bash
cd server
npx vercel
```

**Follow the prompts:**
- Link to existing project? **N**
- Project name: `pdf-utils-backend`
- Directory: `./` (current directory)
- Override settings? **N**

### 2. Set Backend Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

```
NODE_ENV=production
DONATION_URL=https://www.buymeacoffee.com/vignesh328g
GOOGLE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXXX
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### 3. Get Backend URL

After deployment, copy your backend URL:
```
https://pdf-utils-backend-xxx.vercel.app
```

## 🎨 Frontend Deployment

### 1. Update Frontend Environment

Edit `client/.env.production`:
```
REACT_APP_API_URL=https://pdf-utils-backend-xxx.vercel.app
REACT_APP_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXXX
REACT_APP_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
REACT_APP_FORMSPREE_ID=mvgdoprb
REACT_APP_DOMAIN=https://your-frontend-domain.vercel.app
```

### 2. Deploy Frontend to Vercel

```bash
cd client
npx vercel
```

**Follow the prompts:**
- Link to existing project? **N**
- Project name: `pdf-utils-frontend`
- Directory: `./` (current directory)
- Override settings? **N**

### 3. Set Frontend Environment Variables

In Vercel Dashboard → Frontend Project → Settings → Environment Variables:

```
REACT_APP_API_URL=https://pdf-utils-backend-xxx.vercel.app
REACT_APP_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXXX
REACT_APP_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
REACT_APP_FORMSPREE_ID=mvgdoprb
REACT_APP_DOMAIN=https://pdf-utils-frontend-xxx.vercel.app
```

## 🔧 Post-Deployment Setup

### 1. Update CORS Settings

Your backend needs to allow requests from your frontend domain. Update the backend CORS configuration if needed.

### 2. Test the Application

1. **Backend Health Check**: Visit `https://your-backend.vercel.app/api/health`
2. **Frontend**: Visit your frontend URL
3. **Test PDF Upload**: Try uploading and unlocking a PDF
4. **Test Contact Form**: Submit a test message
5. **Test Donation Link**: Check if Buy Me Coffee works

### 3. Custom Domain (Optional)

1. **Buy a domain** (e.g., pdfutils.com)
2. **Add to Vercel**: Project Settings → Domains
3. **Update DNS**: Point your domain to Vercel
4. **Update environment variables** with your custom domain

## 🎯 Google AdSense Setup

1. **Apply to AdSense**: Use your live domain
2. **Add AdSense code**: Replace placeholder IDs in environment variables
3. **Create ad units**: Get real ad slot IDs
4. **Update GoogleAds component**: Replace placeholder slot IDs

## 📊 Analytics Setup

1. **Create Google Analytics property**
2. **Get Measurement ID**: Replace `GA_MEASUREMENT_ID`
3. **Update environment variables**
4. **Redeploy** both frontend and backend

## 🔒 Security Checklist

- [ ] Environment variables set correctly
- [ ] No sensitive data in code
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] File size limits in place
- [ ] Auto file deletion working

## 🚨 Troubleshooting

### Backend Issues
- Check Vercel function logs
- Verify environment variables
- Test API endpoints individually

### Frontend Issues
- Check browser console for errors
- Verify API URL is correct
- Test in incognito mode

### File Upload Issues
- Vercel has 50MB limit for serverless functions
- Files are stored in `/tmp` (temporary)
- Check if uploads directory is created

## 📈 Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Google Analytics**: Monitor user behavior
3. **AdSense Reports**: Track revenue
4. **Error Tracking**: Monitor function logs

## 🔄 Updates

To update your deployment:

```bash
# Backend
cd server
vercel --prod

# Frontend  
cd client
vercel --prod
```

## 💡 Tips

1. **Free Tier Limits**: Vercel free tier has usage limits
2. **Cold Starts**: First request may be slower
3. **File Storage**: Use cloud storage for permanent files
4. **Database**: Consider adding a database for user data
5. **CDN**: Vercel provides global CDN automatically

Your PDF Utils application is now live and ready for users! 🎉
