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

//   // ─── Submit handler ─────────────────────────────────────────────────
//   $form.on("submit", function (e) {
//     e.preventDefault();

//     // Clear previous errors
//     $form.find(".error-msg").text("");
//     $form.find(".border-red-500").removeClass("border-red-500");

//     let isValid = true;

//     // 1. Task Title
//     const $title = $form.find('input[name="taskTitle"]');
//     if (isEmpty($title.val())) {
//       showError($title, "Task title is required");
//       isValid = false;
//     }

//     // 2. Task Code
//     const $code = $form.find('input[name="taskCode"]');
//     if (isEmpty($code.val())) {
//       showError($code, "Task code is required");
//       isValid = false;
//     }

//     // 3. Project
//     const $project = $form.find('input[name="project"]');
//     if (isEmpty($project.val())) {
//       showError($project, "Please select a project");
//       isValid = false;
//     }

//     // 4. Status
//     const $status = $form.find('input[name="status"]');
//     if (isEmpty($status.val())) {
//       showError($status, "Please select a status");
//       isValid = false;
//     }

//     // 5. Priority
//     const $priority = $form.find('input[name="priority"]');
//     if (isEmpty($priority.val())) {
//       showError($priority, "Please select a priority");
//       isValid = false;
//     }

//     // 6. Assignee
//     const $assigneeSection = $form.find(
//       '.teamAsse-dropdown:has(label:contains("Assignee"))',
//     );
//     const $assigneeInput = $assigneeSection.find(".teamAsse-dropdown-input");
//     const $assigneeTags = $assigneeSection.find(".selected-items");

//     if ($assigneeTags.children().length === 0) {
//       showError($assigneeInput, "Please select at least one assignee");
//       isValid = false;
//     }

//     // 7. Reporter
//     const $reporterSection = $form.find(
//       '.teamAsse-dropdown:has(label:contains("Reporter"))',
//     );
//     const $reporterInput = $reporterSection.find(".teamAsse-dropdown-input");
//     const $reporterTags = $reporterSection.find(".selected-items");

//     if ($reporterTags.children().length === 0) {
//       showError($reporterInput, "Please select at least one reporter");
//       isValid = false;
//     }

//     // 8. Start Date
//     const $startDate = $form.find('input[name="startDate"]');
//     if (isEmpty($startDate.val())) {
//       showError($startDate, "Start date is required");
//       isValid = false;
//     }

//     // 9. End Date
//     const $endDate = $form.find('input[name="endDate"]');
//     if (isEmpty($endDate.val())) {
//       showError($endDate, "End date is required");
//       isValid = false;
//     }

//     // 10. Estimated Duration
//     const $duration = $form.find('input[name="estimatedDuration"]');
//     if (isEmpty($duration.val())) {
//       showError($duration, "Please select estimated duration");
//       isValid = false;
//     }

//     if (isValid) {
//       // Loader show karo
//       if (typeof showGlobalLoader === "function") {
//         showGlobalLoader();
//       }

//       // Simulate API call / processing (2 second delay)
//       setTimeout(() => {
//         // Loader hide karo
//         if (typeof hideGlobalLoader === "function") {
//           hideGlobalLoader();
//         }

//         // Reset form
//         $form[0].reset();
//         $(".selected-items").empty();
//         $form.find(".projectDropdown-input, .teamAsse-dropdown-input").val("");

//         // Success message (alert ko comment out kar diya, optional toast daal sakte ho)
//         // alert("Task successfully created!");
//       }, 2000);
//     } else {
//       // Scroll to first error
//       const $firstError = $form
//         .find(".error-msg")
//         .filter(function () {
//           return $(this).text().trim() !== "";
//         })
//         .first();

//       if ($firstError.length) {
//         $("html, body").animate(
//           { scrollTop: $firstError.offset().top - 160 },
//           500,
//         );
//       }
//     }
//   });

//   // ─── LIVE ERROR CLEARING ────────────────────────────────────────────

//   // Text inputs
//   $form
//     .find('input[name="taskTitle"], input[name="taskCode"]')
//     .on("input", function () {
//       if (!isEmpty($(this).val())) clearError($(this));
//     });

//   // Dates
//   $form.find('input[type="date"]').on("change", function () {
//     if (!isEmpty($(this).val())) clearError($(this));
//   });

//   // Single select dropdowns (Project, Status, Priority, Estimated Duration)
//   // Item click pe manually change trigger karo
//   $form.find(".projectDropdown-item").on("click", function () {
//     const $input = $(this)
//       .closest(".projectDropdown")
//       .find(".projectDropdown-input");

//     // Value set hone ke baad change event trigger
//     $input.trigger("change");
//   });

//   // Change event pe error clear
//   $form.find(".projectDropdown-input").on("change", function () {
//     if (!isEmpty($(this).val())) {
//       clearError($(this));
//     }
//   });

//   // Multi-select (Assignee & Reporter)
//   $form.find(".teamAsse-dropdown-item").on("click", function () {
//     const $section = $(this).closest(".teamAsse-dropdown");
//     const $input = $section.find(".teamAsse-dropdown-input");
//     const $tags = $section.find(".selected-items");

//     if ($tags.children().length >= 1) {
//       clearError($input);
//     }
//   });
// }