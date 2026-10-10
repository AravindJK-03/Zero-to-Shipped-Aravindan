// ── Mock Data ────────────────────────────────────────────
const MOCK_RESULTS = {
  score: 72,
  presentSkills: [
    "JavaScript",
    "React",
    "HTML & CSS",
    "Git & GitHub",
    "REST APIs",
    "Node.js",
    "TypeScript",
    "Responsive Design",
  ],
  missingSkills: [
    "Docker",
    "CI/CD Pipelines",
    "System Design",
    "AWS / Cloud Services",
    "GraphQL",
    "Testing (Jest / Cypress)",
  ],
};

// ── DOM References ───────────────────────────────────────
const uploadZone    = document.getElementById("uploadZone");
const fileInput     = document.getElementById("fileInput");
const fileInfo      = document.getElementById("fileInfo");
const fileName      = document.getElementById("fileName");
const removeFileBtn = document.getElementById("removeFile");
const analyzeBtn    = document.getElementById("analyzeBtn");
const loaderOverlay = document.getElementById("loaderOverlay");
const resultsEl     = document.getElementById("results");
const scoreCircle   = document.getElementById("scoreCircle");
const scoreValue    = document.getElementById("scoreValue");
const scoreVerdict  = document.getElementById("scoreVerdict");
const presentList   = document.getElementById("presentSkills");
const missingList   = document.getElementById("missingSkills");
const resetBtn      = document.getElementById("resetBtn");
const uploadSection = document.getElementById("upload");

let selectedFile = null;

// ── Inject SVG gradient (used by the score ring stroke) ──
(function injectScoreGradient() {
  const svg = document.querySelector(".score-ring svg");
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6c5ce7"/>
      <stop offset="100%" stop-color="#00cec9"/>
    </linearGradient>`;
  svg.prepend(defs);
})();

// ── Upload Zone Events ───────────────────────────────────
uploadZone.addEventListener("click", () => fileInput.click());
uploadZone.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fileInput.click();
  }
});

// Drag & drop
uploadZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadZone.classList.add("dragover");
});

uploadZone.addEventListener("dragleave", () => {
  uploadZone.classList.remove("dragover");
});

uploadZone.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadZone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file && file.type === "application/pdf") {
    handleFile(file);
  }
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length) handleFile(fileInput.files[0]);
});

// ── File Handling ────────────────────────────────────────
function handleFile(file) {
  selectedFile = file;
  fileName.textContent = file.name;
  fileInfo.classList.remove("hidden");
  analyzeBtn.classList.remove("hidden");
  uploadZone.classList.add("hidden");
}

removeFileBtn.addEventListener("click", resetUpload);

function resetUpload() {
  selectedFile = null;
  fileInput.value = "";
  fileInfo.classList.add("hidden");
  analyzeBtn.classList.add("hidden");
  uploadZone.classList.remove("hidden");
}

// ── Analyze ──────────────────────────────────────────────
analyzeBtn.addEventListener("click", () => {
  if (!selectedFile) return;

  // Show loader
  loaderOverlay.classList.remove("hidden");

  // Simulate processing delay
  setTimeout(() => {
    loaderOverlay.classList.add("hidden");
    uploadSection.classList.add("hidden");
    renderResults(MOCK_RESULTS);
  }, 2000);
});

// ── Render Results ───────────────────────────────────────
function renderResults({ score, presentSkills, missingSkills }) {
  // Show section
  resultsEl.classList.remove("hidden");
  resultsEl.scrollIntoView({ behavior: "smooth" });

  // Animate score ring
  const circumference = 2 * Math.PI * 62; // r = 62
  const offset = circumference - (score / 100) * circumference;
  scoreCircle.style.strokeDashoffset = offset;

  // Animate score counter
  animateCounter(scoreValue, 0, score, 1200);

  // Verdict
  if (score >= 80) {
    scoreVerdict.textContent = "🎉 Excellent Match!";
    scoreVerdict.style.color = "#00cec9";
  } else if (score >= 60) {
    scoreVerdict.textContent = "👍 Good Match — Room to Improve";
    scoreVerdict.style.color = "#feca57";
  } else {
    scoreVerdict.textContent = "⚠️ Needs Improvement";
    scoreVerdict.style.color = "#ff6b6b";
  }

  // Populate skills lists
  presentList.innerHTML = "";
  missingList.innerHTML = "";

  presentSkills.forEach((skill, i) => {
    const li = document.createElement("li");
    li.style.animationDelay = `${i * 0.06}s`;
    li.innerHTML = `<span class="skill-tag skill-tag--present">✓</span> ${skill}`;
    presentList.appendChild(li);
  });

  missingSkills.forEach((skill, i) => {
    const li = document.createElement("li");
    li.style.animationDelay = `${i * 0.06}s`;
    li.innerHTML = `<span class="skill-tag skill-tag--missing">✗</span> ${skill}`;
    missingList.appendChild(li);
  });

  // Update ARIA
  document.getElementById("scoreRing").setAttribute("aria-valuenow", score);
}

// ── Animate Counter ──────────────────────────────────────
function animateCounter(el, from, to, duration) {
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    el.textContent = Math.round(from + (to - from) * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ── Reset ────────────────────────────────────────────────
resetBtn.addEventListener("click", () => {
  resultsEl.classList.add("hidden");
  uploadSection.classList.remove("hidden");
  resetUpload();

  // Reset ring
  scoreCircle.style.strokeDashoffset = 2 * Math.PI * 62;
  scoreValue.textContent = "0";

  uploadSection.scrollIntoView({ behavior: "smooth" });
});

