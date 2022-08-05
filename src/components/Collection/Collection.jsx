import './Collection.css';
import icon from '../../assets/icon-collection.png';
const Collection = () => {
    return (
        <div id="collection" className='section'>
            <div className='container'>
                <h2 className='section-title'>Collection</h2>
                <div className='content grid'>
                    <img src={icon} className="section-icon" alt="Collection section icon" />
                    <div>
                        <p>Vivamus sem arcu, gravida eget consectetur in, maximus euismod quam. Quisque pretium viverra purus. Curabitur consequat massa sit amet augue varius volutpat. Aenean maximus erat id dignissim semper. Pellentesque in ornare leo, a porttitor tellus. Nunc sit amet lectus sit amet nisl iaculis efficitur. Fusce fringilla odio a efficitur tincidunt. Mauris semper nunc et est pellentesque aliquam.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Collection;