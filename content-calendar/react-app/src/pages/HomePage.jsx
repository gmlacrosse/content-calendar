import ContentListings from '../componets/ContentListings';
import Hero from '../componets/Hero';
import ViewAllContent from '../componets/ViewAll';

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