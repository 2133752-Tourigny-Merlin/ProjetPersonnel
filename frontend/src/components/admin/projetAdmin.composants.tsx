import React, { useState, useEffect } from 'react';
import '../home.css';
import Axios from '../../api';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Alert, { AlertColor } from '@mui/material/Alert';

interface ProjectProps {
  _id: string;
  titre: string;
  description?: string;
  date: string;
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
  

  const handleUpdate = () => {
    navigate(`/modifier/${_id}`);
  };

  const handleDelete = async () => {
    try {
      console.log(_id);
      await Axios.delete(`/api/Projet/${_id}`);
      setMessage('Project deleted successfully');
      setCouleur('success');
      navigate("/");
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage('Failed to delete project');
      setCouleur('error');
    }
  };

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
      <div className="card-actions">
        <IconButton onClick={handleUpdate} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} color="secondary">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ProjetComposant;
