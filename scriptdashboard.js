document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector("#grid-container");
    const addBox = document.querySelector(".add-box");

    let boxData = JSON.parse(localStorage.getItem("boxes")) || []; // Load boxes from localStorage
    let boxCount = boxData.length ? Math.max(...boxData.map(box => box.id)) + 1 : 1; // Keep track of box count

    // Function to create a new box
    function createBox(id, name) {
        const newBox = document.createElement("div");
        newBox.classList.add("box");
        newBox.textContent = name;
        newBox.dataset.id = id;

        // Event listener for renaming
        newBox.addEventListener("click", function () {
            let newName = prompt("Rename your box:", newBox.textContent);
            if (newName) {
                newBox.textContent = newName;
                updateBoxInLocalStorage(id, newName);
            }
        });

        container.insertBefore(newBox, addBox.nextSibling);
    }

    // Load stored boxes
    boxData.forEach(box => createBox(box.id, box.name));

    // Event listener for adding a new box
    addBox.addEventListener("click", function () {
        let boxName = "Box" + boxCount;
        createBox(boxCount, boxName);

        // Store in localStorage
        boxData.push({ id: boxCount, name: boxName });
        localStorage.setItem("boxes", JSON.stringify(boxData));

        boxCount++;
    });

    // Function to update box name in localStorage
    function updateBoxInLocalStorage(id, newName) {
        let boxIndex = boxData.findIndex(box => box.id === id);
        if (boxIndex !== -1) {
            boxData[boxIndex].name = newName;
            localStorage.setItem("boxes", JSON.stringify(boxData));
        }
    }
});