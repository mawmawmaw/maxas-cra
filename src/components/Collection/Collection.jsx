import './Collection.css';
import icon from '../../assets/icon-collection.png';
import img1 from '../../assets/collection-1.png';
import img2 from '../../assets/collection-2.png';
import img3 from '../../assets/collection-3.png';
import img4 from '../../assets/collection-4.png';
const Collection = () => {
    return (
        <div id="collection" className='section'>
            <div className='container'>
                <img src={icon} className="section-icon" alt="Collection section icon" />
                <h2 className='section-title'>Collection</h2>
                <div className='content'>
                    <p>Many moons ago, tucked between the folds of the Huichol mountains in North Central Mexico, the Wixaritari Elders gathered in their high up villages. The atmosphere was heavy with heat and desperation: there was no food, no rain and the grounds were bone-dry. The Elders decided to send four young hunters to scavenge food for the community. Each hunter embodied one of the sacred elements: fire, water, air and earth.</p>
                    <p>Armed with bows and arrows, the hunters walked for days. They were exhausted, dehy- drated and losing hope. Suddenly, a maxa (deer) sprung from the bushes, towering over them in all its splendor. The hunters began to chase it, leaving all their tiredness behind... Little did they know, the deer was compassionate, taking pity on the starving men, making their pursuit easier at times.</p>
                    <p>After weeks of pursuit, they arrived at Wirikuta, the sacred grounds where the world was created and the spirit of the Earth resides. There, glistening like emeralds in the sun, was a large cluster of peyote cacti, formed in the shape of a deer. In his confusion, one of the hunters raised his bow and shot an arrow right into the heart of the plants. Taking this as a sign, the hunters brought the peyote back to their village, where the Elders divided them up amongst the people. Soon after, a miracle occurred, and the people of the town were all cured of their illnesses, hunger, and thirst.</p>
                    <p>To this day, the Wixaritari people worship this very precious peyote medicine, holding the spirit of Kayumari, the blue deer, as their protector and guide.</p>
                </div>
                <div className='content grid gallery'>
                    <img src={img1} alt='Example of Maxas NFT' />
                    <img src={img2} alt='Example of Maxas NFT' />
                    <img src={img3} alt='Example of Maxas NFT' />
                    <img src={img4} alt='Example of Maxas NFT' />
                </div>
            </div>
        </div>
    )
}
export default Collection;