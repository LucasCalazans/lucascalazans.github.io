import React from 'react';
import profile from '../images/profile3.jpg';
import landingBackground from '../images/background3.jpg';

const Landing = () => (
    <section className="landing">
        <img className="landing-background" src={ landingBackground } alt="Background image used on landing section" />
        <div className="landing-profile">
            <img className="landing-profile-img" src={ profile } alt="Author profile picture" />
        </div>
        {/*<span className="landing-title">Lucas Calazans</span>*/}
        {/*<strong className="landing-description"><span className="marked">wannabe</span> Front-end Developer, Traveler, Skater... 😁</strong>*/}
    </section>
);

export default Landing;