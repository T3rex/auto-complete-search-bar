# 🍽️ Auto-Complete Recipe Search Bar

A simple React application that provides an auto-complete search feature for recipes using the [DummyJSON Recipes API](https://dummyjson.com/docs/recipes). Results are prioritized by how closely they match your input and highlighted for better readability.

---

## ✨ Features

- 🔍 Real-time auto-complete with debounce
- 🚀 Fetches recipes from public API
- 🧠 Smart result ordering:
  - Matches that **start with** the input are shown first
  - Then results that **contain** the input (no duplicates)
- 💾 Caching of previous searches to reduce API calls
- 🎯 Bold highlights matching text inside recipe names

---

## 🧩 Tech Stack

- **React** (with Hooks)
- **JavaScript (ES6)**
- **CSS** (basic styles, replace with Tailwind or custom for production)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/recipe-autocomplete.git
cd recipe-autocomplete

```

## 2. Installation

```bash
npm install
```

## 3. Start the development server

```bash
npm start
```
