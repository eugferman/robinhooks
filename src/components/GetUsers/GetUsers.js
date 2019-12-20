import React, { useState, useEffect } from 'react';
import { deleteItem, getAllRealTime } from '../../services/database';

import './GetUsers.scss';

// GETUSERS QUE HACEMOS UN USEEFFECT PARA SACAR LOS USUARIOS Y SETEARLOS AL DATA
function GetUsers() {
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      getAllRealTime({
        collection: 'usuarios-registrados',
        callback: (collectionData) => {
          const results = [];
          collectionData.forEach((document) => {
            const data = document.data();
            results.push(data);
          });
          setListaUsuarios(results);
        }
      });
    };
    fetchData();
  }, []);

  // HACEMOS UN MAP DE DATA PARA SACAR LOS DATOS QUE QUEREMOS
  return (
    <div>
      <div className="lista-usuarios">
        <ul>
          {listaUsuarios.map((users) => (
            <li key={users.idUser}>
              <p>Name: {users.name}</p>
              <p>Email: {users.email}</p>
              <button onClick={() => deleteItem('usuarios-registrados', users.idUser)}>Seleccionar usuario</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GetUsers;
