# 🎨 Kronovald Frontend

This application for web browsers implements a client interface.

## 🛠️ Tech Stack

- **Framework:** [`React`](https://react.dev/) - A JavaScript library for building user interfaces.
- **Router:** [`React Router`](https://reactrouter.com/) is router.
- **State Manager:** [`TanStack Query`](https://tanstack.com/query/) is state manager.
- **UI Library:** [`Shadcn/UI`](https://ui.shadcn.com/) - A modern and customizable component library.
- **i18n:** [`i18next`](https://www.i18next.com/) is internationalization framework.

## ⚙️ Setting Up the Development Environment

### 📦 Install Dependencies

Navigate to the `client-app/` directory and install the necessary dependencies:

```bash
cd client-app
npm install
```

### 🚀 Start the Development Server

Run the following command to start the application in development mode:

```bash
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## 👩‍💻 Developer Guide

### Main directories

```
/src
 ├── app/          # Main application component and global configurations
 ├── features/     # Feature modules
 ├── shared/       # Shared components, hooks and utilities
 └── main.tsx      # Application entry point
```

### **App Core (`/app` Directory)**

- `app.tsx`: Main application entry point, responsible for setting up providers, rendering the application layout and mount feature modules.
- `i18n.ts`: Internationalization (i18n) configuration file for language support.
- `app.css`: Global styles for the entire application.

### **Feature Modules (`/features` Directory)**

Each feature module follows a structured pattern:

- **`components/`**: Reusable UI elements specific to the feature.
- **`model/`**: Data models and type definitions.
- **`pages/`**: Page-level components representing full views.
- **`services/`**: API calls, queries, and mutations.
- **`index.tsx`**: Defines the feature's routing and exports it for integration into the application.

### **Shared Utilities (`/shared` Directory)**

Contains cross-feature reusable components, utilities, and hooks.

- **`helpers.ts`**: Helper functions used across the application.
- **`hooks.ts`**: Custom React hooks.
- **`theme/`**: Theming-related files, including the provider, context, and hooks.
- **`ui/`**: Reusable UI components such as buttons, cards, and menus.

### **Main Application Entry (`main.tsx`)**

- The root file responsible for mounting the application.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
