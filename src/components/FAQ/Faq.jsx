import './Faq.css';
import FaqItem from './FaqItem/FaqItem';
const Faq = () => {
    return (
        <div id="faqs" className='section'>
            <div className='container'>
                <h2 className='section-title'>FAQs</h2>
                <div className='content'>
                    <FaqItem title="What does Maxas mean?" content={
                        <p>The word MAXA comes from the indigenous Wirarika dialect, meaning deer.</p>
                    }/>
                    <FaqItem title="How is it helping Wirikuta?" content={
                        <p>The contribution you make when purchasing your avatar goes directly to a fund, which is divided between Wirikuta Synchrony, Maxa Camp and Maxas.xyz, to create a community that helps Wirikuta's rescue, defense, flora and endemic fauna, and of course the improvement of the quality of life of its inhabitants.</p>
                    }/>
                    <FaqItem title="How is the Smart Contract structured? (Wallets, Use of Proceeds, Rights, Governance, etc)" content={
                        <p></p>
                    }/>
                    <FaqItem title="Who is Sincronía Wirikuta?" content={<>
                        <p>A multidisciplinary collective that functions as a bridge between cultures, developing biocultural regeneration projects in Wirikuta.
                        Their extraordinary and voluntary work has been a bridge of communication between the Wirrárikas and other people interested in helping.</p>
                        <p>This group has achieved the systematization and dissemination of information in the media and convocation in social networks, in order to raise funds for the various projects that are being carried out for Wirikuta, in the same way they carry out the logistics of the ceremony of "Renovation of the World". That reached an agreement with Mexico’s Government to preserve Wirikuta land and stop selling it for industrial use.
                        You will find more information at: <a href="https://www.instagram.com/sincroniawirikuta/" title='More info about Sincronia Wirikuta'>https://www.instagram.com/sincroniawirikuta/</a></p>
                    </>}/>
                    <FaqItem title="Who is Maxa Camp?" content={<>
                        <p>A few years ago, we started gathering and bringing this Burning Man camp and community to life, under the guidance of a dear shaman and the spirit of the blue deer. 
                        Our camp and village is a community of friends, near and far, united by threads of creativity, spirituality and the desire to do good and evolve. We create experiences and spaces that nurture deep human connections and help bring awareness of the gifts of service we all have to offer. </p>
                        <p>The friendships in our camp are special; some being decades long, and others just begin- ning to blossom. While some of us are new to the playa and others know the streets of Black Rock City all too well, the merging of our hearts allow our innocence to shine bright enough in this playful experience to illuminate the night sky of the desert. </p>
                    </>}/>
                    <FaqItem title="How do I get involved further?" content={
                        <p>The way in which you are helping these important causes comes not only from the acquisition of our NFTs, but also from your interest in knowing more about this culture, contacting us directly, sharing and commenting on our social channels, talking to your friends about Wirikuta, arousing interest in general and highlighting the importance of movements like this that will guantee our world a thriving future.</p>
                    }/>
                </div>
            </div>
        </div>
    )
}
export default Faq;