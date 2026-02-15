function refreshCaptcha() {
  document.getElementById("captchaImg").src = "/api/captcha?" + Date.now();
}

async function searchDoc() {
  const captcha = document.getElementById("captchaInput").value;
  
  const response = await fetch("/api/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      captcha: captcha,
      docId: "TRAINING-ID"
    })
  });

  const data = await response.json();

  if (!data.success) {
    alert("Invalid captcha");
    refreshCaptcha();
    return;
  }

  document.getElementById("result").innerHTML = `
    <iframe src="${data.documentUrl}"></iframe>
  `;
}
