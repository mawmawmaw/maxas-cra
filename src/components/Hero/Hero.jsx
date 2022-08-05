import './Hero.css';
import heroGif from '../../assets/hero.gif';
import logo from '../../assets/logo-color.png';
const Hero = () => {
    return (
        <div id="hero" className='section'>
            <div className='container'>
                <img src={heroGif} className="main-img" alt="Maxas"/>
                <img src={logo} className="hero-logo" alt="Maxas logo"/>
                <h1>COMING SOON</h1>
            </div>
        </div>
    )
}
export default Hero;