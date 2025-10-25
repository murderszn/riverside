#!/bin/bash

# Riverside Cafe - Vercel Deployment Script
echo "🚀 Deploying Riverside Cafe to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your site should be live at the URL provided above."
echo ""
echo "📝 Next steps:"
echo "1. Update the Open Graph URLs in index.html with your actual domain"
echo "2. Set up a custom domain in Vercel dashboard if desired"
echo "3. Configure any environment variables if needed"
