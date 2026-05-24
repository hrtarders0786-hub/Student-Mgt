const form = document.getElementById("studentForm");

const name = document.getElementById("name");
const father = document.getElementById("father");
const number = document.getElementById("number");
const shift = document.getElementById("shift");
const fees = document.getElementById("fees");
const date = document.getElementById("date");
const table = document.getElementById("table");
const search = document.getElementById("search");
const editIndex = document.getElementById("editIndex");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Render
function render(data = students) {
    table.innerHTML = "";

    data.forEach((s, i) => {
        table.innerHTML += `
        <tr>
            <td>${s.name}</td>
            <td>${s.father}</td>
            <td>${s.number}</td>
            <td>${s.shift}</td>
            <td>${s.fees}</td>
            <td>${s.date}</td>
            <td>
                <button onclick="editStudent(${i})">Edit</button>
            </td>
        </tr>`;
    });
}

// Save / Update
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const student = {
        name: name.value,
        father: father.value,
        number: number.value,
        shift: shift.value,
        fees: fees.value,
        date: date.value
    };

    if (editIndex.value === "") {
        students.push(student);
    } else {
        students[editIndex.value] = student;
        editIndex.value = "";
    }

    localStorage.setItem("students", JSON.stringify(students));
    form.reset();
    render();
});

// Edit
window.editStudent = function(i) {
    const s = students[i];

    name.value = s.name;
    father.value = s.father;
    number.value = s.number;
    shift.value = s.shift;
    fees.value = s.fees;
    date.value = s.date;

    editIndex.value = i;
};

// Search
search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(value) ||
        s.number.includes(value)
    );

    render(filtered);
});

// First load
render();