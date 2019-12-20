import React, { useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import uploadFile from '../../services/storage';
import { updateItemDescripcion, updateCollectionItemImagen } from '../../services/database';

import './UserArea.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// ESTE COMPONENTE NOS MUESTRA EL AREA DEL USUARIO QUE HA HECHO LOGIN, CON REDUX USESELECTOR PODEMOS COGER EL USER Y UTILIZARLO
function UserArea() {
  // CONFIGURAMOS NUESTROS USESTATES Y NUESTRO USER CON USESELECTOR DEL STATE DE REDUX
  const user = useSelector((state) => state.user);
  const [fileUploadPercent, setFileUploadPercent] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [userDescription, setUserDescription] = useState(user.descripcion);
  const [userCollection, setUserCollection] = useState(user.collectionpath);
  const [collectionImages, setCollectionImages] = useState(user.collectionImages || []);
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

  // ESTE HANDLE NOS COGE LA URL DE LA IMAGEN QUE HEMOS SUBIDO A FIRESTORE Y LA ACTUALIZAMOS AL COLLECTIONPATH DEL USUARIO
  const handleUploadImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const downloadURL = await uploadFile(file, setFileUploadPercent);
    setUserCollection(downloadURL);
    const newImagesArray = [...collectionImages, downloadURL];
    setCollectionImages(newImagesArray);
    const result = await updateCollectionItemImagen('usuarios-registrados', user.idUser, newImagesArray);
  };

  // ESTE HANDLE NOS ACTUALIZA EL CAMPO DESCRIPCION DEL USUARIO
  const handleAddDescription = async (event) => {
    event.preventDefault();
    setUserDescription(updateDescription);
    const result = await updateItemDescripcion('usuarios-registrados', user.idUser, updateDescription);
    setUpdateDescription('');
  };

  // ESTE IF SI EL USUARIO AÚN NO EXISTE ME MUESTRAS LOADING...
  if (!user) return <div>Loading...</div>;


  // CONFIGURAMOS DIVS Y CLASES PARA MOSTRAR LOS DATOS QUE NECESITAMOS
  return (
    <div className="user-area">
      <h2>Área de usuario</h2>
      <div className="button-usuario">
        <button><Link to="/">Volver al Home</Link></button>
      </div>
      <div className="bloque-area-privada">
        <div className="left-datos-usuario">
          <div className="datos-usuario">
            <h3>Datos usuario:</h3>
            <p><b>name:</b> {user.name}</p>
            <p><b>email:</b> {user.email}</p>
            <p><b>password:</b> {user.password}</p>
            <p><b>xboxgamertag:</b> {user.xboxgamertag}</p>
            <p><b>nintendogamertag:</b> {user.nintendogamertag}</p>
            <p><b>ps4gamertag:</b> {user.ps4gamertag}</p>

          </div>

        </div>
        <div className="middle-datos-usuario">
          <h3>Colección:</h3>
          <p><b>Descripción colección:</b></p>
          <p>{userDescription}</p>
          <p><b>Imagen colección:</b></p>
          <Slider {...settings}>
            {user.collectionImages.map((imagen) => (
              <div><img src={imagen} width="250px" height="170" /></div>
            ))}
          </Slider>
        </div>

        <div className="right-datos-usuario">
          <h3>Añadir colección:</h3>
          <div>
            <form onSubmit={handleAddDescription}>
              <textarea
                placeholder="Describe tu colección..."
                type="text"
                value={updateDescription}
                onChange={(event) => setUpdateDescription(event.target.value)}
              /><br />
              <input type="submit" value="Añadir descripción" />
            </form>
            <h3>Subir colección:</h3>
            <input type="file" onChange={handleUploadImage} />
            <div>{fileUploadPercent}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserArea;
