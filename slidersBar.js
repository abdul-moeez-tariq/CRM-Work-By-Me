// file: progressSlider.js
export function initProgressSlider() {
  const slider = document.getElementById("progressSlider");
  if (!slider) return;

  // Function to update slider background
  function updateSliderBackground(value) {
    slider.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`;
  }

  // Initialize background on page load
  updateSliderBackground(slider.value);

  // Update background on input
  slider.addEventListener("input", (e) => {
    updateSliderBackground(e.target.value);
  });
}

// file: rangeProgress.js
export function initCompletionRange() {
  const range = document.getElementById("completionRange");
  if (!range) return;

  // Function to update background gradient
  function updateRangeBackground(value) {
    const percentage = value;
    range.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #d1d5db ${percentage}%, #d1d5db 100%)`;
  }

  // Initialize background
  updateRangeBackground(range.value);

  // Update on input
  range.addEventListener("input", (e) => {
    updateRangeBackground(e.target.value);
  });
}

// file: sliders.js
export function initSliders(formId = "timelineForm") {
  const form = document.getElementById(formId);
  if (!form) return;

  // --- Completion Slider ---
  const completionSlider = form.querySelector('input[name="completion"]');
  if (completionSlider) {
    function updateCompletionBackground(value) {
      completionSlider.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`;
    }

    // Initial update
    updateCompletionBackground(completionSlider.value);

    // Input event
    completionSlider.addEventListener("input", (e) => {
      updateCompletionBackground(e.target.value);
    });
  }

  // --- Progress Slider ---
  const progressSlider = form.querySelector("#progressSlider");
  if (progressSlider) {
    function updateProgressBackground(value) {
      progressSlider.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`;
    }

    updateProgressBackground(progressSlider.value);

    progressSlider.addEventListener("input", (e) => {
      updateProgressBackground(e.target.value);
    });
  }

  // --- Form Reset Handler ---
  form.addEventListener("reset", () => {
    // Timeout ensures DOM resets before updating sliders
    setTimeout(() => {
      if (completionSlider) updateCompletionBackground(completionSlider.value);
      if (progressSlider) updateProgressBackground(progressSlider.value);
    }, 50);
  });
}
