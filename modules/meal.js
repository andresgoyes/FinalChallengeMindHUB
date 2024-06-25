let urlApi = "https://www.themealdb.com/api/json/v1/1/categories.php";

const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            categories: []
        };
    },
    created() {
        this.fetchData(urlApi);
    },
    methods: {
        fetchData(url) {
            fetch(url).then(response => response.json()).then(data => {
                this.categories = data.categories.slice(0, 6);
            }).catch(error => console.error('Error fetching categories:', error));
        }
    }
}).mount('#app');


