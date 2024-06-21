let categoriasBebidasCotel = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
let categoriasBebidas= "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
let categoriasComida = "https://www.themealdb.com/api/json/v1/1/categories.php"

const { createApp } = Vue;

const app = createApp({
    data(){
        return{
            categorias:[],
            categoriasBebidas:[],
            categoriasBebidasCoctel:[]
        }
    },
    created(){
        this.traerData(categoriasComida)
        this.traerData2(categoriasBebidas)
        this.traerdata3(categoriasBebidasCotel)
    },
    methods:{
        traerData(url){
            fetch(url).then(response => response.json()).then(data => {
                this.categorias = data.categories
            })
        },traerData2(url){
            fetch(url).then(response => response.json()).then(data => {
                this.categoriasBebidas = data.drinks
            })
        },traerdata3(url){
            fetch(url).then(response => response.json()).then(data => {

                this.categoriasBebidasCoctel = data.drinks
                console.log(this.categoriasBebidasCoctel);
            })
        }
    }



}).mount('#app')