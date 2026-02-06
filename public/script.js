function generateCaptcha() {
  const captcha = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("captchaText").innerText = captcha;
}

function verifyDocument() {
  const sr = document.getElementById("docId").value.trim();
  const userCaptcha = document.getElementById("captchaInput").value.trim();
  const realCaptcha = document.getElementById("captchaText").innerText;

  if (sr === "") {
    alert("Please enter serial number");
    return;
  }

  if (userCaptcha !== realCaptcha) {
    alert("Invalid captcha");
    generateCaptcha();
    return;
  }

  fetch("/documents.json")
    .then(res => res.json())
    .then(data => {
      if (data[sr]) {
        window.location.href = data[sr];
      } else {
        alert("Document not found");
      }
    });
}

window.onload = generateCaptcha;
