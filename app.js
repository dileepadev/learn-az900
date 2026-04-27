import { MODULES } from "./data/modules.js";
import { PAPERS, TOTAL_QUESTIONS, DOMAIN_INFO } from "./data/papers.js";

const STORAGE_KEY = "az900-practice-state-v1";
const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];
const REVIEW_FILTERS = ["all", "incorrect", "flagged"];

const root = document.getElementById("app");
const heroTotalQuestions = document.getElementById("heroTotalQuestions");
const heroTotalPapers = document.getElementById("heroTotalPapers");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Re-usable selections for views
const views = {
  home: document.getElementById("homeView"),
  theory: document.getElementById("theoryView"),
  practice: document.getElementById("practiceView")
};

const moduleNavContainer = document.getElementById("moduleNav");
const docContent = document.getElementById("docContent");

const state = loadState();

initialize();

function initializeRouter() {
  window.addEventListener('hashchange', handleRoute);
  
  if (moduleNavContainer) {
    let navHtml = '';
    MODULES.forEach(mod => {
      navHtml += `<h4 style="margin: 0 0 8px; font-size: 1rem; color: var(--ink);">${mod.title}</h4>`;
      navHtml += `<div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 24px;">`;
      mod.lessons.forEach(lesson => {
        navHtml += `<a href="#doc-${lesson.id}" class="doc-link" data-path="${lesson.path}">${lesson.title}</a>`;
      });
      navHtml += `</div>`;
    });
    moduleNavContainer.innerHTML = navHtml;
  }
  handleRoute();
}

function setActiveNav(navId) {
  document.querySelectorAll('.top-nav .text-button').forEach(btn => {
    btn.classList.remove('active');
    btn.style.fontWeight = '';
  });
  if (navId) {
    const el = document.getElementById(navId);
    if (el) el.classList.add('active');
  }
}

async function handleRoute() {
  const hash = window.location.hash;
  
  Object.values(views).forEach(el => el.style.display = 'none');

  if (hash === '#theory') {
    views.theory.style.display = 'grid';
    setActiveNav('navTheory');
  } else if (hash === '#practice') {
    views.practice.style.display = 'block';
    setActiveNav('navPractice');
  } else if (hash.startsWith('#doc-')) {
    views.theory.style.display = 'grid';
    setActiveNav('navTheory');
    
    // reset nav styling
    document.querySelectorAll('.doc-link').forEach(l => l.classList.remove('active'));
    const targetLink = document.querySelector(`.doc-link[href="${hash}"]`);
    
    if (targetLink) {
      targetLink.classList.add('active');
      const docPath = targetLink.getAttribute('data-path');
      docContent.innerHTML = '<em>Loading...</em>';
      try {
        const response = await fetch(`./${docPath}`);
        if (!response.ok) throw new Error('File not found');
        const markdown = await response.text();
        docContent.innerHTML = marked.parse(markdown);
      } catch (err) {
        docContent.innerHTML = `<em style="color: var(--danger);">Failed to load document: ${err.message}</em>`;
      }
    }
  } else {
    views.home.style.display = 'block';
    setActiveNav(null);
  }
  
  if (hash === '#practice' || hash === '') {
    render();
  }
}

function initializeTheme() {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = isDark ? 'dark' : 'light';
  const savedTheme = localStorage.getItem('az900-theme') || defaultTheme;
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '🌖' : '🌒';
}

function handleThemeToggle() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem('az900-theme', newTheme);
  themeIcon.textContent = newTheme === 'dark' ? '🌖' : '🌒';
}

function initialize() {
  initializeTheme();
  initializeRouter();
  themeToggle?.addEventListener("click", handleThemeToggle);
  hydrateState();
  syncHeroStats();
  root.addEventListener("click", handleClick);
  window.addEventListener("beforeunload", persistState);
  window.addEventListener("storage", handleStorageSync);
  window.setInterval(refreshRuntime, 1000);
  render();
}

function createBlankState() {
  return {
    activePaperId: null,
    sessions: {},
  };
}

function createSession(paper) {
  return {
    answers: Array(paper.questions.length).fill(null),
    flagged: Array(paper.questions.length).fill(false),
    revealed: Array(paper.questions.length).fill(false),
    currentIndex: 0,
    startedAt: null,
    submittedAt: null,
    completedElapsedMs: null,
    reviewFilter: "all",
  };
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createBlankState();
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return createBlankState();
    }

    return parsed;
  } catch {
    return createBlankState();
  }
}

function normalizeSession(existingSession, paper) {
  const baseSession = createSession(paper);
  if (!existingSession || typeof existingSession !== "object") {
    return baseSession;
  }

  baseSession.answers = Array.from({ length: paper.questions.length }, (_, index) => {
    const value = existingSession.answers?.[index];
    return Number.isInteger(value) ? value : null;
  });

  baseSession.flagged = Array.from({ length: paper.questions.length }, (_, index) => {
    return Boolean(existingSession.flagged?.[index]);
  });

  baseSession.revealed = Array.from({ length: paper.questions.length }, (_, index) => {
    return Boolean(existingSession.revealed?.[index]);
  });

  baseSession.currentIndex = clampNumber(existingSession.currentIndex, 0, paper.questions.length - 1);
  baseSession.startedAt = Number.isFinite(existingSession.startedAt) ? existingSession.startedAt : null;
  baseSession.submittedAt = Number.isFinite(existingSession.submittedAt) ? existingSession.submittedAt : null;
  baseSession.completedElapsedMs = Number.isFinite(existingSession.completedElapsedMs)
    ? existingSession.completedElapsedMs
    : null;
  baseSession.reviewFilter = REVIEW_FILTERS.includes(existingSession.reviewFilter)
    ? existingSession.reviewFilter
    : "all";

  if (baseSession.submittedAt !== null && baseSession.completedElapsedMs === null && baseSession.startedAt !== null) {
    baseSession.completedElapsedMs = Math.max(0, baseSession.submittedAt - baseSession.startedAt);
  }

  return baseSession;
}

function hydrateState() {
  if (!state.sessions || typeof state.sessions !== "object") {
    state.sessions = {};
  }

  for (const paper of PAPERS) {
    state.sessions[paper.id] = normalizeSession(state.sessions[paper.id], paper);
  }

  const activePaperExists = PAPERS.some((paper) => paper.id === Number(state.activePaperId));
  state.activePaperId = activePaperExists ? Number(state.activePaperId) : null;
}

function persistState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore persistence failures and keep the app usable.
  }
}

function handleStorageSync(event) {
  if (event.key !== STORAGE_KEY) {
    return;
  }

  const nextState = loadState();
  state.activePaperId = nextState.activePaperId;
  state.sessions = nextState.sessions;
  hydrateState();
  render();
}

function syncHeroStats() {
  heroTotalQuestions.textContent = `${TOTAL_QUESTIONS} questions`;
  heroTotalPapers.textContent = `${PAPERS.length} papers`;
}

function commitAndRender() {
  persistState();
  render();
}

function clampNumber(value, min, max) {
  const numericValue = Number.isFinite(value) ? value : min;
  return Math.min(max, Math.max(min, numericValue));
}

function getPaper(paperId) {
  return PAPERS.find((paper) => paper.id === Number(paperId));
}

function getSession(paperId) {
  const paper = getPaper(paperId);
  if (!paper) {
    return null;
  }

  state.sessions[paper.id] = normalizeSession(state.sessions[paper.id], paper);
  return state.sessions[paper.id];
}

function getActivePaper() {
  return getPaper(state.activePaperId);
}

function isAnswered(answerIndex) {
  return Number.isInteger(answerIndex);
}

function getAnsweredCount(session) {
  return session.answers.filter(isAnswered).length;
}

function getFlaggedCount(session) {
  return session.flagged.filter(Boolean).length;
}

function getCorrectCount(paper, session) {
  return paper.questions.reduce((sum, question, index) => {
    return sum + Number(session.answers[index] === question.a);
  }, 0);
}

function getElapsedMs(session) {
  if (session.submittedAt !== null && Number.isFinite(session.completedElapsedMs)) {
    return session.completedElapsedMs;
  }

  if (!Number.isFinite(session.startedAt)) {
    return 0;
  }

  return Math.max(0, Date.now() - session.startedAt);
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatPercent(value) {
  return `${Math.round(value)}%`;
}

function getPaperSummary(paper, session) {
  const answered = getAnsweredCount(session);
  const correct = getCorrectCount(paper, session);
  const total = paper.questions.length;
  const flagged = getFlaggedCount(session);
  const completion = total === 0 ? 0 : (answered / total) * 100;
  const score = total === 0 ? 0 : (correct / total) * 100;

  return {
    answered,
    correct,
    total,
    flagged,
    completion,
    score,
  };
}

function getDashboardMetrics() {
  let answeredQuestions = 0;
  let bestScore = 0;
  let completedPapers = 0;
  let sumOfScores = 0;

  for (const paper of PAPERS) {
    const session = getSession(paper.id);
    const summary = getPaperSummary(paper, session);
    answeredQuestions += summary.answered;

    if (session.submittedAt !== null) {
      completedPapers += 1;
      sumOfScores += summary.score;
      bestScore = Math.max(bestScore, summary.score);
    }
  }

  return {
    answeredQuestions,
    completedPapers,
    averageScore: completedPapers > 0 ? sumOfScores / completedPapers : 0,
    bestScore,
  };
}

function getGlobalDomainTotals() {
  return Object.entries(DOMAIN_INFO).map(([domainId, domainInfo]) => {
    const total = PAPERS.reduce((sum, paper) => {
      return sum + paper.questions.filter((question) => question.domain === Number(domainId)).length;
    }, 0);

    return {
      domainId: Number(domainId),
      total,
      ...domainInfo,
    };
  });
}

function getPaperDomainTotals(paper) {
  return Object.entries(DOMAIN_INFO).map(([domainId, domainInfo]) => {
    const total = paper.questions.filter((question) => question.domain === Number(domainId)).length;
    return {
      domainId: Number(domainId),
      total,
      ...domainInfo,
    };
  });
}

function getScoreTone(score) {
  if (score >= 85) {
    return "success";
  }

  if (score >= 70) {
    return "warning";
  }

  return "danger";
}

function getResumeCandidate() {
  return PAPERS.map((paper) => ({ paper, session: getSession(paper.id) }))
    .filter(({ session }) => session.startedAt !== null && session.submittedAt === null)
    .sort((left, right) => (right.session.startedAt ?? 0) - (left.session.startedAt ?? 0))[0]?.paper ?? null;
}

function startPaper(paperId, forceReset = false) {
  const paper = getPaper(paperId);
  if (!paper) {
    return;
  }

  if (forceReset) {
    state.sessions[paper.id] = createSession(paper);
  }

  const session = getSession(paper.id);
  if (session.startedAt === null) {
    session.startedAt = Date.now();
  }

  state.activePaperId = paper.id;
  commitAndRender();
}

function resetPaper(paperId) {
  const paper = getPaper(paperId);
  if (!paper) {
    return;
  }

  const confirmed = window.confirm(`Reset ${paper.title}? This clears saved answers for this paper.`);
  if (!confirmed) {
    return;
  }

  state.sessions[paper.id] = createSession(paper);
  state.sessions[paper.id].startedAt = Date.now();
  state.activePaperId = paper.id;
  commitAndRender();
}

function submitPaper(paperId) {
  const paper = getPaper(paperId);
  const session = getSession(paperId);
  if (!paper || !session) {
    return;
  }

  const unanswered = paper.questions.length - getAnsweredCount(session);
  const confirmationMessage = unanswered > 0
    ? `Submit ${paper.title} with ${unanswered} unanswered question(s)?`
    : `Submit ${paper.title} now?`;

  if (!window.confirm(confirmationMessage)) {
    return;
  }

  if (session.startedAt === null) {
    session.startedAt = Date.now();
  }

  session.submittedAt = Date.now();
  session.completedElapsedMs = getElapsedMs(session);
  session.reviewFilter = "all";
  state.activePaperId = paper.id;
  commitAndRender();
}

function setCurrentQuestion(paperId, nextIndex) {
  const paper = getPaper(paperId);
  const session = getSession(paperId);
  if (!paper || !session) {
    return;
  }

  session.currentIndex = clampNumber(nextIndex, 0, paper.questions.length - 1);
  commitAndRender();
}

function setAnswer(paperId, questionIndex, optionIndex) {
  const session = getSession(paperId);
  if (!session || session.submittedAt !== null) {
    return;
  }

  session.answers[questionIndex] = Number(optionIndex);
  commitAndRender();
}

function toggleFlag(paperId, questionIndex) {
  const session = getSession(paperId);
  if (!session) {
    return;
  }

  session.flagged[questionIndex] = !session.flagged[questionIndex];
  commitAndRender();
}

function revealAnswer(paperId, questionIndex) {
  const session = getSession(paperId);
  if (!session) {
    return;
  }

  session.revealed[questionIndex] = true;
  commitAndRender();
}

function goHome() {
  state.activePaperId = null;
  commitAndRender();
}

function setReviewFilter(paperId, filter) {
  const session = getSession(paperId);
  if (!session || !REVIEW_FILTERS.includes(filter)) {
    return;
  }

  session.reviewFilter = filter;
  commitAndRender();
}

function handleClick(event) {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) {
    return;
  }

  const action = actionTarget.dataset.action;
  const paperId = Number(actionTarget.dataset.paperId);
  const questionIndex = Number(actionTarget.dataset.questionIndex);
  const optionIndex = Number(actionTarget.dataset.optionIndex);

  switch (action) {
    case "open-paper":
      startPaper(paperId, false);
      break;
    case "reset-paper":
      resetPaper(paperId);
      break;
    case "back-home":
      goHome();
      break;
    case "submit-paper":
      submitPaper(paperId);
      break;
    case "jump-question":
      setCurrentQuestion(paperId, questionIndex);
      break;
    case "previous-question":
      setCurrentQuestion(paperId, questionIndex - 1);
      break;
    case "next-question":
      setCurrentQuestion(paperId, questionIndex + 1);
      break;
    case "reveal-answer":
      revealAnswer(paperId, questionIndex);
      break;
    case "select-option":
      setAnswer(paperId, questionIndex, optionIndex);
      break;
    case "toggle-flag":
      toggleFlag(paperId, questionIndex);
      break;
    case "set-filter":
      setReviewFilter(paperId, actionTarget.dataset.filter);
      break;
    default:
      break;
  }
}

function refreshRuntime() {
  const activePaper = getActivePaper();
  if (!activePaper) {
    return;
  }

  const session = getSession(activePaper.id);
  if (!session || session.submittedAt !== null) {
    return;
  }

  const elapsedNode = document.querySelector("[data-elapsed-time]");
  if (elapsedNode) {
    elapsedNode.textContent = formatDuration(getElapsedMs(session));
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderDashboard() {
  const metrics = getDashboardMetrics();
  const resumePaper = getResumeCandidate();
  const resumeButtonLabel = resumePaper ? `Resume ${resumePaper.title}` : "Start with Paper 1";
  const resumeButtonId = resumePaper ? resumePaper.id : 1;

  return `
    <section class="dashboard">
      <article class="dashboard-intro">
        <div>
          <p class="eyebrow">Practice workflow</p>
          <h2>Study paper by paper or jump back into your last unfinished attempt.</h2>
          <p>
            Every answer is stored in this browser. Submit a paper to unlock
            instant scoring, explanations, and domain-level review against the
            official AZ-900 weightings.
          </p>
        </div>
        <div class="dashboard-actions">
          <button class="primary-button" data-action="open-paper" data-paper-id="${resumeButtonId}">${escapeHtml(resumeButtonLabel)}</button>
        </div>
      </article>

      <section class="summary-grid">
        <article class="summary-card">
          <p class="summary-label">Completed papers</p>
          <div class="summary-value">${metrics.completedPapers}</div>
          <p class="muted">Out of ${PAPERS.length} total papers.</p>
        </article>
        <article class="summary-card">
          <p class="summary-label">Questions answered</p>
          <div class="summary-value">${metrics.answeredQuestions}</div>
          <p class="muted">Across all saved attempts.</p>
        </article>
        <article class="summary-card">
          <p class="summary-label">Average submitted score</p>
          <div class="summary-value">${metrics.completedPapers > 0 ? formatPercent(metrics.averageScore) : "--"}</div>
          <p class="muted">Calculated from finished papers only.</p>
        </article>
        <article class="summary-card">
          <p class="summary-label">Best submitted score</p>
          <div class="summary-value">${metrics.completedPapers > 0 ? formatPercent(metrics.bestScore) : "--"}</div>
          <p class="muted">Highest score saved in this browser.</p>
        </article>
      </section>

      <section class="domain-grid">
        ${getGlobalDomainTotals()
          .map((domain) => {
            return `
              <article class="domain-card" style="--domain-soft: ${toSoftColor(domain.color)}">
                <p class="eyebrow">${escapeHtml(domain.weight)}</p>
                <h3>${escapeHtml(domain.label)}</h3>
                <p class="domain-meta">${domain.total} questions across the full practice bank.</p>
              </article>
            `;
          })
          .join("")}
      </section>

      <section class="paper-grid">
        ${PAPERS.map((paper) => renderPaperCard(paper)).join("")}
      </section>
    </section>
  `;
}

function renderPaperCard(paper) {
  const session = getSession(paper.id);
  const summary = getPaperSummary(paper, session);
  const statusTone = session.submittedAt !== null ? getScoreTone(summary.score) : summary.answered > 0 ? "info" : "neutral";
  const statusLabel = session.submittedAt !== null
    ? `${formatPercent(summary.score)} score`
    : summary.answered > 0
      ? "In progress"
      : "Ready";
  const primaryLabel = session.submittedAt !== null
    ? "Review results"
    : summary.answered > 0
      ? "Resume paper"
      : "Start paper";

  return `
    <article class="paper-card">
      <div class="card-top">
        <div>
          <p class="eyebrow">40-question paper</p>
          <h3>${escapeHtml(paper.title)}</h3>
        </div>
        <span class="status-pill ${statusTone}">${escapeHtml(statusLabel)}</span>
      </div>

      <div>
        <div class="progress-meta">
          <span>${summary.answered}/${summary.total} answered</span>
          <span>${session.submittedAt !== null ? `${summary.correct}/${summary.total} correct` : `${summary.flagged} flagged`}</span>
        </div>
        <div class="progress-track">
          <span class="progress-fill" style="width: ${summary.completion}%;"></span>
        </div>
      </div>

      <div class="domain-mini-grid">
        ${getPaperDomainTotals(paper)
          .map((domain) => {
            return `
              <div class="domain-mini">
                <div class="domain-mini-top">
                  <span>${escapeHtml(domain.label)}</span>
                  <strong>${domain.total}</strong>
                </div>
                <div class="mini-track">
                  <span class="mini-fill" style="--domain-color: ${domain.color}; width: ${(domain.total / paper.questions.length) * 100}%;"></span>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>

      <div class="paper-actions">
        <button class="primary-button" data-action="open-paper" data-paper-id="${paper.id}">${escapeHtml(primaryLabel)}</button>
        ${(summary.answered > 0 || session.submittedAt !== null)
          ? `<button class="ghost-button" data-action="reset-paper" data-paper-id="${paper.id}">Retake</button>`
          : ""}
      </div>
    </article>
  `;
}

function renderExam(paper, session) {
  const summary = getPaperSummary(paper, session);
  const question = paper.questions[session.currentIndex];
  const selectedAnswer = session.answers[session.currentIndex];
  const questionIsFlagged = session.flagged[session.currentIndex];
  const answerRevealed = session.revealed[session.currentIndex];
  const questionProgress = ((session.currentIndex + 1) / paper.questions.length) * 100;
  const userAnswerLabel = isAnswered(selectedAnswer)
    ? `${OPTION_LABELS[selectedAnswer] ?? selectedAnswer + 1}. ${question.opts[selectedAnswer]}`
    : "Not answered yet";
  const correctAnswerLabel = `${OPTION_LABELS[question.a] ?? question.a + 1}. ${question.opts[question.a]}`;
  const revealTone = !isAnswered(selectedAnswer)
    ? "warning"
    : selectedAnswer === question.a
      ? "success"
      : "danger";
  const revealCardClass = !isAnswered(selectedAnswer)
    ? "is-revealed"
    : selectedAnswer === question.a
      ? "is-correct"
      : "is-incorrect";
  const revealLabel = !isAnswered(selectedAnswer)
    ? "Answer revealed"
    : selectedAnswer === question.a
      ? "Correct"
      : "Needs review";
  const revealHeading = !isAnswered(selectedAnswer)
    ? "Review the correct answer before moving on."
    : selectedAnswer === question.a
      ? "You got this one right."
      : "Check why the correct answer is different.";

  return `
    <section class="workspace">
      <aside class="workspace-sidebar">
        <article class="sidebar-card">
          <div class="card-top">
            <div>
              <p class="eyebrow">Practice paper</p>
              <h2>${escapeHtml(paper.title)}</h2>
            </div>
            <button class="text-button" data-action="back-home">Back to dashboard</button>
          </div>

          <div class="metric-grid">
            <div class="metric-tile">
              <p class="metric-label">Elapsed</p>
              <div class="metric-value" data-elapsed-time>${formatDuration(getElapsedMs(session))}</div>
              <p class="muted">Timer starts on first open.</p>
            </div>
            <div class="metric-tile">
              <p class="metric-label">Progress</p>
              <div class="metric-value">${summary.answered}/${summary.total}</div>
              <p class="muted">Questions answered.</p>
            </div>
            <div class="metric-tile">
              <p class="metric-label">Flagged</p>
              <div class="metric-value">${summary.flagged}</div>
              <p class="muted">Questions marked for review.</p>
            </div>
            <div class="metric-tile">
              <p class="metric-label">Current domain</p>
              <div class="metric-value">D${question.domain}</div>
              <p class="muted">${escapeHtml(DOMAIN_INFO[question.domain].label)}</p>
            </div>
          </div>

          <div class="sidebar-actions">
            <button class="ghost-button" data-action="toggle-flag" data-paper-id="${paper.id}" data-question-index="${session.currentIndex}">${questionIsFlagged ? "Unflag question" : "Flag question"}</button>
            <button class="secondary-button" data-action="submit-paper" data-paper-id="${paper.id}">Submit paper</button>
          </div>
        </article>

        <article class="sidebar-card">
          <h3>Question map</h3>
          <p class="helper-text">Jump directly to any question. Saved answers persist automatically in this browser.</p>

          <div class="legend">
            <span class="badge">Not answered</span>
            <span class="badge success">Answered</span>
            <span class="badge flagged">Flagged</span>
          </div>

          <div class="nav-grid">
            ${paper.questions
              .map((_, index) => {
                const classes = ["nav-button"];
                if (session.currentIndex === index) {
                  classes.push("is-current");
                }
                if (isAnswered(session.answers[index])) {
                  classes.push("is-answered");
                }
                if (session.flagged[index]) {
                  classes.push("is-flagged");
                }

                return `
                  <button
                    type="button"
                    class="${classes.join(" ")}"
                    data-action="jump-question"
                    data-paper-id="${paper.id}"
                    data-question-index="${index}"
                  >
                    ${index + 1}
                  </button>
                `;
              })
              .join("")}
          </div>
        </article>
      </aside>

      <article class="question-panel">
        <div class="question-top">
          <div>
            <p class="eyebrow">Question ${session.currentIndex + 1} of ${paper.questions.length}</p>
            <div class="review-meta">
              <span class="badge" style="border-color: ${DOMAIN_INFO[question.domain].color}; background: ${toSoftColor(DOMAIN_INFO[question.domain].color)};">${escapeHtml(DOMAIN_INFO[question.domain].label)}</span>
              ${questionIsFlagged ? '<span class="badge flagged">Flagged for review</span>' : ""}
              ${isAnswered(selectedAnswer) ? '<span class="badge success">Answer saved</span>' : '<span class="badge">Waiting for answer</span>'}
            </div>
          </div>
          <span class="status-pill info">${formatPercent(questionProgress)} through paper</span>
        </div>

        <h2 class="question-text">${escapeHtml(question.q)}</h2>

        <div class="option-list">
          ${question.opts
            .map((option, optionIdx) => {
              const isSelected = selectedAnswer === optionIdx;
              return `
                <button
                  type="button"
                  class="option-button ${isSelected ? "is-selected" : ""}"
                  data-action="select-option"
                  data-paper-id="${paper.id}"
                  data-question-index="${session.currentIndex}"
                  data-option-index="${optionIdx}"
                  aria-pressed="${isSelected}"
                  ${answerRevealed ? "disabled" : ""}
                >
                  <span class="option-index">${OPTION_LABELS[optionIdx] ?? optionIdx + 1}</span>
                  <span class="option-copy">${escapeHtml(option)}</span>
                </button>
              `;
            })
            .join("")}
        </div>

        <div>
          <div class="progress-meta">
            <span>${summary.answered}/${summary.total} answered</span>
            <span>${summary.total - summary.answered} unanswered</span>
          </div>
          <div class="progress-track">
            <span class="progress-fill" style="width: ${summary.completion}%;"></span>
          </div>
        </div>

        ${answerRevealed ? `
          <article class="review-card question-reveal ${revealCardClass}">
            <div class="review-top">
              <div>
                <p class="eyebrow">Question result</p>
                <h3>${revealHeading}</h3>
              </div>
              <span class="status-pill ${revealTone}">${revealLabel}</span>
            </div>

            <div class="answer-grid">
              <div class="answer-box">
                <p class="answer-label">Your answer</p>
                <strong>${escapeHtml(userAnswerLabel)}</strong>
              </div>
              <div class="answer-box">
                <p class="answer-label">Correct answer</p>
                <strong>${escapeHtml(correctAnswerLabel)}</strong>
              </div>
            </div>

            <p class="explanation-text">${escapeHtml(question.exp)}</p>
          </article>
        ` : ""}

        <div class="question-actions">
          <button
            class="ghost-button"
            data-action="previous-question"
            data-paper-id="${paper.id}"
            data-question-index="${session.currentIndex}"
            ${session.currentIndex === 0 ? "disabled" : ""}
          >
            Previous
          </button>
          <button
            class="secondary-button reveal-button"
            data-action="reveal-answer"
            data-paper-id="${paper.id}"
            data-question-index="${session.currentIndex}"
            ${answerRevealed ? "disabled" : ""}
          >
            ${answerRevealed ? "Answer revealed" : "Reveal answer"}
          </button>
          ${session.currentIndex < paper.questions.length - 1 ? `
            <button
              class="primary-button"
              data-action="next-question"
              data-paper-id="${paper.id}"
              data-question-index="${session.currentIndex}"
            >
              Next question
            </button>
          ` : `
            <button
              class="secondary-button"
              data-action="submit-paper"
              data-paper-id="${paper.id}"
            >
              Submit paper
            </button>
          `}
        </div>
      </article>
    </section>
  `;
}

function getDomainBreakdown(paper, session) {
  return Object.entries(DOMAIN_INFO).map(([domainId, domainInfo]) => {
    const questions = paper.questions.filter((question) => question.domain === Number(domainId));
    const total = questions.length;
    const correct = paper.questions.reduce((sum, question, index) => {
      return sum + Number(question.domain === Number(domainId) && session.answers[index] === question.a);
    }, 0);

    return {
      domainId: Number(domainId),
      total,
      correct,
      score: total > 0 ? (correct / total) * 100 : 0,
      ...domainInfo,
    };
  });
}

function getReviewQuestions(paper, session) {
  return paper.questions
    .map((question, index) => ({ question, index }))
    .filter(({ question, index }) => {
      if (session.reviewFilter === "incorrect") {
        return session.answers[index] !== question.a;
      }

      if (session.reviewFilter === "flagged") {
        return session.flagged[index];
      }

      return true;
    });
}

function renderResults(paper, session) {
  const summary = getPaperSummary(paper, session);
  const breakdown = getDomainBreakdown(paper, session);
  const reviewItems = getReviewQuestions(paper, session);
  const scoreTone = getScoreTone(summary.score);

  return `
    <section class="results-shell">
      <div class="results-actions">
        <button class="text-button" data-action="back-home">Back to dashboard</button>
        <button class="secondary-button" data-action="reset-paper" data-paper-id="${paper.id}">Retake ${escapeHtml(paper.title)}</button>
      </div>

      <div class="result-overview">
        <article class="result-card">
          <p class="eyebrow">${escapeHtml(paper.title)} complete</p>
          <h2>Score snapshot</h2>
          <div class="score-value">${summary.correct}/${summary.total}</div>
          <div class="review-meta">
            <span class="status-pill ${scoreTone}">${formatPercent(summary.score)} overall</span>
            <span class="badge">${formatDuration(getElapsedMs(session))} elapsed</span>
            <span class="badge flagged">${summary.flagged} flagged</span>
          </div>
          <p class="result-note">
            Use the review filters below to focus on incorrect or flagged items,
            then retake the paper when you want a clean run.
          </p>
        </article>

        <article class="result-card">
          <h2>Domain breakdown</h2>
          <div class="breakdown-grid">
            ${breakdown
              .map((domain) => {
                return `
                  <div class="breakdown-row">
                    <div>
                      <strong>${escapeHtml(domain.label)}</strong>
                      <div class="breakdown-meta">Study guide weight ${escapeHtml(domain.weight)}</div>
                    </div>
                    <div class="breakdown-stats">
                      <div class="progress-meta">
                        <span>${domain.correct}/${domain.total} correct</span>
                        <span>${formatPercent(domain.score)}</span>
                      </div>
                      <div class="mini-track">
                        <span class="mini-fill" style="--domain-color: ${domain.color}; width: ${domain.score}%;"></span>
                      </div>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </article>
      </div>

      <article class="result-card">
        <div class="filter-row">
          <div>
            <p class="eyebrow">Review answers</p>
            <h3>Question-by-question breakdown</h3>
          </div>
          <div class="filter-row">
            ${[
              ["all", "All questions"],
              ["incorrect", "Incorrect / unanswered"],
              ["flagged", "Flagged only"],
            ]
              .map(([filter, label]) => {
                const isActive = session.reviewFilter === filter;
                return `
                  <button
                    class="filter-button ${isActive ? "is-active" : ""}"
                    data-action="set-filter"
                    data-paper-id="${paper.id}"
                    data-filter="${filter}"
                  >
                    ${escapeHtml(label)}
                  </button>
                `;
              })
              .join("")}
          </div>
        </div>
      </article>

      <div class="review-list">
        ${reviewItems.length > 0
          ? reviewItems.map(({ question, index }) => renderReviewCard(question, index, session)).join("")
          : `
            <article class="empty-state">
              <h3>No questions match this filter.</h3>
              <p>Switch to another filter or retake the paper for a fresh attempt.</p>
            </article>
          `}
      </div>
    </section>
  `;
}

function renderReviewCard(question, index, session) {
  const userAnswer = session.answers[index];
  const isCorrect = userAnswer === question.a;
  const userAnswerLabel = isAnswered(userAnswer)
    ? `${OPTION_LABELS[userAnswer] ?? userAnswer + 1}. ${question.opts[userAnswer]}`
    : "Unanswered";
  const correctAnswerLabel = `${OPTION_LABELS[question.a] ?? question.a + 1}. ${question.opts[question.a]}`;
  const domainInfo = DOMAIN_INFO[question.domain];

  return `
    <article class="review-card ${isCorrect ? "is-correct" : "is-incorrect"}">
      <div class="review-top">
        <div>
          <p class="eyebrow">Question ${index + 1}</p>
          <h3>${escapeHtml(question.q)}</h3>
        </div>
        <span class="status-pill ${isCorrect ? "success" : "danger"}">${isCorrect ? "Correct" : "Needs review"}</span>
      </div>

      <div class="review-meta">
        <span class="badge" style="border-color: ${domainInfo.color}; background: ${toSoftColor(domainInfo.color)};">${escapeHtml(domainInfo.label)}</span>
        ${session.flagged[index] ? '<span class="badge flagged">Flagged in exam</span>' : ""}
      </div>

      <div class="answer-grid">
        <div class="answer-box">
          <p class="answer-label">Your answer</p>
          <strong>${escapeHtml(userAnswerLabel)}</strong>
        </div>
        <div class="answer-box">
          <p class="answer-label">Correct answer</p>
          <strong>${escapeHtml(correctAnswerLabel)}</strong>
        </div>
      </div>

      <p class="explanation-text">${escapeHtml(question.exp)}</p>
    </article>
  `;
}

function toSoftColor(hexColor) {
  const value = hexColor.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, 0.14)`;
}

function render() {
  if (!root) {
    return;
  }

  syncHeroStats();
  const activePaper = getActivePaper();

  if (!activePaper) {
    root.innerHTML = renderDashboard();
    return;
  }

  const session = getSession(activePaper.id);
  if (session.submittedAt !== null) {
    root.innerHTML = renderResults(activePaper, session);
    return;
  }

  root.innerHTML = renderExam(activePaper, session);
}
