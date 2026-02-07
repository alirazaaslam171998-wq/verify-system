function reloadCaptcha() {
  document.getElementById("captchaImage").src =
    "/captcha?" + Date.now();
}

async function verify() {
  const serial = document.getElementById("serial").value.trim();
  const captcha = document.getElementById("captcha").value.trim();

  if (!serial || !captcha) {
    alert("Please enter Serial Number and Captcha");
    return;
  }

  const response = await fetch("/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ serial, captcha })
  });

  const data = await response.json();

  if (data.success) {
    document.getElementById("docTitle").innerText = data.name;
    document.getElementById("docFrame").src = data.file;
    document.getElementById("result").style.display = "block";
  } else {
    alert(data.error || "Verification failed");
    reloadCaptcha();
  }
}
