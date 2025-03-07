const themeToggle = document.getElementById(
  "theme-toggle",
) as HTMLButtonElement;
const themeIcon = document.getElementById("theme-icon") as HTMLElement;

function setTheme(theme: "light" | "dark" | "system"): void {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    themeIcon.classList.replace("ri-sun-line", "ri-moon-clear-line");
    themeIcon.classList.replace("ri-settings-2-line", "ri-moon-clear-line");
  } else if (theme === "light") {
    document.documentElement.classList.remove("dark");
    themeIcon.classList.replace("ri-moon-clear-line", "ri-sun-line");
    themeIcon.classList.replace("ri-settings-2-line", "ri-sun-line");
  } else if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    document.documentElement.classList.toggle("dark", prefersDark);
    themeIcon.classList.remove("ri-sun-line", "ri-moon-clear-line");
    themeIcon.classList.add("ri-settings-2-line");
  }
}

// Get the stored theme or default to 'system'
const storedTheme: "light" | "dark" | "system" =
  (localStorage.getItem("theme") as "light" | "dark" | "system") || "system";
setTheme(storedTheme);

themeToggle.addEventListener("click", () => {
  let currentTheme: "light" | "dark" | "system" =
    (localStorage.getItem("theme") as "light" | "dark" | "system") || "system";
  if (currentTheme === "system") {
    localStorage.setItem("theme", "light");
    setTheme("light");
  } else if (currentTheme === "light") {
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  } else {
    localStorage.setItem("theme", "system");
    setTheme("system");
  }
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (localStorage.getItem("theme") === "system") {
      setTheme("system");
    }
  });
