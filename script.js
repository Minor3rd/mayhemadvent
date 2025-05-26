const releaseDate = new Date("2026-05-26T00:00:00Z");
const startDate = new Date("2025-05-26T00:00:00Z");
const names = ["DanHawk", "Nader", "Lake", "Lucas", "LeeMu", "Mike"];

function nameHash(name) {
  return Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function updateCountdown() {
  const now = new Date();
  const diff = releaseDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerText = "GTA VI is here!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").innerText =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function showTasks(tasks) {
  const now = new Date();
  const dayIndex = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  const container = document.getElementById("entries");
  container.innerHTML = "";

  names.forEach(name => {
    const hashOffset = nameHash(name);
    const taskIndex = (dayIndex + hashOffset) % tasks.length;
    const entry = document.createElement("p");
    entry.innerHTML = `<strong>${name}</strong> will: ${tasks[taskIndex]}`;
    container.appendChild(entry);
  });
}

fetch('tasks.json')
  .then(res => res.json())
  .then(tasks => {
    updateCountdown();
    showTasks(tasks);
    setInterval(updateCountdown, 1000);
  })
  .catch(err => {
    document.getElementById("entries").innerText = "Failed to load tasks.";
    console.error(err);
  });

