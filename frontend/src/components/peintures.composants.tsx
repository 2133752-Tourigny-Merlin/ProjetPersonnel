import React, { useEffect, useState } from 'react';
import axios from '../api'; // Import the Axios instance
import ProjetComposant from './projet.composants';
import './home.css';

interface Project {
  _id: string;
  titre: string;
  description?: string;
  date: string; // Date as string from the API
  id_image: string;
  type: "Sculpture" | "Dessin" | "Peinture";
}
export const Peintures = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/Projet/type/Peinture');
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
                <h2>Peintures</h2>
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
  
export default Peintures;
  