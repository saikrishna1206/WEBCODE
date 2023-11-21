document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const breweryList = document.getElementById('breweryList');
  
    searchInput.addEventListener('input', async () => {
      const searchTerm = searchInput.value.trim();
      try {
        const breweries = await fetchData(searchTerm);
        displayBreweries(breweries);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
  
  async function fetchData(city) {
    try {
      const response = await fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data (status ${response.status})`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
  
  function displayBreweries(breweries) {
    const breweryListElement = document.getElementById('breweryList');
  
    if (breweries.length === 0) {
      breweryListElement.innerHTML = '<p>No breweries found.</p>';
      return;
    }
  
    const ul = document.createElement('ul');
    breweries.forEach(brewery => {
      const li = document.createElement('li');
      li.textContent = `${brewery.name} - ${brewery.city}, ${brewery.state}`;
      ul.appendChild(li);
    });
  
    // Clear previous content
    breweryListElement.innerHTML = '';
    breweryListElement.appendChild(ul);
  }