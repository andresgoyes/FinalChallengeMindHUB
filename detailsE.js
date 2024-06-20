document.addEventListener('DOMContentLoaded', function() {
    // Obtén el ID del cóctel o la comida desde la URL (suponiendo que se pasa como un parámetro de búsqueda)
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const type = params.get('type'); // 'cocktail' o 'meal'

    let url = '';

    if (type === 'cocktail') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else if (type === 'meal') {
        url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    }

    if (url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let item = null;
                if (type === 'cocktail') {
                    item = data.drinks[0];
                } else if (type === 'meal') {
                    item = data.meals[0];
                }

                if (item) {
                    document.getElementById('details-image').src = item.strDrinkThumb || item.strMealThumb;
                    document.getElementById('details-title').innerText = item.strDrink || item.strMeal;
                    document.getElementById('details-description').innerText = item.strInstructions;
                    document.getElementById('details-updated').innerText = `Category: ${item.strCategory}`;
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        console.error('Invalid type specified.');
    }
});
