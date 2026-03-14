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

// event-single-dropdown.js
export function initEventDropdowns() {
  const dropdowns = document.querySelectorAll(".eventDropdown");

  dropdowns.forEach((dropdown) => {
    const input = dropdown.querySelector(".eventDropdown-input");
    const list = dropdown.querySelector(".eventDropdown-list");
    const arrow = dropdown.querySelector(".eventDropdown-arrow");
    const items = dropdown.querySelectorAll(".eventDropdown-item");

    // Safety check — agar koi element missing ho to skip
    if (!input || !list || !arrow || !items.length) return;

    // Dropdown open/close logic
    const toggleDropdown = (shouldOpen) => {
      // Pehle sab dropdowns band kar do (sirf ek hi khula rahe)
      document.querySelectorAll(".eventDropdown-list").forEach((otherList) => {
        if (otherList !== list) {
          otherList.style.maxHeight = "0px";
          otherList.style.opacity = "0";
          const otherArrow = otherList
            .closest(".eventDropdown")
            ?.querySelector(".eventDropdown-arrow");
          if (otherArrow) otherArrow.style.transform = "rotate(0deg)";
        }
      });

      // Ab current dropdown ko handle karo
      if (shouldOpen) {
        list.style.maxHeight = list.scrollHeight + "px";
        list.style.opacity = "1";
        arrow.style.transform = "rotate(180deg)";
      } else {
        list.style.maxHeight = "0px";
        list.style.opacity = "0";
        arrow.style.transform = "rotate(0deg)";
      }
    };

    // Input (readonly field) pe click → toggle dropdown
    input.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = list.style.maxHeight && list.style.maxHeight !== "0px";
      toggleDropdown(!isOpen);
    });

    // Har list item pe click → value set karo + dropdown band
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const value = item.textContent.trim();

        // Input mein value daal do
        input.value = value;

        // Text left align + color adjust (optional lekin achha lagta hai)
        input.classList.add("text-left");
        input.style.textAlign = "left";

        // Dropdown band kar do
        toggleDropdown(false);
      });
    });
  });

  // Document pe click → agar dropdown ke bahar click hua to sab band
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".eventDropdown")) {
      document.querySelectorAll(".eventDropdown-list").forEach((list) => {
        list.style.maxHeight = "0px";
        list.style.opacity = "0";
        const arrow = list
          .closest(".eventDropdown")
          ?.querySelector(".eventDropdown-arrow");
        if (arrow) arrow.style.transform = "rotate(0deg)";
      });
    }
  });
}

// Page load pe start
document.addEventListener("DOMContentLoaded", initEventDropdowns);

// event-multi-dropdown.js
export function initEventMultiDropdowns() {
  const dropdowns = document.querySelectorAll(".teamAsse-dropdown");

  dropdowns.forEach((dropdown) => {
    const input = dropdown.querySelector(".teamAsse-dropdown-input");
    const list = dropdown.querySelector(".teamAsse-dropdown-list");
    const arrow = dropdown.querySelector(".teamAsse-dropdown-arrow");
    const items = dropdown.querySelectorAll(".teamAsse-dropdown-item");

    // Chips container (dono fields mein class same hai: .selected-items)
    const selectedBox = dropdown.querySelector(".selected-items");

    // Agar koi element missing ho to skip kar do
    if (!input || !list || !arrow || !items.length || !selectedBox) {
      console.warn("Multi-dropdown incomplete:", dropdown);
      return;
    }

    // Dropdown open/close function
    const toggleDropdown = (shouldOpen) => {
      // Pehle sab dropdown band kar do (sirf ek khula rahe)
      document
        .querySelectorAll(".teamAsse-dropdown-list")
        .forEach((otherList) => {
          if (otherList !== list) {
            otherList.style.maxHeight = "0px";
            otherList.style.opacity = "0";
            const otherArrow = otherList
              .closest(".teamAsse-dropdown")
              ?.querySelector(".teamAsse-dropdown-arrow");
            if (otherArrow) otherArrow.style.transform = "rotate(0deg)";
          }
        });

      if (shouldOpen) {
        list.style.maxHeight = list.scrollHeight + "px";
        list.style.opacity = "1";
        arrow.style.transform = "rotate(180deg)";
      } else {
        list.style.maxHeight = "0px";
        list.style.opacity = "0";
        arrow.style.transform = "rotate(0deg)";
      }
    };

    // Input field pe click → dropdown toggle
    input.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = list.style.maxHeight && list.style.maxHeight !== "0px";
      toggleDropdown(!isOpen);
    });

    // Har item pe click → chip add karo
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const value = item.textContent.trim();

        // Duplicate check — agar pehle se chip mojood hai to ignore
        if (
          [...selectedBox.children].some((chip) => chip.dataset.value === value)
        ) {
          return;
        }

        // Naya chip banao
        const chip = document.createElement("span");
        chip.dataset.value = value;
        chip.className =
          "inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200";

        chip.innerHTML = `
          ${value}
          <button type="button" class="remove-chip text-blue-600 hover:text-red-600 font-bold text-lg leading-none cursor-pointer">×</button>
        `;

        // Chip ko selected-items div mein add karo
        selectedBox.appendChild(chip);

        // Remove chip pe click → chip delete
        chip.querySelector(".remove-chip").addEventListener("click", () => {
          chip.remove();
        });

        // Dropdown band kar do
        toggleDropdown(false);
      });
    });
  });

  // Document ke bahar click karne pe sab dropdown band
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".teamAsse-dropdown")) {
      document.querySelectorAll(".teamAsse-dropdown-list").forEach((list) => {
        list.style.maxHeight = "0px";
        list.style.opacity = "0";
        const arrow = list
          .closest(".teamAsse-dropdown")
          ?.querySelector(".teamAsse-dropdown-arrow");
        if (arrow) arrow.style.transform = "rotate(0deg)";
      });
    }
  });
}

// Page load hone pe run karo
document.addEventListener("DOMContentLoaded", () => {
  initEventMultiDropdowns();
});

// File Upload validation
export function initEventFileUpload() {
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

document.addEventListener("DOMContentLoaded", initEventFileUpload);

// eventFormValidation.js
export function initEventFormValidation() {
  const $form = $("#eventForm");
  if (!$form.length) return;

  // ─── Helper Functions ───────────────────────────────
  function getErrorSpan($el) {
    let $span = $el.closest(".relative").find(".error-msg").first();
    if (!$span.length) $span = $el.parent().next(".error-msg");
    return $span;
  }

  function showError($el, msg) {
    const $span = getErrorSpan($el);
    if ($span.length) $span.text(msg);
    $el.addClass("border-red-500");
  }

  function clearError($el) {
    const $span = getErrorSpan($el);
    if ($span.length) $span.text("");
    $el.removeClass("border-red-500");
  }

  function isEmpty(val) {
    if (!val) return true;
    const t = String(val).trim();
    return t === "" || t.includes("Select ");
  }

  // ─── Required Fields ───────────────────────────────
  const required = [
    { sel: '[name="eventTitle"]', msg: "Event title is required" },
    { sel: '[name="eventType"]', msg: "Event type is required" },
    { sel: '[name="status"]', msg: "Status is required" },
    { sel: '[name="projectOwner"]', msg: "Related project is required" },

    // Date & Time
    { sel: '[name="start-date"]', msg: "Start date is required" },
    { sel: '[name="start-time"]', msg: "Start time is required" },
    { sel: '[name="end-date"]', msg: "End date is required" },
    { sel: '[name="end-time"]', msg: "End time is required" },

    // Participants
    {
      sel: '[name="organizer"]',
      msg: "Select at least 1 organizer",
      multi: true,
      chipSelector: ".selected-items",
    },
    {
      sel: '[name="attandees"]',
      msg: "Select at least 1 attendee",
      multi: true,
      chipSelector: ".selected-items",
    },

    // Location & Links
    { sel: '[name="location"]', msg: "Location is required" },
    { sel: '[name="meetingLink"]', msg: "Meeting link is required" },
  ];

  // ─── Submit Handler ───────────────────────────────
  $form.on("submit", function (e) {
    e.preventDefault();

    $form.find(".error-msg").text("");
    $form.find("input, textarea, select").removeClass("border-red-500");

    let isValid = true;
    let $firstInvalid = null;

    required.forEach((f) => {
      const $input = $form.find(f.sel).first();
      if (!$input.length) return;

      let valid = true;

      if (f.multi) {
        const $container = $input
          .closest(".teamAsse-dropdown")
          .find(f.chipSelector);
        valid = $container.children().length > 0;
      } else {
        valid = !isEmpty($input.val());
      }

      if (!valid) {
        showError($input, f.msg);
        isValid = false;
        if (!$firstInvalid) $firstInvalid = $input;
      }
    });

    // ─── Start Date ≤ End Date Validation ─────────────────
    const startDate = $form.find('[name="start-date"]').val();
    const endDate = $form.find('[name="end-date"]').val();

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      const $endInput = $form.find('[name="end-date"]');
      showError($endInput, "End date must be after start date");
      isValid = false;
      if (!$firstInvalid) $firstInvalid = $endInput;
    }

    if (!isValid) {
      $firstInvalid?.focus();
      if ($firstInvalid && $firstInvalid.offset()) {
        $("html, body").animate(
          { scrollTop: $firstInvalid.offset().top - 140 },
          300,
        );
      }
      return;
    }

    // ─── Loader + Success Simulation ─────────────────
    if (typeof showGlobalLoader === "function") showGlobalLoader();

    setTimeout(() => {
      if (typeof hideGlobalLoader === "function") hideGlobalLoader();

      // Reset form
      $form[0].reset();
      $(".selected-items").empty();

      $form.find(".error-msg").text("");
      $form.find("input, textarea").removeClass("border-red-500");
    }, 1800);
  });

  // ─── Live Error Remove ───────────────────────────────
  $form.on("input change", "input:not([readonly]), textarea", function () {
    if (!isEmpty($(this).val())) {
      clearError($(this));
    }
  });

  // ─── Single Dropdown Clear ───────────────────────────
  $form.find(".eventDropdown-item").on("click", function () {
    setTimeout(() => {
      const $input = $(this).closest(".eventDropdown").find("input").first();
      if (!isEmpty($input.val())) {
        clearError($input);
      }
    }, 100);
  });

  // ─── Multi Dropdown Chips ────────────────────────────
  $form.find(".teamAsse-dropdown-item").on("click", function () {
    setTimeout(() => {
      const $dropdown = $(this).closest(".teamAsse-dropdown");
      const $input = $dropdown.find("input").first();
      const $chips = $dropdown.find(".selected-items");

      if ($chips.children().length > 0) {
        clearError($input);
      }
    }, 100);
  });

  // Chip remove
  $(document).on("click", ".remove-chip", function () {
    setTimeout(() => {
      const $container = $(this).closest(".selected-items");
      const $input = $container
        .closest(".teamAsse-dropdown")
        .find("input")
        .first();

      if ($container.children().length === 0) {
        const name = $input.attr("name");
        let msg = "";

        if (name === "organizer") msg = "Select at least 1 organizer";
        else if (name === "attandees") msg = "Select at least 1 attendee";

        if (msg) showError($input, msg);
      } else {
        clearError($input);
      }
    }, 50);
  });
}

// Page Load
document.addEventListener("DOMContentLoaded", () => {
  initEventFormValidation();
});
