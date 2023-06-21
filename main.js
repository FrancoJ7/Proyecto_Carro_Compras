/* CON EL PRIMER {} CREAMOS EL OBJETO LLAMADO "OPTIONS" QUE INSTANCIA VUE{}, SOBRE ESO AREGAREMOS UNA FUNCION "DATA()" EL CUAL DEVUELVE UN OBJETO CON TODOS NUESTROS DATOS
 */
/*Si llegara a cambiar el valor desde nuestra APP en (main) se actualizara inmediatamente este valor debido a que VUE ES REACTIVO (Maneja las actualizaciones) esto lo
podemos comprobar  en la consola del navegador: mountedApp.producto= 'remera'*/

const app = Vue.createApp({
    data()
    {
        return{
            carro: [],
            premium: false, //ESTO LO AGREGO CON LAS PROPS DE LOS COMPONENTES
        }
    },

    methods:{
        agregarProductoAlCarro(id){ //Paso para la realizacion del evento (explicado en el index.html)
            this.carro.push(id)
        },
        quitarProductoDelCarro(id){
           this.carro.splice(id,1) //Le agrego el 1 para que me vaya borrando de a 1 por vez
        }
    },
})