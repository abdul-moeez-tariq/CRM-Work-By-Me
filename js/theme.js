// export function initTheme() {
//   const toggleBtn = document.getElementById("themeToggle");
//   const dropdownThemeBtn = document.getElementById("dropdownThemeBtn");

//   function toggleTheme() {
//     const html = document.documentElement;
//     html.classList.toggle("dark");

//     localStorage.setItem(
//       "theme",
//       html.classList.contains("dark") ? "dark" : "light",
//     );
//   }

//   if (toggleBtn) {
//     toggleBtn.addEventListener("click", toggleTheme);
//   }

//   if (dropdownThemeBtn) {
//     dropdownThemeBtn.addEventListener("click", toggleTheme);
//   }
// }

// theme.js – replace completely
export function initTheme() {
  const toggleBtn = document.getElementById("themeToggle");
  const dropdownBtn = document.getElementById("dropdownThemeBtn");

  // if (!toggleBtn) {
  //   console.error("themeToggle button DOM mein nahi mila!");
  // } else {
  //   console.log("themeToggle button mil gaya ✓");
  // }

  if (!dropdownBtn) {
    console.log(
      "dropdownThemeBtn abhi nahi mila (normal hai agar dropdown band hai)",
    );
  }

  // Initial theme set (flash prevention ke liye bhi)
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.classList.toggle("dark", saved === "dark");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  }

  function toggleTheme() {
    const html = document.documentElement;
    const willBeDark = !html.classList.contains("dark");

    html.classList.toggle("dark");
    localStorage.setItem("theme", willBeDark ? "dark" : "light");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      toggleTheme();
    });
  }

  if (dropdownBtn) {
    dropdownBtn.addEventListener("click", () => {
      console.log("Dropdown theme button click hua!");
      toggleTheme();
    });
  }
}
