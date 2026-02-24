import './style.css';

// ─── Category Taxonomy ─────────────────────────────
const CATEGORIES = [
  {
    id: 'technology',
    name: '💻 Technology',
    subcategories: [
      {
        id: 'first-principles', name: 'First Principles',
        modifiers: ['Explain from scratch', "ELI5 (Explain Like I'm 5)", 'Use analogies', 'Include visual descriptions', 'Provide real-world examples']
      },
      {
        id: 'code-generation', name: 'Code Generation',
        modifiers: ['Specify language/framework', 'Add inline comments', 'Include unit tests', 'Follow best practices', 'Production-ready code']
      },
      {
        id: 'architecture', name: 'Architecture Design',
        modifiers: ['System design overview', 'Trade-offs analysis', 'Scalability focus', 'Security considerations', 'Cost optimization']
      },
      {
        id: 'debugging', name: 'Debugging Help',
        modifiers: ['Step-by-step diagnosis', 'Root cause analysis', 'Suggest fixes', 'Prevention strategies', 'Error context']
      },
      {
        id: 'learning', name: 'Learning Path',
        modifiers: ['Beginner to Expert roadmap', 'Include resources', 'Timeline estimate', 'Hands-on projects', 'Prerequisites listed']
      }
    ]
  },
  {
    id: 'psychology',
    name: '🧠 Psychology',
    subcategories: [
      {
        id: 'behavioral', name: 'Behavioral Analysis',
        modifiers: ['Cognitive biases', 'Case studies', 'Scientific references', 'Actionable insights', 'Cultural context']
      },
      {
        id: 'self-improve', name: 'Self-Improvement',
        modifiers: ['Actionable steps', 'Habit formation', 'Mindset shifts', 'Daily routines', 'Progress tracking']
      },
      {
        id: 'communication', name: 'Communication Skills',
        modifiers: ['Persuasion techniques', 'Empathy mapping', 'Conflict resolution', 'Active listening', 'Non-verbal cues']
      },
      {
        id: 'decisions', name: 'Decision Making',
        modifiers: ['Decision framework', 'Pros & Cons matrix', 'Risk assessment', 'Second-order thinking', 'Mental models']
      }
    ]
  },
  {
    id: 'general',
    name: '🌐 General Knowledge',
    subcategories: [
      {
        id: 'explain', name: 'Explain a Concept',
        modifiers: ['Concrete examples', 'Historical context', 'Use analogies', 'Multiple perspectives', 'Simplified summary']
      },
      {
        id: 'compare', name: 'Compare & Contrast',
        modifiers: ['Table format', 'Pros & Cons', 'Use-case scenarios', 'Key differences', 'Recommendation']
      },
      {
        id: 'summarize', name: 'Summarize',
        modifiers: ['Key takeaways', 'Bullet points', 'One-paragraph', 'Executive summary', 'Action items']
      },
      {
        id: 'research', name: 'Deep Research',
        modifiers: ['Cite sources', 'Multiple perspectives', 'Data-driven', 'Recent developments', 'Expert opinions']
      }
    ]
  },
  {
    id: 'linkedin',
    name: '💼 LinkedIn & Professional',
    subcategories: [
      {
        id: 'connection', name: 'Connection Request',
        modifiers: ['Cold outreach', 'Mutual connection reference', 'Same industry / role', 'Event or post based', 'Keep it concise (300 chars)']
      },
      {
        id: 'referral', name: 'Referral for a Job',
        modifiers: ['Mention the specific role', 'Highlight relevant experience', 'Attach resume reference', 'Mutual benefit angle', 'Keep it professional yet personal']
      },
      {
        id: 'hr-review', name: 'HR / Hiring Manager – Review My Profile',
        modifiers: ['Mention attached resume', 'Highlight role fit', 'Show company knowledge', 'Request a conversation', 'Keep it brief and respectful']
      }
    ]
  },
  {
    id: 'writing',
    name: '✍️ Writing & Content',
    subcategories: [
      {
        id: 'blog', name: 'Blog Post',
        modifiers: ['SEO-friendly', 'Formal tone', 'Casual tone', 'Include CTA', 'Structured with headings']
      },
      {
        id: 'email', name: 'Email Draft',
        modifiers: ['Professional', 'Friendly', 'Follow-up', 'Cold email', 'Include subject line']
      },
      {
        id: 'social', name: 'Social Media',
        modifiers: ['Platform-specific', 'Hashtags', 'Engagement hooks', 'Thread format', 'Viral potential']
      },
      {
        id: 'creative', name: 'Creative Writing',
        modifiers: ['Specify genre', 'Set mood/tone', 'Word-count target', 'Character development', 'Plot structure']
      }
    ]
  }
];

// ─── Quick Build Presets ────────────────────────────
const QUICK_BUILDS = [
  {
    id: 'tech-deep-dive',
    label: '🚀 Tech Deep Dive',
    desc: 'First principles · Examples & visuals · Technical Architect',
    categoryId: 'technology',
    subcategoryId: 'first-principles',
    modifiers: ['Explain from scratch', 'Use analogies', 'Include visual descriptions'],
    role: 'Technical Architect'
  },
  {
    id: 'mindset-shift',
    label: '🧠 Mindset Shift',
    desc: 'Self-improvement · Actionable steps & habits · Psychologist',
    categoryId: 'psychology',
    subcategoryId: 'self-improve',
    modifiers: ['Actionable steps', 'Habit formation', 'Mindset shifts'],
    role: 'Psychologist'
  },
  {
    id: 'linkedin-outreach',
    label: '💼 LinkedIn Outreach',
    desc: 'Connection request · Cold outreach & concise · Career Coach',
    categoryId: 'linkedin',
    subcategoryId: 'connection',
    modifiers: ['Cold outreach', 'Same industry / role', 'Keep it concise (300 chars)'],
    role: 'Career Coach'
  },
  {
    id: 'research-compare',
    label: '🌐 Research & Compare',
    desc: 'Deep research · Cite sources & data-driven · Business Analyst',
    categoryId: 'general',
    subcategoryId: 'research',
    modifiers: ['Cite sources', 'Multiple perspectives', 'Data-driven'],
    role: 'Business Analyst'
  }
];

// ─── State ──────────────────────────────────────────
const state = {
  question: '',
  linkedinContext: '',
  selectedCategory: null,
  selectedSubcategory: null,
  selectedModifiers: [],
  selectedRole: '',
  customRole: '',
  generatedPrompt: '',
  activeQuickBuild: null,
  apiKey: localStorage.getItem('promptforge_apikey') || '',
  archive: JSON.parse(localStorage.getItem('promptforge_archive') || '[]')
};

// ─── DOM ────────────────────────────────────────────
const $ = (s) => document.querySelector(s);
const apiKeyBar = $('#apiKeyBar');
const apiKeyInput = $('#apiKeyInput');
const saveApiKeyBtn = $('#saveApiKey');
const apiKeyStatus = $('#apiKeyStatus');
const settingsBtn = $('#settingsBtn');
const historyBtn = $('#historyBtn');
const closeDrawerBtn = $('#closeDrawer');
const archiveDrawer = $('#archiveDrawer');
const archiveOverlay = $('#archiveOverlay');
const archiveList = $('#archiveList');
const quickBuildList = $('#quickBuildList');
const categoryList = $('#categoryList');
const subcategorySection = $('#subcategorySection');
const subcategoryList = $('#subcategoryList');
const linkedinSection = $('#linkedinSection');
const contextTextarea = $('#contextTextarea');
const modifiersSection = $('#modifiersSection');
const modifiersList = $('#modifiersList');
const roleSection = $('#roleSection');
const roleSelect = $('#roleSelect');
const customRoleInput = $('#customRole');
const userQuestion = $('#userQuestion');
const buildBtn = $('#buildBtn');
const outputSection = $('#outputSection');
const loadingSpinner = $('#loadingSpinner');
const outputContent = $('#outputContent');
const errorBox = $('#errorBox');
const generatedPrompt = $('#generatedPrompt');
const copyBtn = $('#copyBtn');
const saveBtn = $('#saveBtn');
const regenerateBtn = $('#regenerateBtn');
const toast = $('#toast');

// Manual form sections to hide/show for quick build
const manualSections = () => [
  categoryList.closest('.form-section'),
  subcategorySection,
  linkedinSection,
  modifiersSection,
  roleSection
];

// ─── Init ───────────────────────────────────────────
function init() {
  // Render quick build presets
  renderQuickBuilds();

  // Render category radio buttons
  renderCategories();

  // Show saved API key state
  if (state.apiKey) {
    apiKeyInput.value = state.apiKey;
    apiKeyBar.classList.add('saved');
    apiKeyStatus.textContent = '✓ Saved';
    apiKeyBar.classList.add('hidden');
  }

  bindEvents();
}

// ─── Quick Build ────────────────────────────────────
function renderQuickBuilds() {
  quickBuildList.innerHTML = QUICK_BUILDS.map((qb) => `
    <div class="radio-item quick-build-item" data-id="${qb.id}">
      <div class="radio-dot"></div>
      <div class="quick-build-content">
        <span class="quick-build-label">${qb.label}</span>
        <span class="quick-build-desc">${qb.desc}</span>
      </div>
    </div>
  `).join('');

  quickBuildList.querySelectorAll('.radio-item').forEach((el) => {
    el.addEventListener('click', () => {
      const qbId = el.dataset.id;
      const qb = QUICK_BUILDS.find((q) => q.id === qbId);

      if (state.activeQuickBuild === qbId) {
        // Deselect — restore manual mode
        state.activeQuickBuild = null;
        state.selectedCategory = null;
        state.selectedSubcategory = null;
        state.selectedModifiers = [];
        state.selectedRole = '';
        state.customRole = '';
        el.classList.remove('selected');
        showManualSections();
        return;
      }

      // Select this preset
      state.activeQuickBuild = qbId;
      state.selectedCategory = CATEGORIES.find((c) => c.id === qb.categoryId);
      state.selectedSubcategory = state.selectedCategory.subcategories.find((s) => s.id === qb.subcategoryId);
      state.selectedModifiers = [...qb.modifiers];
      state.selectedRole = qb.role;
      state.customRole = '';

      // Update visual — only one selected
      quickBuildList.querySelectorAll('.radio-item').forEach((r) => r.classList.remove('selected'));
      el.classList.add('selected');

      // Hide manual sections
      hideManualSections();
    });
  });
}

function hideManualSections() {
  manualSections().forEach((s) => {
    if (s) s.classList.add('hidden');
  });
}

function showManualSections() {
  // Only show category section; the rest appear on interaction
  const catSection = categoryList.closest('.form-section');
  if (catSection) catSection.classList.remove('hidden');
  // Reset category selection visuals
  categoryList.querySelectorAll('.radio-item').forEach((r) => r.classList.remove('selected'));
  hideSection(subcategorySection);
  hideSection(linkedinSection);
  hideSection(modifiersSection);
  hideSection(roleSection);
}

function renderCategories() {
  categoryList.innerHTML = CATEGORIES.map((cat) => `
    <div class="radio-item" data-id="${cat.id}">
      <div class="radio-dot"></div>
      <span>${cat.name}</span>
    </div>
  `).join('');

  categoryList.querySelectorAll('.radio-item').forEach((el) => {
    el.addEventListener('click', () => {
      const catId = el.dataset.id;
      state.selectedCategory = CATEGORIES.find((c) => c.id === catId);
      state.selectedSubcategory = null;
      state.selectedModifiers = [];

      // Deselect quick build if active
      if (state.activeQuickBuild) {
        state.activeQuickBuild = null;
        quickBuildList.querySelectorAll('.radio-item').forEach((r) => r.classList.remove('selected'));
      }

      // Update selection visual
      categoryList.querySelectorAll('.radio-item').forEach((r) => r.classList.remove('selected'));
      el.classList.add('selected');

      onCategoryChange();
    });
  });
}

// ─── Events ─────────────────────────────────────────
function bindEvents() {
  // API key
  saveApiKeyBtn.addEventListener('click', saveApiKey);
  apiKeyInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveApiKey(); });

  settingsBtn.addEventListener('click', () => {
    apiKeyBar.classList.toggle('hidden');
    if (!apiKeyBar.classList.contains('hidden')) {
      apiKeyInput.value = state.apiKey;
      apiKeyInput.focus();
    }
  });

  // Archive
  historyBtn.addEventListener('click', openArchive);
  closeDrawerBtn.addEventListener('click', closeArchive);
  archiveOverlay.addEventListener('click', closeArchive);

  // Question
  userQuestion.addEventListener('input', (e) => { state.question = e.target.value; });
  contextTextarea.addEventListener('input', (e) => { state.linkedinContext = e.target.value; });

  // Category change handled by renderCategories click handlers

  // Role
  roleSelect.addEventListener('change', (e) => { state.selectedRole = e.target.value; });
  customRoleInput.addEventListener('input', (e) => { state.customRole = e.target.value; });

  // Build
  buildBtn.addEventListener('click', buildPrompt);
  copyBtn.addEventListener('click', copyToClipboard);
  saveBtn.addEventListener('click', saveToArchive);
  regenerateBtn.addEventListener('click', buildPrompt);
}

// ─── API Key ────────────────────────────────────────
function saveApiKey() {
  const key = apiKeyInput.value.trim();
  if (!key) { showToast('Enter a valid API key'); return; }
  state.apiKey = key;
  localStorage.setItem('promptforge_apikey', key);
  apiKeyBar.classList.add('saved');
  apiKeyStatus.textContent = '✓ Saved';
  showToast('API key saved');
  // Auto-hide after saving
  setTimeout(() => apiKeyBar.classList.add('hidden'), 1000);
}

// ─── Category Change ────────────────────────────────
function onCategoryChange() {
  if (!state.selectedCategory) {
    hideSection(subcategorySection);
    hideSection(linkedinSection);
    hideSection(modifiersSection);
    hideSection(roleSection);
    return;
  }

  // Show LinkedIn context if LinkedIn
  if (state.selectedCategory.id === 'linkedin') {
    showSection(linkedinSection);
  } else {
    hideSection(linkedinSection);
  }

  // Render subcategories
  renderSubcategories();
  showSection(subcategorySection);
  hideSection(modifiersSection);
  hideSection(roleSection);
}

// ─── Render Subcategories ───────────────────────────
function renderSubcategories() {
  const subs = state.selectedCategory.subcategories;
  subcategoryList.innerHTML = subs.map((sub) => `
    <div class="radio-item" data-id="${sub.id}">
      <div class="radio-dot"></div>
      <span>${sub.name}</span>
    </div>
  `).join('');

  subcategoryList.querySelectorAll('.radio-item').forEach((el) => {
    el.addEventListener('click', () => {
      const subId = el.dataset.id;
      state.selectedSubcategory = state.selectedCategory.subcategories.find((s) => s.id === subId);
      state.selectedModifiers = [];

      // Update selection visual
      subcategoryList.querySelectorAll('.radio-item').forEach((r) => r.classList.remove('selected'));
      el.classList.add('selected');

      // Show modifiers + role
      renderModifiers();
      showSection(modifiersSection);
      showSection(roleSection);
    });
  });
}

// ─── Render Modifiers ───────────────────────────────
function renderModifiers() {
  const mods = state.selectedSubcategory.modifiers;
  modifiersList.innerHTML = mods.map((mod, i) => `
    <div class="checkbox-item" data-index="${i}">
      <div class="checkbox-box"></div>
      <span>${mod}</span>
    </div>
  `).join('');

  modifiersList.querySelectorAll('.checkbox-item').forEach((el) => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.index);
      const mod = mods[idx];

      if (state.selectedModifiers.includes(mod)) {
        state.selectedModifiers = state.selectedModifiers.filter((m) => m !== mod);
        el.classList.remove('checked');
      } else {
        state.selectedModifiers.push(mod);
        el.classList.add('checked');
      }
      // Update checkbox visual
      el.querySelector('.checkbox-box').textContent = el.classList.contains('checked') ? '✓' : '';
    });
  });
}

// ─── Show/Hide Sections ─────────────────────────────
function showSection(el) {
  el.classList.remove('hidden');
  el.classList.add('fade-in');
}

function hideSection(el) {
  el.classList.add('hidden');
  el.classList.remove('fade-in');
}

// ─── Build Prompt ───────────────────────────────────
async function buildPrompt() {
  // Validate
  if (!state.question.trim()) {
    showToast('Type your question first');
    userQuestion.focus();
    return;
  }
  if (!state.selectedCategory) {
    showToast('Select a category');
    return;
  }
  if (!state.apiKey) {
    apiKeyBar.classList.remove('hidden');
    apiKeyInput.focus();
    showToast('Enter your OpenAI API key first');
    return;
  }

  // Show loading
  outputSection.classList.remove('hidden');
  loadingSpinner.classList.remove('hidden');
  outputContent.classList.add('hidden');
  errorBox.classList.add('hidden');
  outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const metaPrompt = buildMetaPrompt();

  try {
    const response = await fetch('/api/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: metaPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const errMsg = data?.error?.message || `API error ${response.status}`;
      throw new Error(errMsg);
    }

    state.generatedPrompt = data.choices[0].message.content.trim();
    generatedPrompt.textContent = state.generatedPrompt;
    loadingSpinner.classList.add('hidden');
    outputContent.classList.remove('hidden');
  } catch (err) {
    loadingSpinner.classList.add('hidden');
    errorBox.classList.remove('hidden');
    errorBox.textContent = `Error: ${err.message}`;
    console.error('OpenAI API error:', err);
  }
}

const SYSTEM_PROMPT = `You are an expert prompt engineer. Your job is to take a rough user question along with context about the category, subcategory, modifiers, and desired LLM role, and craft a highly effective, well-structured prompt that the user can directly copy and paste into any LLM.

Rules:
1. Output ONLY the prompt itself — no meta-commentary, no explanation
2. The prompt must be self-contained and ready to use
3. Incorporate all selected modifiers naturally
4. If a role is specified, start with "Act as a [role]."
5. Be specific and detailed
6. Include formatting requirements implied by modifiers
7. The prompt should elicit the most useful response possible`;

function buildMetaPrompt() {
  const role = state.customRole || state.selectedRole;
  let p = `Craft an optimized prompt from these inputs:

**Question:** ${state.question}
**Category:** ${state.selectedCategory.name}`;

  if (state.selectedSubcategory) {
    p += `\n**Subcategory:** ${state.selectedSubcategory.name}`;
  }

  if (state.selectedModifiers.length > 0) {
    p += `\n**Modifiers:** ${state.selectedModifiers.join(', ')}`;
  }

  if (role) {
    p += `\n**LLM Role:** ${role}`;
  }

  if (state.selectedCategory.id === 'linkedin' && state.linkedinContext) {
    p += `\n\n**Context (Job Description / Profile):**\n${state.linkedinContext}`;
  }

  p += `\n\nGenerate a well-crafted, ready-to-use prompt.`;
  return p;
}

// ─── Archive ────────────────────────────────────────
function openArchive() {
  renderArchive();
  archiveDrawer.classList.remove('hidden');
  archiveOverlay.classList.remove('hidden');
}

function closeArchive() {
  archiveDrawer.classList.add('hidden');
  archiveOverlay.classList.add('hidden');
}

function saveToArchive() {
  if (!state.generatedPrompt) { showToast('No prompt to save'); return; }

  state.archive.unshift({
    id: Date.now(),
    question: state.question,
    category: state.selectedCategory?.name || '',
    subcategory: state.selectedSubcategory?.name || '',
    modifiers: [...state.selectedModifiers],
    prompt: state.generatedPrompt,
    date: new Date().toISOString()
  });

  localStorage.setItem('promptforge_archive', JSON.stringify(state.archive));
  showToast('Saved to archive ✓');
}

function renderArchive() {
  if (state.archive.length === 0) {
    archiveList.innerHTML = '<p class="empty-msg">No saved prompts yet.</p>';
    return;
  }

  archiveList.innerHTML = state.archive.map((e) => `
    <div class="archive-item" data-id="${e.id}">
      <div class="archive-meta">
        <span>${e.category}</span>
        <span>${timeAgo(e.date)}</span>
      </div>
      <div class="archive-question">${esc(e.question)}</div>
      <div class="archive-preview">${esc(e.prompt.substring(0, 100))}</div>
      <div class="archive-item-actions">
        <button class="btn btn-sm arc-copy" data-id="${e.id}">📋 Copy</button>
        <button class="btn btn-sm arc-del" data-id="${e.id}">🗑️</button>
      </div>
    </div>
  `).join('');

  archiveList.querySelectorAll('.arc-copy').forEach((b) => {
    b.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const entry = state.archive.find((a) => a.id === +b.dataset.id);
      if (entry) { navigator.clipboard.writeText(entry.prompt); showToast('Copied ✓'); }
    });
  });

  archiveList.querySelectorAll('.arc-del').forEach((b) => {
    b.addEventListener('click', (ev) => {
      ev.stopPropagation();
      state.archive = state.archive.filter((a) => a.id !== +b.dataset.id);
      localStorage.setItem('promptforge_archive', JSON.stringify(state.archive));
      renderArchive();
      showToast('Deleted');
    });
  });

  archiveList.querySelectorAll('.archive-item').forEach((el) => {
    el.addEventListener('click', () => {
      const entry = state.archive.find((a) => a.id === +el.dataset.id);
      if (entry) {
        closeArchive();
        generatedPrompt.textContent = entry.prompt;
        state.generatedPrompt = entry.prompt;
        outputSection.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
        outputContent.classList.remove('hidden');
        errorBox.classList.add('hidden');
        outputSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ─── Utils ──────────────────────────────────────────
function copyToClipboard() {
  if (!state.generatedPrompt) return;
  navigator.clipboard.writeText(state.generatedPrompt)
    .then(() => showToast('Copied ✓'))
    .catch(() => showToast('Copy failed'));
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 200);
  }, 2000);
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Start ──────────────────────────────────────────
init();
