import ContentListings from '../componets/ContentListings';
import Hero from '../componets/Hero';
import ViewAllContent from '../componets/ViewAllContent';

const HomePage = () => {
    return (
        <>
            <Hero />
            <ContentListings isHome={true}/>
            <ViewAllContent />
        </>
    )
}

export default HomePage