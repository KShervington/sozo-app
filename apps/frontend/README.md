# SOZO Frontend Application

The SOZO frontend application is a modern, user-friendly interface built with React and TypeScript to showcase the functionality of the SoZo backend infrastructure.

## Screenshots

### Standard View
![sozo_standard](https://github.com/user-attachments/assets/e1e65ea7-6b16-48c6-ad72-f062042bcce5)

### Result of `GET users`
![sozo_users](https://github.com/user-attachments/assets/65982fc3-309a-4e95-87a8-5abb1ffcd063)

### Result of `GET products/`
![sozo_products](https://github.com/user-attachments/assets/e282ca27-2734-4a7a-9056-f24535d987b4)

## Technology Stack

- React 18+
- TypeScript
- Vite
- Tailwind CSS
- Ethers.js/Web3.js
- Redux Toolkit for state management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

The application is structured using a modular architecture:

```
src/
├── components/     # Reusable UI components
├── pages/         # Main application pages
├── hooks/         # Custom React hooks
├── services/      # API and blockchain services
├── store/         # Redux store configuration
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Please read our contributing guidelines before submitting pull requests.

Last updated: December 9, 2024
