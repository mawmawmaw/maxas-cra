import './Faq.css';
import FaqItem from './FaqItem/FaqItem';
const Faq = () => {
    return (
        <div id="faqs" className='section'>
            <div className='container'>
                <h2 className='section-title'>FAQs</h2>
                <div className='content'>
                    <FaqItem title="Question #1" content={
                        <p>Suspendisse vel tempus nibh. Phasellus feugiat, lorem in hendrerit dictum, leo risus ultricies quam, at dapibus massa sapien at augue. Integer ipsum urna, mattis vitae elit in, fermentum tristique ex.</p>
                    }/>
                    <FaqItem title="Question #2" content={
                        <p>Cras dictum erat suscipit tincidunt efficitur. Sed interdum porttitor magna, nec ultrices turpis tincidunt eu.</p>
                    }/>
                    <FaqItem title="Question #3" content={
                        <p>Ut nunc mauris, fringilla vitae tortor non, placerat imperdiet tellus. Suspendisse ante nibh, vehicula ut finibus eu, aliquet a lorem. Proin maximus orci sit amet est cursus, at aliquam sem pretium. Cras vel odio lacinia, egestas sapien ut, egestas est. Nullam ornare dictum erat quis fringilla.</p>
                    }/>
                </div>
            </div>
        </div>
    )
}
export default Faq;