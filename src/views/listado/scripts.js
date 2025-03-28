async function cargarUsuarios() {
    try {
        const respuesta = await fetch('http://181.111.166.250:8081/tp/lista.php?action=BUSCAR'); 
        const usuarios = await respuesta.json();

        const tablaBody = document.querySelector('#tabla-usuarios tbody');

        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.bloqueado}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td><img src="../../../assets/images/dislike.png" width="20px" height="20px" style="cursor: pointer;" onClick="bloquear(${usuario.id}, 'Y')"/></td>
                <td><img src="../../../assets/images/like.png" width="20px" height="20px" style="cursor: pointer;" onClick="bloquear(${usuario.id}, 'N')"/></td>
            `;
            fila.style.backgroundColor = usuario.bloqueado === 'Y' ? '#fd9f8b' : '#cef8c6';
            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

const buscador = document.getElementById('buscador')

buscador.addEventListener('input', async (e) => {
    try {
        const respuesta = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BUSCAR&usuario=${e.target.value}`);
        const usuarios = await respuesta.json();
        if(usuarios.length === 0) {
            alert('No se encontraron usuarios');
            return;
        }
        const tablaBody = document.querySelector('#tabla-usuarios tbody');

        tablaBody.innerHTML = '';

        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.bloqueado}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
            `;
            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al buscar usuarios:', error);
    }
});

const bloquear = async (id, bloqueado) => {
    try {
        const respuesta = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BLOQUEAR&estado=${bloqueado}&idUser=${id}`);
        const usuarios = await respuesta.json();
        cargarUsuarios();
    } catch (error) {
        console.error('Error al bloquear usuario:', error);
    }
}