document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");

  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      navbarPlaceholder.innerHTML = html;

      // Aktifkan dropdown bootstrap
      const dropdownTriggerList = navbarPlaceholder.querySelectorAll('[data-bs-toggle="dropdown"]');
      dropdownTriggerList.forEach(el => {
        new bootstrap.Dropdown(el);
      });

      // Cek berulang sampai elemen ditemukan untuk status login
      const checkIcons = setInterval(() => {
        const loggedEls = navbarPlaceholder.querySelectorAll(".d-user-logged");
        const notLoggedEls = navbarPlaceholder.querySelectorAll(".d-user-not-logged");

        if (loggedEls.length > 0 && notLoggedEls.length > 0) {
          const isLoggedIn = true; // Ganti sesuai status login

          loggedEls.forEach(el => {
            el.style.setProperty("display", isLoggedIn ? "inline-block" : "none", "important");
          });
          notLoggedEls.forEach(el => {
            el.style.setProperty("display", isLoggedIn ? "none" : "inline-block", "important");
          });

          clearInterval(checkIcons);
        }
      }, 50);

      // ==========================
      // Inject data notifikasi
      // ==========================
      const notifications = [
        {
          title: "Pesanan Dikonfirmasi",
          text: "Pesanan #WS-2025-001 telah dikonfirmasi dan sedang diproses. Estimasi pengiriman...",
          time: "2 menit yang lalu",
          starred: false
        },
        {
          title: "Flash Sale Hari Ini!",
          text: "Dapatkan diskon hingga 50% untuk semua produk skincare. Promo terbatas hanya...",
          time: "1 jam yang lalu",
          starred: true
        },
        {
          title: "Pesanan Dikirim",
          text: "Pesanan #WS-2025-002 telah dikirim melalui JNE dengan nomor resi JNE123456789...",
          time: "3 jam yang lalu",
          starred: false
        }
      ];

      const notifList = navbarPlaceholder.querySelector(".notif-list");
      const notifBadge = navbarPlaceholder.querySelector(".notif-badge");
      const notifCount = navbarPlaceholder.querySelector(".notif-count");

      if (notifList && notifBadge && notifCount) {
        notifBadge.textContent = notifications.length;
        notifCount.textContent = notifications.length;

        notifList.innerHTML = notifications.map(n => `
          <div class="notif-item p-3 border-bottom">
            <div class="d-flex align-items-start">
              ${n.starred ? '<i class="fas fa-star notif-star me-2"></i>' : ""}
              <div>
                <div class="fw-bold">${n.title}</div>
                <div class="small text-muted">${n.text}</div>
                <div class="text-secondary" style="font-size: 12px;">${n.time}</div>
              </div>
            </div>
          </div>
        `).join("");
      }
      // ==========================

    })
    .catch(err => console.error("Gagal memuat navbar:", err));
});

// Event ganti brand shop
document.addEventListener("click", function (e) {
  if (e.target.matches(".dropdown-item[data-brand]")) {
    e.preventDefault();
    const brand = e.target.getAttribute("data-brand");
    const newUrl = `shop.html?brand=${brand}`;
    window.location.href = newUrl;
  }
});


