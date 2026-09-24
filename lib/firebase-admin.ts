import * as admin from 'firebase-admin';

// Only initialize if credentials are available (not during build time)
if (!admin.apps.length) {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    // Only initialize if all required credentials are present
    if (projectId && clientEmail && privateKey) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey: privateKey.replace(/\\n/g, '\n'),
                }),
            });
            console.log('Firebase Admin initialized successfully');
        } catch (error) {
            console.error('Firebase Admin initialization error:', error);
        }
    } else {
        console.warn('Firebase Admin credentials not found - skipping initialization (build time)');
    }
}

export const sendNotification = async (fcmToken: string, title: string, body: string) => {
    try {
        // Check if admin is initialized
        if (!admin.apps.length) {
            console.warn('Firebase Admin not initialized - cannot send notification');
            return false;
        }

        await admin.messaging().send({
            token: fcmToken,
            notification: {
                title,
                body,
            },
        });
        console.log(`Notification sent to ${fcmToken}`);
        return true;
    } catch (error) {
        console.error('Error sending notification:', error);
        return false;
    }
};
