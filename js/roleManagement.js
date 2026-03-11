$(document).ready(function () {
  // Buttons type ensure
  $("#resetBtn, #disableAllBtn, #enableAllBtn").attr("type", "button");

  // =============================
  // Save default checkbox state on page load
  // =============================
  const defaultState = [];
  $("#moduleTable input[type='checkbox']").each(function () {
    defaultState.push($(this).prop("checked"));
  });

  // =============================
  // Enable All checkboxes
  // =============================
  $("#enableAllBtn").click(function () {
    $("#moduleTable input[type='checkbox']").prop("checked", true);
  });

  // =============================
  // Disable All checkboxes
  // =============================
  $("#disableAllBtn").click(function () {
    $("#moduleTable input[type='checkbox']").prop("checked", false);
  });

  // =============================
  // Reset to default checkboxes
  // =============================
  $("#resetBtn").click(function () {
    $("#moduleTable input[type='checkbox']").each(function (index) {
      $(this).prop("checked", defaultState[index]);
    });
  });

  // =============================
  // Optional: Form Validation
  // =============================
  $("#roleForm").validate({
    rules: {
      roleName: "required",
      createdBy: "required",
    },
    messages: {
      roleName: "Must fill this field to proceed further",
      createdBy: "Must fill this field to proceed further",
    },
    errorPlacement: function (error, element) {
      const id = element.attr("id") + "Error";
      $("#" + id).text(error.text());
    },
    success: function (label, element) {
      const id = $(element).attr("id") + "Error";
      $("#" + id).text("");
    },
  });
});
