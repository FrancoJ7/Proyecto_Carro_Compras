app.component('product-details',{

    template:
    /*html*/
    `<div>
    <h3>Detalles:</h3>
    <ul>
      <li v-for="detalle in detalles">{{ detalle }}</li> <!-- Toma el valor que le asignamos en Data en el JS -->
    </ul>
  </div>`,
    data(){
    return{
        detalles: ['50% algodon', '30% LockManager', '20% polieste'],
    }
},
})