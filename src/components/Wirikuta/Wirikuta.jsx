import './Wirikuta.css';
import icon from '../../assets/icon-wirikuta.png';
const Wirikuta = () => {
    return (
        <div id="wirikuta" className='section'>
            <div className='container'>
                <h2 className='section-title'>Wirikuta</h2>
                <div className='content grid'>
                    <img src={icon} className="section-icon" alt="Wirikuta section icon" />
                    <div>
                        <p>In the Wixárika worldview, the world is made up of sacred places.</p>
                        <p>It is explained that it all began with a pilgrimage where each of the gods chose their place and made it sacred by remaining there, providing life and energy, thus creating an energy network on which the balance of the planet depends.</p>
                        <p>Wirikuta is one of the most important sacred places, there is the ancient knowledge that the Wirraritarie have acquired through Hikuri, a sacred cactus that teaches good living.</p>
                        <p>Year after year, the Wirraritarie communities recreate the pilgrimage with wich the gods created the world, traveling form their communities in the Sierra Madre Occidental to Wirikuta.</p>
                        <p>This place is a semi-desert located in the state of San Luis Potosí and represents a great wealth for the planet’s biodiversity.</p>
                        <p>In this area is vast majority of the cacti that exist in the world and many of them are endemic, in turn there is a great variety of species of birds and mammals, such as the mexican royal eagle that is in danger of extinction.</p>
                    </div>
                </div>
                <div className='iframe'>
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pTaxmWMv8dk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    )
}
export default Wirikuta;