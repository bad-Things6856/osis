
document.querySelectorAll(".part").forEach(button => {
    button.onclick = () => {
        document.querySelectorAll(".part").forEach(item =>
            item.classList.remove("active")
        );

        button.classList.add("active");
        document.getElementById("part-info").textContent =
            button.dataset.info;
    };
});

const steps = [
    ["01", "Fetch", "The processor retrieves the next instruction."],
    ["02", "Decode", "The processor determines what the instruction requires."],
    ["03", "Execute", "The processor performs the operation." ]
];

let current = 0;

document.getElementById("next-step").onclick = () => {
    current = (current + 1) % steps.length;

    document.getElementById("step-number").textContent = steps[current][0];
    document.getElementById("step-title").textContent = steps[current][1];
    document.getElementById("step-info").textContent = steps[current][2];
};
