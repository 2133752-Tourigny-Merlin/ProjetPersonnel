import React, { useEffect, useState } from 'react';
import axios from '../../api'; // Import the Axios instance
import ProjetComposant from './projetAdmin.composants';
import '../home.css';

interface Project {
  _id: string;
  titre: string;
  description?: string;
  date: string; // Date as string from the API
  id_image: string;
  type: "Sculpture" | "Dessin" | "Peinture";
}
export const Sculptures = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/Projet/type/Sculpture');
        console.log('Fetched projects:', response.data);
        // Extract the projects array from the response data
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log('Projects state:', projects);
    return (
        <>
          <header>
            <nav>
              <h2>Sculptures</h2>
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
              <p>&copy; 2024 Your Site Name. All rights reserved.</p>
            </footer>
          </>
          );
};
  
export default Sculptures;