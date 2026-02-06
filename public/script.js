async function verifyDocument() {
  const docId = document.getElementById("docId").value.trim();
  const captchaInput = document.getElementById("captchaInput").value.trim();
  const captchaText = document.getElementById("captchaText").innerText;

  if (captchaInput !== captchaText) {
    alert("Invalid captcha");
    return;
  }

  const response = await fetch("/documents.json");
  const documents = await response.json();

  if (documents[docId]) {
    window.location.href = documents[docId].file;
  } else {
    alert("Marriage certificate not found");
  }
}
