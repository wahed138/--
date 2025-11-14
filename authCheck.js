// ✅ showToast — لعرض الرسائل
function showToast(message, type = "info") {
  let toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "12px";
  toast.style.fontFamily = "Cairo, sans-serif";
  toast.style.zIndex = "9999";
  toast.style.fontWeight = "600";
  toast.style.transition = "0.3s ease";
  toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  toast.style.color = "#fff";

  if (type === "error") toast.style.background = "#e74c3c";
  else if (type === "success") toast.style.background = "#2ecc71";
  else toast.style.background = "#3498db";

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ✅ التحقق من هوية الطالب
document.addEventListener("DOMContentLoaded", () => {
  const isApproved = localStorage.getItem("approved");
  const uid = localStorage.getItem("localUid");

  // لو المستخدم مش معتمد أو مفيش UID
  if (isApproved !== "true" || !uid) {
    showToast("🚫 لا يمكنك الدخول — يرجى التسجيل أولاً", "error");
    setTimeout(() => {
      window.location.href = "index.html"; // صفحة التسجيل
    }, 1500);
    return;
  }

  // ✅ تحقق إضافي من قاعدة البيانات
  const dbUrl = "https://thanawy-1383-default-rtdb.firebaseio.com";
  fetch(`${dbUrl}/approvedStudents.json`)
    .then(res => res.json())
    .then(data => {
      const exists = Object.values(data || {}).some(v => v.deviceId === uid);
      if (!exists) {
        localStorage.removeItem("approved");
        localStorage.removeItem("localUid");
        showToast("⚠️ بياناتك لم تعد موجودة، يرجى التسجيل مجددًا.", "error");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      }
    })
    .catch(() => {
      showToast("⚠️ تعذر التحقق من الهوية الآن، حاول لاحقًا.", "error");
    });
});
