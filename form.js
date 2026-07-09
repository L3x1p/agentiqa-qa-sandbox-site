// Contact form behavior for the Acme Notes QA sandbox.
//
// Breakability seam: the entire send outcome is gated by deliverMessage().
// Healthy build returns true (success path). Flip the single return value to
// false to simulate a product bug — the form then renders a user-visible error
// and the <body data-build> should be changed to "v1-broken-form" to match.

function deliverMessage(payload) {
  // payload: { name, email, message }
  // One-line product-bug toggle: change `true` to `false` for the broken build.
  return false;
}

(function () {
  var form = document.getElementById("contact-form");
  var statusContainer = document.getElementById("send-status-container");
  if (!form || !statusContainer) {
    return;
  }

  var submitButton = form.querySelector('button[type="submit"]');

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderSuccess(email) {
    statusContainer.innerHTML =
      '<div id="send-status" role="status">Message sent — we will reply to ' +
      escapeHtml(email) +
      "</div>";
  }

  function renderError() {
    statusContainer.innerHTML =
      '<div id="send-status" role="alert">Something went wrong. Please try again later.</div>';
  }

  form.addEventListener("submit", function (event) {
    // Let browser-native validation block empty/invalid submits.
    if (!form.checkValidity()) {
      return;
    }

    // Fields are valid: take over the submit for the simulated-send path.
    event.preventDefault();

    var payload = {
      name: form.elements["name"].value,
      email: form.elements["email"].value,
      message: form.elements["message"].value,
    };

    // Simulate a ~400ms send with the button disabled.
    submitButton.disabled = true;
    window.setTimeout(function () {
      submitButton.disabled = false;

      if (deliverMessage(payload)) {
        renderSuccess(payload.email);
        form.reset();
      } else {
        renderError();
      }
    }, 400);
  });
})();
