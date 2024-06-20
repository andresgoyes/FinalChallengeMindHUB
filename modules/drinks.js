let urlApi = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=%";

const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            drinks: [],
            drinksBK: [],
            categories: [], // You can adjust if needed
            searchText: "",
            selectedCategories: [] // Adjust as per your data structure
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
                    this.drinks = data.drinks; // Adjust based on API response structure
                    this.drinksBK = data.drinks; // Backup original data for filtering
                    // Adjust categories if your API provides drink categories
                    this.categories = Array.from(new Set(this.drinks.map(drink => drink.strCategory)));
                })
                .catch(error => {
                    console.error('Error fetching drinks data:', error);
                });
        },
        handleSearch() {
            if (this.searchText.trim() === "") {
                alert("Please enter a search term.");
            } else {
                this.filteredDrinks();
            }
        },
        filteredDrinks() {
            let filteredByText = this.drinksBK.filter(drink =>
                drink.strDrink.toLowerCase().includes(this.searchText.toLowerCase())
            );

            if (this.selectedCategories.length > 0) {
                this.drinks = filteredByText.filter(drink =>
                    this.selectedCategories.includes(drink.strCategory)
                );
            } else {
                this.drinks = filteredByText;
            }
        }
    },
    computed: {
        filteredItems() {
            let filteredByText = this.drinksBK.filter(drink =>
                drink.strDrink.toLowerCase().includes(this.searchText.toLowerCase())
            );

            if (this.selectedCategories.length > 0) {
                return filteredByText.filter(drink =>
                    this.selectedCategories.includes(drink.strCategory)
                );
            } else {
                return filteredByText;
            }
        }
    }
}).mount('#app');
