// // ==========================
// // Form Validation
// // ==========================
// const roleName = document.getElementById("roleName");
// const createdBy = document.getElementById("createdBy");

// function validateForm() {
//   let valid = true;

//   if (!roleName.value.trim()) {
//     document.getElementById("roleNameError").classList.remove("hidden");
//     valid = false;
//   } else {
//     document.getElementById("roleNameError").classList.add("hidden");
//   }

//   if (!createdBy.value.trim()) {
//     document.getElementById("createdByError").classList.remove("hidden");
//     valid = false;
//   } else {
//     document.getElementById("createdByError").classList.add("hidden");
//   }

//   return valid;
// }

// // ==========================
// // Module Permissions Buttons
// // ==========================
// const moduleTable = document.getElementById("moduleTable");

// document.getElementById("enableAllBtn").addEventListener("click", () => {
//   moduleTable
//     .querySelectorAll("input[type=checkbox]")
//     .forEach((cb) => (cb.checked = true));
// });

// document.getElementById("disableAllBtn").addEventListener("click", () => {
//   moduleTable
//     .querySelectorAll("input[type=checkbox]")
//     .forEach((cb) => (cb.checked = false));
// });

// document.getElementById("resetBtn").addEventListener("click", () => {
//   // Reset to default as per initial HTML
//   const defaults = [true, true, false, false, false, true, true, true, true];
//   moduleTable.querySelectorAll("input[type=checkbox]").forEach((cb, index) => {
//     cb.checked = defaults[index] ?? false;
//   });
// });

// // ==========================
// // Log Form Values to Console
// // ==========================
// document.addEventListener("DOMContentLoaded", () => {
//   const formInputs = [
//     roleName,
//     createdBy,
//     document.getElementById("roleCode"),
//     document.getElementById("description"),
//     document.getElementById("createdOn"),
//     document.getElementById("roleStatus"),
//   ];
//   formInputs.forEach((input) =>
//     input.addEventListener("change", () => {
//       console.log("Form Values:", {
//         roleName: roleName.value,
//         createdBy: createdBy.value,
//         roleCode: document.getElementById("roleCode").value,
//         description: document.getElementById("description").value,
//         createdOn: document.getElementById("createdOn").value,
//         roleStatus: document.getElementById("roleStatus").checked,
//       });
//     }),
//   );
// });

// // ==========================
// // Form Validation
// // ==========================
// const roleName = document.getElementById("roleName");
// const createdBy = document.getElementById("createdBy");

// function validateForm() {
//   let valid = true;

//   if (roleName && !roleName.value.trim()) {
//     document.getElementById("roleNameError")?.classList.remove("hidden");
//     valid = false;
//   } else if (roleName) {
//     document.getElementById("roleNameError")?.classList.add("hidden");
//   }

//   if (createdBy && !createdBy.value.trim()) {
//     document.getElementById("createdByError")?.classList.remove("hidden");
//     valid = false;
//   } else if (createdBy) {
//     document.getElementById("createdByError")?.classList.add("hidden");
//   }

//   return valid;
// }

// // ==========================
// // Form Validation (Realtime + Submit)
// /// ==========================

// const form = document.getElementById("userForm");
// if (!form) console.warn("Form with id 'userForm' not found");

// // All required fields
// const fields = {
//   roleName: document.getElementById("roleName"),
//   createdBy: document.getElementById("createdBy"),
//   // Add other fields here if needed, e.g.
//   // roleCode: document.getElementById("roleCode"),
//   // description: document.getElementById("description"),
//   // etc.
// };

// // Realtime validation
// Object.keys(fields).forEach((key) => {
//   const field = fields[key];
//   if (!field) return;

//   field.addEventListener("input", () => validateSingleField(field, key));
//   field.addEventListener("change", () => validateSingleField(field, key));
// });

// // Single field validation function
// function validateSingleField(field, key) {
//   const errorEl = document.getElementById(`${key}Error`);
//   if (!errorEl) return;

//   const value = field.value.trim();

//   let isValid = true;
//   let message = "";

//   if (key === "roleName") {
//     isValid = value.length >= 1; // or >= 3 if you want min length
//     message = "Role name is required";
//   } else if (key === "createdBy") {
//     isValid = value.length >= 1;
//     message = "Created by is required";
//   }
//   // Add more conditions for other fields here

//   if (isValid) {
//     errorEl.classList.add("hidden");
//     field.classList.remove("border-red-500");
//     field.classList.add("border-green-500");
//   } else {
//     errorEl.textContent = message;
//     errorEl.classList.remove("hidden");
//     field.classList.add("border-red-500");
//     field.classList.remove("border-green-500");
//   }

//   return isValid;
// }

// // Full form validation on submit
// function validateForm() {
//   let isValid = true;

//   Object.keys(fields).forEach((key) => {
//     const field = fields[key];
//     if (field && !validateSingleField(field, key)) {
//       isValid = false;
//     }
//   });

//   return isValid;
// }

// // Form submit handler
// if (form) {
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const formIsValid = validateForm();

//     if (!formIsValid) {
//       alert("Please fill all required fields correctly!");
//       // Optional: scroll to first error
//       const firstError = form.querySelector(".error-msg:not(.hidden)");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//       return;
//     }

//     alert("Form submitted successfully!");
//     // Here you can add AJAX submit or form.submit() if needed
//   });
// }

// // ==========================
// // Module Permissions Buttons
// // ==========================
// const moduleTable = document.getElementById("moduleTable");

// document.getElementById("enableAllBtn")?.addEventListener("click", () => {
//   moduleTable
//     ?.querySelectorAll("input[type=checkbox]")
//     .forEach((cb) => (cb.checked = true));
// });

// document.getElementById("disableAllBtn")?.addEventListener("click", () => {
//   moduleTable
//     ?.querySelectorAll("input[type=checkbox]")
//     .forEach((cb) => (cb.checked = false));
// });

// document.getElementById("resetBtn")?.addEventListener("click", () => {
//   // Reset to default (tumhare default values ke hisaab se adjust kar lena)
//   const defaults = [true, true, false, false, false, true, true, true, true];
//   moduleTable?.querySelectorAll("input[type=checkbox]").forEach((cb, index) => {
//     cb.checked = defaults[index] ?? false;
//   });
// });

// // ==========================
// // Log Form Values to Console (safe version)
// // ==========================
// document.addEventListener("DOMContentLoaded", () => {
//   const formInputs = [
//     roleName,
//     createdBy,
//     document.getElementById("roleCode"),
//     document.getElementById("description"),
//     document.getElementById("createdOn"),
//     document.getElementById("roleStatus"),
//   ];

//   // Sirf woh inputs jo exist karte hain, un par event lagaao
//   formInputs
//     .filter((input) => input !== null)
//     .forEach((input) => {
//       input.addEventListener("change", () => {
//         console.log("Form Values:", {
//           roleName: roleName?.value || "",
//           createdBy: createdBy?.value || "",
//           roleCode: document.getElementById("roleCode")?.value || "",
//           description: document.getElementById("description")?.value || "",
//           createdOn: document.getElementById("createdOn")?.value || "",
//           roleStatus: document.getElementById("roleStatus")?.checked || false,
//         });
//       });
//     });
// });

// ==========================
// Form Validation (Realtime + Submit)
// ==========================

const form = document.getElementById("userForm");
if (!form) console.warn("Form with id 'userForm' not found");

// Required fields for validation
const fields = {
  roleName: document.getElementById("roleName"),
  createdBy: document.getElementById("createdBy"),
};

// Realtime validation on input/change
Object.keys(fields).forEach((key) => {
  const field = fields[key];
  if (!field) return;

  field.addEventListener("input", () => validateSingleField(field, key));
  field.addEventListener("change", () => validateSingleField(field, key));
});

// Single field validation
function validateSingleField(field, key) {
  const errorEl = document.getElementById(`${key}Error`);
  if (!errorEl) return;

  const value = field.value.trim();

  let isValid = true;
  let message = "";

  if (key === "roleName") {
    isValid = value.length >= 1; // agar min 3 chahiye to >= 3 kar dena
    message = "Must fill this field to proceed further";
  } else if (key === "createdBy") {
    isValid = value.length >= 1;
    message = "Must fill this field to proceed further";
  }

  if (isValid) {
    errorEl.classList.add("hidden");
    field.classList.remove("border-red-500");
    field.classList.add("border-green-500");
  } else {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
    field.classList.add("border-red-500");
    field.classList.remove("border-green-500");
  }

  return isValid;
}

// Full form validation (submit ke time saare fields check)
function validateForm() {
  let isValid = true;

  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    if (field && !validateSingleField(field, key)) {
      isValid = false;
    }
  });

  return isValid;
}

// ==========================
// Module Permissions Buttons (Enable/Disable/Reset)
// ==========================
const moduleTable = document.getElementById("moduleTable");

if (moduleTable) {
  // Enable All
  document.getElementById("enableAllBtn")?.addEventListener("click", () => {
    moduleTable.querySelectorAll("input[type=checkbox]").forEach((cb) => {
      cb.checked = true;
    });
  });

  // Disable All
  document.getElementById("disableAllBtn")?.addEventListener("click", () => {
    moduleTable.querySelectorAll("input[type=checkbox]").forEach((cb) => {
      cb.checked = false;
    });
  });

  // Reset to default (har row ke liye default state define kar sakte ho)
  document.getElementById("resetBtn")?.addEventListener("click", () => {
    // Default state har row ke hisaab se (Projects aur Tasks ke liye example)
    // Agar naye rows add kiye hain to yahan default array extend kar dena
    const defaultStates = [
      // Projects row defaults (view, add, edit, delete, export)
      [true, true, false, false, false],
      // Tasks row defaults
      [true, true, true, false, false],
      // Agar aur rows hain to yahan add kar dena
      // [true, false, true, false, true], etc.
    ];

    const checkboxes = moduleTable.querySelectorAll("input[type=checkbox]");
    let index = 0;

    moduleTable.querySelectorAll("tr").forEach((row, rowIndex) => {
      const rowCheckboxes = row.querySelectorAll("input[type=checkbox]");
      const rowDefaults = defaultStates[rowIndex] || [
        true,
        true,
        false,
        false,
        false,
      ]; // fallback

      rowCheckboxes.forEach((cb, cbIndex) => {
        cb.checked = rowDefaults[cbIndex] ?? false;
      });
    });
  });
}

// ==========================
// Form Submit - Collect ALL data (form + module permissions)
// ==========================
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. Validate form fields
    const formIsValid = validateForm();

    if (!formIsValid) {
      alert("Please fill all required fields correctly!");
      const firstError = form.querySelector(".error-msg:not(.hidden)");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // 2. Collect form data
    const formData = {
      roleName: document.getElementById("roleName")?.value.trim() || "",
      createdBy: document.getElementById("createdBy")?.value.trim() || "",
      roleCode: document.getElementById("roleCode")?.value.trim() || "",
      description: document.getElementById("description")?.value.trim() || "",
      createdOn: document.getElementById("createdOn")?.value || "",
      roleStatus: document.getElementById("roleStatus")?.checked || false,
    };

    // 3. Collect module permissions from ALL rows dynamically
    const modulePermissions = {};

    if (moduleTable) {
      const rows = moduleTable.querySelectorAll("tr");
      rows.forEach((row) => {
        // Module name first td se lo (textContent se)
        const moduleNameCell = row.querySelector(
          "td:first-child .flex-col span:first-child",
        );
        let moduleName = moduleNameCell?.textContent.trim() || "Unknown Module";

        // Checkboxes lo
        const checkboxes = row.querySelectorAll("input[type=checkbox]");
        if (checkboxes.length === 5) {
          const perms = {
            view: checkboxes[0]?.checked || false,
            add: checkboxes[1]?.checked || false,
            edit: checkboxes[2]?.checked || false,
            delete: checkboxes[3]?.checked || false,
            export: checkboxes[4]?.checked || false,
          };

          modulePermissions[moduleName] = perms;
        }
      });
    }

    // 4. Combine everything
    const fullData = {
      roleInfo: formData,
      modulePermissions: modulePermissions,
    };

    // 5. Show success and log data
    console.log("Form Submitted Successfully!", fullData);
    alert("Form submitted successfully! Check console for full data.");

    // Optional: form reset karna ho to yahan kar sakte ho
    form.reset();
  });
}
