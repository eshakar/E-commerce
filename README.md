# E-commerce Product Listing

A modern, responsive e-commerce product listing application built with React, Redux Toolkit, Shadcn UI, and Framer Motion.

## 🚀 Live Demo

**[View Live Demo](https://e-commerce-ite6.vercel.app/)**

## ✨ Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Product Filtering**: Filter by categories, price range, and search
- **Shopping Cart**: Add/remove items, update quantities, persistent storage
- **Product Details**: Detailed product pages with image gallery
- **State Management**: Redux Toolkit for efficient state management
- **Animations**: Framer Motion for smooth, engaging animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **TypeScript Ready**: Easy to migrate to TypeScript

## 🛠️ Tech Stack

- **React 18**: Latest React with hooks
- **Redux Toolkit**: Modern Redux state management
- **React Router**: Client-side routing
- **Framer Motion**: Animation library
- **Shadcn/ui**: Modern UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **Lucide React**: Beautiful icons

## 📁 Project Structure

```
src/
├── main.jsx                # App entry point with Redux Provider
├── App.jsx                 # Main App component with routes
├── index.css              # Global styles and Tailwind imports
├── components/
│   ├── Header.jsx          # Navigation header with search
│   ├── Footer.jsx          # Site footer
│   ├── Sidebar.jsx         # Filter sidebar with categories/price
│   ├── ProductCard.jsx     # Individual product card
│   └── ui/                 # Shadcn UI components
│       ├── button.jsx
│       ├── badge.jsx
│       └── slider.jsx
├── pages/
│   ├── HomePage.jsx        # Product listing page
│   ├── ProductDetailPage.jsx # Individual product details
│   └── CartPage.jsx        # Shopping cart management
├── store/
│   ├── store.js           # Redux store configuration
│   └── slices/
│       ├── productsSlice.js # Products state management
│       ├── cartSlice.js     # Cart state management
│       └── filtersSlice.js  # Filters state management
└── lib/
    └── utils.js           # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecommerce-product-listing.git
   cd ecommerce-product-listing
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 📱 Features Overview

### Home Page (/)
- **Product Grid**: Responsive 3-column (desktop), 2-column (tablet), 1-column (mobile)
- **Filter Sidebar**: Category selection and price range slider
- **Search Bar**: Real-time product search
- **Smooth Animations**: Framer Motion animations for cards and filters

### Product Detail Page (/product/[id])
- **Image Gallery**: Multiple product images with thumbnail navigation
- **Product Information**: Title, price, rating, description, category
- **Quantity Selector**: Add multiple items to cart
- **Reviews Section**: Customer reviews and ratings
- **Related Products**: Suggested similar items

### Cart Page (/cart)
- **Cart Items**: List of added products with images
- **Quantity Controls**: Update item quantities
- **Remove Items**: Delete items from cart
- **Order Summary**: Subtotal, tax, shipping, and total
- **Persistent Storage**: Cart data saved in localStorage

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect tablet experience
- **Desktop Enhanced**: Rich desktop interface

## 🎨 Key Features Implementation

### State Management
- **Redux Toolkit**: Modern Redux with less boilerplate
- **Slices**: Separate slices for products, cart, and filters
- **Async Actions**: Handle API calls efficiently
- **Persistent Cart**: Cart data saved in localStorage

### Animations
- **Page Transitions**: Smooth page-to-page animations
- **Component Animations**: Hover effects and interactions
- **Loading States**: Skeleton loading and spinners
- **Micro-interactions**: Button clicks and form interactions

### Filtering System
- **Category Filter**: Radio button selection
- **Price Range**: Dual-handle slider
- **Search Filter**: Real-time text search
- **Combined Filters**: Multiple filters work together

### Cart Functionality
- **Add to Cart**: Add products with quantity
- **Update Quantity**: Increase/decrease item quantities
- **Remove Items**: Delete items from cart
- **Calculate Totals**: Automatic price calculations
- **Persistent Storage**: Cart survives browser refresh

## 📸 Screenshots

*Add screenshots of your application here to showcase the UI*

## 🔧 Customization

### Adding New Products
Edit `src/store/slices/productsSlice.js` and add items to the `initialProducts` array.

### Styling
- **Tailwind Config**: Modify `tailwind.config.js` for custom colors/spacing
- **CSS Variables**: Update CSS custom properties in `index.css`
- **Component Styles**: Individual component styling

### Adding Features
- **Wishlist**: Add product favoriting
- **User Authentication**: Add login/signup
- **Payment Integration**: Add checkout process
- **Product Reviews**: Add review submission

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Drag and drop `dist` folder
- **Firebase Hosting**: Use Firebase CLI
- **GitHub Pages**: Use GitHub Actions

## 📝 Development Guidelines

### Commit Messages
Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring

### Code Style
- Use ESLint and Prettier
- Follow React best practices
- Use TypeScript for large projects
- Write meaningful component names

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 🐛 Known Issues

- Add any known issues or limitations here
- Link to GitHub issues for tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui**: Amazing UI component library
- **Framer Motion**: Incredible animation library
- **Tailwind CSS**: Utility-first CSS framework
- **Redux Toolkit**: Modern Redux development

## 📞 Support

If you have any questions or need help:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## ⭐ Star History

If you found this project helpful, please consider giving it a star!

---

Built with ❤️ using modern web technologies

### Connect with me:
- Portfolio: [Esha_portfolio.com](https://unique-frangollo-1b675e.netlify.app/)

