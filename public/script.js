function reloadCaptcha() {
  document.getElementById("captchaImage").src =
    "/captcha?" + Date.now();
}

async function verify() {
  const serial = document.getElementById("serial").value.trim();
  const captcha = document.getElementById("captcha").value.trim();

  if (!serial || !captcha) {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch("/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ serial, captcha }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Verification failed");
    reloadCaptcha();
    return;
  }

  window.open(data.file, "_blank");
}
