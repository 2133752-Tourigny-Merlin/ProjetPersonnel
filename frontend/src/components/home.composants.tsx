import React from 'react';
import './home.css';

export const Home = () => {
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
          <div className="card">
            <h2>Card 1</h2>
            <p>Card 1 content</p>
          </div>
          <div className="card">
            <h2>Card 2</h2>
            <p>Card 2 content</p>
          </div>
          <div className="card">
            <h2>Card 3</h2>
            <p>Card 3 content</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Your Site Name. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
