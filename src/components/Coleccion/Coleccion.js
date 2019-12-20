import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getItem, addItem, getAllRealTime } from '../../services/database';

import './Coleccion.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// IMPORTAMOS LIBRERIAS


// CREAMOS FUNCIÓN Y COMO PROP LE PASAMOS match QUE NOS SERVIRÁ PARA UNIR LA ID DE LA COLECCIÓN CON LA ID DEL USER
// CONFIGURAMOS TODOS LOS USESTATE QUE NECESITAREMOS
const Coleccion = ({ match }) => {
  const [comentario, setComentario] = useState('');
  const [coleccion, setColeccion] = useState('');
  const [listaComentarios, setListaComentarios] = useState([]);
  const coleccionID = match.params.id;
  const user = useSelector((state) => state.user);
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  // AÑADIMOS UN USEFFECT PARA QUE POR UN LADO COJAMOS LA COLECCIÓN CON LA ID QUE LE PASEMOS Y A LA VEZ, CON EL GETALLREALTIME
  // BUSCAMOS EN LA COLECCIÓN COMENTARIOS LOS CAMPOS QUE NOS INTERESE SACAR, GETALLREALTIME NOS PIDE LA COLECCIÓN, QUE LE
  // INDIQUEMOS EL CAMPO POR EL CUAL QUEREMOS FILTRAR, EL ORDEN DE PINTADO DE LOS RESULTADOS, Y UNA FUNCION CALLBACK, QUE LE ESTAMOS
  // DICIENDO QUE NOS DEVUELVA EN RESULTS LOS DATOS QUE LE HEMOS PEDIDO Y LUEGO SETEAMOS CON SETLISTACOMENTARIOS(RESULTS)
  useEffect(() => {
    const fetchData = async () => {
      const resultColeccion = await getItem('usuarios-registrados', coleccionID);
      setColeccion(resultColeccion);

      getAllRealTime({
        collection: 'comentarios',
        filters: { field: 'coleccionID', condition: '==', value: coleccionID },
        order: 'timestamp',
        callback: (collectionData) => {
          const results = [];
          collectionData.forEach((document) => {
            const data = document.data();
            const messageDate = new Date(data.timestamp);
            data.date = messageDate.toLocaleDateString();
            data.time = messageDate.toLocaleTimeString();
            results.push(data);
          });
          setListaComentarios(results);
        }
      });
    };
    fetchData();
  }, []);

  // CAPTURAMOS LOS DATOS DE LOS COMENTARIOS QUE PONDRÁN LOS USUARIOS Y LO AÑADIMOS CON ADDITEM
  const handleSendComent = async () => {
    const result = await addItem(
      'comentarios',
      { coleccionID, comentario, timestamp: +(new Date()), user: user.name }
    );
    if (result) {
      setComentario('');
    }
  };

  // SI LA API AÚN NO ME HA DADO LA COLECCION, MOSTRAMOS LOADING...
  if (!coleccion) return <div>Loading...</div>;

  // DEFINIMOS LAS CLASES CON LOS DIVS Y HACEMOS UN MAP AL FINAL PARA SACAR TODOS LOS DATOS QUE QUERAMOS DE LA LISTACOMENTARIOS
  // QUE NOS DEVOLVIÓ EL USEEFFECT
  return (
    <div>
      <div className="button-coleccion">
        <button type="button"><Link to="/">Volver a las colecciones</Link></button>
      </div>
      <div className="datos-coleccion">
        <h2>Colección de: {coleccion.name}</h2>
        <div className="datos-coleccion-inferior">
          <div className="datos-coleccion-inferior-left">
              <Slider {...settings}>
                {user.collectionImages.map((imagen) => (
                  <div><img src={imagen} /></div>
                ))}
              </Slider>
          </div>
          <div className="datos-coleccion-inferior-right">
            <p><b>Descripción:</b> <br />{coleccion.descripcion}</p><br />
            <p><b>Gamertags:</b></p>
            <ul>
              <li><b>Xbox:</b> {coleccion.xboxgamertag}</li>
              <li><b>Nintendo:</b> {coleccion.nintendogamertag}</li>
              <li><b>Playstation:</b> {coleccion.ps4gamertag}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="form-comentarios">
        <textarea value={comentario} placeholder="¿Qué te parece la colección?" onChange={(e) => setComentario(e.target.value)} />
        <button type="button" onClick={handleSendComent}>Enviar comentario</button>
      </div>
      <div className="lista-comentarios">
        <ul>
          {listaComentarios.map((coment) => (
            <li key={coment.id}>
              <b><p className="lista-comentarios-usuario">{coment.user} - {coment.date} - {coment.time}</p></b>
              <p className="lista-comentarios-comentario">{coment.comentario}</p>
              <hr />
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Coleccion;
