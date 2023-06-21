app.component('lista-comentario', {

    props:{
        comentarios: { //ACA USA LA PROPS, PARA PODER RECIBIR LOS COMENTARIOS (QUE ES EL ARRAY DE COMENTARIOS QUE A SU VEZ ESOS COMENTARIOS, SON UN OBJETO CON LOS 
            type: Array, //ATRIBUTOS) DESDE EL COMPONENTE PADRE <product-display> PARA PODER UTILIZAR SUS DATOS Y PODER MOSTRARLOS
            required: true
        }
    },

    template:
    /*html*/

    `<div class="review-container">
        <h3>Comentarios: </h3>
        <ul>
            <li v-for="(comentario,indice) in comentarios" :key="indice">
                {{comentario.name}} dio esto {{comentario.rating}} estrellas y {{comentario.recommendation}} recomienda este producto.
                <br/>
                "{{comentario.review}}"
            </li>
        </ul>
    </div>`


})