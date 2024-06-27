let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=%"
let url2 = "https://www.themealdb.com/api/json/v1/1/search.php?s=%"

const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            bebida:[],
            comida:[],

            areaComidas: [],
            areaMasComida: [],
            porcentajeAreasComidas:[],

            categoriasBebidas: [],
            porcentajeDeBebidasCategoria: [],
            categoriaMasBebidas: [],

            categoriasComidas:[],
            porcentajeDeComidas:[],
            masCategoriasComidas:[],

            drinksAlcohol:[],
            drinksNoalcohol: []
            
        }
    },
    created() {
        this.traerData(url)
        this.traerData2(url2)
    },
    methods: {
        traerData(url) {
            fetch(url).then(response => response.json()).then(data => {
                this.bebida = data.drinks

                
                //bebidas
                data.drinks.forEach(e => {
                    if (!this.categoriasBebidas.includes(e.strCategory)) {
                        this.categoriasBebidas.push(e.strCategory)
                    }
                });

                data.drinks.forEach((e) => {
                    if (this.categoriasBebidas.includes(e.strCategory)) {
                        if (!this.porcentajeDeBebidasCategoria[e.strCategory]) {
                            this.porcentajeDeBebidasCategoria[e.strCategory] = 0
                        }
                        this.porcentajeDeBebidasCategoria[e.strCategory] += 1;
                    }
                });
                this.categoriaMasBebidas = Object.keys(this.porcentajeDeBebidasCategoria).reduce((a, b) => this.porcentajeDeBebidasCategoria[a] > this.porcentajeDeBebidasCategoria[b] ? a : b);

                //filtrar alcoholicas
                this.bebida.forEach(e => e.strAlcoholic== "Alcoholic"? this.drinksAlcohol.push(e): this.drinksNoalcohol.push(e))
                
            })
        }, traerData2(url) {
            fetch(url).then(response => response.json()).then(data => {
                
                this.comida = data.meals

                
                //comidas
                data.meals.forEach(e => {
                    if (!this.areaComidas.includes(e.strArea)) {
                        this.areaComidas.push(e.strArea)
                    }
                });

                data.meals.forEach((e) => {
                    if (this.areaComidas.includes(e.strArea)) {
                        if (!this.porcentajeAreasComidas[e.strArea]) {
                            this.porcentajeAreasComidas[e.strArea] = 0
                        }
                        this.porcentajeAreasComidas[e.strArea] += 1;
                    }
                });
                this.areaMasComida = Object.keys(this.porcentajeAreasComidas).reduce((a, b) => this.porcentajeAreasComidas[a] > this.porcentajeAreasComidas[b] ? a : b);

                //categorias comidas
                data.meals.forEach(e => {
                    if (!this.categoriasComidas.includes(e.strCategory)) {
                        this.categoriasComidas.push(e.strCategory)
                    }
                });


                data.meals.forEach((e) => {
                    if (this.categoriasComidas.includes(e.strCategory)) {
                        if (!this.porcentajeDeComidas[e.strCategory]) {
                            this.porcentajeDeComidas[e.strCategory] = 0
                        }
                        this.porcentajeDeComidas[e.strCategory] += 1;
                    }
                });
                this.masCategoriasComidas = Object.keys(this.porcentajeDeComidas).reduce((a, b) => this.porcentajeDeComidas[a] > this.porcentajeDeComidas[b] ? a : b);
                

            
            })
            
        }
    }



}).mount('#app')