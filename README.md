# Sheory - Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, showcasing professional experience, skills, and articles about technology careers.

## 🌟 Features

- **Modern Design**: Clean, professional interface with gradient animations
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Elements**: Hover effects, smooth transitions, and engaging UI components
- **Career Quiz**: Interactive quiz to help visitors discover their ideal tech career path
- **Articles Section**: Educational content about technology careers and industry insights
- **Professional Timeline**: Detailed work experience with visual timeline
- **Skills Showcase**: Comprehensive display of technical skills and expertise
- **Contact Integration**: Direct links to social media and professional profiles

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Geist](https://vercel.com/font) font family
- **Deployment**: Optimized for [Vercel](https://vercel.com/) deployment

## 📁 Project Structure

```
sheory/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Homepage (modular structure)
│   ├── artigos/                 # Articles section
│   │   ├── page.tsx             # Articles listing
│   │   └── descubra-sua-area-na-tecnologia/
│   │       └── page.tsx         # Career discovery quiz
│   └── instagram/
│       └── page.tsx             # Instagram integration
├── components/
│   ├── hero-section.tsx         # Hero section with CTA
│   ├── about-section.tsx        # About me with experience timeline
│   ├── career-quiz.tsx          # Interactive career quiz
│   ├── navigation.tsx           # Site navigation
│   ├── quiz-result.tsx          # Quiz results display
│   ├── theme-provider.tsx       # Theme management
│   └── ui/                      # shadcn/ui components
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── public/
│   └── images/                  # Static images and assets
└── styles/                      # Additional stylesheets
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sheory/sheory-site.git
   cd sheory-site
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Styling & Theme

The project uses CSS custom properties for theming. Main theme variables are defined in `app/globals.css`:

```css
:root {
  --accent-lilac: #a855f7;
  --accent-cyan: #06b6d4;
  /* ... other variables */
}
```

### Content Updates

- **Profile Information**: Update `components/about-section.tsx`
- **Experience**: Modify the experience timeline in the same component
- **Skills**: Edit the skills array in `about-section.tsx`
- **Articles**: Add new articles in `app/artigos/`

### Adding New Components

All UI components follow the shadcn/ui pattern. Add new components using:

```bash
npx shadcn-ui@latest add [component-name]
```

## 📱 Components Overview

### Core Components

- **HeroSection**: Landing section with introduction and main CTA
- **AboutSection**: Professional profile, experience timeline, and skills
- **CareerQuiz**: Interactive quiz for career path discovery
- **Navigation**: Site navigation with smooth scrolling

### UI Components (shadcn/ui)

- Form components (Button, Input, Card, etc.)
- Layout components (Container, Grid, etc.)
- Feedback components (Alert, Toast, etc.)
- Navigation components (Tabs, Accordion, etc.)

## 🔧 Configuration Files

- **`next.config.mjs`**: Next.js configuration
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`tsconfig.json`**: TypeScript configuration
- **`components.json`**: shadcn/ui configuration
- **`postcss.config.mjs`**: PostCSS configuration

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to [Vercel](https://vercel.com/)
3. Deploy automatically on every push to main branch

### Manual Deployment

```bash
npm run build
```

Deploy the `out` directory to your hosting provider.

## 📊 Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting and lazy loading
- **Static Generation**: Pre-rendered pages for optimal performance
- **CSS Optimization**: Purged and minified CSS in production

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: sheoryd@gmail.com
- **LinkedIn**: [linkedin.com/in/sheory-martins](https://linkedin.com/in/sheory-martins)
- **GitHub**: [github.com/sheory](https://github.com/sheory)
- **Location**: Bahia, Brasil

---

Built with ❤️ by [Sheory Martins](https://github.com/sheory) - Backend Developer passionate about helping people break into tech!