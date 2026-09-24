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
APP_URL=https://trust-first-ivy.vercel.app
NEXT_PUBLIC_APP_URL=https://trust-first-ivy.vercel.app

# MongoDB
MONGODB_URI=mongodb+srv://jeelnandha52:8MEFgy75r2Z5vv1V@setu.ql96ebh.mongodb.net/setu?retryWrites=true&w=majority

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCtuWqRevBeq8t7GDtflpIXJ7uiq755U0A
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=setu-79fd9.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=setu-79fd9
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=setu-79fd9.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=103604699354
NEXT_PUBLIC_FIREBASE_APP_ID=1:103604699354:web:99f835acd19d3199f665e3
NEXT_PUBLIC_FIREBASE_VAPID_KEY=BOSXgH1LIsi8PHSbc5oO0GJzLdyEXv-QZam6IzB9ZGL1CgMVMkmjnv6tCmaHrCi1NA1oZCmdnQeEruCOjrH_sfE

FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@setu-79fd9.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCf1g+QeYva0G3g\nU1yzZpnQV4cL31MvBdrz/V7IWixj0JFm4VKRv3BJqwkJwnrr5VuMrSw2emekXVMw\n6Ch7DEapJuqAqa4fL4spXUPv1qwXwGaIn5pClo/DNBJWHzbMFth5ZXAMPAJBspE9\nDYWKTmE79yb9IFn6+lnSoRtpn39gyPoYlTCh1cuPbu7n/9oF1qrdhOVfJjkBzgC2\nNkjfEhhSjISuRautdyluou/v66D5DETDUv3fL3Lid/W2qing0NdXiM5MrNJDYtam\nx5uYCKo6KdFY7YfZsZEubdeZiBhnhyGmN8GjyJeQYI81I0Tx43dKjIy5/q2zFT0N\nAaIYqEgNAgMBAAECggEAAdcSjczAbe/5W9xJ1Gzpd2sSjHHxQLjWCPoRRcg3+5wy\nmFcevrvP/KEh9QFOrfmRgMCbojLtj4hdhVIe6S++foMKrxmE/inrdbnzpsa3a3yV\nEZyYx4x5MjuevGwWkunuaxNeY12rfvshzeyibXGyj+CsC7z8HDYWo6SkLqad7kzN\nX7VbFHbxCDZMdihvflUFA5TCGJKNIrlNf6fJ4pt8f/ONS0G0wXlgyxMCJlAi2U++\n6orfqehaYaBLsOxFOfasn+T2EcjfVM2BuQ06/N2tECKLSaxUUhPv0Vc9JP0VNdC/\n50Q11Vv/5lhrv2S3rjZHSjydX5tpx79eksaUPvUocQKBgQDOTFC+YoA21IkntwhN\nwkpqnZTzC26ASJTFSvQpr7nXHgBItA85JoJvzaUh4w2CS4HM0oV3D0MZ2S9Px7Zu\nPfG7rHRk1I9OxKLwk638cY51T9C1f4aFpYwouvhEnAlX3NSXj/DfyqKE1vzya07r\n9H+NPM83gWuEdDPYTdy9PdL59QKBgQDGWCZSEzfkwI2r5H2E4M7ONizKWO1Cjfvp\n1QWLHeodxRIsb0Uz3ZnfTpwC3yKaXp9CEG3GVcU7A/bwgTPPPG/1TenXqFC1T/tE\nYSeE/eAwkZXeiEVAKC7xmkomKw2y1bIgOIHi1620SEtSNLhUmlROT5h7UROfmx5b\ntL5rNEVOuQKBgQC0qlzj/ntuiT78Suy4vHhTWmHBX7eMHQQ8q+GcSEqmO53gDeBv\nGmyM4TnGrYN9IgcwiwVbOUB4eJ1YbvwzG4iB5Quh6gz+3HId4hcyx3gNALM039O9\nYzeVy/f0jfoYukpr2SEHu/wL/gNTgeqB9YNm+2Q1pd+1BdcJjVbNXEFRqQKBgGJe\nX4r/Gw5pbRneNV5MfGSLO8WTOwByGIkM7DXlvTHMhknhWYnykpjMjNVjwu6alROX\nwEnISgwN2E/JVF+oUsJvRNV/FaAGrdBo+sebfa+41IJMRUQfacDLS5EIcz/JehE+\n1TQi0XSDElAP84eKDtvT4ATw3fGfZfwHdRUIFIOJAoGADlHxtC0e29heRLzcHIco\nK3ITpxsTzdHADQPcw6WPkAykOMtjVqEuG+zwlZC7H23qMiKtdnR4JuCBPfRQ6DK6\nJ0UxY+wRw4GeEah4UQobqV36Wg+CktM4aXUpOywWm7l71o6U9mp4MBQt8uvQeUeb\nBzyESdb5Mjwoe4Ppp3yIba4=\n-----END PRIVATE KEY-----\n

# Email
EMAIL_USER=jeelnandha52@gmail.com
EMAIL_PASSWORD=tvor ftqs lbbd yaof
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=jeelnandha52@gmail.com
EMAIL_SERVER_PASSWORD=tvor ftqs lbbd yaof
EMAIL_FROM=jeelnandha52@gmail.com

# AI
GEMINI_API_KEY=AIzaSyDNmsDJL51v7Tco6i2SftXbUUwLkFHGea0

# Radar
NEXT_PUBLIC_RADAR_PUBLISHABLE_KEY=prj_test_pk_dd38bf146a5fd7d1e8f3eb909c54caa1005581ca

# Make Webhook
MAKE_CALL_WEBHOOK_URL=https://hook.us2.make.com/b4frunmm8q5eub73jcdx97flfgaaixg4
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
