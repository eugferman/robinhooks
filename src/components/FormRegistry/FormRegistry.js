import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerAuth, registerAuthObserver } from '../../services/auth';
import { addItemWithId, getItem } from '../../services/database';
import { setUser } from '../../redux/actions/userActions';
import './FormRegistry.scss';
import errorMsg from '../../utils/errorMsg';

let cancelObserver;

const FormRegistry = ({ history }) => {
  const defaultPath = 'https://firebasestorage.googleapis.com/v0/b/robinhooks-eugenio.appspot.com/o/colecciones_de_usuarios%2Fdefault-image.jpg?alt=media&token=89a4c9d2-be43-4312-bcd4-cabe366feb33';
  const defaultDescription = 'Introduce tu descripción...';
  const collectImages = [];
  const [formData, setFormData] = useState({ name: '', email: '', password: '', xboxgamertag: '', nintendogamertag: '', ps4gamertag: '' });
  const [error, setError] = useState('');
  const [errorRegistry, setErrorRegistry] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (cancelObserver) cancelObserver();

    cancelObserver = registerAuthObserver(async (user) => {
      if (user) {
        const profile = await getItem('usuarios-registrados', user.uid);
        if (!profile) {
          const usuario = { name: formData.name,
            email: formData.email,
            password: formData.password,
            xboxgamertag: formData.xboxgamertag,
            nintendogamertag: formData.nintendogamertag,
            ps4gamertag: formData.ps4gamertag,
            descripcion: defaultDescription,
            collectionpath: defaultPath,
            collectionImages: collectImages,
            idUser: user.uid };

          const result = await addItemWithId(
            'usuarios-registrados',
            usuario,
            user.uid
          );
          if (result) {
            dispatch(setUser(usuario));
            history.push('/userarea');
          }
        }
      }
    });

    return () => {
      cancelObserver();
    };
  }, [formData.name, formData.email, formData.password, formData.xboxgamertag, formData.nintendogamertag, formData.ps4gamertag]);

  const handleRegistryForm = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.email || !formData.password || !formData.name) {
      setError('Username, email y password son obligatorios');
    } else {
      const result = registerAuth(formData.email, formData.password);
      result.then((el) => {
        if (el && el.code) {
          const errorUi = errorMsg[el.code];
          setErrorRegistry(errorUi);
        }
      });
    }
  };
  return (
    <section className="form-container">
      <div className="form-registry">
        <h2>Formulario de registro: </h2><br />
        {error && <div className="form-error">{error}</div>}
        {errorRegistry && <div className="form-error">{errorRegistry}</div>}
        <form onSubmit={handleRegistryForm}>
          <input placeholder="Escribe tu username *" type="text" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} /><br />
          <input placeholder="Escribe tu e-mail *" type="text" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} /><br />
          <input placeholder="Escribe tu password *" type="password" value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })} /><br />
          <input placeholder="Escribe tu xbox gamertag" type="text" value={formData.xboxgamertag} onChange={(event) => setFormData({ ...formData, xboxgamertag: event.target.value })} /><br />
          <input placeholder="Escribe tu nintendo gamertag" type="text" value={formData.nintendogamertag} onChange={(event) => setFormData({ ...formData, nintendogamertag: event.target.value })} /><br />
          <input placeholder="Escribe tu ps4 gamertag" type="text" value={formData.ps4gamertag} onChange={(event) => setFormData({ ...formData, ps4gamertag: event.target.value })} /><br />
          <input type="submit" value="Registro" />
        </form>
      </div>

    </section>
  );
};

export default FormRegistry;
