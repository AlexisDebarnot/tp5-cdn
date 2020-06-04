//---------------------------------------------------------
//                          JUEGO
//---------------------------------------------------------
Vue.component('Juego', {
    mounted(){
        this.inicializarColores()  
    },
    data(){
        return{
            cantidad: 6,
            cuadrados: [1,1,1,1,1,1],
            colors: [],
            colorAJugar: 0,
            colorGanador: "steelblue",
            coloresBotones : {
              colorBotonEasy: "rgb(251,251,251)",
              colorLetraEasy: "rgb(70, 130, 180)",
              colorBotonHard: "rgb(70, 130, 180)",
              colorLetraHard: "rgb(251,251,251)"
            },
            aciertos:0,
            intentosTotales:0,
            msg: "",
            juegoEnCurso: true
        }
    },
    props: [],
    methods: {
        actualizarColor(c) {
            this.colors.splice(c.index, 1, c.color)
        },
        dificultadEasy(){  
          this.juegoEnCurso = true
          this.cuadrados = []
          this.cantidad = 3        
          this.llenarArray()
          this.inicializarColores()
          this.coloresBotones.colorBotonEasy = "rgb(70, 130, 180)"
          this.coloresBotones.colorLetraEasy = "rgb(251,251,251)"
          this.coloresBotones.colorBotonHard = "rgb(251,251,251)"
          this.coloresBotones.colorLetraHard = "rgb(70, 130, 180)"
        },

        dificultadHard(){        
          this.juegoEnCurso = true
          this.cuadrados = []
          this.cantidad = 6 
          this.llenarArray()    
          this.inicializarColores()
          this.coloresBotones.colorBotonHard = "rgb(70,130,180)"
          this.coloresBotones.colorLetraHard = "rgb(251, 251, 251)"
          this.coloresBotones.colorBotonEasy = "rgb(251,251,251)"
          this.coloresBotones.colorLetraEasy = "rgb(70, 130, 180)"
             
        },

        llenarArray(){
          for (var i = 0; i < this.cantidad; i++) {          
            this.cuadrados.push(1)
          }
        },

        inicializarColores(){
          this.juegoEnCurso = true
          this.colors = this.createNewColors(this.cantidad)        
          this.cuadrados = [1,1,1,1,1,1]
          this.colorAJugar = this.PickColor()
          this.msg = ""
          this.colorGanador = "steelblue"
        },

        createNewColors(numbers){
          var arr = [];
          for (var i = 0; i < numbers; i++) {
            arr.push(this.createRandomStringColor());
          }          
            return arr;
        },

        createRandomStringColor(){
          var newColor = "rgb(" + this.randomInt() + ", " + this.randomInt() + ", " + this.randomInt() + ")" ;
          return newColor;
        },

        randomInt(){
          return Math.floor(Math.random() * 256);
        },

        PickColor(){
          return Math.floor(Math.random() * this.cantidad );
        },
        mostrar(){
            this.color = "rgb(255,0,0)"
        },

        retornar(gano) {  
          if(this.juegoEnCurso){
            this.intentosTotales++;
            if(gano){
              this.aciertos++;
              this.colorGanador = this.colors[this.colorAJugar]
              this.msg = "Ganaste!"   
              this.juegoEnCurso=false      
              for (let index = 0; index < this.colors.length; index++) {
                this.colors[index] = this.colorGanador;
                this.cuadrados = [1,1,1,1,1,1]     
                
              }
            }else{
              this.msg = "Intentalo de nuevo!"
            }  
          }
              
          
          
        }

    },
    template: 
    `
    
    <section class="src-components-juego">
        <div id="body">
          <Header :colorGanador="colorGanador" :colorAJugar="colors[colorAJugar]" />
          <NavBar
            :msg="msg"
            :aciertos="aciertos"
            :intentosTotales="intentosTotales"
            :coloresBotones="coloresBotones"
            :dificultadEasy="dificultadEasy"
            :dificultadHard="dificultadHard"
            :inicializarColores="inicializarColores"
          />

          <Body
            :colorAJugar="colors[colorAJugar]"
            :cuadrados="cuadrados"
            :colors="colors"
            :mostrar="mostrar"
            :retornar="retornar"
            :juegoEnCurso="juegoEnCurso"
            @actualizar-color="actualizarColor($event)"
          />
        </div>
    </section>

    `
})

//---------------------------------------------------------
//                          HEADER
//---------------------------------------------------------
Vue.component('Header', {
    data(){
        return{
            
        }
    },
    props: ['colorGanador','colorAJugar'],
    methods: {

    },
    template: 
    `
    
    <section class="src-components-header">
    <div id="header" :style="{'background-color': colorGanador}">
      <h1>
        The Great
        <br />
        <span id="colorDisplay">{{colorAJugar}}</span>
        <br />Guessing Game
      </h1>
    </div>
    </section>

    `
})

//---------------------------------------------------------
//                          BODY
//---------------------------------------------------------
Vue.component('Body', {
    data(){
        return{
            
        }
    },
    props: ['cuadrados','colors','mostrar','retornar','juegoEnCurso','colorAJugar'],
    methods: {
        actualizarColor(c) {
            this.$emit('actualizar-color', c)
        }
    },
    template: 
    `
    
    <section class="src-components-body">
        <div id="container">
          <div v-for="(color,index) in colors" :key="index">
            <Cuadrado
              :colorAJugar="colorAJugar"
              :retornar="retornar"
              :mostrar="mostrar"
              :color="color"
              :index="index"
              :juegoEnCurso="juegoEnCurso"
              @actualizar-color="actualizarColor($event)"
            />
          </div>
        </div>
    </section>

    `
})


//---------------------------------------------------------
//                          CUADRADO
//---------------------------------------------------------
Vue.component('Cuadrado', {
    data(){
        return{
            
        }
    },
    props: ['color','index','mostrar','retornar','colorAJugar','juegoEnCurso'],
    methods: {
        mostrarColor(){ 
            if(this.juegoEnCurso){
              if(this.colorAJugar != this.color){
                if(this.color != "#232323"){
                  let obj = {
                  color: "#232323",
                  index: this.index
                }
                this.$emit('actualizar-color', obj)
                this.retornar(false) 
                }
                         
              }else{          
                this.retornar(true)
              } 
            }
        }

    },
    template: 
    `  
        <section class="src-components-cuadrado">
          <div class="square" :style="{'background-color': color}" @click="mostrarColor"></div>
        </section>

    `
})


//---------------------------------------------------------
//                          NAVBAR
//---------------------------------------------------------
Vue.component('NavBar', {
    data(){
        return{
            
        }
    },
    props: ['dificultadHard','dificultadEasy','inicializarColores','coloresBotones','aciertos','intentosTotales','msg'],
    methods: {

    },
    template: 
    `  
    <section class="src-components-nav-bar">
        <div id="navigator">
            <button id="reset" @click="inicializarColores">New colors!</button>
            <span id="message">{{msg}}</span>
            <button
                id="easy"
                @click="dificultadEasy"
                :style="{'background-color': coloresBotones.colorBotonEasy, 'color': coloresBotones.colorLetraEasy}"
            >easy</button>
            <button
                id="hard"
                @click="dificultadHard"
                :style="{'background-color': coloresBotones.colorBotonHard, 'color': coloresBotones.colorLetraHard}"
            >hard</button>
            <span id="aciertos">Aciertos: {{aciertos}}/{{intentosTotales}}</span>
        </div>
    </section>

    `
})

var app = new Vue({
    el: '#app',
    data: {
    },
    methods: {

    },
    computed: {

    }
  })