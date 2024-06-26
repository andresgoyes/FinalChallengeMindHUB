let urlApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=%";

const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            meals: [],
            mealsBK: [],
            categories: [],
            searchText: "",
            selectedCategories: [],
            favorites: [],
            showFavoritesModal: false
        };
    },
    created() {
        this.fetchData(urlApi);
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.meals = data.meals;
                    this.mealsBK = data.meals;
                    this.categories = Array.from(new Set(this.meals.map(meal => meal.strCategory)));
                })
        },
        handleSearch() {
            if (this.searchText.trim() === "") {
                alert("Please enter a search term.");
            } else {
                this.filteredMeals();
            }
        },
        filteredMeals() {
            let filteredByText = this.mealsBK.filter(meal =>
                meal.strMeal.toLowerCase().includes(this.searchText.toLowerCase())
            );

            if (this.selectedCategories.length > 0) {
                this.meals = filteredByText.filter(meal =>
                    this.selectedCategories.includes(meal.strCategory)
                );
            } else {
                this.meals = filteredByText;
            }
        },
        addToFavorites(item) {
            item.addedToFavorites = !item.addedToFavorites; 
            if (item.addedToFavorites) {
                if (!this.favorites.some(favorite => favorite.idMeal === item.idMeal)) {
                    this.favorites.push(item);
                }
            } else {
                this.favorites = this.favorites.filter(favorite => favorite.idMeal !== item.idMeal);
            }

            this.updateButtonState(item);

            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },
        updateButtonState(item) {
            this.meals.forEach(meal => {
                if (meal.idMeal === item.idMeal) {
                    meal.addedToFavorites = item.addedToFavorites;
                }
            });
        },
        mounted() {
            this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            this.syncFavoritesState();
        },
        syncFavoritesState() {
            this.meals.forEach(meal => {
                if (this.favorites.some(favorite => favorite.idMeal === meal.idMeal)) {
                    meal.addedToFavorites = true;
                } else {
                    meal.addedToFavorites = false;
                }
            });
        }
    },
    computed: {
        filteredItems() {
            let filteredByText = this.mealsBK.filter(meal =>
                meal.strMeal.toLowerCase().includes(this.searchText.toLowerCase())
            );

            if (this.selectedCategories.length > 0) {
                return filteredByText.filter(meal =>
                    this.selectedCategories.includes(meal.strCategory)
                );
            } else {
                return filteredByText;
            }
        }
    }
}).mount('#app');
