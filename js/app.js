document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Theme toggle
  const themeButton = document.getElementById("modeToggle");
  const savedTheme = localStorage.getItem("osis-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  function updateTheme() {
    const isDark = body.classList.contains("dark");
    if (themeButton) {
      themeButton.textContent = isDark ? "☾" : "☼";
    }
    localStorage.setItem("osis-theme", isDark ? "dark" : "light");
  }

  themeButton?.addEventListener("click", () => {
    body.classList.toggle("dark");
    updateTheme();
  });

  updateTheme();

  // Reveal hidden content in OS cards
  document.querySelectorAll(".reveal-button").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);
      if (!target) return;

      const isOpen = target.classList.toggle("show");
      button.textContent = isOpen ? "close −" : "peek inside +";
    });
  });

  // Interactive tap effect
  const tapButton = document.getElementById("tapButton");
  const tapMessage = document.getElementById("tapMessage");
  const tapMessages = [
    "Input received. ✦",
    "The OS is thinking…",
    "Pixels go brrrr ✓",
    "Your phone just did a tiny dance.",
    "System is awake and ready."
  ];

  let tapCount = 0;

  tapButton?.addEventListener("click", () => {
    const message = tapMessages[tapCount % tapMessages.length];
    tapMessage.textContent = message;
    tapCount++;

    tapButton.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.95)" },
        { transform: "scale(1.05)" },
        { transform: "scale(1)" }
      ],
      {
        duration: 260,
        easing: "ease-out"
      }
    );
  });

  // Fact tabs
  const factText = document.getElementById("factText");
  const factTabs = document.querySelectorAll(".fact-tab");
  const factData = {
    cpu: "The CPU is the device’s tiny decision-maker. Fast little brain, big main-character energy.",
    ram: "RAM is short-term memory: it keeps the apps you are using ready to jump back in.",
    api: "An API is a polite little bridge that lets apps ask the operating system for powers."
  };

  factTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      factTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      const key = tab.dataset.fact;
      factText.textContent = factData[key] || "More facts loading...";
    });
  });

  // Nav active highlight
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const sections = [...document.querySelectorAll("section[id]")];

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive = href === `#${id}`;
      link.classList.toggle("active", isActive);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target.id) {
        setActiveNav(visible.target.id);
      }
    },
    {
      threshold: [0.35, 0.6, 0.8],
      rootMargin: "-10% 0px -30% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));

  // Optional: smooth navbar active state if clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href")?.replace("#", "");
      if (targetId) setActiveNav(targetId);
    });
  });

  // Auto-rotate facts every few seconds
  let factIndex = 0;
  const factOrder = ["cpu", "ram", "api"];

  setInterval(() => {
    const nextTab = document.querySelector(`.fact-tab[data-fact="${factOrder[factIndex]}"]`);
    if (nextTab) {
      nextTab.click();
      factIndex = (factIndex + 1) % factOrder.length;
    }
  }, 3000);
});
