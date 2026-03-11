// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.querySelector("#userForm");
//   if (!form) return;

//   // ======================
//   // INPUT SELECTORS
//   // ======================

//   const fullName = document.querySelector('input[placeholder*="full name"]');
//   const email = document.querySelector('input[type="email"]');
//   const phone = document.querySelector('input[type="tel"]');
//   const locationInput = document.querySelector(
//     'input[placeholder*="location"]',
//   );

//   const department = document.querySelector("#department-select");
//   const designation = document.querySelector("#designation-select");

//   const roleSelect = document.querySelector("#role-select");
//   const roleContainer = document.querySelector("#role-container");

//   const moduleSelect = document.querySelector("#assigned-module-select");
//   const selectedModulesContainer = document.querySelector(
//     "#assigned-modules-container",
//   );

//   const tagSelect = document.querySelector("#tags-select");
//   const selectedTagsContainer = document.querySelector("#selected-tags");

//   // ======================
//   // ERROR HANDLING
//   // ======================

//   function getErrorElement(field) {
//     const group = field?.closest(".form-group");
//     if (!group) return null;
//     return group.querySelector(".error-msg");
//   }

//   function showError(field, message) {
//     const error = getErrorElement(field);
//     if (!error) return;

//     error.textContent = message;
//     error.classList.remove("hidden");

//     field.classList.add("border-red-500");
//     field.classList.remove("border-green-500");
//   }

//   function hideError(field) {
//     const error = getErrorElement(field);
//     if (!error) return;

//     error.classList.add("hidden");

//     field.classList.remove("border-red-500");
//     field.classList.add("border-green-500");
//   }

//   function validateField(field, validator, message) {
//     if (!field) return true;

//     const value = field.value.trim();
//     const isValid = validator(value);

//     if (!isValid) {
//       showError(field, message);
//     } else {
//       hideError(field);
//     }

//     return isValid;
//   }

//   // ======================
//   // ROLE VALIDATION (CHIPS BASED)
//   // ======================

//   function validateRole() {
//     if (!roleContainer) return true;

//     const selectedRoles = roleContainer.querySelectorAll(
//       "input[name='roles[]']",
//     );

//     if (selectedRoles.length === 0) {
//       showError(roleSelect, "Must choose a role to proceed further");
//       return false;
//     } else {
//       hideError(roleSelect);
//       return true;
//     }
//   }

//   // ======================
//   // MODULE VALIDATION (CHIPS BASED)
//   // ======================

//   function validateModules() {
//     if (!moduleSelect || !selectedModulesContainer) return true;

//     const selectedModules = selectedModulesContainer.querySelectorAll(
//       "input[name='assigned_modules[]']",
//     );

//     if (selectedModules.length === 0) {
//       showError(
//         moduleSelect,
//         "Must choose at least one module to proceed further",
//       );
//       return false;
//     } else {
//       hideError(moduleSelect);
//       return true;
//     }
//   }

//   // ======================
//   // REAL-TIME VALIDATION
//   // ======================

//   fullName?.addEventListener("input", () =>
//     validateField(
//       fullName,
//       (val) => val.length >= 3,
//       "Name must contain at least 3 characters",
//     ),
//   );

//   email?.addEventListener("input", () =>
//     validateField(
//       email,
//       (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
//       "Enter a valid email address",
//     ),
//   );

//   phone?.addEventListener("input", () =>
//     validateField(
//       phone,
//       (val) => /^((\+92|0)[0-9]{10})$/.test(val),
//       "Enter a valid phone number",
//     ),
//   );

//   locationInput?.addEventListener("input", () =>
//     validateField(
//       locationInput,
//       (val) => val.length > 0,
//       "Must fill this field to proceed further",
//     ),
//   );

//   department?.addEventListener("change", () =>
//     validateField(department, (val) => val !== "", "Choose option to proceed"),
//   );

//   designation?.addEventListener("change", () =>
//     validateField(designation, (val) => val !== "", "Choose option to proceed"),
//   );

//   roleSelect?.addEventListener("change", validateRole);
//   moduleSelect?.addEventListener("change", validateModules);

//   // ======================
//   // FORM SUBMIT
//   // ======================

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     let isValid = true;

//     isValid =
//       validateField(
//         fullName,
//         (val) => val.length >= 3,
//         "Name must contain at least 3 characters",
//       ) && isValid;

//     isValid =
//       validateField(
//         email,
//         (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
//         "Enter a valid email address",
//       ) && isValid;

//     isValid =
//       validateField(
//         phone,
//         (val) => /^((\+92|0)[0-9]{10})$/.test(val),
//         "Enter a valid phone number",
//       ) && isValid;

//     isValid =
//       validateField(
//         locationInput,
//         (val) => val.length > 0,
//         "Must fill this field to proceed further",
//       ) && isValid;

//     isValid =
//       validateField(
//         department,
//         (val) => val !== "",
//         "Choose option to proceed",
//       ) && isValid;

//     isValid =
//       validateField(
//         designation,
//         (val) => val !== "",
//         "Choose option to proceed",
//       ) && isValid;

//     // =========================
//     // RESET TAGS
//     // =========================

//     // Clear tag chips
//     if (selectedTagsContainer) {
//       selectedTagsContainer.innerHTML = "";
//     }

//     // Reset select dropdown
//     if (tagSelect && tagSelect.options.length > 0) {
//       tagSelect.options[0].text = "Select tags";
//       tagSelect.selectedIndex = 0;
//     }

//     if (!validateRole()) isValid = false;
//     if (!validateModules()) isValid = false;

//     // if (isValid) {
//     //   alert("Form submitted successfully!");

//     //   // =========================
//     //   // RESET COMPLETE FORM
//     //   // =========================

//     //   form.reset();

//     //   // Remove chips
//     //   if (roleContainer) roleContainer.innerHTML = "";
//     //   if (selectedModulesContainer) selectedModulesContainer.innerHTML = "";

//     //   // Reset placeholder text manually
//     //   if (roleSelect && roleSelect.options.length > 0) {
//     //     roleSelect.options[0].text = "Select role";
//     //     roleSelect.selectedIndex = 0;
//     //   }

//     //   if (moduleSelect && moduleSelect.options.length > 0) {
//     //     moduleSelect.options[0].text = "Select module";
//     //     moduleSelect.selectedIndex = 0;
//     //   }

//     //   if (tagSelect && tagSelect.options.length > 0) {
//     //     tagSelect.options[0].text = "Select tags";
//     //     tagSelect.selectedIndex = 0;
//     //   }

//     //   // Remove borders
//     //   form.querySelectorAll("input, select").forEach((field) => {
//     //     field.classList.remove("border-green-500");
//     //     field.classList.remove("border-red-500");
//     //   });

//     //   // Hide errors
//     //   form.querySelectorAll(".error-msg").forEach((err) => {
//     //     err.classList.add("hidden");
//     //   });
//     // }

//     if (isValid) {
//       alert("Form submitted successfully!");

//       form.reset();

//       // Remove chips
//       if (roleContainer) roleContainer.innerHTML = "";
//       if (selectedModulesContainer) selectedModulesContainer.innerHTML = "";
//       if (selectedTagsContainer) selectedTagsContainer.innerHTML = "";

//       // Reset dropdowns
//       if (roleSelect && roleSelect.options.length > 0) {
//         roleSelect.options[0].text = "Select role";
//         roleSelect.selectedIndex = 0;
//       }

//       if (moduleSelect && moduleSelect.options.length > 0) {
//         moduleSelect.options[0].text = "Select module";
//         moduleSelect.selectedIndex = 0;
//       }

//       if (tagSelect && tagSelect.options.length > 0) {
//         tagSelect.options[0].text = "Select tag";
//         tagSelect.selectedIndex = 0;
//       }

//       // Remove borders
//       form.querySelectorAll("input, select").forEach((field) => {
//         field.classList.remove("border-green-500");
//         field.classList.remove("border-red-500");
//       });

//       // Hide errors
//       form.querySelectorAll(".error-msg").forEach((err) => {
//         err.classList.add("hidden");
//       });
//     } else {
//       alert("Please fill all required fields correctly!");
//     }
//   });
// });

// ======================
// INPUT SELECTORS
// ======================

const form = document.querySelector("#userForm");
if (!form) throw new Error("Form not found");

const fields = {
  fullName: document.querySelector('input[placeholder*="full name"]'),
  email: document.querySelector('input[type="email"]'),
  phone: document.querySelector('input[type="tel"]'),
  location: document.querySelector('input[placeholder*="location"]'),
  department: document.querySelector("#department-select"),
  designation: document.querySelector("#designation-select"),
};

const roleSelect = document.querySelector("#role-select");
const roleContainer = document.querySelector("#role-container");

const moduleSelect = document.querySelector("#assigned-module-select");
const selectedModulesContainer = document.querySelector(
  "#assigned-modules-container",
);

const tagSelect = document.querySelector("#tags-select");
const selectedTagsContainer = document.querySelector("#selected-tags");

// ======================
// ERROR HANDLING
// ======================

function getErrorElement(field) {
  const group = field?.closest(".form-group");
  return group?.querySelector(".error-msg") || null;
}

function showError(field, message) {
  const error = getErrorElement(field);
  if (!error) return;
  error.textContent = message;
  error.classList.remove("hidden");
  field.classList.add("border-red-500");
  field.classList.remove("border-green-500");
}

function hideError(field) {
  const error = getErrorElement(field);
  if (!error) return;
  error.classList.add("hidden");
  field.classList.remove("border-red-500");
  field.classList.add("border-green-500");
}

// ======================
// FIELD VALIDATION
// ======================

function validateField(field, validator, message, force = false) {
  if (!field) return true;
  const value = field.value.trim();
  const isValid = validator(value);

  if (isValid) {
    hideError(field);
  } else if (force || value !== "") {
    showError(field, message);
  }

  return isValid;
}

// ======================
// CHIPS VALIDATION
// ======================

function validateChips(container, select, name, message, force = false) {
  if (!container || !select) return true;

  // select all actual chips
  const selected = container.querySelectorAll(`input[name='${name}[]']`);
  const isValid = selected.length > 0;

  if (isValid) {
    hideError(select);
  } else if (force) {
    showError(select, message);
  }

  return isValid;
}

// real-time validation for chips using MutationObserver
function observeChips(container, select, name, message) {
  if (!container || !select) return;
  validateChips(container, select, name, message);

  const observer = new MutationObserver(() => {
    validateChips(container, select, name, message);
  });
  observer.observe(container, { childList: true });
}

// Initialize observers
observeChips(
  roleContainer,
  roleSelect,
  "roles",
  "Must choose at least one role to proceed",
);
observeChips(
  selectedModulesContainer,
  moduleSelect,
  "assigned_modules",
  "Must choose at least one module to proceed",
);

// ======================
// REAL-TIME INPUT VALIDATION
// ======================

fields.fullName?.addEventListener("input", () =>
  validateField(
    fields.fullName,
    (val) => val.length >= 3,
    "Name must contain at least 3 characters",
  ),
);

fields.email?.addEventListener("input", () =>
  validateField(
    fields.email,
    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    "Enter a valid email address",
  ),
);

fields.phone?.addEventListener("input", () =>
  validateField(
    fields.phone,
    (val) => /^((\+92|0)[0-9]{10})$/.test(val),
    "Enter a valid phone number",
  ),
);

fields.location?.addEventListener("input", () =>
  validateField(
    fields.location,
    (val) => val.length > 0,
    "Must fill this field to proceed further",
  ),
);

fields.department?.addEventListener("change", () =>
  validateField(
    fields.department,
    (val) => val !== "",
    "Choose option to proceed",
  ),
);

fields.designation?.addEventListener("change", () =>
  validateField(
    fields.designation,
    (val) => val !== "",
    "Choose option to proceed",
  ),
);

roleSelect?.addEventListener("change", () =>
  validateChips(
    roleContainer,
    roleSelect,
    "roles",
    "Must choose at least one role to proceed",
  ),
);
moduleSelect?.addEventListener("change", () =>
  validateChips(
    selectedModulesContainer,
    moduleSelect,
    "assigned_modules",
    "Must choose at least one module to proceed",
  ),
);

// ======================
// FORM SUBMIT
// ======================

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Force validation for all fields
  const validFullName = validateField(
    fields.fullName,
    (val) => val.length >= 3,
    "Name must contain at least 3 characters",
    true,
  );
  const validEmail = validateField(
    fields.email,
    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    "Enter a valid email address",
    true,
  );
  const validPhone = validateField(
    fields.phone,
    (val) => /^((\+92|0)[0-9]{10})$/.test(val),
    "Enter a valid phone number",
    true,
  );
  const validLocation = validateField(
    fields.location,
    (val) => val.length > 0,
    "Must fill this field to proceed further",
    true,
  );
  const validDepartment = validateField(
    fields.department,
    (val) => val !== "",
    "Choose option to proceed",
    true,
  );
  const validDesignation = validateField(
    fields.designation,
    (val) => val !== "",
    "Choose option to proceed",
    true,
  );
  const validRole = validateChips(
    roleContainer,
    roleSelect,
    "roles",
    "Must choose at least one role to proceed",
    true,
  );
  const validModules = validateChips(
    selectedModulesContainer,
    moduleSelect,
    "assigned_modules",
    "Must choose at least one module to proceed",
    true,
  );

  const isValid =
    validFullName &&
    validEmail &&
    validPhone &&
    validLocation &&
    validDepartment &&
    validDesignation &&
    validRole &&
    validModules;

  if (!isValid) {
    alert("Please fill all required fields correctly!");
    // Scroll to first error
    const firstError = form.querySelector(".error-msg:not(.hidden)");
    if (firstError)
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // ===========================
  // LOG FORM VALUES TO CONSOLE
  // ===========================
  const roles = Array.from(
    roleContainer.querySelectorAll("input[name='roles[]']"),
  ).map((input) => input.value);
  const modules = Array.from(
    selectedModulesContainer.querySelectorAll(
      "input[name='assigned_modules[]']",
    ),
  ).map((input) => input.value);
  const tags = Array.from(
    selectedTagsContainer.querySelectorAll("input[name='tags[]']"),
  ).map((input) => input.value);

  console.log({
    fullName: fields.fullName.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    location: fields.location.value.trim(),
    department: fields.department.value,
    designation: fields.designation.value,
    roles: roles,
    assignedModules: modules,
    tags: tags,
  });

  alert("Form submitted successfully!");
  form.reset();

  // Clear chips
  [roleContainer, selectedModulesContainer, selectedTagsContainer].forEach(
    (container) => {
      if (container) container.innerHTML = "";
    },
  );

  // Reset dropdowns
  [roleSelect, moduleSelect, tagSelect].forEach((select, i) => {
    if (select && select.options.length > 0) {
      const placeholder = [
        "Select role from here",
        "Select module to assign",
        "Select tags for a user",
      ][i];
      select.options[0].text = placeholder;
      select.selectedIndex = 0;
    }
  });

  // Remove borders & hide errors
  form.querySelectorAll("input, select").forEach((field) => {
    field.classList.remove("border-red-500", "border-green-500");
  });
  form
    .querySelectorAll(".error-msg")
    .forEach((err) => err.classList.add("hidden"));
});
