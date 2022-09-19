import './Context.css';
import icon from '../../assets/icon-situation.png';
const Context = () => {
    return (
        <div id="situation" className='section'>
            <div className='container'>
                <img src={icon} className="section-icon" alt="Situation section icon" />
                <h2 className='section-title'>Situation</h2>
                <div className='content grid'>
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/9FK6NoEl6po" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <div>
                        <p>There is no industry that generates work for its inhabitants.</p>
                        <p>Most of the men migrate to the United States and nearby cities in search of a better opportunity, leaving their families in extreme poverty.</p>
                        <p>Wirikuta is plagued by megaprojects, tomato growers, chili growers and poultry farms, as well as wind farms that brutally destroy this sacred place.</p>
                        <p>The mining projects that existed currently continue to produce widespread contamination of heavy metals throughout the food chain.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Context;