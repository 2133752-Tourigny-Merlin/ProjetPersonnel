/**
 * Fichier ajout-image.tsx
 * @author Merlin Tourigny
 * Date: 2024/08/07
 * 
 * Formulaire d'ajout d'image
 */
import React, { useState } from 'react';
import Axios from '../../api';
import Button from '@mui/material/Button';
import Input from '@mui/material/OutlinedInput';
import Dialog from '@mui/material/Dialog';
import "./ajouter-image.css";

/**
 * composant d'ajoutImage
 * 
 * @returns le formulaire d'ajout d'image
 */
export default function AjouterImage({ refresh, setMessage, setCouleur }:
  { refresh: any, setMessage: any, setCouleur: any }) {

  const extensions = ["png", "jpeg", "jpg"];
  const [imageSelectioner, setImageSelectioner] = useState<File | null>(null);
  const [affichage, setAffichage] = useState("none");
  const [ouvrirDialog, setOuvrirDialog] = useState(false);

 /**
  * fonction onChangeHandler qui change l'image sélectionné
  *  @param event l'event du formulaire qui contient l'image
  */
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setImageSelectioner(event.target.files[0]);
    }
  }

 /**
  * fonction getExtension qui récupère l'extension de l'image
  *  @param nomImage: string nom de l'image
  *  @returns retourne l'extensio de l'image
  */
  function getExtension(nomImage: string): string {
    const parts = nomImage.split('.');
    return parts[parts.length - 1].toLowerCase();
  }

 /**
  * fonction handleAjoutImage qui ajoute un image par la route
  *  retourne un message d'erreur ou de success
  */
  function handleAjoutImage() {
    if (imageSelectioner != null && extensions.includes(getExtension(imageSelectioner.name))) {
      const formData = new FormData();
      console.log(imageSelectioner);
      formData.append('image', imageSelectioner);

      Axios.post('/api/Image/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          setMessage("L'image a été ajoutée avec succès");
          setCouleur("success");
          refresh();
          setOuvrirDialog(false);
          setAffichage('none');
        })
        .catch(error => {
          setMessage("Une erreur est survenue");
          setCouleur("error");
        });
    } else {
      setAffichage('block');
    }
  
    setImageSelectioner(null);
  }
  
 /**
  * Ferme le dialog de l'ajout d'image
  */
  function fermerDialog() {
    setAffichage("none");
    setOuvrirDialog(false);
  }

  return (
    <div>
      <Button className='droite' color='primary' onClick={() => setOuvrirDialog(true)} variant="contained"> Ajouter</Button>
      <Dialog open={ouvrirDialog} PaperProps={{ sx: { width: "28%", height: "250px", display: "flex", alignItems: "center" } }}>
        <div className='container'>
          <h2>Ajouter une image</h2>
          <p style={{ color: 'red', display: affichage }}>
            Le format de l'image est invalide.<br />Seulement les formats suivant sont acceptés: png, jpeg, jpg
          </p>
          <div>
            <Input color='primary' fullWidth type="file" onChange={onChangeHandler} />
          </div>
          <div className='divEspace'>
            <Button color='primary' variant="text" disabled={!imageSelectioner} onClick={handleAjoutImage}>Ajouter</Button>
            <Button color='primary' variant='text' onClick={fermerDialog}>Annuler</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
