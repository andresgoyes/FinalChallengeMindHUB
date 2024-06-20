const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            data: null
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            let id = new URL(window.location.href).searchParams.get("id");

            const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
            const urlFoods = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

            fetch(urlDrinks)
                .then(response => response.json())
                .then(data => {
                    if (data.drinks) {
                        let drink = data.drinks[0]; 
                        if (drink) {                            
                            drink.ingredients = this.extractIngredients(drink, 'strIngredient', 'strMeasure');
                            this.data = drink;
                            console.log('Drink found:', drink);
                        } else {
                            console.warn('Drink not found with ID:', id);
                            this.fetchFood(urlFoods);
                        }
                    } else {
                        console.warn('No drinks data received');
                        this.fetchFood(urlFoods);
                    }
                })
                .catch(error => {
                    console.error('Error fetching drinks data:', error);
                    this.fetchFood(urlFoods);
                });
        },
        fetchFood(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.meals) {
                        let meal = data.meals[0];
                        if (meal) {
                            meal.ingredients = this.extractIngredients(meal, 'strIngredient', 'strMeasure');
                            this.data = meal;
                            console.log('Meal found:', meal);
                        } else {
                            console.warn('Meal not found with ID:', id);
                        }
                    } else {
                        console.warn('No meals data received');
                    }
                })
                .catch(error => {
                    console.error('Error fetching meals data:', error);
                });
        },
        extractIngredients(item, ingredientPrefix, measurePrefix) {
            let ingredients = [];
            for (let i = 1; i <= 20; i++) {
                let ingredient = item[`${ingredientPrefix}${i}`];
                let measure = item[`${measurePrefix}${i}`];
                if (ingredient && measure) {
                    ingredients.push(`${ingredient} - ${measure}`);
                } else if (ingredient) {
                    ingredients.push(`${ingredient}`);
                } else {
                    break; 
                }
            }
            return ingredients;
        }
    }
});

app.mount('#app');
