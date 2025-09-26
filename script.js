async function getData() {
    const pokemon = document.getElementById('searchInput').value.toLowerCase().trim();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        if (response.status === 200) {
            const data = await response.json();
            processData(data);
        } else {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Process the data here
function processData(data) {
    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const dexNumber = data.id;
    const imgSrc = data.sprites.front_default;
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
    const height = data.height / 10; // Convert decimeters to meters
    const weight = data.weight / 10; // Convert hectograms to kilograms

    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = ''; // Clear previous content
    pokemonContainer.style.border = '#BDBDBD 1px solid';
    pokemonContainer.style.borderRadius = '10px';

    pokemonContainer.innerHTML = `
        <div class="pokemon-header">
            <h2>${name}</h2>
            <h2><strong>#${dexNumber}</strong></h2>
        </div>
        <div class="pokemon-image">
            <img src="${imgSrc}" alt="${name}">
        </div>
        <div class="pokemon-info">
            <p><strong>Type:</strong> ${types}</p>
            <p><strong>Height:</strong> ${height} m</p>
            <p><strong>Weight:</strong> ${weight} kg</p>
        </div>
    `;

    // Log the entire data object to the console
    console.log(data);
};

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchInput").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            getData();
        }
    });
});