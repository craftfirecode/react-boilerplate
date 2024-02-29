import {useContent} from "../context/ContentContext.tsx";

const Home = () => {
    const content: any = useContent();

    return (
        <div className='container mx-auto'>
            <div className='row'>
                <div className='col'>
                    <h1>{content.title}</h1>
                    <p>{content.description}</p>
                </div>
            </div>
            Home
        </div>
    )

}

export default Home;