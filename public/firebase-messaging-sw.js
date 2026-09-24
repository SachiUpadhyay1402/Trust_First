importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Parse config from registration query parameters
const params = new URLSearchParams(location.search);
const apiKey = params.get('apiKey');
const authDomain = params.get('authDomain');
const projectId = params.get('projectId');
const storageBucket = params.get('storageBucket');
const messagingSenderId = params.get('messagingSenderId');
const appId = params.get('appId');

if (apiKey && projectId && messagingSenderId && appId) {
    firebase.initializeApp({
        apiKey,
        authDomain: authDomain || undefined,
        projectId,
        storageBucket: storageBucket || undefined,
        messagingSenderId,
        appId,
    });

    // Retrieve an instance of Firebase Messaging for background messages
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
        console.log(
            '[firebase-messaging-sw.js] Received background message ',
            payload
        );
        const notificationTitle = payload.notification?.title || 'Notification';
        const notificationOptions = {
            body: payload.notification?.body || '',
            icon: '/logo.png', // TrustFirst logo
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
    });
}
