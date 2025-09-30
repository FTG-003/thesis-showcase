# Pyragogy Research - Cognitive Intraspecific Selection in Education

A modern web application presenting the academic thesis "Cognitive Intraspecific Selection in Education" by Fabrizio Terzi.

## 🚀 Deployment to GitHub Pages

### Steps to Deploy:

1. **Update the base path** in `vite.config.ts`:
   - Replace `/nome-del-tuo-repository/` with your actual GitHub repository name
   - Example: If your repo is `https://github.com/username/pyragogy`, change it to `/pyragogy/`

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Configure GitHub Pages**:
   - Go to your repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose the branch containing your `dist` folder
   - Save settings

4. **Deploy**:
   - Commit and push the `dist` folder to your repository
   - Or use GitHub Actions (see below)

### Alternative: Using GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist
          
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2
```

## Project info

**URL**: https://lovable.dev/projects/7021eadf-bd1e-4ee9-bf52-35cc24804862

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7021eadf-bd1e-4ee9-bf52-35cc24804862) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7021eadf-bd1e-4ee9-bf52-35cc24804862) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
