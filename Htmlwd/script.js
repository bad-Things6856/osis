
document.querySelectorAll(".tech").forEach(button => {
    button.onclick = () => {
        document.querySelectorAll(".tech").forEach(item =>
            item.classList.remove("active")
        );

        button.classList.add("active");
        document.getElementById("tech-title").textContent =
            button.dataset.title;
        document.getElementById("tech-info").textContent =
            button.dataset.info;
    };
});
