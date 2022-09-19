import './About.css';
import { Link } from "react-router-dom";
import icon from '../../assets/icon-about.png';
const About = () => {
    return (
        <div id="about" className='section'>
            <div className='container'>
                <img src={icon} className="section-icon" alt="About section icon" />
                <h2 className='section-title'>About</h2>
                <div className='content centered'>
                    <p>Our NFT project is made up of a group of creatives who firmly believe in this social cause.</p>
                    <p>The first collection of our avatar was developed.</p>
                    <p>- The blue deer - Important deity of the Wixárika culture.</p>
                    <p>Our main objetive is to raise funds to create a support platform for sustainable regenerative projects in Wirikuta community.</p>
                </div>
                <div className='button'>
                    <Link to="/register">Save the Date</Link>
                </div>
            </div>
        </div>
    )
}
export default About;