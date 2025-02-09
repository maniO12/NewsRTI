import React from 'react';
import Image from '../Assests/logowhite02.jpg';


const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <div className="home__content">
          <h2 className="home__title">Change begins now.</h2>
          <h1 className="home__heading">Empower Youth, Shape Political Futures</h1>
          <p className="home__description">
            This app enhances political literacy among youth, encouraging informed participation to drive positive social and political change for sustainable development.
          </p>
          <button className="home__button">Be the Change</button>
        </div>
        <div className="home__image">
          <img src={Image} alt="A family playing in the snow" />
        </div>
      </div>

      {/* How the App Works Section */}
      <section className="how-it-works">
        <h2 className="how-it-works__title">How the App Works</h2>
        <p className="how-it-works__description">
          This app offers interactive features to educate and engage the youth in political processes. Here's how it works:
        </p>
        
        {/* Grid of Features */}
        <div className="grid-container">
          <div className="grid-item">
            <div className="card">
              <h3>RTI</h3>
              <p>Learn about Right to Information and how it empowers citizens.</p>
            </div>
          </div>

          <div className="grid-item">
            <div className="card">
              <h3>News</h3>
              <p>Stay updated with the latest political news and events.</p>
            </div>
          </div>

          <div className="grid-item">
            <div className="card">
              <h3>Videos</h3>
              <p>Watch educational videos on political topics and issues.</p>
            </div>
          </div>

          <div className="grid-item">
            <div className="card">
              <h3>Report</h3>
              <p>Report political issues and share your voice for change.</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;

