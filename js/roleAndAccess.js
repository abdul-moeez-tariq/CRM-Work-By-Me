document.addEventListener("DOMContentLoaded", function () {
  function initMultiSelect(selectId, containerId, inputName, placeholderText) {
    const select = document.getElementById(selectId);
    const container = document.getElementById(containerId);

    if (!select || !container) return;

    const selectedValues = new Set();

    function updatePlaceholder() {
      const firstOption = select.options[0];
      if (!firstOption) return;

      firstOption.text =
        selectedValues.size === 0
          ? placeholderText
          : `${selectedValues.size} selected`;
    }

    select.addEventListener("change", function () {
      const value = this.value;
      if (!value) return;

      if (selectedValues.has(value)) {
        this.selectedIndex = 0;
        return;
      }

      selectedValues.add(value);
      const text = this.options[this.selectedIndex].textContent;

      const chip = document.createElement("div");
      chip.className =
        "px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium flex items-center gap-2";

      chip.innerHTML = `
        <span>${text}</span>
        <button type="button" class="font-bold text-lg leading-none hover:text-red-600">×</button>
        <input type="hidden" name="${inputName}[]" value="${value}">
      `;

      chip.querySelector("button").addEventListener("click", function () {
        selectedValues.delete(value);
        chip.remove();
        updatePlaceholder();
      });

      container.appendChild(chip);
      updatePlaceholder();
      this.selectedIndex = 0;
    });

    updatePlaceholder();
  }

  // ROLE
  initMultiSelect("role-select", "role-container", "roles", "Select role");

  // ASSIGNED MODULE
  initMultiSelect(
    "assigned-module-select",
    "assigned-modules-container",
    "assigned_modules",
    "Select module",
  );

  // TAGS
  initMultiSelect("tags-select", "selected-tags", "tags", "Select tags");
});
