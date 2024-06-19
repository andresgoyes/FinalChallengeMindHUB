const urlApi = "https://www.themealdb.com/api/json/v1/1/categories.php"
const { createApp } = Vue

const app = createApp({
    data() {
        return {
            events: [],
            eventsBK: [],
            categories: [],
            searchText: "",
            selectedCategories: []            
        }
    },
    created() {
        this.fetchData(urlApi)
    },
    methods: {
        fetchData(url) {
            fetch(url).then(response => response.json()).then(data => {
                if (window.location.pathname === "/" || window.location.pathname === "/1index.html") {
                    this.categories = data.categories
                    this.categoriesBK = data.categories                    
                    this.categories = ["A", "B"];
                } else if (window.location.pathname === "/pages/pastEvents.html") {
                    this.events = data.events
                    this.eventsBK = data.events.filter(event => event.date < data.currentDate);
                    this.categories = Array.from(new Set(this.eventsBK.map(event => event.category)));
                } else if (window.location.pathname === "/pages/upcomingEvents.html") {
                    this.events = data.events
                    this.eventsBK = data.events.filter(event => event.date > data.currentDate);
                    this.categories = Array.from(new Set(this.eventsBK.map(event => event.category)));
                }
            })
        },
        traerDataMeals(url) {
            fetch(url).then(response => response.json()).then(data => {
                this.bebidas = data.drinks
                console.log(this.bebidas);
            })
        },
        traerDataComidas(url){
            fetch(url).then(response => response.json()).then(data => {
                this.comidas = data.meals
                console.log(this.comidas);
            })
        },
        handleSearch() {
            if (this.searchText.trim() === "") {
                alert("What do you need? Let us help you find it!");
            } else {
                this.filteredEvents();
            }
        }
    },
    computed: {
        filteredEvents() {
            let filteredByText = this.eventsBK.filter(event => event.name.toLowerCase().includes(this.searchText.toLowerCase()))
            console.log(filteredByText);

            if (this.selectedCategories.length > 0) {
                this.events = filteredByText.filter(event => this.selectedCategories.includes(event.category))
            } else {
                this.events = filteredByText
            }
        }
    }
}).mount('#app')
