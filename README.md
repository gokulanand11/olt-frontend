# Online Learning Tracker - Frontend

A modern React-based frontend for the Online Learning Tracker platform that connects students to free online courses with interactive quizzes and progress tracking.

## Features

- **Course Catalog** - Browse 5 curated courses with external platform integration
- **Interactive Quizzes** - Take assessments with real-time scoring
- **Progress Tracking** - Visual progress bars and learning analytics
- **User Authentication** - Role-based access (Learner, Instructor, Admin)
- **Modern UI** - Responsive design with smooth animations
- **Real-time Dashboard** - Live stats, notifications, and achievements

## Tech Stack

- **Framework:** React 19 with Vite
- **Routing:** React Router DOM
- **Styling:** Modern CSS with animations and gradients
- **State Management:** React Context API
- **HTTP Client:** Axios for API communication
- **Build Tool:** Vite for fast development and building

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Course Integration

The platform integrates with these free learning platforms:

1. **JavaScript Fundamentals** → [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)
2. **Python for Beginners** → [Codecademy](https://www.codecademy.com/learn/learn-python-3)
3. **HTML & CSS Basics** → [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)
4. **React Development** → [React Docs](https://react.dev/learn)
5. **Git & GitHub** → [GitHub Skills](https://skills.github.com/)

## Demo Accounts

- **Learner:** learner@test.com / password123
- **Instructor:** instructor@test.com / password123
- **Admin:** admin@test.com / password123

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar
│   ├── ProgressBar.jsx # Progress visualization
│   └── StatCard.jsx    # Dashboard statistics
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── Dashboard.jsx   # User dashboard
│   ├── Courses.jsx     # Course catalog
│   └── Quiz.jsx        # Quiz interface
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication state
├── services/           # API services
│   └── api.js          # HTTP client
└── styles/             # CSS styles
    └── app.css         # Main stylesheet
```

## Key Features

### 🎨 Modern UI/UX
- Responsive design for all devices
- Smooth animations and hover effects
- Dark theme with gradient accents
- Professional card-based layouts

### 🔐 Authentication
- JWT-based secure authentication
- Role-based access control
- Persistent login sessions
- Protected routes

### 📊 Analytics Dashboard
- Real-time learning statistics
- Progress visualization
- Achievement tracking
- Notification system

### 🎓 Learning Management
- Course search and filtering
- External platform integration
- Interactive quiz system
- Assignment submissions

## Backend Integration

This frontend connects to the [OLT Backend API](https://github.com/gokulanand11/OLT_Backend) for:
- User authentication and management
- Course data and progress tracking
- Quiz questions and scoring
- Analytics and reporting

## Deployment

The app can be deployed to:
- **Vercel** (recommended for React apps)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

## License

MIT License
