# Wanderlust - Property Booking Platform

A beautiful property booking platform built with Node.js, Express, MongoDB, and EJS.

## Features

- 🔐 User authentication (Register, Login, Logout)
- 🏨 Property listings with images
- 📝 Review system with ratings
- 🎨 Beautiful UI with Bootstrap
- 📱 Responsive design
- 🌍 Property search and filtering

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with bcrypt
- **Frontend**: EJS templating, Bootstrap 5
- **Session Management**: express-session, connect-flash

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # For production
   MONGODB_URL=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. Start the application:
   ```bash
   npm start
   ```

## Deployment

### Heroku Deployment

1. Install Heroku CLI and login:
   ```bash
   heroku login
   ```

2. Create a new Heroku app:
   ```bash
   heroku create wanderlust-app
   ```

3. Set environment variables:
   ```bash
   heroku config:set MONGODB_URL=your_mongodb_url
   heroku config:set SESSION_SECRET=your_session_secret
   ```

4. Deploy:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push heroku main
   ```

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

### Railway Deployment

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login and deploy:
   ```bash
   railway login
   railway init
   railway up
   ```

## Environment Variables

- `MONGODB_URL`: MongoDB connection string
- `SESSION_SECRET`: Secret key for sessions
- `PORT`: Server port (default: 8080)

## Project Structure

```
MAJORPROJECT/
├── models/
│   ├── listing.js
│   └── user.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── public/
│   ├── css/
│   └── js/
├── app.js
├── server.js
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC License
