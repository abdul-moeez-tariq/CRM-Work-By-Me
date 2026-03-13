// ===== GLOBAL LOADER =====
const globalLoader = document.getElementById("globalLoader");

function showGlobalLoader() {
  if (!globalLoader) return;
  globalLoader.classList.remove("hidden");
}

function hideGlobalLoader() {
  if (!globalLoader) return;
  globalLoader.classList.add("hidden");
}

export function initTaskDropdowns() {
  const dropdowns = document.querySelectorAll(".projectDropdown");

  dropdowns.forEach((dropdown) => {
    const input = dropdown.querySelector(".projectDropdown-input");
    const list = dropdown.querySelector(".projectDropdown-list");
    const arrow = dropdown.querySelector(".projectDropdown-arrow");
    const items = dropdown.querySelectorAll(".projectDropdown-item");

    input.addEventListener("click", () => {
      // close other dropdowns
      document.querySelectorAll(".projectDropdown-list").forEach((other) => {
        if (other !== list) {
          other.style.maxHeight = "0px";
          other.style.opacity = "0";
        }
      });

      if (list.style.maxHeight && list.style.maxHeight !== "0px") {
        list.style.maxHeight = "0px";
        list.style.opacity = "0";
        arrow.style.transform = "rotate(0deg)";
      } else {
        list.style.maxHeight = list.scrollHeight + "px"; // smooth height
        list.style.opacity = "1";
        arrow.style.transform = "rotate(180deg)";
      }
    });

    items.forEach((item) => {
      item.addEventListener("click", () => {
        input.value = item.textContent.trim(); // trim removes extra spaces
        input.classList.add("text-left"); // force left alignment if not applied
        input.style.textAlign = "left"; // inline style to avoid CSS overrides

        list.style.maxHeight = "0px";
        list.style.opacity = "0";
        arrow.style.transform = "rotate(0deg)";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", initTaskDropdowns);

export function initTaskMultiDropdown() {
  const dropdowns = document.querySelectorAll(".teamAsse-dropdown");

  dropdowns.forEach((dropdown) => {
    const input = dropdown.querySelector(".teamAsse-dropdown-input");
    const list = dropdown.querySelector(".teamAsse-dropdown-list");
    const arrow = dropdown.querySelector(".teamAsse-dropdown-arrow");
    const items = dropdown.querySelectorAll(".teamAsse-dropdown-item");
    const selectedBox = dropdown.querySelector(".selected-items");

    input.addEventListener("click", () => {
      if (list.style.maxHeight) {
        list.style.maxHeight = null;
        list.style.opacity = "0";
        arrow.style.transform = "rotate(0deg)";
      } else {
        list.style.maxHeight = list.scrollHeight + "px";
        list.style.opacity = "1";
        arrow.style.transform = "rotate(180deg)";
      }
    });

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const value = item.textContent;

        if (
          [...selectedBox.children].some((tag) => tag.dataset.value === value)
        ) {
          return;
        }

        const tag = document.createElement("span");

        tag.dataset.value = value;

        tag.className =
          "flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm";

        tag.innerHTML = `
          ${value}
          <button class="remove-tag text-blue-500 hover:text-red-500">&times;</button>
        `;

        selectedBox.appendChild(tag);

        tag.querySelector(".remove-tag").addEventListener("click", () => {
          tag.remove();
        });

        // ⭐ dropdown close after select
        list.style.maxHeight = null;
        list.style.opacity = "0";
        arrow.style.transform = "rotate(0deg)";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", initTaskMultiDropdown);

export function initTaskFileUpload() {
  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");
  const browseBtn = document.getElementById("browseBtn");
  const fileList = document.getElementById("fileList");

  // ←←← Yeh check sabse important
  if (!browseBtn || !fileInput || !dropArea || !fileList) {
    console.warn("File upload elements missing on this page → skipping init");
    console.log("Found:", { dropArea, fileInput, browseBtn, fileList });
    return; // function yahin khatam
  }

  let filesArray = [];

  browseBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
  });

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("bg-blue-50");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("bg-blue-50");
  });

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("bg-blue-50");
    handleFiles(e.dataTransfer.files);
  });

  function handleFiles(files) {
    [...files].forEach((file) => {
      filesArray.push(file);

      const fileItem = document.createElement("div");

      fileItem.className =
        "flex items-center justify-between border border-primary rounded-lg px-4 py-2";

      fileItem.innerHTML = `
        <div class="flex items-center gap-3">
          <svg 
      width="15" 
      height="15" 
      viewBox="0 0 15 15" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      class="text-red-500 shrink-0"
    >
      <path 
        d="M0 1.84253C0 0.826261 0.826261 0 1.84253 0H6.44886V3.68507C6.44886 4.19464 6.86055 4.60633 7.37013 4.60633H11.0552V8.75203H5.06696C4.05069 8.75203 3.22443 9.57829 3.22443 10.5946V14.7403H1.84253C0.826261 14.7403 0 13.914 0 12.8977V1.84253ZM11.0552 3.68507H7.37013V0L11.0552 3.68507ZM5.06696 10.1339H5.98823C6.87783 10.1339 7.60045 10.8565 7.60045 11.7461C7.60045 12.6357 6.87783 13.3584 5.98823 13.3584H5.5276V14.2796C5.5276 14.533 5.32031 14.7403 5.06696 14.7403C4.81362 14.7403 4.60633 14.533 4.60633 14.2796V12.8977V10.5946C4.60633 10.3412 4.81362 10.1339 5.06696 10.1339ZM5.98823 12.4371C6.37113 12.4371 6.67918 12.129 6.67918 11.7461C6.67918 11.3632 6.37113 11.0552 5.98823 11.0552H5.5276V12.4371H5.98823ZM8.75203 10.1339H9.6733C10.4362 10.1339 11.0552 10.7529 11.0552 11.5158V13.3584C11.0552 14.1213 10.4362 14.7403 9.6733 14.7403H8.75203C8.49868 14.7403 8.2914 14.533 8.2914 14.2796V10.5946C8.2914 10.3412 8.49868 10.1339 8.75203 10.1339ZM9.6733 13.819C9.92664 13.819 10.1339 13.6117 10.1339 13.3584V11.5158C10.1339 11.2625 9.92664 11.0552 9.6733 11.0552H9.21266V13.819H9.6733ZM11.9765 10.5946C11.9765 10.3412 12.1837 10.1339 12.4371 10.1339H13.819C14.0723 10.1339 14.2796 10.3412 14.2796 10.5946C14.2796 10.8479 14.0723 11.0552 13.819 11.0552H12.8977V11.9765H13.819C14.0723 11.9765 14.2796 12.1837 14.2796 12.4371C14.2796 12.6904 14.0723 12.8977 13.819 12.8977H12.8977V14.2796C12.8977 14.533 12.6904 14.7403 12.4371 14.7403C12.1837 14.7403 11.9765 14.533 11.9765 14.2796V12.4371V10.5946Z" 
        fill="currentColor"
      />
    </svg>
          <div>
            <p class="text-sm font-medium dark:text-white">${file.name}</p>
            <p class="text-xs text-gray-500">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>

        <!-- Delete button with SVG instead of emoji -->
<button type="button" class="delete-file flex items-center justify-center w-8 h-8 rounded hover:bg-red-50 transition-colors focus:outline-none cursor-pointer">
  <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-red-500">
    <path 
      d="M3.89235 0.509575L3.68506 0.921266H0.921266C0.411691 0.921266 0 1.33296 0 1.84253C0 2.35211 0.411691 2.7638 0.921266 2.7638H11.9765C12.486 2.7638 12.8977 2.35211 12.8977 1.84253C12.8977 1.33296 12.486 0.921266 11.9765 0.921266H9.21266L9.00538 0.509575C8.84991 0.195769 8.53035 0 8.182 0H4.71573C4.36738 0 4.04781 0.195769 3.89235 0.509575ZM11.9765 3.68507H0.921266L1.53161 13.4447C1.57767 14.1731 2.18225 14.7403 2.91063 14.7403H9.9871C10.7155 14.7403 11.3201 14.1731 11.3661 13.4447L11.9765 3.68507Z" 
      fill="currentColor"
    />
  </svg>
</button>
      `;

      fileList.appendChild(fileItem);

      fileItem.querySelector(".delete-file").addEventListener("click", () => {
        fileItem.remove();
        filesArray = filesArray.filter((f) => f.name !== file.name);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", initTaskFileUpload);

// Form Validation

export function initTaskFormValidation() {
  const $form = $("#taskForm");
  if (!$form.length) return;

  // ─── Helper functions ───────────────────────────────────────────────
  function getErrorContainer($el) {
    return $el.closest(
      ".mt-5.relative, .mt-5.projectDropdown, .mt-5.teamAsse-dropdown",
    );
  }

  function showError($el, msg) {
    const $container = getErrorContainer($el);
    if (!$container.length) return;

    const $err = $container.find(".error-msg");
    if ($err.length) {
      $err.text(msg);
    }
    $el.addClass("border-red-500");
  }

  function clearError($el) {
    const $container = getErrorContainer($el);
    if (!$container.length) return;

    $container.find(".error-msg").text("");
    $el.removeClass("border-red-500");
  }

  function isEmpty(val) {
    return !val || String(val).trim() === "";
  }

  // ─── Submit handler ─────────────────────────────────────────────────
  $form.on("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    $form.find(".error-msg").text("");
    $form.find(".border-red-500").removeClass("border-red-500");

    let isValid = true;

    // 1. Task Title
    const $title = $form.find('input[name="taskTitle"]');
    if (isEmpty($title.val())) {
      showError($title, "Task title is required");
      isValid = false;
    }

    // 2. Task Code
    const $code = $form.find('input[name="taskCode"]');
    if (isEmpty($code.val())) {
      showError($code, "Task code is required");
      isValid = false;
    }

    // 3. Project
    const $project = $form.find('input[name="project"]');
    if (isEmpty($project.val())) {
      showError($project, "Please select a project");
      isValid = false;
    }

    // 4. Status
    const $status = $form.find('input[name="status"]');
    if (isEmpty($status.val())) {
      showError($status, "Please select a status");
      isValid = false;
    }

    // 5. Priority
    const $priority = $form.find('input[name="priority"]');
    if (isEmpty($priority.val())) {
      showError($priority, "Please select a priority");
      isValid = false;
    }

    // 6. Assignee
    const $assigneeSection = $form.find(
      '.teamAsse-dropdown:has(label:contains("Assignee"))',
    );
    const $assigneeInput = $assigneeSection.find(".teamAsse-dropdown-input");
    const $assigneeTags = $assigneeSection.find(".selected-items");

    if ($assigneeTags.children().length === 0) {
      showError($assigneeInput, "Please select at least one assignee");
      isValid = false;
    }

    // 7. Reporter
    const $reporterSection = $form.find(
      '.teamAsse-dropdown:has(label:contains("Reporter"))',
    );
    const $reporterInput = $reporterSection.find(".teamAsse-dropdown-input");
    const $reporterTags = $reporterSection.find(".selected-items");

    if ($reporterTags.children().length === 0) {
      showError($reporterInput, "Please select at least one reporter");
      isValid = false;
    }

    // 8. Start Date
    const $startDate = $form.find('input[name="startDate"]');
    if (isEmpty($startDate.val())) {
      showError($startDate, "Start date is required");
      isValid = false;
    }

    // 9. End Date
    const $endDate = $form.find('input[name="endDate"]');
    if (isEmpty($endDate.val())) {
      showError($endDate, "End date is required");
      isValid = false;
    }

    // 10. Estimated Duration
    const $duration = $form.find('input[name="estimatedDuration"]');
    if (isEmpty($duration.val())) {
      showError($duration, "Please select estimated duration");
      isValid = false;
    }

    if (isValid) {
      // Loader show karo
      if (typeof showGlobalLoader === "function") {
        showGlobalLoader();
      }

      // Simulate API call / processing (2 second delay)
      setTimeout(() => {
        // Loader hide karo
        if (typeof hideGlobalLoader === "function") {
          hideGlobalLoader();
        }

        // Reset form
        $form[0].reset();
        $(".selected-items").empty();
        $form.find(".projectDropdown-input, .teamAsse-dropdown-input").val("");

        // Success message (alert ko comment out kar diya, optional toast daal sakte ho)
        // alert("Task successfully created!");
      }, 2000);
    } else {
      // Scroll to first error
      const $firstError = $form
        .find(".error-msg")
        .filter(function () {
          return $(this).text().trim() !== "";
        })
        .first();

      if ($firstError.length) {
        $("html, body").animate(
          { scrollTop: $firstError.offset().top - 160 },
          500,
        );
      }
    }
  });

  // ─── LIVE ERROR CLEARING ────────────────────────────────────────────

  // Text inputs
  $form
    .find('input[name="taskTitle"], input[name="taskCode"]')
    .on("input", function () {
      if (!isEmpty($(this).val())) clearError($(this));
    });

  // Dates
  $form.find('input[type="date"]').on("change", function () {
    if (!isEmpty($(this).val())) clearError($(this));
  });

  // Single select dropdowns (Project, Status, Priority, Estimated Duration)
  // Item click pe manually change trigger karo
  $form.find(".projectDropdown-item").on("click", function () {
    const $input = $(this)
      .closest(".projectDropdown")
      .find(".projectDropdown-input");

    // Value set hone ke baad change event trigger
    $input.trigger("change");
  });

  // Change event pe error clear
  $form.find(".projectDropdown-input").on("change", function () {
    if (!isEmpty($(this).val())) {
      clearError($(this));
    }
  });

  // Multi-select (Assignee & Reporter)
  $form.find(".teamAsse-dropdown-item").on("click", function () {
    const $section = $(this).closest(".teamAsse-dropdown");
    const $input = $section.find(".teamAsse-dropdown-input");
    const $tags = $section.find(".selected-items");

    if ($tags.children().length >= 1) {
      clearError($input);
    }
  });
}
