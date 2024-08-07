/**
 * Fichier ajout.composants.tsx
 * @author Merlin Tourigny
 * Date: 2024/08/07
 * 
 * Formulaire d'ajout
 */
import React, { FormEvent, useState } from 'react';
import '../home.css';
import './formulaire-ajout.css';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AjouterImage from './ajouter-image';
import Axios from '../../api';
import Alert, { AlertColor } from '@mui/material/Alert';
import SupprimerImage from './supprimer-image';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../firebase';

/**
 * composant d'ajout
 * 
 * @returns le formulaire d'ajout
 */
export const Ajout = () => {

  /**
  * Paramètres du projet
  */
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [imageNom, setImageNom] = useState('');
  const [imageId, setImageId] = useState('');
  const [erreurDate, setErreurDate] = useState('');
  const [erreurTitre, setErreurTitre] = useState('');
  const [erreurDescription, setErreurDescription] = useState('');
  const [date, setDate] = useState('');

  /**
  * Message d'erreur
  */
  const [message, setMessage] = useState('');
  const [affichage, setAffichage] = useState("none");
  const [couleur, setCouleur] = useState<AlertColor>('error');
  
  const navigate = useNavigate();

 /**
 * fonction d'envoyer qui sers à envoyer les informations au Backend
 * @param evenement: FromEvent
 */
  const envoyer = async (evenement: FormEvent) => {
    evenement.preventDefault();
    setAffichage('block');

    /**
     * Payload qui contient l'objet à envoyer
     */
    const payload = {
      Projet: {
        id: String,
        titre: titre,
        description: description,
        id_image: imageId,
        date: new Date(date).toISOString(),
        type: type,
      },
    };

    console.log('Form data:', payload);

    try {
      const response = await Axios.post('/api/Projet', payload);
      reinitialiserFormulaire();
      setMessage("Le projet a été ajouté avec succès");
      setCouleur("success");
      navigate('/');
    } catch (error) {
      setMessage("Le projet n'a pas été ajouté du à une erreur de notre part.");
      setCouleur("error");
    }
  };

    /*
    * Réinitialise les valeurs des champs du formulaire
    */
  const reinitialiserFormulaire = () => {
    setTitre('');
    setDescription('');
    setType('');
    miseAJourImages();
  };

  /**
  * Change le message de l'alerte.
  * 
  * @param newMessage 
  */
  function messageRetroaction(newMessage: string) {
    setMessage(newMessage);
    setAffichage('block');
  };

  /**
  * Change la couleur de l'alerte.
  * 
  * @param couleur La couleur.
  */
  function alertCouleur(couleur: AlertColor) {
    setCouleur(couleur);
  }

  /**
  * fonction getImageAjouter qui ajoute l'image à la base de donnée.
  *  
  * Mets le nom dans la variable imageNom
  * Mets l'id dans la variable inageId.
  */
  const getImageAjouter = () => {
    Axios.get('/api/Image/recent/last')
      .then(res => {
        console.log("test" + res.data.image[0]._id + "test:" + res.data.image[0].nom);
        setImageNom(res.data.image[0].nom);
        setImageId(res.data.image[0]._id);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  };

  /**
  * fonction qui met a jour l'image du projet
  *  
  * retire le nom de l'image supprimé.
  * retire l'id de l'image supprimé.
  */
  const miseAJourImages = () => {
    setImageId("");
    setImageNom("");
  };

  /**
  * fonction qui logout le user
  *  retourne a la page d'accueil
  */
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <>
     <header>
            <nav>
              <h2>Accueil</h2>
              <ul>
                <li><a href="/admin">Accueil</a></li>
                <li><a href="/SculpturesAdmin">Sculptures</a></li>
                <li><a href="/DessinsAdmin">Dessins</a></li>
                <li><a href="/PeinturesAdmin">Peintures</a></li>
                <li><a href="/Ajout">Ajouter</a></li>
              </ul>
              <h3>Merlin Tourigny</h3>
            </nav>
        </header>
        <main>
      <form onSubmit={envoyer}>
        <div style={{ display: affichage, marginBottom: 20, color: 'white' }}>
          <Alert id='message-couleur' severity={couleur}>
            <div id='message-liste-document'>
              {message}
            </div>
          </Alert>
        </div>
        <label className='texte'>Le titre du projet:</label>
        <TextField
          id="titre"
          label="Titre"
          variant="outlined"
          value={titre}
          required
          fullWidth
          error={!!erreurTitre}
          helperText={erreurTitre}
          margin="normal"
          onChange={(e) => setTitre(e.target.value)}
        />
        <label className='texte'>Une courte description du projet:</label>
        <TextField
          id='description'
          label="Courte Description"
          variant="outlined"
          value={description}
          required
          fullWidth
          error={!!erreurDescription}
          helperText={erreurDescription}
          margin="normal"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className='texte'>La date du projet:</label>
        <TextField
          id="date"
          label="Date"
          variant="outlined"
          type="date"
          value={date}
          required
          fullWidth
          error={!!erreurDate}
          helperText={erreurDate}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setDate(e.target.value)}
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="Sculpture">Sculpture</MenuItem>
            <MenuItem value="Dessin">Dessin</MenuItem>
            <MenuItem value="Peinture">Peinture</MenuItem>
          </Select>
        </FormControl>

        {imageId ? (
          <div className='images'>
            <label className='document'>Image ajoutée: {imageNom}</label>
            <SupprimerImage id={imageId} nom={imageNom} refresh={miseAJourImages} setMessage={messageRetroaction} setCouleur={alertCouleur} />
          </div>
        ) : (
          <div id='AjoutDocument'>
            <label className='texte'>Ajouter une image: </label>
            <AjouterImage refresh={getImageAjouter} setMessage={messageRetroaction} setCouleur={alertCouleur} />
          </div>
        )}
        <Button
          className='bouton'
          type="submit"
          variant="contained"
          color="primary"
        >
          Publier
        </Button>
      </form>
      </main>
      <footer>
        <button onClick={handleLogout}>Déconnexion</button>
      </footer>
    </>
  );
};

export default Ajout;
