import React, { useEffect, useState } from 'react';
import axios from '../api'; // Import the Axios instance
import ProjetComposant from './projet.composants';
import './home.css';
import { useNavigate  } from 'react-router-dom';
/**
 * interface Projet qui contient les valeurs d'un projet
 */
interface Project {
  _id: string;
  titre: string;
  description?: string;
  date: string; // Date as string from the API
  id_image: string;
  type: "Sculpture" | "Dessin" | "Peinture";
}

/**
 * Const Home qui affiche les projets
 * @returns retourne la liste des projets dans une page
 */
export const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    /**
     * Récupère les 3 derniers projets
     */
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/Projet/recent/3');
        setProjects(response.data.Projet || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /**
  * fonction qui envoi le user a la page de login
  */
  const handleLogin = () => {
    navigate("/login");
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <header>
        <nav>
          <h2>Accueil</h2>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/Sculptures">Sculptures</a></li>
            <li><a href="/Dessins">Dessins</a></li>
            <li><a href="/Peintures">Peintures</a></li>
          </ul>
          <h3>Merlin Tourigny</h3>
        </nav>
      </header>
      <main>
        <section className="cards">
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project) => (
              <ProjetComposant
                id={project._id}
                key={project._id}
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
              <button onClick={handleLogin}>Connexion</button>
      </footer>
    </>
  );
};

export default Home;
