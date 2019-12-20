import React from 'react';
import GetUsers from '../../components/GetUsers/GetUsers';

import './HomeAdmin.scss';

// COMPONENTE QUE NOS MUESTRA TODOS LOS USUARIOS DEL COMPONENTE GETUSERS, EL BOTÓN ELIMINAR USUARIO ES PARA RECARGAR LA PÁGINA
// FORMA MUY CAMPESINA DE ACTUALIZAR LOS USUARIOS.
function HomeAdmin() {
  return (
    <div>
      <div>
        <h2>Admin dashboard</h2>
      </div>
      <div>
        <GetUsers />
      </div>
    </div>
  );
}

export default HomeAdmin;
