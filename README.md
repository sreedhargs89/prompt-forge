# ✦ Prompt Forge

**Craft the perfect prompt, every time.**

> Prompt Forge transforms your rough questions into powerful, well-structured prompts for any LLM — so you get better, more accurate answers without being a prompt engineering expert.

🔗 **Live App:** [prompt-builder-snowy.vercel.app](https://prompt-builder-snowy.vercel.app/)

---

## 🤔 What is Prompt Forge?

Prompt Forge is an AI-powered prompt builder that helps you create optimized prompts for Large Language Models (ChatGPT, Claude, Gemini, etc.). Instead of guessing how to phrase your question, you simply:

1. **Type your question** in plain language
2. **Pick a category** (Technology, Psychology, LinkedIn, Writing, etc.)
3. **Select a subcategory** to narrow the focus
4. **Choose modifiers** to fine-tune the output style
5. **Click "Build My Prompt"** — and get a polished, ready-to-use prompt

The app sends your inputs to OpenAI's API, which generates an expertly crafted prompt that you can copy and paste into any LLM for dramatically better results.

---

## 🎯 How Does It Help?

### For Developers & Engineers
- Generate **code generation prompts** with best practices, unit tests, and inline comments baked in
- Build **architecture design prompts** that consider scalability, security, and cost
- Create **debugging prompts** that walk through root cause analysis step-by-step

### For Professionals & Job Seekers
- Craft **LinkedIn connection requests** that aren't generic or spammy
- Write **referral messages** that highlight your fit for a specific role
- Build **profile review requests** to hiring managers with the right tone

### For Writers & Content Creators
- Generate **SEO-friendly blog post prompts** with proper structure
- Create **email drafts** tailored to cold outreach, follow-ups, or professional contexts
- Build **social media content prompts** optimized for specific platforms

### For Learners & Researchers
- Get **first-principles explanations** with analogies and real-world examples
- Build **comparison prompts** that produce structured tables and recommendations
- Create **deep research prompts** that cite sources and present multiple perspectives

### For Everyone
- **No prompt engineering knowledge required** — the app handles the complexity
- **Save prompts to your archive** for reuse later
- **Works with any LLM** — copy the generated prompt into ChatGPT, Claude, Gemini, or any other tool

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏷️ **5 Categories** | Technology, Psychology, General Knowledge, LinkedIn & Professional, Writing & Content |
| 🎛️ **Smart Modifiers** | Context-aware refinements that change based on your category and subcategory |
| 🎭 **Role Selection** | Optionally set an LLM persona (Technical Architect, Career Coach, etc.) |
| 📋 **One-Click Copy** | Copy the generated prompt to clipboard instantly |
| 💾 **Archive** | Save and manage your favorite prompts locally |
| 🔑 **Bring Your Own Key** | Uses your OpenAI API key — stored locally in your browser, never sent to any server |
| 📱 **Responsive** | Works on desktop and mobile |

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Build Tool:** [Vite](https://vitejs.dev/)
- **AI:** OpenAI API (GPT-4o-mini)
- **Hosting:** [Vercel](https://vercel.com/)
- **Font:** [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/sreedhargs89/prompt-forge.git
   cd prompt-forge
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

   Navigate to `http://localhost:5173`

5. **Enter your OpenAI API key**

   Click the 🔑 icon in the header and paste your API key. It's saved locally in your browser's `localStorage` — never transmitted to any third-party server.

### Production Build

```bash
npm run build
npm run preview
```

The built files will be in the `dist/` directory, ready to deploy to any static hosting service.

---

## 📁 Project Structure

```
prompt-builder/
├── index.html          # Main HTML page
├── src/
│   ├── main.js         # App logic, categories, API integration
│   └── style.css       # Complete styling (design tokens, components)
├── vite.config.js      # Vite config with OpenAI API proxy
├── package.json
└── README.md
```

---

## 🔒 Privacy & Security

- Your **API key is stored only in your browser** (`localStorage`) — it never touches any backend server
- During development, the Vite proxy forwards API calls to OpenAI to avoid CORS issues
- No analytics, no tracking, no data collection

---

## 📄 License

MIT — feel free to fork, modify, and use however you like.

---

Built with ☕ and AI.
