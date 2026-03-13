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
export function initDropdowns() {
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

document.addEventListener("DOMContentLoaded", initDropdowns);

export function initMultiDropdown() {
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

document.addEventListener("DOMContentLoaded", initMultiDropdown);

export function initFileUpload() {
  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");
  const browseBtn = document.getElementById("browseBtn");
  const fileList = document.getElementById("fileList");

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

document.addEventListener("DOMContentLoaded", initFileUpload);

// formValidation.js
export function initProjectFormValidation() {
  const $form = $("#projectForm");
  if (!$form.length) return;

  // ─── HELPER FUNCTIONS
  function clearErrors() {
    $form.find(".error-msg").remove();
    $form.find(".border-red-500").removeClass("border-red-500");
  }

  function showError($el, msg) {
    $el.closest(".relative").find(".error-msg").remove();
    const $err = $(
      `<span class="error-msg absolute left-0 top-full mt-1 text-xs text-red-500 min-h-4">${msg}</span>`,
    );
    $el.addClass("border-red-500");
    $el.closest(".relative").append($err);
  }

  function isEmpty($field) {
    const val = $field.val() || "";
    return val.trim().length === 0;
  }

  // ─── FORM SUBMIT
  $form.on("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // ── validation checks ──
    $form
      .find('input[type="text"]:not([readonly]), textarea')
      .each(function () {
        if (isEmpty($(this))) {
          showError($(this), "This field is required");
          isValid = false;
        }
      });

    $form.find(".projectDropdown").each(function () {
      const $inp = $(this).find(".projectDropdown-input");
      if (isEmpty($inp)) {
        const label = $(this).find("label").text().replace("*", "").trim();
        showError($inp, `Please select ${label.toLowerCase()}`);
        isValid = false;
      }
    });

    $form.find(".teamAsse-dropdown").each(function () {
      const $selectedBox = $(this).find(".selected-items");
      const $inp = $(this).find(".teamAsse-dropdown-input");
      if ($selectedBox.children().length === 0) {
        showError($inp, "Please select at least one team member");
        isValid = false;
      }
    });

    // Budget, Dates, Payment Terms ... (same checks)
    // ...

    // ── SUCCESS ──
    if (isValid) {
      showGlobalLoader();

      setTimeout(() => {
        hideGlobalLoader();
        $form[0].reset();
        $form
          .find(".projectDropdown-input, .teamAsse-dropdown-input")
          .val("")
          .removeClass("border-red-500");
        $form.find(".selected-items").empty();
        $form.find(".error-msg").remove();

        // Re-initialize validation so it still works for next submit
        initProjectFormValidation();

        // alert("Form submitted successfully!");
      }, 2000);
    } else {
      const $first = $form.find(".error-msg").first();
      if ($first.length)
        $("html, body").animate({ scrollTop: $first.offset().top - 140 }, 400);
    }
  });

  // ─── LIVE ERROR REMOVE FOR TEXT / TEXTAREA
  $form.find("input, textarea").on("input change blur", function () {
    const $el = $(this);
    if (!isEmpty($el)) {
      $el.removeClass("border-red-500");
      $el.closest(".relative").find(".error-msg").remove();
    }
  });

  // ─── LIVE ERROR REMOVE FOR SINGLE-SELECT DROPDOWN
  $form.find(".projectDropdown").each(function () {
    const $dropdown = $(this);
    $dropdown.find(".projectDropdown-item").on("click", function () {
      const $inp = $dropdown.find(".projectDropdown-input");
      $inp.removeClass("border-red-500");
      $inp.closest(".relative").find(".error-msg").remove();
    });
  });

  // ─── LIVE ERROR REMOVE FOR MULTI-SELECT DROPDOWN
  $form.find(".teamAsse-dropdown").each(function () {
    const $dropdown = $(this);
    $dropdown.find(".teamAsse-dropdown-item").on("click", function () {
      const $inp = $dropdown.find(".teamAsse-dropdown-input");
      const $selectedBox = $dropdown.find(".selected-items");

      // as soon as 1 item is selected → hide error immediately
      if ($selectedBox.children().length >= 1) {
        $inp.removeClass("border-red-500");
        $inp.closest(".relative").find(".error-msg").remove();
      }
    });
  });

  // console.log(
  //   "Validation initialized → 1-click dropdown fix + submit alert applied",
  // );
}
