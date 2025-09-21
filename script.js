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
    console.log(data);
};