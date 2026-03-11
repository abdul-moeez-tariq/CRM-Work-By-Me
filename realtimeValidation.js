// export function initTaskFormValidation() {
//   const $form = $("#taskForm");
//   if (!$form.length) return;

//   // ─── Helper functions ───────────────────────────────────────────────
//   function getErrorContainer($el) {
//     return $el.closest(
//       ".mt-5.relative, .mt-5.projectDropdown, .mt-5.teamAsse-dropdown",
//     );
//   }

//   function showError($el, msg) {
//     const $container = getErrorContainer($el);
//     if (!$container.length) return;

//     const $err = $container.find(".error-msg");
//     if ($err.length) {
//       $err.text(msg);
//     }
//     $el.addClass("border-red-500");
//   }

//   function clearError($el) {
//     const $container = getErrorContainer($el);
//     if (!$container.length) return;

//     $container.find(".error-msg").text("");
//     $el.removeClass("border-red-500");
//   }

//   function isEmpty(val) {
//     return !val || String(val).trim() === "";
//   }

//   // ─── REAL-TIME VALIDATION ────────────────────────────────────────────

//   // 1. Task Title & Task Code
//   $form
//     .find('input[name="taskTitle"], input[name="taskCode"]')
//     .on("input blur", function () {
//       const $this = $(this);
//       const msg =
//         $this.attr("name") === "taskTitle"
//           ? "Task title is required"
//           : "Task code is required";

//       if (isEmpty($this.val())) {
//         showError($this, msg);
//       } else {
//         clearError($this);
//       }
//     });

//   // 2. Start Date & End Date
//   $form
//     .find('input[name="startDate"], input[name="endDate"]')
//     .on("change blur", function () {
//       const $this = $(this);
//       const msg =
//         $this.attr("name") === "startDate"
//           ? "Start date is required"
//           : "End date is required";

//       if (isEmpty($this.val())) {
//         showError($this, msg);
//       } else {
//         clearError($this);
//       }
//     });

//   // 3. Single-select dropdowns (Project, Status, Priority, Estimated Duration)
//   $form.find(".projectDropdown-input").on("change blur", function () {
//     const $this = $(this);

//     if (isEmpty($this.val())) {
//       const label = $this
//         .closest(".projectDropdown")
//         .find("label")
//         .text()
//         .replace("*", "")
//         .trim();
//       showError($this, `Please select ${label.toLowerCase()}`);
//     } else {
//       clearError($this);
//     }
//   });

//   // Dropdown item click pe manually trigger change (important!)
//   $form.find(".projectDropdown-item").on("click", function () {
//     const $input = $(this)
//       .closest(".projectDropdown")
//       .find(".projectDropdown-input");

//     // Value set hone ke baad change event fire karo
//     $input.trigger("change");
//   });

//   // 4. Multi-select (Assignee & Reporter)
//   function validateMultiSelect($section) {
//     const $input = $section.find(".teamAsse-dropdown-input");
//     const $tags = $section.find(".selected-items");
//     const label = $section.find("label").text().replace("*", "").trim();

//     if ($tags.children().length === 0) {
//       showError($input, `Please select at least one ${label.toLowerCase()}`);
//     } else {
//       clearError($input);
//     }
//   }

//   $form.find(".teamAsse-dropdown").each(function () {
//     const $section = $(this);

//     // Har item click pe check
//     $section.find(".teamAsse-dropdown-item").on("click", function () {
//       validateMultiSelect($section);
//     });

//     // Agar tag remove button hai to uspe bhi check (agar future mein add karo)
//     $section.find(".selected-items").on("click", ".remove-tag", function () {
//       validateMultiSelect($section);
//     });
//   });

//   // ─── Submit handler (final check + loader) ──────────────────────────
//   $form.on("submit", function (e) {
//     e.preventDefault();

//     let isValid = true;

//     // Clear sab errors pehle
//     $form.find(".error-msg").text("");
//     $form.find(".border-red-500").removeClass("border-red-500");

//     // Final check (same as live, lekin sab fields)
//     $form.find('input[name="taskTitle"]').trigger("blur");
//     $form.find('input[name="taskCode"]').trigger("blur");
//     $form
//       .find('input[name="startDate"], input[name="endDate"]')
//       .trigger("change");
//     $form.find(".projectDropdown-input").trigger("change");

//     // Multi-select final check
//     $form.find(".teamAsse-dropdown").each(function () {
//       validateMultiSelect($(this));
//     });

//     // Ab check karo k koi error-msg abhi bhi dikhta hai ya nahi
//     if (
//       $form.find(".error-msg").filter(function () {
//         return $(this).text().trim() !== "";
//       }).length > 0
//     ) {
//       isValid = false;
//     }

//     if (isValid) {
//       if (typeof showGlobalLoader === "function") {
//         showGlobalLoader();
//       }

//       setTimeout(() => {
//         if (typeof hideGlobalLoader === "function") {
//           hideGlobalLoader();
//         }

//         $form[0].reset();
//         $(".selected-items").empty();
//         $form.find(".projectDropdown-input, .teamAsse-dropdown-input").val("");

//         // Success feedback (optional toast ya message)
//         // alert("Task created successfully!");
//       }, 2000);
//     } else {
//       const $first = $form
//         .find(".error-msg")
//         .filter(function () {
//           return $(this).text().trim() !== "";
//         })
//         .first();

//       if ($first.length) {
//         $("html, body").animate({ scrollTop: $first.offset().top - 160 }, 500);
//       }
//     }
//   });
// }
