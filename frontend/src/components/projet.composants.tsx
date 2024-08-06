// src/components/projet.composants.tsx
import React, {useEffect, useState} from 'react';
import './home.css';
import Axios from '../api';
import { useNavigate } from 'react-router-dom';
import Alert, { AlertColor } from '@mui/material/Alert';
interface ProjectProps {
  _id: string;
  titre: string;
  description?: string;
  date: string; // Date as string
  id_image: string;
  type: "Sculpture" | "Dessin" | "Peinture";
}

export const ProjetComposant: React.FC<ProjectProps> = ({
  _id,
  titre,
  description,
  date,
  id_image,
  type,
}) => {
  console.log('Project ID:', _id);
  console.log('Project Titre:', titre);
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [affichage, setAffichage] = useState("none");
  const [couleur, setCouleur] = useState<AlertColor>('error');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await Axios.get(`/api/Image/${id_image}`, {
          responseType: 'blob', // Important: Set response type to 'blob' to handle binary data
        });
  
        // Create a URL for the image blob
        const imageBlob = response.data;
        const imageObjectUrl = URL.createObjectURL(imageBlob);
  
        setImageUrl(imageObjectUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
        setMessage('Failed to load image');
        setCouleur('error');
      }
    };
  
    if (id_image) {
      fetchImage();
    }
  }, [id_image]);
  return (
    <div className="card">
    {message && <Alert severity={couleur}>{message}</Alert>}
    <img src={imageUrl} alt={titre} className="card-image" />
    <div className="card-content">
      <h2>{titre}</h2>
      <p>{description}</p>
      <p>
        <strong>Date:</strong> {new Date(date).toLocaleDateString()}
      </p>
      <p>
        <strong>Type:</strong> {type}
      </p>
    </div>
  </div>
  );
};

export default ProjetComposant;
