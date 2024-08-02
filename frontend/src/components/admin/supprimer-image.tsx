import React, { useState} from 'react';
import Axios from '../../api';
import EffacerIcon from '@mui/icons-material/DeleteOutlined';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';

export default function SupprimerImage({ id, refresh, setMessage, setCouleur }:
    { id: string, nom: string, refresh: any, setMessage: any, setCouleur: any }) {
    const [ouvrirFenetre, setOuvrirFenetre] = useState(false);

    /**
     * Supprime une image dans la base de données.
     * @author Merlin Tourigny
     *  
     * Retourne le message d'erreur dans la variable Message.
     * Retourne la couleur de l'erreur dans la variable Couleur.
     * Retourne l'id du document dans la fonction Refresh.
     * 
     * Ferme le dialog
     */
    function handleSuppression() {
         Axios.delete('/api/Image/' + id)
            .then(res => {
                if (res.status === 200) {
                    setMessage("L'image a été supprimé avec succès");
                    setCouleur("success");
                    refresh(id);
                } else {
                    setMessage("Une erreur est survenue lors de la suppression");
                    setCouleur("error");
                }
            })
            .catch(error => {
                setMessage("Une erreur est survenue lors de la suppression: " + error.message);
                setCouleur("error");
            });
        setOuvrirFenetre(false);
    }
                
    
    return (
        <div>
            {/* 
              Boutton qui est afficher lorsque le composant est appellé.
              Le boutton ouvre le dialog de suppression.
            */}
            <IconButton color="error" onClick={() => setOuvrirFenetre(true)}><EffacerIcon /></IconButton>

            {/* 
              Dialog de suppression
            */}
            <Dialog open={ouvrirFenetre}>
                <div className='flex-container'>
                    <p>Voulez-vous vraiment supprimer cette image ?</p>
                    <div className='droite'>
                        <Button color='error' variant="text" onClick={handleSuppression}>
                            Supprimer
                        </Button>
                        <Button color='primary' variant="text" onClick={() => setOuvrirFenetre(false)}>
                            Annuler
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}