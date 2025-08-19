// === Biar bisa dipanggil dari onclick HTML ===
window.openPopup = function (id) {
    document.getElementById(id).classList.add("show");
};

window.closePopup = function (id) {
    document.getElementById(id).classList.remove("show");
};

document.addEventListener("DOMContentLoaded", function () {

    // === FORMAT NOMINAL ===
    document.getElementById("nominal").addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        e.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });

    // === TOMBOL AJUKAN ===
    document.getElementById("ajukanBtn").addEventListener("click", function () {
        const nama = document.getElementById("nama").value;
        const bank = document.getElementById("bank").value;
        const rekening = document.getElementById("rekening").value;
        const nominal = document.getElementById("nominal").value;

        if (!nominal || nominal === "0") {
            alert("Masukkan nominal penarikan!");
            return;
        }

        let nominalNumber = parseInt(nominal.replace(/\./g, ""));
        let biayaAdmin = 5000;
        let total = nominalNumber + biayaAdmin;

        document.getElementById("sumNama").textContent = nama;
        document.getElementById("sumBank").textContent = bank;
        document.getElementById("sumRek").textContent = rekening;
        document.getElementById("sumNominal").textContent = "Rp " + nominal;
        document.getElementById("sumBiayaAdmin").textContent = "Rp " + biayaAdmin.toLocaleString("id-ID");
        document.getElementById("sumTotal").textContent = "Rp " + total.toLocaleString("id-ID");

        openPopup("popupConfirm");
    });

    // === TOMBOL KONFIRMASI ===
    document.getElementById("confirmBtn").addEventListener("click", function () {
        closePopup("popupConfirm");
        openPopup("popupSuccess");
    });
});
