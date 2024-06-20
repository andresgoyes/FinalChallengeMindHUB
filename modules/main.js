let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=%"
let url2 = "https://www.themealdb.com/api/json/v1/1/search.php?s=%"

const { createApp } = Vue
const app = createApp({
    data() {
        return {
            meals: [],
            drinks: [],
            searchText: "",
            categories: [],
            selectedCategories: []
        }
    },
    created() {
        this.fetchData(url)
        this.fetchDataDrinks(url)
        this.fetchDataMeals(url2)
    },
    methods: {
        fetchData(url) {
            fetch(url).then(response => response.json()).then(data => {
                if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
                    this.categories = data.categories ? data.categories : ["Cocktails", "Foods"];
                    this.categoriesBK = data.categories ? data.categories : ["Cocktails", "Foods"];
                }
            })
        },
        fetchDataDrinks(url) {
            fetch(url).then(response => response.json()).then(data => {
                this.drinks = data.drinks || []
                console.log(this.drinks);
            })
        },
        fetchDataMeals(url) {
            fetch(url).then(response => response.json()).then(data => {
                this.meals = data.meals || []
                console.log(this.meals);
            })
        },
        handleSearch() {
            if (this.searchText.trim() === "") {
                alert("What do you need? Let us help you find it!");
            } else {
                this.filteredItems;
            }
        }
    },
    computed: {
        filteredItems() {
            let filteredDrinks = this.drinks.filter(drink => drink.strDrink.toLowerCase().includes(this.searchText.toLowerCase()));
            let filteredMeals = this.meals.filter(meal => meal.strMeal.toLowerCase().includes(this.searchText.toLowerCase()));

            if (this.selectedCategories.length > 0) {
                if (!this.selectedCategories.includes("Cocktails")) {
                    filteredDrinks = [];
                }
                if (!this.selectedCategories.includes("Foods")) {
                    filteredMeals = [];
                }
            }
            return [...filteredDrinks, ...filteredMeals];
        }
    }
}).mount('#app')