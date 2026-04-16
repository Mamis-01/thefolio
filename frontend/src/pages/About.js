import Quiz from '../components/Quiz';

export default function About() {
    return (
        <main className="container">
            <section className="about-section">
                <h2>What I Love About Basketball</h2>
                <p>For me, basketball is more than just a game; it is a way of life. Whether it is the sound of the ball snapping through the net or the squeak of sneakers on a hardwood floor, the sport offers a sense of focus and adrenaline that is hard to find anywhere else. I love the strategic depth of the game—how a simple pick-and-roll can open up the entire court.Playing basketball is like a stress-free high! 😍 There's nothing like hitting the court, feeling the rush of the game, and vibing with your squad. From nailing a deep three to making a slick pass, every moment's a highlight 🎯. The sound of sneakers squeaking, the ball bouncing, and the thrill of competition – it's addictive! Plus, it's a killer workout that doesn't feel like exercise 💪🏀. You get to improve your skills, push your limits, and celebrate wins with your crew 👥. Whether you're crushing it or just having fun, basketball's got a way of making you feel alive 🏀. The adrenaline, the laughter, the memories – it's a total mood booster 😊. Loving every minute of it! The energy's contagious, the challenges keep you sharp, and the camaraderie? Priceless 👊. You play for yourself, your team, and the love of the game 🏀.</p>
                
                <img src="/images/pic3.jpeg" alt="My Recent Baskeball Conference in Our Inter Barangay" className="content-img" />
                
                <blockquote>
                    "I've failed over and over and over again in my life. And that is why I succeed." 
                    <cite>— Michael Jordan</cite>
                </blockquote>
            </section>

            <section className="about-section">
                <h2>My Journey with the Game</h2>
                <p>My involvement with basketball has evolved from playing in my driveway to competing in local leagues and organizing weekend games with my closest friends. Here is how my passion has grown over the years:</p>
                <img src="/images/pic2.jpeg" alt="My Baskelball Journey Pics" className="content-img" />
            </section>

            <section className="about-section">
                <h2>Test Your Knowledge!</h2>
                {/* Rendering the React Quiz Component here */}
                <Quiz />
            </section>
        </main>
    );
}