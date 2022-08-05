import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Collection from '../../components/Collection/Collection';
import About from '../../components/About/About';
import Wirikuta from '../../components/Wirikuta/Wirikuta';
import Context from '../../components/Context/Context';
import Faq from '../../components/FAQ/Faq';
import Footer from '../../components/Footer/Footer';
const Landing = () => {
    return (
        <>
        <Header/>
        <Hero />
        <About />
        <Collection />
        <Wirikuta />
        <Context />
        <Faq />
        <Footer />
        </>
    )
}
export default Landing;