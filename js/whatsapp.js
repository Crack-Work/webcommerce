// whatsapp.js
document.addEventListener("DOMContentLoaded", function () {
  const waButton = document.createElement("a");
  waButton.href = "https://wa.me/6281234567890";
  waButton.target = "_blank";
  waButton.rel = "noopener noreferrer";
  waButton.className = "whatsapp-float";
  waButton.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" class="whatsapp-icon">';

  document.body.appendChild(waButton);
});

// inject style
const style = document.createElement("style");
style.innerHTML = `
.whatsapp-float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 20px;
  right: 20px;
  background-color: #25d366;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.3);
  z-index: 1000;
}
.whatsapp-icon {
  width: 40px;
  height: 40px;
  margin: 10px;
}`;
document.head.appendChild(style);
