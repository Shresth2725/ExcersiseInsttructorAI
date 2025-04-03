const API_KEY = 'mvWF9Cb34bFfcULH71TnIw==GSLloi0HXbviqQoV';
const muscles = ["biceps", "triceps", "chest", "back", "legs", "abs", "shoulders", "forearms", "glutes", "hamstrings", "quads", "calves"];

function fetchExercises() {
    let muscle = document.getElementById('searchQuery').value.trim().toLowerCase();
    if (!muscle || !muscles.includes(muscle)) {
        document.getElementById('result').innerHTML = "<p>Please enter a valid muscle group!</p>";
        return;
    }

    let apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${encodeURIComponent(muscle)}`;
    fetch(apiUrl, { headers: { 'X-Api-Key': API_KEY } })
    .then(response => response.json())
    .then(data => {
        let resultHTML = data.map(exercise => `
            <div class="exercise-card" onclick="showModal('${exercise.name}', '${exercise.type}', '${exercise.difficulty}', '${exercise.instructions}')">
                <h3>${exercise.name}</h3>
                <p><strong>Type:</strong> ${exercise.type}</p>
                <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
            </div>
        `).join('');
        document.getElementById('result').innerHTML = resultHTML || "<p>No exercises found for this muscle.</p>";
    })
    .catch(error => document.getElementById('result').innerHTML = '<p>Failed to fetch exercises.</p>');
}

function showModal(name, type, difficulty, instructions) {
    document.getElementById('modalTitle').innerText = name;
    document.getElementById('modalType').innerText = `Type: ${type}`;
    document.getElementById('modalDifficulty').innerText = `Difficulty: ${difficulty}`;
    document.getElementById('modalInstructions').innerText = `Instructions: ${instructions}`;
    document.getElementById('exerciseModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('exerciseModal').style.display = 'none';
}