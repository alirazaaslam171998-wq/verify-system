function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let captcha = "";

  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  document.getElementById("captchaText").innerText = captcha;
}

// run captcha on page load
window.onload = generateCaptcha;

function verifyDocument() {
  const sr = document.getElementById("docId").value.trim();
  const userCaptcha = document.getElementById("captchaInput").value.trim();
  const realCaptcha = document.getElementById("captchaText").innerText.trim();

  if (sr === "") {
    alert("Please enter Serial Number");
    return;
  }

  if (userCaptcha === "") {
    alert("Please enter captcha");
    return;
  }

  if (userCaptcha !== realCaptcha) {
    alert("Incorrect captcha");
    generateCaptcha();
    document.getElementById("captchaInput").value = "";
    return;
  }

  fetch("/documents.json")
    .then(res => res.json())
    .then(data => {
      if (data[sr] && data[sr].file) {
        window.location.href = data[sr].file;
      } else {
        alert("Invalid Serial Number");
        generateCaptcha();
      }
    });
}
