let slider = document.getElementById("slider");
let slides = document.querySelectorAll(".slide");
let index = 0;

document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateSlider();
});

document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
});

function updateSlider() {
    slider.style.transform = `translateX(${-index * 100}%)`;
}

// Auto slide setiap 5 detik
setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlider();
}, 5000);

