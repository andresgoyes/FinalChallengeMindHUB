let urlApi = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=%";

const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            drinks: [],
            drinksBK: [],
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
                    this.drinks = data.drinks
                    this.drinksBK = data.drinks 
                    this.categories = Array.from(new Set(this.drinks.map(drink => drink.strCategory)))
                })
        },
        handleSearch() {
            if (this.searchText.trim() === "") {
                alert("Please enter a search term.")
            } else {
                this.filteredDrinks()
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
                this.drinks = filteredByText
            }
        },
        addToFavorites(item) {
            item.addedToFavorites = !item.addedToFavorites; 
            if (item.addedToFavorites) {
                if (!this.favorites.some(favorite => favorite.idDrink === item.idDrink)) {
                    this.favorites.push(item)
                }
            } else {
                this.favorites = this.favorites.filter(favorite => favorite.idDrink !== item.idDrink)
            }
    
            this.updateButtonState(item);
    
            localStorage.setItem('favorites', JSON.stringify(this.favorites))
        },
        updateButtonState(item) {
            this.drinks.forEach(drink => {
                if (drink.idDrink === item.idDrink) {
                    drink.addedToFavorites = item.addedToFavorites
                }
            });
        },
        mounted() {
            this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
            this.syncFavoritesState()
        },
        syncFavoritesState() {
            this.drinks.forEach(drink => {
                if (this.favorites.some(favorite => favorite.idDrink === drink.idDrink)) {
                    drink.addedToFavorites = true
                } else {
                    drink.addedToFavorites = false
                }
            });
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
                return filteredByText
            }
        }
    }
    

}).mount('#app');
