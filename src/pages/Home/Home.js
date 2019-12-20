import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAll, getAllRealTime } from '../../services/database';
import Login from '../Login/Login';
import HomeAdmin from '../HomeAdmin/HomeAdmin';

import './Home.scss';


// CON ESTE FECTH SACAMOS A RESULT LA COLECCIÓN USUARIOS-REGISTRADOS
const fetchData = async () => {
  const result = await getAll('usuarios-registrados');
  return result;
};

// ESTE COMPONENTE NOS MUESTRA LAS COLECCIONES DE LOS USUARIOS Y SI CLICAMOS EN ALGUNA DE ELLAS NOS MUESTRA ESA COLECCIÓN EN
// CONCRETO
function Home({ history }) {
  const user = useSelector((state) => state.user);
  const isAdmin = useSelector((state) => state.isAdmin);
  const [data, setData] = useState({ usuarios: [], cantidadUsuarios: 0 });
  const isLogged = user !== null;
  const [collectionSearch, setCollectionSearch] = useState('');
  const [seeCollection, setSeeCollection] = useState([]);


  useEffect(() => {
    fetchData().then((result) => {
      setData({ usuarios: result, cantidadUsuarios: result.length });
    });
  }, []);

  const enterColeccion = (id) => {
    history.push(`/${id}`);
  };

  useEffect(() => {
    getAllRealTime({
      collection: 'usuarios-registrados',
      filters: { field: 'name', condition: '==', value: collectionSearch },
      callback: (collectionData) => {
        const results = [];
        collectionData.forEach((document) => {
          const col = document.data();
          results.push(col);
        });
        setSeeCollection(results);
      }
    });
  }, [collectionSearch]);

  const handleCollectionSearch = (event) => {
    event.preventDefault();
  };
  // MAP DE DATA PARA SACAR LOS DATOS QUE QUEREMOS DE USUARIOS
  return (
    <div>
      {!isLogged && <Login />}
      {isAdmin && isLogged && <HomeAdmin />}
      {!isAdmin && isLogged && (
      <div className="main-home-user">
        <div className="header-home">
          <div className="panel-busqueda-coleccion">
            <h4>Buscar colección: </h4>
            <form className="form-busqueda-coleccion" onClick={handleCollectionSearch}>
              <input type="text" placeholder="Escribe el usuario..." value={collectionSearch} onChange={(event) => setCollectionSearch(event.target.value)} />
              <input type="submit" value="Buscar Roobinhooker" />
            </form>
          </div>
          <div>
            <button><Link to="userarea">Área de usuario</Link></button>
          </div>
        </div>
        <div>

          <div className="lista-colecciones">
            <ul>
              {seeCollection.map((colBuscada) => (
                <li key={colBuscada.idUser}>
                  <div className="coleccion-individual">
                    <img src={colBuscada.collectionImages[0]} alt={colBuscada.collectionpath} height="140" width="240" />
                    <p>Colección de: {colBuscada.name}</p>
                    <button onClick={() => enterColeccion(colBuscada.idUser)}>Ver colección</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <h2>Colecciones de nuestros Robinhookers</h2>

        <div className="lista-colecciones">
          <ul>
            {data.usuarios.map((users) => (
              <li key={users.id}>
                <div className="coleccion-individual">
                  <img src={users.collectionImages[0]} alt={users.collectionpath} height="140" width="240" />
                  <p>Roobinhooker: <b>{users.name}</b></p>

                  <button onClick={() => enterColeccion(users.id)}>Ver colección</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
      )}
    </div>
  );
}

export default Home;
