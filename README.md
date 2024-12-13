# Yiqi: Open Source Community Engagement Platform (Mobile)

Yiqi is an open-source community engagement platform built for community builders, by community builders. Our vision is to be the only tool that community leaders need to manage and engage with their communities effectively.

## Features

### Current Features:

- Event management (similar to Luma)
- CRM functionality (comparable to Salesforce)
- Mass messaging via WhatsApp and email
- Customer CSV imports

### Upcoming Features:

- AI-driven automations for community management
- Forms and surveys
- Hackathon management
- Expense tracking
- Fundraising automation
- Social media management (like Buffer)
- Networking booking app (similar to Upstream)
- AI agent for user data scraping
- AI-driven content generation
- Blockchain NFTs for ticketing and marketplace
- Networking proximity maps for spontaneous meetings

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (recommended version: v20.17.0+)
- **npm** (Node package manager)
- **Expo CLI** for React Native development
- **tRPC** for type-safe API calls

### Setup

1. **Clone the mobile repository:**

   ```bash
   git clone https://github.com/andinolabs/yiqi-mobile.git
   cd yiqi-mobile
   ```

2. **Clone the server repository (Yiqi Web):**

   Yiqi Mobile relies on a backend server. You need to set up the server as well. Clone the server repository from GitHub:

   ```bash
   git clone https://github.com/Andino-Labs/yiqi-web.git
   cd yiqi-web
   ```

   Follow the setup instructions in the server repository’s README to get the backend up and running.

3. **Install dependencies for the mobile app:**

   ```bash
   npm install
   ```

4. **Configure environment variables:**

   Copy the contents of `.env.example` to a new file named `.env` and fill in the values as needed. You can find the necessary API URLs, client IDs, and keys in the `.env` file.

5. **Run the app locally:**

   For local development, use the following commands:

   ```bash
   npx expo prebuild
   expo run:android / expo run:ios
   ```

6. **If you want to run on your real device:**

   For Android devices, you need to point to the server port using the following command:

   ```bash
   adb reverse tcp:3000 tcp:3000
   ```

## Architecture

- **Frontend**: React Native with Expo for mobile app development
- **Backend**: Next.js API routes and server actions (using **tRPC** for type-safe API calls)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js for login, including Google Sign-In
- **API**: tRPC for type-safe API calls from the mobile app
- **Validation**: Zod for data validation
- **File Storage**: AWS S3
- **Email**: AWS SES
- **Payments**: Mercado Pago

## Configuration (Expo)

Ensure you add the required configurations for the mobile app before rebuilding:

### **Google Login (iOS Configuration)**

- Add your **Google login URL scheme** for iOS to enable Google authentication. This should be placed in your `app.json` as shown below:

```json
"plugins": [
  [
    "@react-native-google-signin/google-signin",
    {
      "iosUrlScheme": "com.googleusercontent.apps._some_id_here_"
    }
  ]
]
```

### **Google Maps API Key (Android/iOS)**

- Add your **Google Maps API Key** in the configuration section for Android (and iOS, if applicable):

```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "maps_api_key_here_"
    }
  }
},
"ios": {
  "config": {
    "googleMaps": {
      "apiKey": "maps_api_key_here_"
    }
  }
}
```

Once these configurations are set, you can rebuild the app with Expo.

## Contributing

We welcome contributions to Yiqi! If you'd like to contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with clear, descriptive messages
4. Push your changes to your fork
5. Submit a pull request to the main repository

Please ensure your code follows the existing style and includes appropriate tests.

## License

WIP

## Contact

- WhatsApp Community: [Join our WhatsApp group](https://chat.whatsapp.com/JAcbw9MnFxqLEhSRLCtDNR)
- Twitter: [@andino_labs](https://x.com/andino_labs)
- Email: [paul@andinolabs.io](mailto:paul@andinolabs.io)

For more information or to get involved, feel free to reach out through any of these channels!

---

Thank you for your interest in Yiqi! Together, we can build the ultimate tool for community engagement.
