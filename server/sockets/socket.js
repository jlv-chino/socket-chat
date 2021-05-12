const {io} = require('../server');
const {Usuarios} = require('../classes/usuarios')

const usuarios = new Usuarios()

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback)=>{

        if(!data.nombre){
            return callback({
                error: true,
                mensaje: 'Se necesita un nombre'
            })
        }

        let personas = usuarios.agregarPersona(client.id, data.nombre)

        client.broadcast.emit('listaPersonas', usuarios.getPersonas())

        callback(personas)
    })

    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona(client.id)

        client.broadcast.emit('crearMensaje', {usuario: 'Admin', mensaje: `${personaBorrada.nombre} se ha desconectado`})
        client.broadcast.emit('listaPersonas', usuarios.getPersonas())
    })

})