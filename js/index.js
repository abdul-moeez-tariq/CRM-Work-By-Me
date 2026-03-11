$("#projectForm").validate({
  rules: {
    projectTitle: {
      required: true,
      minlength: 3,
    },
    projectCode: {
      required: true,
      minlength: 2,
    },
  },

  messages: {
    projectTitle: {
      required: "Project Title is required",
      minlength: "Minimum 3 characters required",
    },
    projectCode: {
      required: "Project Code is required",
      minlength: "Minimum 2 characters required",
    },
  },

  // highlight: function (element) {
  //   $(element).css("border", "2px solid red");
  // },

  unhighlight: function (element) {
    $(element).css("border", "2px solid green");
  },

  errorPlacement: function (error, element) {
    if (element.attr("name") === "projectTitle") {
      $("#projectTitleError").html(error);
    } else if (element.attr("name") === "projectCode") {
      $("#projectCodeError").html(error);
    }
  },

  submitHandler: function (form) {
    alert("Project Form Submitted ✅");
    form.submit();
  },
});

// ────────────────────────────────────────────────
// STATE
// ────────────────────────────────────────────────
const selectedRoles = [];
const selectedModules = [];

// ────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────
function createChip(container, text, value, bgClass, removeClass) {
  const $chip = $(`
            <div class="${bgClass} flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mr-2 mb-2">
                <span>${text}</span>
                <button type="button" 
                        class="${removeClass} hover:text-red-500 focus:outline-none transition-colors"
                        data-value="${value}"
                        aria-label="Remove ${text}">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.49502 1.49502C8.83682 1.15322 8.83682 0.598145 8.49502 0.256348C8.15322 -0.0854492 7.59815 -0.0854492 7.25635 0.256348L4.37705 3.13838L1.49502 0.259082C1.15322 -0.0827149 0.598145 -0.0827149 0.256348 0.259082C-0.0854492 0.600879 -0.0854492 1.15596 0.256348 1.49775L3.13838 4.37705L0.259082 7.25908C-0.0827148 7.60088 -0.0827148 8.15596 0.259082 8.49776C0.600879 8.83955 1.15596 8.83955 1.49775 8.49776L4.37705 5.61572L7.25908 8.49502C7.60088 8.83682 8.15596 8.83682 8.49776 8.49502C8.83955 8.15322 8.83955 7.59815 8.49776 7.25635L5.61572 4.37705L8.49502 1.49502Z" fill="currentColor"/>
                </svg>
                </button>
            </div>
        `);

  $(container).append($chip);
}

function showChipError(containerId, message) {
  $(`#${containerId}`).text(message);
}

function clearChipError(containerId) {
  $(`#${containerId}`).text("");
}

// ────────────────────────────────────────────────
// ROLE CHIP LOGIC
// ────────────────────────────────────────────────
$("#role").on("change", function () {
  const value = this.value.trim();
  if (!value) return;

  const text = $("#role option:selected").text().trim();

  if (selectedRoles.includes(value)) {
    this.selectedIndex = 0;
    return;
  }

  selectedRoles.push(value);
  createChip(
    "#role-container",
    text,
    value,
    "bg-indigo-100 text-indigo-700",
    "remove-role text-indigo-600",
  );

  clearChipError("roleError");
  this.selectedIndex = 0;
});

$(document).on("click", ".remove-role", function () {
  const value = $(this).data("value");
  const index = selectedRoles.indexOf(value);
  if (index !== -1) selectedRoles.splice(index, 1);

  $(this).closest("div").remove();

  if (selectedRoles.length === 0) {
    showChipError("roleError", "Must choose selection to proceed further");
  } else {
    clearChipError("roleError");
  }
});

// ────────────────────────────────────────────────
// MODULE CHIP LOGIC
// ────────────────────────────────────────────────
$("#assignedModule").on("change", function () {
  const value = this.value.trim();
  if (!value) return;

  const text = $("#assignedModule option:selected").text().trim();

  if (selectedModules.includes(value)) {
    this.selectedIndex = 0;
    return;
  }

  selectedModules.push(value);
  createChip(
    "#assigned-modules-container",
    text,
    value,
    "bg-blue-100 text-blue-700",
    "remove-module text-blue-600",
  );

  clearChipError("assignedModuleError");
  this.selectedIndex = 0;
});

$(document).on("click", ".remove-module", function () {
  const value = $(this).data("value");
  const index = selectedModules.indexOf(value);
  if (index !== -1) selectedModules.splice(index, 1);

  $(this).closest("div").remove();

  if (selectedModules.length === 0) {
    showChipError(
      "assignedModuleError",
      "Must choose selection to proceed further",
    );
  } else {
    clearChipError("assignedModuleError");
  }
});

// ======================================================
// TAGS MULTI SELECT  (naya code — bilkul same style mein)
// ======================================================

let selectedTags = []; // naya global array

$("#tags").on("change", function () {
  const value = $(this).val();
  if (!value) return;

  const text = $("#tags option:selected").text().trim();

  if (selectedTags.includes(value)) {
    $(this).prop("selectedIndex", 0);
    return;
  }

  selectedTags.push(value);

  // same createChip function use kar rahe hain (jo pehle se hai)
  createChip(
    "#selected-tags",
    text,
    value,
    "bg-blue-100 text-blue-700",
    "remove-module text-blue-600",
  );

  $(this).prop("selectedIndex", 0);
});

// Remove tag chip
$(document).on("click", ".remove-tag", function () {
  const value = $(this).data("value");
  selectedTags = selectedTags.filter((t) => t !== value);
  $(this).parent().remove();
});

// ────────────────────────────────────────────────
// FORM VALIDATION
// ────────────────────────────────────────────────
// $("#userForm").validate({
//   ignore: [],

//   rules: {
//     fullName: { required: true, minlength: 3 },
//     email: { required: true, email: true },
//     phone: { required: true, digits: true, minlength: 10 },
//     location: { required: true },
//     department: { required: true },
//     designation: { required: true },
//   },

//   messages: {
//     fullName: {
//       required: "Name must contain at least 3 characters",
//       minlength: "Minimum 3 characters required",
//     },
//     email: {
//       required: "Enter a valid email address",
//       email: "Enter a valid email address",
//     },
//     phone: {
//       required: "Enter valid phone number",
//       digits: "Please enter only digits",
//       minlength: "Enter valid phone number",
//     },
//     location: { required: "Must fill this field to proceed further" },
//     department: { required: "Choose option to proceed" },
//     designation: { required: "Choose option to proceed" },
//   },

//   // errorElement: "div",
//   // errorClass: "text-red-600 text-sm mt-1",

//   errorPlacement: function (error, element) {
//     const name = element.attr("name");
//     $("#" + name + "Error").html(error);
//   },

//   success: function (label, element) {
//     const name = $(element).attr("name");
//     $("#" + name + "Error").empty();
//   },

//   invalidHandler: function (form, validator) {
//     // Chip-level validation on every invalid submit attempt
//     showChipError(
//       "roleError",
//       selectedRoles.length === 0
//         ? "Must choose selection to proceed further"
//         : "",
//     );
//     showChipError(
//       "assignedModuleError",
//       selectedModules.length === 0
//         ? "Must choose selection to proceed further"
//         : "",
//     );
//   },

//   submitHandler: function (form) {
//     // Final guard (extra safety)
//     if (selectedRoles.length === 0 || selectedModules.length === 0) {
//       showChipError(
//         "roleError",
//         selectedRoles.length === 0
//           ? "Must choose selection to proceed further"
//           : "",
//       );
//       showChipError(
//         "assignedModuleError",
//         selectedModules.length === 0
//           ? "Must choose selection to proceed further"
//           : "",
//       );
//       return false;
//     }

//     // ── Form data collection ────────────────────────────────
//     const formData = {
//       fullName: $("input[name='fullName']").val().trim(),
//       email: $("input[name='email']").val().trim(),
//       phone: $("input[name='phone']").val().trim(),
//       location: $("select[name='location']").val(),
//       department: $("select[name='department']").val(),
//       designation: $("select[name='designation']").val(),
//       permissionLevel: $("input[name='level']:checked").val() || null,
//       roles: [...selectedRoles],
//       assignedModules: [...selectedModules],
//     };

//     console.group("User Creation Data");
//     console.log(formData);
//     console.groupEnd();

//     alert("User Created Successfully ✅");

//     // Decide what to do next:
//     // 1. Real submit → form.submit();
//     // 2. AJAX submit → $.ajax({...})
//     // 3. Reset form (most common in SPA-like flows)

//     // Example: reset (uncomment if needed)
//     // $("#userForm")[0].reset();
//     // selectedRoles.length = 0;
//     // selectedModules.length = 0;
//     // $("#role-container, #assigned-modules-container").empty();
//     // clearChipError("roleError");
//     // clearChipError("assignedModuleError");

//     // Most production apps will do AJAX instead of form.submit()
//     // return false; // ← prevents default submit
//   },
// });
$("#userForm").validate({
  ignore: [],

  rules: {
    fullName: { required: true, minlength: 3 },
    email: { required: true, email: true },
    phone: { required: true, digits: true, minlength: 10 },
    location: { required: true, minlength: 2 }, // ← text field ke liye minlength add ki
    department: { required: true },
    designation: { required: true },
  },

  messages: {
    fullName: {
      required: "Name must contain at least 3 characters",
      minlength: "Minimum 3 characters required",
    },
    email: {
      required: "Enter a valid email address",
      email: "Enter a valid email address",
    },
    phone: {
      required: "Enter valid phone number",
      digits: "Please enter only digits",
      minlength: "Enter valid phone number",
    },
    location: {
      required: "Must fill this field to proceed further",
      minlength: "Location name should be at least 2 characters",
    },
    department: { required: "Choose option to proceed" },
    designation: { required: "Choose option to proceed" },
  },

  errorPlacement: function (error, element) {
    const name = element.attr("name");
    $("#" + name + "Error").html(error);
  },

  success: function (label, element) {
    const name = $(element).attr("name");
    $("#" + name + "Error").empty();
  },

  invalidHandler: function (form, validator) {
    showChipError(
      "roleError",
      selectedRoles.length === 0
        ? "Must choose selection to proceed further"
        : "",
    );
    showChipError(
      "assignedModuleError",
      selectedModules.length === 0
        ? "Must choose selection to proceed further"
        : "",
    );
  },

  submitHandler: function (form) {
    // Final guard for chips
    if (selectedRoles.length === 0 || selectedModules.length === 0) {
      showChipError(
        "roleError",
        selectedRoles.length === 0
          ? "Must choose selection to proceed further"
          : "",
      );
      showChipError(
        "assignedModuleError",
        selectedModules.length === 0
          ? "Must choose selection to proceed further"
          : "",
      );
      return false;
    }

    // ── Form data collection ────────────────────────────────
    const formData = {
      fullName: $("input[name='fullName']").val().trim(),
      email: $("input[name='email']").val().trim(),
      phone: $("input[name='phone']").val().trim(),
      location: $("input[name='location']").val().trim(), // ← yahan change kiya (input, not select)
      department: $("select[name='department']").val(),
      designation: $("select[name='designation']").val(),
      permissionLevel: $("input[name='level']:checked").val() || null,
      roles: [...selectedRoles],
      assignedModules: [...selectedModules],
      // tags bhi chahiye to yahan add kar dena
      // tags: [...selectedTags],
    };

    console.group("User Creation Data");
    console.log(formData);
    console.groupEnd();

    alert("User Created Successfully");

    // ── Form Reset ──────────────────────────────────────────
    $("#userForm")[0].reset(); // saare inputs/selects clear

    // Chips clear karo
    selectedRoles.length = 0;
    selectedModules.length = 0;
    // selectedTags.length = 0;   // agar tags bhi reset karna hai to uncomment

    $("#role-container").empty();
    $("#assigned-modules-container").empty();
    // $("#selected-tags").empty();   // tags ke liye

    // Errors clear karo
    clearChipError("roleError");
    clearChipError("assignedModuleError");
    // clearChipError("tagsError");   // agar tags error hai to

    // Optional: focus pehle field pe wapas
    $("input[name='fullName']").focus();
  },
});
