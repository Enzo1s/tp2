const form = document.getElementById('form')
const button = document.getElementById('submitButton')

const usuario = document.getElementById('usuario')
const password = document.getElementById('password')

let formIsValid = {
    usuario: false,
    password: false,

}

form.addEventListener('submit', (e) => {
    e.preventDefault()//prevenimos que al editar el html de consola pueda usar el boton
    validateForm()
})

usuario.addEventListener('change', (e) => {
    console.log(e.target.value)
    if(e.target.value.trim().length > 0) formIsValid = {...formIsValid, usuario: true}
    else formIsValid = {...formIsValid, usuario: false}
    const formValues = Object.values(formIsValid)
    const valid = formValues.findIndex(value => value == false)
    if(valid == -1) button.disabled = false
    else button.disabled = true
})

password.addEventListener('change', (e) => {
    if(e.target.value.trim().length > 0) formIsValid = {...formIsValid, password: true}
    else formIsValid = {...formIsValid, password: false}
    const formValues = Object.values(formIsValid)
    const valid = formValues.findIndex(value => value == false)
    if(valid == -1) button.disabled = false
    else button.disabled = true
})

const login = () => {
    const user = usuario.value
    const pass = password.value
    fetch(`http://181.111.166.250:8081/tp/login.php?user=${user}&pass=${pass}`, {
        method:'POST',
        headers: {
            "Content-type":"application/json"
        }
    }).then(res => res.json())
    .then(data => {
        if(data.respuesta === 'OK') {
            window.location.href = '/src/views/listado/lista.html'
        }
        if(data.respuesta === 'ERROR') alert('Login incorrecto')
    })
}

const validateForm = () => {
    const formValues = Object.values(formIsValid)
    const valid = formValues.findIndex(value => value == false)
    if(valid == -1) login()
    else alert('Form invalid')
}
