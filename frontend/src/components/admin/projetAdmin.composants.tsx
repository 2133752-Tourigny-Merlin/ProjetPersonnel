// src/components/projet.composants.tsx
import React from 'react';
import '../home.css';

interface ProjectProps {
  titre: string;
  description?: string;
  date: string; // Date as string
  id_image: string;
  type: "Sculpture" | "Dessin" | "Peinture";
}

export const ProjetComposant: React.FC<ProjectProps> = ({ titre, description, date, id_image, type }) => {
  ///const imageURL = `${import.meta.env.VITE_API_URL}/images/${id_image}`; // Adjust the URL as necessary
//console.log(imageURL);
  return (
    <div className="card">
      <h2>{titre}</h2>
      <p>{description}</p>
      <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
      <p><strong>Type:</strong> {type}</p>
      {"<img src={imageURL} alt={titre} style={{ width: '200px', height: 'auto' }} />"}
    </div>
  );
};

export default ProjetComposant;
