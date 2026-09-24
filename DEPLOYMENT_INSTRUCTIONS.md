# Deployment Instructions for Vercel

## ✅ All Issues Fixed

1. **Transaction ID Extraction** - Uses Gemini 2.5 Flash API
2. **UPI Payment Button** - Direct deep link to open UPI apps
3. **Dynamic Vercel URL** - All emails now use the correct Vercel URL

## 🚀 Deploy to Vercel

### Step 1: Push to Git
```bash
git add .
git commit -m "Fixed: Transaction ID extraction, UPI links, and dynamic Vercel URLs"
git push
```

### Step 2: Set Environment Variables on Vercel

Go to your Vercel project settings → Environment Variables and add:

```env
# Application URL (CRITICAL - Must be set!)
APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key

FIREBASE_CLIENT_EMAIL=your_service_account_email@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
your_private_key
-----END PRIVATE KEY-----
"

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email@gmail.com
EMAIL_SERVER_PASSWORD=your_gmail_app_password
EMAIL_FROM=your_email@gmail.com

# AI (Google Gemini)
GEMINI_API_KEY=your_gemini_api_key

# Radar
NEXT_PUBLIC_RADAR_PUBLISHABLE_KEY=your_radar_publishable_key

# Make Webhook
MAKE_CALL_WEBHOOK_URL=your_make_webhook_url
```

### Step 3: Redeploy

After setting the environment variables, trigger a new deployment:
- Either push a new commit
- Or go to Vercel dashboard → Deployments → Click "Redeploy"

## 🎯 What's Fixed

### 1. Dynamic URL System
- Created `getAppUrl()` helper function in `lib/email.ts`
- Priority: `APP_URL` → `NEXT_PUBLIC_APP_URL` → Fallback to Vercel URL
- All email templates now use this dynamic function
- Works on all devices and environments

### 2. Email Links Updated
All these email buttons now use the correct Vercel URL:
- ✅ Borrower "View Agreement" button
- ✅ Witness "Review & Approve" button  
- ✅ Witness "View Agreement" button (after approval)
- ✅ Payment reminder "View Agreement" button

### 3. UPI Payment Links
- "Pay Now via Mobile" button uses direct UPI deep link
- Format: `upi://pay?pa={UPI_ID}&pn={NAME}&am={AMOUNT}&tn=Setu_AI_Repayment&cu=INR`
- Opens UPI app chooser on mobile devices

## 🧪 Testing After Deployment

1. **Create a new agreement** with witness
2. **Check borrower email** - "View Agreement" should go to `https://trust-first-ivy.vercel.app/dashboard/agreement/...`
3. **Check witness email** - "Review & Approve" should go to Vercel URL
4. **Test UPI button** - Should open UPI apps on mobile

## ⚠️ Important Notes

- The `APP_URL` environment variable is CRITICAL - it must be set on Vercel
- Old agreements in database may still have ngrok links (those were created before this fix)
- New agreements created after deployment will have correct Vercel URLs
- Make sure to set BOTH `APP_URL` and `NEXT_PUBLIC_APP_URL` on Vercel

## 🔧 Troubleshooting

If emails still show ngrok:
1. Check Vercel environment variables are set correctly
2. Trigger a new deployment after setting env vars
3. Clear any caches
4. Test with a NEW agreement (old ones may have cached data)
