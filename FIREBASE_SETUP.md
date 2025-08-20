# Firebase Setup Instructions

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" 
3. Name your project (e.g., "magnetic-woman-empire")
4. Enable Google Analytics (optional)

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" 
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Add your admin user:
   - Go to "Users" tab
   - Click "Add user"
   - Enter: `admin@magneticwomanempire.com` (or your preferred email)
   - Set a secure password

## 3. Enable Firestore Database

1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode" 
4. Select a location close to your users
5. Update Firestore rules to allow authenticated users:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /siteContent/{document} {
      allow read: if true;
      allow write, create, update: if request.auth != null;
    }
  }
}
```

## 4. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon (</>)
4. Register your app with a name
5. Copy the configuration object

## 5. Environment Variables

Create a `.env.local` file in your project root with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 6. Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add all your Firebase variables

## 7. Admin Access

- Login URL: `https://yoursite.com/admin`
- Use the email/password you created in Firebase Authentication

## 8. Content Management

Once logged in as admin, you can edit:
- Header section (title, subtitle, description, CTA)
- About section (title, descriptions)
- Final CTA section (title, subtitle, CTA text, footer)

Changes are saved to Firestore and appear immediately on the live site.
