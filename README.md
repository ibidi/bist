<div align="center">

# 📈 BIST Dashboard

### Modern Turkish Stock Market Tracking Platform

**Real-time BIST (Borsa İstanbul) stock market dashboard with advanced features**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](#) • [Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation)

![Dashboard Preview](https://via.placeholder.com/800x400/1e293b/ffffff?text=BIST+Dashboard+Preview)

</div>

---

## 🌟 Overview

BIST Dashboard is a modern, feature-rich web application for tracking Turkish stock market (BIST) in real-time. Built with cutting-edge technologies, it provides an intuitive interface for monitoring stocks, comparing performance, and managing your watchlist.

### Why BIST Dashboard?

- 🚀 **Lightning Fast** - Built on Next.js 16 with Turbopack for instant page loads
- 🎨 **Beautiful UI** - Modern design with light/dark mode support
- 📊 **Rich Features** - Favorites, comparison, search, and more
- 🔒 **Privacy First** - All data stored locally, no tracking
- 📱 **Fully Responsive** - Perfect experience on any device
- ⚡ **Real-time Updates** - Live stock data powered by borsa-api

---

## ✨ Features

### 📊 Market Data
- **Popular Stocks** - View most traded stocks with live prices
- **Top Gainers** - Track best performing stocks of the day
- **Top Losers** - Monitor biggest decliners
- **Search** - Find any stock with Turkish character support
- **Company Logos** - Automatic logo display for 60+ companies

### ⭐ Personal Features
- **Favorites** - Star stocks to create your personal watchlist
- **Watchlist** - Add stocks to a dedicated monitoring list
- **Comparison** - Compare two stocks side-by-side with detailed metrics
- **Persistent Storage** - Your preferences saved locally

### 🎨 User Experience
- **Light/Dark Mode** - Toggle between themes with smooth transitions
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Loading States** - Smooth skeleton screens while data loads
- **Error Handling** - Graceful error messages and fallbacks

### 📈 Stock Information
Each stock card displays:
- Current price and daily change
- Percentage change with color coding
- Trading volume
- High/Low prices
- Company logo and name
- **Detailed Analysis** button for in-depth view

### 📊 Advanced Analytics (NEW!)
- **Historical Charts** - Interactive price history with multiple timeframes (5d, 1mo, 3mo, 6mo, 1y)
- **Stock Details** - Comprehensive company information including:
  - Market capitalization
  - P/E ratio (F/K oranı)
  - EPS (Hisse başına kazanç)
  - Dividend yield (Temettü verimi)
  - Beta coefficient
  - 52-week high/low range
  - Sector and industry classification
  - Company description
- **Dedicated Stock Pages** - Full-page analysis for each stock

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/ibidi/bist.git
cd bist

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 🛠️ Tech Stack

### Core
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling

### Libraries
- **[borsa-api v1.2.0](https://www.npmjs.com/package/borsa-api)** - BIST data provider with TypeScript support
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set
- **[Next.js Image](https://nextjs.org/docs/api-reference/next/image)** - Optimized images

### Features
- **Context API** - State management for favorites and theme
- **LocalStorage** - Persistent data storage
- **Turbopack** - Ultra-fast bundler

---

## 📖 Documentation

### Project Structure

```
borsa-dashboard/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── search/        # Stock search endpoint
│   │   ├── stock/         # Single stock data
│   │   ├── stocks/        # Multiple stocks data
│   │   └── watchlist/     # Watchlist management
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ComparePanel.tsx   # Stock comparison
│   ├── SearchPanel.tsx    # Search interface
│   ├── StockCard.tsx      # Stock display card
│   ├── ThemeProvider.tsx  # Theme management
│   └── WatchlistPanel.tsx # Watchlist interface
├── lib/                   # Utilities
│   ├── favorites-context.tsx  # Favorites state
│   └── logo-utils.ts      # Logo helpers
└── public/                # Static assets
```

### Key Components

#### StockCard
Displays individual stock information with:
- Company logo
- Price and change indicators
- Favorite and compare actions
- Hover effects and animations

#### ComparePanel
Side-by-side comparison showing:
- Price differences
- Performance metrics
- Volume comparison
- Visual indicators

#### ThemeProvider
Manages light/dark mode with:
- System preference detection
- LocalStorage persistence
- Smooth transitions

---

## 🎯 Usage

### Viewing Stocks

1. **Popular Stocks** - Default view showing most traded stocks
2. **Top Gainers** - Click "Yükselenler" tab
3. **Top Losers** - Click "Düşenler" tab

### Managing Favorites

1. Click the **star icon** on any stock card
2. View all favorites in the **Favoriler** tab
3. Click star again to remove from favorites

### Comparing Stocks

1. Click the **compare icon** on first stock
2. Click compare icon on second stock
3. Scroll down to see detailed comparison
4. Click **X** to clear comparison

### Searching

1. Use the search bar at the top
2. Type stock name or symbol (Turkish characters supported)
3. Results appear instantly

### Theme Toggle

Click the **sun/moon icon** in the header to switch themes.

---

## ⚠️ Important Notes

### Data Disclaimer

- **Delayed Data** - Stock prices are delayed, not real-time
- **Educational Use** - This tool is for educational purposes only
- **Not Financial Advice** - Do not use for investment decisions
- **No Liability** - Use at your own risk

### Licensing

BIST data is subject to copyright and licensing. For commercial use or real-time data distribution, you must obtain proper licensing from Borsa İstanbul.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **NPM Package**: [borsa-api](https://www.npmjs.com/package/borsa-api)
- **GitHub**: [ibidi/bist](https://github.com/ibidi/bist)
- **Developer**: [@ibidi](https://github.com/ibidi)

---

## 🙏 Acknowledgments

- Built with [borsa-api](https://www.npmjs.com/package/borsa-api)
- Icons by [Lucide](https://lucide.dev/)
- Logos via [Clearbit](https://clearbit.com/) and [Logo.dev](https://logo.dev/)

---

<div align="center">

**Made with ❤️ by [İhsan Baki Doğan](https://github.com/ibidi)**

If you find this project helpful, please give it a ⭐️

[Report Bug](https://github.com/ibidi/bist/issues) • [Request Feature](https://github.com/ibidi/bist/issues)

</div>
