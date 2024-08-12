# Tauri + React
#  Initialize the Project with Vite (React Template)
# Step 1 
```
npm create vite@latest your-app-name --template react

```
# Step 2 

# Install Tauri CLI and Dependencies 

```
# Install Tauri CLI globally (if not already installed)
npm install -g @tauri-apps/cli

# Install Tauri dependencies in your project
npm install @tauri-apps/api @tauri-apps/cli --save-dev

```
# Step 3

Set Up Tauri

``` 
npx tauri init

```

# Step 4
 
Install Tailwind CSS

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

This creates two configuration files: tailwind.config.js and postcss.config.js.

Next, configure Tailwind by editing tailwind.config.js:


```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

Then, add the Tailwind directives to your CSS file. If you don’t have a CSS file, create one in src/index.css:

```
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

```

# Step 5 

Install and Configure Nodemon

Create a nodemon.json file in your project's root to configure Nodemon:

```
{
  "watch": ["src"],
  "ext": "js,jsx,ts,tsx,json,css,html",
  "exec": "vite"
}
```

#Step 6 

Update Package Scripts

```
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview",
    "tauri": "tauri dev",
    "nodemon": "nodemon"
  }
}
```

# Step 7 

Running Your Application

Run Tauri + React + Vite in development mode:
```
npm run tauri
```

Run Nodemon:

```
npm run nodemon
```

Build the project:

```
npm run build
```


## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
