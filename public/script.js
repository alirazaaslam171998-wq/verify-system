function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById("captchaText").innerText = captcha;
}

async function verifyDocument() {
  const docId = document.getElementById("docId").value.trim();
  const captchaInput = document.getElementById("captchaInput").value.trim();
  const captchaText = document.getElementById("captchaText").innerText;

  if (!docId) {
    alert("Please enter marriage certificate serial number.");
    return;
  }

  if (!captchaInput) {
    alert("Please enter captcha.");
    return;
  }

  if (captchaInput !== captchaText) {
    alert("Invalid captcha. Please try again.");
    generateCaptcha();
    document.getElementById("captchaInput").value = "";
    return;
  }

  const response = await fetch("/documents.json", { cache: "no-store" });
  const documents = await response.json();

  if (documents[docId]) {
    window.location.href = documents[docId].file;
  } else {
    alert("Marriage certificate not found.");
  }
}

window.onload = generateCaptcha;
