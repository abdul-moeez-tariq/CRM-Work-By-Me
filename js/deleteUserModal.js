// Enable Delete button only when checkbox is checked (demo behavior)
const checkbox = document.querySelector('input[type="checkbox"]');
const deleteBtn = document.querySelector("button.bg-red-600");

if (checkbox && deleteBtn) {
  checkbox.addEventListener("change", () => {
    deleteBtn.disabled = !checkbox.checked;
  });
}
