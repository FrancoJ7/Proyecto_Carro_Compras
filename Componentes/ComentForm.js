app.component('comentarios-form',{

    template:
    /*html*/
    `<form class="review-form" @submit.prevent="Enviar">
    <!-- La directiva @submit.prevent="Enviar" en Vue.js indica que al enviar el formulario (con todos los datos que recibo del input), se debe llamar al método 
    Enviar definido en el componente. Sino agrego esto, se va a recargar la pagina y se me perderan los datos ingresados en el input, entonces lo que hace esto es
    evitar que se recargue la pagina y que en lugar de recargarla, se ejecute el metodo enviar que al no recargarse la pagina, los datos del input se van a mantener -->

    <h3>Deja un comentario</h3>
    <label for="name">Nombre:</label>

    <input id="name" v-model="name">

    <label for="review">Comentario:</label>
    <textarea id="review" v-model="review"></textarea>

    <label for="rating">Puntaje:</label>

        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>

        <br>        
        <label>
                ¿Recomendarias este producto?        
                    <select id="recommendation" v-model="recommendation">
                        <option value="si">SI</option>
                        <option value="no">NO</option>
                    </select>
        </label>

     <input class="button" type="submit" value="Submit">
    </form>`,
    data(){
        return{
            name:"",
            review:"",
            rating: null,
            recommendation: null
        }
    }, //EN EL DATA DEFINO LAS VARIABLES Y SE GUARDAN LOS DATOS. EN LOS METHODS, SE DEFINE QUE SE HACE CON ESOS DATOS, EN ESTE CASO, LOS GUARDO EN UN OBJETO Y LE 
        //ESTABLEZCO UN EVENTO PARA QUE SEA ESCUCHADO POR ALGUN COMPONENTE PADRE U OTRO ELEMENTO QUE ESTE INTERESADO EN OBTENER ESTOS DATOS.
    methods:{
        Enviar(){

            if(this.name === '' || this.review ==='' || this.rating=== null || this.recommendation === null)
            {
                alert("Datos incompletos")
                return
            }

            let productoReview ={
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommendation:this.recommendation
            }
            this.$emit('review-submitted', productoReview) //EMITE UN EVENTO PESONALIZADO LLAMADO review-submittedPARA QUE SEA ESUCHADO O CAPTURADO POR ALGUN COMPONENTE
                                                        //PADRE U OTRO ELEMENTO QUE ESTE INTERESADO EN OBTENER ESTOS DATOS  Y LE PASO COMO PARAMETRO EL OBJETO QUE CREE.
        
                //ESTO LO HAGO PARA QUE DESPUES DE ENVIAR LOS DATOS CUANDO PRECIONO EL BOTON, SE LIMPIEN LOS CAMPOS Y NO QUEDE NINGUN DATO ESCRITO EN EL FORMULARIO DE
                //LA PAGINA
                                
                this.name= '',
                this.review= '',
                this.rating=null,
                this.recommendation=null
        }
    }
                                        //UNA VEZ CREADO EL COMPONENTE LO IMPORTO EN EL HTML
})

/*TENGO 3 TIPOS DE INPUT QUE PEDIRAN DATOS: 
<input id="name">
<textarea id="review"></textarea>
<select id="rating">
*/