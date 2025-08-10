# Email Setup Instructions for Contact Form

Your contact form has been updated to send real emails to `patilpratiksha0@gmail.com` using EmailJS. Follow these steps to complete the setup:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Connect Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (recommended)
4. Follow the steps to connect your Gmail account (`patilpratiksha0@gmail.com`)
5. Note down the **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message from {{user_name}}

From: {{user_name}}
Email: {{user_email}}
Phone: {{user_phone}}

Message:
{{user_message}}

---
This message was sent from your website contact form.
```

4. Save the template and note down the **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "General" in EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. Copy this key

## Step 5: Update Configuration

1. Open `src/config/emailjs.js`
2. Replace the placeholder values:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_actual_service_id',     // From Step 2
  TEMPLATE_ID: 'your_actual_template_id',   // From Step 3
  PUBLIC_KEY: 'your_actual_public_key'      // From Step 4
}
```

## Step 6: Test the Contact Form

1. Start your React application: `npm run dev`
2. Go to the Contact section
3. Fill out and submit the form
4. Check `patilpratiksha0@gmail.com` inbox for the test message

## Important Notes

- **Free Plan**: EmailJS free plan allows 200 emails per month
- **Security**: The public key can be exposed in frontend code (it's designed for this)
- **Spam Protection**: EmailJS has built-in spam protection
- **Delivery**: Messages should arrive within 1-2 minutes

## Troubleshooting

If emails aren't being received:

1. Check the browser console for errors
2. Verify all IDs are correct in the config file
3. Check Gmail spam folder
4. Ensure Gmail service is properly connected in EmailJS dashboard
5. Test with a different email template

## Alternative Solutions

If you prefer not to use EmailJS:

1. **Netlify Forms**: If hosting on Netlify
2. **Formspree**: Another form handling service
3. **Backend API**: Create your own email sending backend
4. **Google Apps Script**: Use Google's scripting platform

---

**Current Status**: The contact form code is ready. You just need to complete the EmailJS setup above to make it functional.
