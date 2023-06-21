//ABAJO DE TODO ESTA LA EXPLICACION

app.component('product-display', { // Primer argumento: Nombre del componente,
                                    // Segundo argumento: objeto con las configuraciones del componente 
    props: {
        premium:{
            type: Boolean,
            required: true,
        }
    },
    template:
    /*html*/

`<div class="product-display"> 
    <div class="product-container">

        <div class="product-image"> 
            <!-- Toma el valor que le asignamos en Prop Comp. y le asigna esa clase si no esta en Stock -->
            <img :src="imagen" :class="{ outOfStockimg: !EnStock }">
        </div>

        <div class="product-info"> 
            
        <h1>{{ tituloEnVenta }}</h1> <!-- Toma el valor que le asignamos en Prop Comp. en el JS -->

        <p v-if="EnStock">Stock</p> <!-- Toma el valor de la Prop Comp. y se muestra si hay cantidad-->
        <p v-else>Sin stock</p> <!-- Sino, se muestra este mensaje -->

        <p>Envio: {{envio}}</p> <!-- ESTO LO AGREGO CON LAS PROPS DE LOS COMPONENTES -->

        <a :href="urlMedias" target="_blank">Pagina oficial Nike</a> <!-- Toma el valor que le asignamos en Data en el JS -->

        <product-details> </product-details> <!--  VER SI ESTA BIEN AGREGAR EL COMPONENTE ACA-->

        <ul>
            <li v-for="tamanio in tamanios">Tamaños: {{tamanio}}</li> <!-- Toma el valor que le asignamos en Data en el JS -->
        </ul>

        <!-- Explicacion div abajo-->
        
        <div v-for="(variedad, indice) in variedades" :key="variedad.id" @mouseover="ActualizaVariedad(indice)" class="color-circle" 
        :style="{backgroundColor: variedad.color}" ></div>

        <!--<div v-for="variedad in variedades" :key="variedad.id" @mouseover="actualizaImagen(variedad.imagen)" class="color-circle" 
        :style="{backgroundColor: variedad.color}" ></div> OTRA FORMA DE ACTUALIZAR LA IMAGEN CUANDO PASO POR LOS CIRCULOS -->

        <!-- Explicacion :disabled abajo-->
                                                                    
        <button class="button" @click="AgregarAlCarro" :disabled="!EnStock" :class="{disabledButton: !EnStock}">Agregar al carrito</button>

        <button class="button" @click="QuitarDelCarro" :disabled="carro <= 0" :class="{ disabledButton: carro <= 0 }">Quitar del carro</button>

        </div>
    </div>

    <lista-comentario v-if="comentarios.length" :comentarios="comentarios"></lista-comentario> <!--CON ESTO  :comentarios="comentarios" ENVIO EL ARRAY DE COMENTARIOS
    (LOS : EN :comentarios SON PARA QUE SEA REACTIVO, ES DECIR, SI SE ACTUALIZA EL DATO, LO HARA TAMBIEN EN EL COMPONENTE) HACIA EL COMPONENTE QUE MUESTRA LOS 
    COMENTARIOS EL LISTACOMENTARIO -->

    <comentarios-form @review-submitted="agregarComentario"><comentarios-form><!-- Agrego el componente y escucho el evento que necesito -->

</div>`,
data()
{
    return{
        //carro: 0, ESTO LO COMENTAMOS AQUI, PORQUE NO NECESITAMOS QUE CADA PRODUCTO TENGA SU PROPIO CARRITO DE COMPRAS, TIENE QUE SER GLOBAL
        producto: 'Medias',
        Inventario: 0,
        variedadSeleccionada: 0 ,
        urlMedias: 'https://www.nike.com.ar/medias?_q=medias&map=ft',
        variedades: 
        [
            { id: 2234, color: 'green', imagen: './assets/images/socks_green.jpg', cantidad: 50 }, //0
            { id: 2235, color: 'blue', imagen: './assets/images/socks_blue.jpg', cantidad: 0 },  //1
        ],
        tamanios: ['S  M  L XL'],
        Marca: 'Vue Mastery' ,
        comentarios:[] //ACA SE IRAN GUARDANDO LOS COMENTARIOS DEL PRODUCTO

        //imagen: './assets/images/socks_blue.jpg',  OTRA FORMA DE ACTUALIZAR LA IMAGEN CUANDO PASO POR LOS CIRCULOS
        //EnStock: true,
        //EnVenta: false,
    }
},

methods:
{
   AgregarAlCarro(){
    this.$emit('agregar-al-carro', this.variedades[this.variedadSeleccionada].id) //Paso para la realizacion del evento (explicado en el index.html)
  },

  QuitarDelCarro(){
    this.$emit('quitar-carro') //Paso para la realizacion del evento (explicado en el index.html)
  },

  ActualizaVariedad(indice){ /*El metodo recibe el indice que se envia desde el HTML, dependiendo en que circulo se posicione: Green (Indice = 0) - Blue (Indice 1)*/

        this.variedadSeleccionada = indice /*Aca actualizo la variedadSeleccionada que declare en el Data() con el indice que traigo desde el HTML, ejemplo, si 
                                    @mouseover esta posicionado en el azul, esto sera "1" que se asigna al recorrer el array de objetos y ademas con este indice
                                    sabe que producto del array es y que propiedades tiene es por eso que despues se usa en las Prop Comp para obtener esos datos */   
    },

    agregarComentario(review){ //ESE REVIEW ES EL OBJETO QUE RECIBIMOS DE this.$emit('review-submitted', productoReview)
        this.comentarios.push(review)                    //Y POR ULTIMO VA A CREAR UN COMPONENTE PARA MOSTRAR EL RESULTADO DE COMENTARIOS
    }

    /*actualizaImagen(url){
        this.imagen = url
    } OTRA FORMA DE ACTUALIZAR LA IMAGEN CUANDO PASO POR LOS CIRCULOS */
},

computed:{

    title(){
        return this.Marca + '-' + this.producto //Donde esta title le devuelve estos datos
    },

    imagen(){
        return this.variedades[this.variedadSeleccionada].imagen /*Aca si fuera blue seria: return this.variedades[1].imagen, TOMA EL VALOR DE VariedadSeleccionada,
                    es decir, va al array de objetos variedades y lo que haya en esta posicion con ese atributo lo devuelte para que se pueda mostrar en el HTML*/ 
    },

    EnStock(){
        return this.variedades[this.variedadSeleccionada].cantidad //LO MISMO QUE ARRIBA
    },
    
    tituloEnVenta(){
        if(this.variedades[this.variedadSeleccionada].cantidad > 0){
            return this.Marca + ' - ' + this.producto + ' en venta';
        } else {
            return this.Marca + ' - ' + this.producto + " no esta en venta"
        }
    },

    envio(){ //ESTO LO AGREGO CON LAS PROPS DE LOS COMPONENTES
        if(this.premium){
            return 'Gratis'
        }
        return '$1500'
    },
}
})

/*Los componentes se utilizan para reutilizar codigo, aca lo que veremos es como se crea un componente, llamado componente secundario porque el 
principal es la intancia de VUE.JS. 

El componente principal es responsable de registrar y montar los componentes secundarios, mientras que el componente secundario encapsula la lógica
y la representación visual de un producto específico. Esta estructura modular y jerárquica permite una fácil reutilización y mantenimiento del 
código. El componente secundario tambien puede tener hijos, EJ:

<div class="product-display">
    <h1>{{ tituloEnVenta }}</h1>
    <otro-componente></otro-componente> <!-- Componente hijo anidado -->
</div>.

Este componente secunadrio que creamos, contendra casi todo el codigo principal de la pagina, deja afuera la parte del CARRITO, (que representa la 
cantidad de productos en el carrito) porque eso se tiene que generar una vez, es decir, si yo en el index agrego: 3 veces 
<product-display></product-display> que es el componente que cree, en el NAVEGADOR ME MOSTRARA 3 VECES EL CODIGO, y yo necesito que el CARRITO 
SE MUESTRE UNA SOLA VEZ POR LO QUE SERA GLOBAL.

Ademas utilizamos "props" que las props son la manera de agregar datos desde fuera del componente secundario hacia dentro del componente secudnario
como lo hacemos con la props premium */