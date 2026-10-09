# SkillHub — Smart Learning & Course Discovery Platform

> A responsive, accessible, portfolio-grade front-end web application built with **HTML5**, **CSS3**, **Bootstrap 5**, and **vanilla JavaScript**.

---

## 📌 Table of Contents

- [Overview & Purpose](#-overview--purpose)
- [Project Scope & Demonstration Notice](#-project-scope--demonstration-notice)
- [Core Interactive Features](#-core-interactive-features)
  - [1. Real-Time Course Search](#1-real-time-course-search)
  - [2. Multi-Category Filtering](#2-multi-category-filtering)
  - [3. Bookmark System with LocalStorage](#3-bookmark-system-with-localstorage)
  - [4. Course Details Modal & Inquiry Flow](#4-course-details-modal--inquiry-flow)
  - [5. Client-Side Contact Form Validation](#5-client-side-contact-form-validation)
- [Additional Implemented UI Features](#-additional-implemented-ui-features)
- [Technologies Used](#-technologies-used)
- [Project Folder Structure](#-project-folder-structure)
- [How to Run Locally](#-how-to-run-locally)
- [Deployment Guide](#-deployment-guide)
- [Development Process & AI Assistance](#-development-process--ai-assistance)
- [Author & Credits](#-author--credits)

---

## 🌟 Overview & Purpose

**SkillHub** is a clean, accessible, and user-centric course discovery platform concept created to help learners explore in-demand skills in technology.

Built as a front-end showcase for a **Junior Full Stack Developer** portfolio, this project demonstrates core competencies in modern front-end web development:
- **Clean Architecture & Separation of Concerns**: Clear demarcation between semantic HTML5 markup, modular custom CSS3 styling, and clean ES6+ JavaScript logic.
- **Modern UI/UX Design**: A professional light theme palette featuring deep navy slate typography (`#0f172a`), crisp white surfaces, soft borders, and royal blue accents (`#2563eb`).
- **Responsive Layout**: Built with a mobile-first mindset using Bootstrap 5's responsive grid system, adapting smoothly from mobile phones and tablets to laptops and desktop displays.
- **Accessibility (a11y)**: Built using semantic elements, accessible ARIA attributes, keyboard-navigable controls, WCAG-compliant color contrasts, and explicit form labels.
- **Zero Heavy Dependencies**: Implemented using lightweight vanilla JavaScript without heavy external frameworks (such as React, Vue, or Angular), highlighting fundamental DOM and browser API mastery.

---

## ⚠️ Project Scope & Demonstration Notice

SkillHub is strictly a **client-side front-end demonstration project**. Please keep the following in mind:
- **No Backend Server**: There is no live backend server, database, or server-side API connected.
- **No Real Enrollment or Payment Processing**: Course cards, details modals, and inquiry forms are simulated front-end interfaces. Clicking "Inquire About Course" pre-fills the contact form rather than processing an actual enrollment or purchase.
- **Client-Side Persistence Only**: Bookmarked courses are saved directly in the user's browser using `localStorage`. If you clear your browser cache or switch browsers, saved bookmarks will reset.
- **Simulated Form Submission**: Submitting the contact form performs complete client-side validation and renders a visual success alert; it does not dispatch emails or write to an external database.

---

## 🚀 Core Interactive Features

The application incorporates five key interactive capabilities powered by vanilla JavaScript (ES6+):

### 1. Real-Time Course Search
- **Instant Search As You Type**: Evaluates user input against course titles, descriptions, and category tags in real time without page reloads.
- **Clear Button (`×`)**: Appears automatically whenever text is entered in the search box, allowing one-click input clearing and filter reset.
- **Keyboard Navigation**: Pressing `Enter` executes search filtering cleanly without triggering unwanted page reloads.
- **Empty State Feedback**: If no courses match the search query, an informative empty-state message appears with a one-click button to reset all filters.

### 2. Multi-Category Filtering
- **Interactive Filter Pills**: Filter courses across six distinct tech domains: *All*, *Web Development*, *Programming*, *AI*, *Cybersecurity*, *Design*, and *Database*.
- **Category Deep Links**: Clicking any category card in the "Learning Categories" section automatically scrolls to the discovery section, activates the corresponding filter pill, and updates visible courses.
- **Toggle-to-All Behavior**: Clicking an already-active category button toggles the filter back to *All*.
- **Live Filter Feedback**: An active filter status line dynamically reports the number of matching courses and current search/category criteria.

### 3. Bookmark System with LocalStorage
- **Persistent Saved Courses**: Learners can bookmark favorite courses by clicking the bookmark ribbon icon on any course card.
- **Cross-Session Storage**: Bookmarks persist in browser `localStorage` across page reloads and browser restarts without requiring user authentication.
- **Dynamic Badge Counter**: A live badge in the category filter bar indicates the exact number of currently bookmarked courses.
- **Dedicated "Saved" Filter View**: Clicking the "Saved" category pill filters the card grid to display only courses saved by the user.

### 4. Course Details Modal & Inquiry Flow
- **Accessible Bootstrap Modal**: Clicking "View Details" on any course card opens a centralized modal window.
- **Dynamic Data Population**: Course level, duration, rating, summary overview, and a modular syllabus breakdown are injected dynamically based on card attributes.
- **Integrated Inquiry Bridging**: Clicking "Inquire About Course" inside the modal automatically closes the modal, smoothly scrolls to the contact section, pre-selects the corresponding category in the dropdown, and focuses the message field.

### 5. Client-Side Contact Form Validation
- **Real-Time & On-Submit Validation**: Validates user inputs using Bootstrap's `.is-valid` and `.is-invalid` visual states.
- **Field Constraints**:
  - **Full Name**: Verifies that the field is non-empty.
  - **Email Address**: Verifies formatting against a standard email regular expression (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  - **Category of Interest**: Ensures a valid category option has been chosen.
  - **Message**: Enforces a minimum length of 10 characters for meaningful inquiries.
- **User Feedback**: Inline error messages guide the user on corrections, and an auto-dismissing success alert confirms successful submission while resetting the form.

---

## 🎨 Additional Implemented UI Features

- **Sticky Navigation Bar**: Features brand logo, navigation links, and a scroll shadow that dynamically engages when scrolling down (`.scrolled`).
- **Mobile Offcanvas / Collapsible Menu**: Responsive navigation drawer that automatically collapses upon link selection on mobile viewports.
- **Active ScrollSpy Indicator**: Highlights current navigation items based on viewport scroll position.
- **Hero Metrics Section**: Highlights key stats (6 Featured Courses, 6 Learning Categories, Interactive Discovery).
- **Custom Vector Graphics**: 100% self-contained SVG graphics (`images/*.svg`) for sharp rendering on Retina/high-DPI screens without external image hosting dependencies.
- **Semantic Footer**: Includes site navigation links, tech stack badges, and developer attribution.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`) and ARIA accessibility |
| **CSS3** | Custom design tokens, CSS variables, Flexbox, CSS Grid layout, smooth transitions, custom focus rings |
| **Bootstrap 5.3.3** | Responsive grid system, navbar collapse component, modal dialog, and utility classes |
| **Bootstrap Icons 1.11.3** | Clean vector iconography across buttons, badges, and cards |
| **Vanilla JavaScript (ES6+)** | State management, DOM manipulation, `localStorage` API, live search & filter algorithms, form validation |
| **Google Fonts** | Modern typography using the *Plus Jakarta Sans* typeface |

---

## 📁 Project Folder Structure

```
SkillHub/
├── index.html          # Main semantic HTML5 document containing all sections and modals
├── css/
│   └── style.css       # Custom design system tokens, typography, component styling, and responsive rules
├── js/
│   └── script.js       # Vanilla ES6+ interactions (search, filters, bookmarks, modal, validation)
├── images/             # Custom SVG vector graphic assets and course illustrations
│   ├── skillhub-logo.svg
│   ├── hero-illustration.svg
│   ├── course-web-dev.svg
│   ├── course-python.svg
│   ├── course-uiux.svg
│   ├── course-cybersecurity.svg
│   ├── course-database.svg
│   └── course-ai.svg
└── README.md           # Project documentation and developer guide
```

---

## 💻 How to Run Locally

Because SkillHub is a pure front-end web application with no build steps or backend servers, you can run it locally in seconds:

### Option 1: Direct File Open
Simply locate `index.html` on your computer and open it in any web browser:
- Double-click `index.html` in your file explorer.
- Or run in PowerShell / Command Prompt:
  ```powershell
  Start-Process index.html
  ```

### Option 2: Using VS Code Live Server (Recommended)
1. Open the `SkillHub` folder in **Visual Studio Code**.
2. Install the **Live Server** extension by Ritwick Dey (if not already installed).
3. Right-click `index.html` and select **"Open with Live Server"**, or click **"Go Live"** in the bottom status bar.
4. The site will open automatically at `http://127.0.0.1:5500/`.

### Option 3: Using Python HTTP Server
If you have Python installed, navigate to the `SkillHub` directory and run:
```bash
python -m http.server 8000
```
Then open your browser and navigate to `http://localhost:8000`.

### Option 4: Using Node.js `npx serve`
If you have Node.js installed:
```bash
npx serve .
```

---

## 🌐 Deployment Guide (Publishing to GitHub Pages)

SkillHub is ready to be hosted as a static site on any platform (GitHub Pages, Netlify, Vercel, etc.). To deploy via GitHub Pages:

1. **Initialize Git and commit your files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SkillHub course discovery platform"
   ```

2. **Create a new repository on GitHub** (e.g., named `SkillHub`) and push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - In your repository, navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` directory, then click **Save**.

4. **Access your live site**:
   - GitHub Pages will publish your site at `https://<your-username>.github.io/<your-repo-name>/`.
   *(Replace `<your-username>` and `<your-repo-name>` with your actual GitHub username and repository name once published.)*

---

## 🤖 Development Process & AI Assistance

In keeping with honest engineering practices, this project was developed using human-AI collaboration with **Antigravity**, an agentic AI coding assistant:

- **Human Direction & Architecture**: The overall project scope, feature requirements, user flows, UI/UX aesthetics, responsive layout choices, and testing criteria were directed and evaluated by the developer.
- **AI-Assisted Acceleration with Antigravity**: Antigravity was utilized as an intelligent pair-programmer to assist with:
  - Scaffolding semantic HTML5 boilerplate and Bootstrap 5 components.
  - Designing custom inline SVG vector illustrations for the hero section and course cards.
  - Implementing modular vanilla JavaScript logic for search, multi-category filtering, `localStorage` persistence, and form validation.
  - Reviewing cross-browser accessibility (a11y) standards and edge-case testing.
  - Authoring clear, comprehensive technical documentation.
- **Verification & Ownership**: All AI-assisted code was manually tested, refined, and validated to ensure high code quality, security, and performance.

---

## 👤 Author & Credits

- **Designed & Developed by**: Jumaila Junaid
- **Role**: Junior Full Stack Developer Portfolio Project
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts
- **Icons**: [Bootstrap Icons](https://icons.getbootstrap.com/)
- **License**: [MIT License](LICENSE) (or open for personal/educational demonstration)
