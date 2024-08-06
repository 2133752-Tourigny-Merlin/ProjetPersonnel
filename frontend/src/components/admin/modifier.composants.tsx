import React, { FormEvent, useEffect, useState } from 'react';
import '../home.css';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AjouterImage from './ajouter-image';
import Axios from '../../api';
import Alert, { AlertColor } from '@mui/material/Alert';
import SupprimerImage from './supprimer-image';
import { useNavigate, useParams } from 'react-router-dom';
import { logout } from '../../firebase';



const Modifier: React.FC<{}> = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [imageNom, setImageNom] = useState('');
  const [imageId, setImageId] = useState('');
  const [erreurDate, setErreurDate] = useState('');
  const [erreurTitre, setErreurTitre] = useState('');
  const [erreurDescription, setErreurDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [affichage, setAffichage] = useState("none");
  const [couleur, setCouleur] = useState<AlertColor>('error');
  
  const navigate = useNavigate();
  const { _id: projectId } = useParams<{ _id: string }>();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  useEffect(() => {
    if (projectId) {
      Axios.get(`/api/Projet/${projectId}`)
        .then(res => {
          const projet = res.data.projet;
          setTitre(projet.titre);
          setDescription(projet.description);
          setType(projet.type);
          setDate(projet.date.split('T')[0]); // Format date to yyyy-MM-dd
          setImageNom(projet.imageNom);
          setImageId(projet.id_image);
        })
        .catch(error => {
          console.error('Error fetching project:', error);
          setError('Failed to fetch project');
        });
    } else {
      console.error('No project ID provided');
      setError('No project ID provided');
    }
  }, [projectId]);
  
  const envoyer = async (evenement: FormEvent) => {
    evenement.preventDefault();
    setAffichage('block');
  
    if (!projectId) {
      setError('Project ID is missing');
      return;
    }
  
    const payload = {
      Projet: {
        _id: projectId,
        titre: titre,
        description: description,
        id_image: imageId,
        date: new Date(date).toISOString(), // Ensure correct format
        type: type,
      },
    };
  
    console.log('Form data:', payload);
  
    try {
      const response = await Axios.put(`/api/Projet/`, payload);
      console.log('Project updated:', response.data);
      reinitialiserFormulaire();
      setMessage("Le projet a été modifié avec succès");
      setCouleur("success");
      navigate('/');
    } catch (error) {
      console.error('Error updating project:', error);
      setMessage("Le projet n'a pas été modifié du à une erreur de notre part.");
      setCouleur("error");
    }
  };
  
  const reinitialiserFormulaire = () => {
    setTitre('');
    setDescription('');
    setType('');
    miseAJourImages();
  };

  function messageRetroaction(newMessage: string) {
    setMessage(newMessage);
    setAffichage('block');
  };
  
  function alertCouleur(couleur: AlertColor) {
    setCouleur(couleur);
  }

  const getImageAjouter = () => {
    Axios.get('/api/Image/recent/last')
      .then(res => {
        if (res.data && res.data.image && res.data.image.length > 0) {
          const recentImage = res.data.image[0];
          console.log("Fetched image ID:", recentImage._id, "Name:", recentImage.nom);
          setImageNom(recentImage.nom);
          setImageId(recentImage._id);
        } else {
          console.error('No recent image found');
        }
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  };

  const miseAJourImages = () => {
    setImageId("");
    setImageNom("");
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
      <form onSubmit={envoyer}>
        <h1 className='titre'>Modifier un article</h1>
        <div style={{ display: affichage, marginBottom: 20, color: 'white' }}>
          <Alert id='message-couleur' severity={couleur}>
            <div id='message-liste-document'>
              {message}
            </div>
          </Alert>
        </div>
        <label className='texte'>Le titre de l'article:</label>
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
        <label className='texte'>Une courte description de l'article:</label>
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
            {/* Add more options as needed */}
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
          Modifier
        </Button>
      </form>
    </>
  );
};

export default Modifier;
