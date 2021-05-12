var socket = io()
var params = new URLSearchParams(window.location.search)

if(!params.has('nombre')){
    window.location = 'index.html'
    throw new Error('Se necesita un nombre')
}

var usuario = {
    nombre: params.get('nombre')
}

socket.on('connect', function() {
    console.log('Conectado al servidor')

    socket.emit('entrarChat', usuario, function(resp){
        console.log('Usuarios conectados', resp)
    })
})

socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor')
})

socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp)
})

socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje)

})

socket.on('listaPersonas', function(personas) {

    console.log(personas)
})