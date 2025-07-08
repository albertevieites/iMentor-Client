# 🎓 iMentor

![iMentor Logo](public/iMentor.png)

## Connect with senior mentors from the Ironhack community

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://imentor-client.up.railway.app)
[![React](https://img.shields.io/badge/React-19.1-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Technologies](#️-technologies)
- [🚀 Installation](#-installation)
- [💻 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🎨 Components](#-components)
- [🔐 Authentication](#-authentication)
- [🌐 API Endpoints](#-api-endpoints)
- [📱 Routes](#-routes)
- [🎨 UI/UX](#-uiux)
- [🤝 Contributing](#-contributing)
- [📄 Licence](#-licence)

## 🎯 Overview

**iMentor** is a web platform that connects Ironhack students with senior mentors from the community. It allows students to ask questions, find specialised mentors, and receive personalised guidance on their journey as developers.

### 🎨 Screenshots

![Home Page](public/screenshots/home.png)
_Main page introducing the platform_

![Mentors Directory](public/screenshots/mentors.png)
_Directory of available mentors_

![Questions Feed](public/screenshots/feed.png)
_Community questions feed_

## ✨ Features

- 🔐 **Complete authentication system** (registration/login)
- 👥 **Mentors directory** with detailed profiles
- ❓ **Questions system** with comments and replies
- 🏷️ **Tagging system** to categorise questions
- 👤 **Customisable user profiles**
- 📱 **Responsive design** for all devices
- 🚀 **Optimised** with React 19 and Vite
- 🎨 **Modern UI** with custom CSS and reusable components

## 🛠️ Technologies

### Frontend

- **React 19.1** - UI library with the latest features
- **React Router 7.6** - Navigation and routing
- **Vite 6.3** - Lightning-fast build tool
- **Axios 1.5** - HTTP client for API calls
- **CSS3** - Custom styling with CSS variables

### DevTools

- **ESLint** - JavaScript/React code linter
- **Vite Plugin React** - Official React plugin for Vite

### Hosting & Deployment

- **Railway** - Cloud deployment platform

## 🚀 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### 1. Clone the repository

```bash
git clone https://github.com/your-username/iMentor-Client.git
cd iMentor-Client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 💻 Usage

### Available scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build application for production
npm run start        # Preview production build
```

### Backend Configuration

This client requires the iMentor backend. Make sure you have configured:

1. **API Backend** running on `http://localhost:5000`
2. **Database** configured
3. **Backend environment variables** set up

## 📁 Project Structure

```tree
iMentor-Client/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── iMentor.png
│   └── ...
├── src/
│   ├── components/         # Reusable components
│   │   ├── App/           # Root component
│   │   ├── Navbar/        # Navigation bar
│   │   ├── LoginForm/     # Login form
│   │   ├── MentorCard/    # Mentor card
│   │   └── ...
│   ├── pages/             # Application pages
│   │   ├── Home/          # Main page
│   │   ├── Feed/          # Questions feed
│   │   ├── Mentors/       # Mentors list
│   │   └── ...
│   ├── services/          # Services for API calls
│   │   ├── auth.services.js
│   │   ├── question.services.js
│   │   └── ...
│   ├── context/           # React context
│   │   └── auth.context.jsx
│   ├── routes/            # Route configuration
│   │   ├── AppRoutes.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── NotLoggedInRoute.jsx
│   ├── utils/             # Utilities
│   │   └── tagsArr.js
│   └── index.jsx          # Entry point
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Components

### Main Components

- **`App`** - Root component with Layout
- **`Navbar`** - Main navigation with authentication
- **`MentorCard`** - Card to display mentor information
- **`QuestionCard`** - Card for questions in the feed
- **`QuestionForm`** - Form to create/edit questions
- **`LoginForm`** / **`SignupForm`** - Authentication forms
- **`Tags`** - Tagging system for categorisation
- **`Loader`** - Loading component

## 🔐 Authentication

The authentication system uses **JWT tokens** and **React Context**:

- **Registration** of new users
- **Login** with email and password
- **Private route protection**
- **Session persistence** with localStorage
- **Automatic logout** when token is invalid

## 🌐 API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/verify` - Verify token

### Questions

- `GET /questions` - Get all questions
- `GET /questions/:id` - Get specific question
- `POST /questions` - Create new question
- `PATCH /questions/:id/edit` - Edit question
- `POST /questions/:id/delete` - Delete question
- `POST /questions/:id/comment/add` - Add comment

### Mentors

- `GET /mentors` - Get mentors list
- `GET /mentors/:id` - Get mentor profile

## 📱 Routes

| Route                | Component       | Access         | Description       |
| -------------------- | --------------- | -------------- | ----------------- |
| `/`                  | Home            | Public         | Main page         |
| `/signup`            | Signup          | Anonymous only | User registration |
| `/login`             | Login           | Anonymous only | Login             |
| `/feed`              | Feed            | Private        | Questions feed    |
| `/mentors`           | Mentors         | Private        | Mentors list      |
| `/addquestion`       | AddQuestion     | Private        | Create question   |
| `/questions/:id`     | QuestionDetails | Private        | Question details  |
| `/question/:id/edit` | AddQuestion     | Private        | Edit question     |
| `/profile/:id`       | Profile         | Private        | User profile      |
| `/profile/edit`      | EditProfile     | Private        | Edit profile      |

## 🎨 UI/UX

### Design System

- **Colours** defined in `variables.css`
- **Typography** consistent throughout the application
- **Reusable and modular components**
- **Mobile-first responsive design**
- **Micro-interactions** for better UX

### UX Features

- ⚡ **Fast loading** with lazy loading
- 🔄 **Informative loading states**
- ❌ **User-friendly error handling**
- 📱 **100% mobile responsive**
- ♿ **Accessibility** considered in design

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the project
2. Create a **branch** for your feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`
4. Make your changes
5. Ensure linting passes: `npm run lint`

## 📄 Licence

This project is under the MIT Licence. See the [LICENSE](LICENSE) file for more details.

---

## Built with ❤️ by the Ironhack community

[🌐 Live Demo](https://imentor-client.up.railway.app) | [📧 Support](mailto:support@imentor.com) | [🐛 Report Bug](https://github.com/your-username/iMentor-Client/issues)
