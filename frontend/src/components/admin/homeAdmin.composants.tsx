import React, { useEffect, useState } from 'react';
import axios from '../../api'; // Import the Axios instance
import ProjetComposant from './projetAdmin.composants';
import '../home.css';
import { useNavigate  } from 'react-router-dom';
import { logout } from '../../firebase';

/**
 * interface Projet qui contient les valeurs d'un projet
 */
interface Project {
  _id: string;
  titre: string;
  description?: string;
  date: string;
  id_image: string;
  type: "Sculpture" | "Dessin" | "Peinture";
}

/**
 * Const homeAdmin qui affiche les projets
 * @returns retourne la liste des projet dans une page
 */
export const HomeAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Récupère tout les projets selon le type
     */
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/Projet/recent/3');
        setProjects(response.data.Projet || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log('Projects state:', projects);

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
        <section className="cards">
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project) => (
              <ProjetComposant
                key={project._id}
                id={project._id}
                titre={project.titre}
                description={project.description}
                date={project.date}
                id_image={project.id_image}
                type={project.type}
              />
            ))
          ) : (
            <p>No projects found</p>
          )}
        </section>
      </main>
      <footer>
              <button onClick={handleLogout}>Déconnexion</button>
      </footer>
    </>
  );
};

export default HomeAdmin;
