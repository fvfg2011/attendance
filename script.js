let currentDate = new Date();

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function formatReadable(date) {
  return date.toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
}

function getLessonsCountForDate(date) {
  const day = date.getDay();
  return day === 1 ? 8 : 7;
}

function normalizeAbsence(value, totalLessons) {
  if (value === "day") {
    const allLessons = [];
    for (let i = 1; i <= totalLessons; i++) {
      allLessons.push(i);
    }
    return allLessons;
  }
  return value;
}

function renderTable() {
  const key = formatDate(currentDate);
  const totalLessons = getLessonsCountForDate(currentDate);
  document.getElementById("currentDate").textContent = formatReadable(currentDate);

  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  const dayData = att[key] || {};

  students.forEach(name => {
    const card = document.createElement("div");
    card.className = "student-card";

    const nameEl = document.createElement("span");
    nameEl.textContent = name;
    nameEl.className = "student-name";
    card.appendChild(nameEl);

    if (dayData[name]) {
      const lessonNumbers = normalizeAbsence(dayData[name], totalLessons);

      const mark = document.createElement("span");
      mark.textContent = "Н";
      if (lessonNumbers.length === totalLessons) {
        mark.className = "absent-mark full-day";
      } else {
        mark.className = "absent-mark partial-day";
        }
      mark.addEventListener("click", () => openModal(name, lessonNumbers));
      card.appendChild(mark);
    }

    tbody.appendChild(card);
  });
}

function openModal(name, lessonNumbers) {
  document.getElementById("modalName").textContent = name;

  const list = document.getElementById("modalLessons");
  list.innerHTML = "";

  lessonNumbers.forEach(num => {
    const li = document.createElement("li");
    li.textContent = lessons[num - 1];
    list.appendChild(li);
  });

  document.getElementById("modal").classList.remove("hidden");
}

renderTable();

document.getElementById("nextDay").addEventListener("click", () => {
  currentDate.setDate(currentDate.getDate() + 1);
  renderTable();
});
document.getElementById("prevDay").addEventListener("click", () => {
  currentDate.setDate(currentDate.getDate() - 1);
  renderTable();
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});