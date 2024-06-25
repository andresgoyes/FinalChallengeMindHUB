let urlApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=%"

const { createApp } = Vue
const app = createApp({
    data() {

        return {
            meals: [],
            mealsBK: [],
            categories: [],
            searchText: "",
<<<<<<< HEAD
            selectedCategories: []
=======
            selectedCategories: [],
            favorites: [],
            showFavoritesModal: false
>>>>>>> main
        };
    },
    created() {
        this.fetchData(urlApi);
    },
    methods: {
        fetchData(url) {
            fetch(url).then(response => response.json()).then(data => {
                this.meals = data.meals;
                this.mealsBK = data.meals;
                this.categories = Array.from(new Set(this.meals.map(meal => meal.strCategory)));
            })
        },
        handleSearch() {
            if (this.searchText.trim() === "") {
                alert("What do you need? Let us help you find it!");
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
<<<<<<< HEAD
=======
        },
        addToFavorites(item) {
            item.addedToFavorites = !item.addedToFavorites;
            if (!this.favorites.includes(item)) {
                this.favorites.push(item);
            } else {
                this.favorites = this.favorites.filter(favorite => favorite.idDrink !== item.idDrink && favorite.idMeal !== item.idMeal);
            }
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },

        mounted(){
            this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
>>>>>>> main
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
