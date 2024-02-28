import {useContent} from "../context/ContentContext.tsx";

const Home = () => {
    const content: any = useContent();

    return (
        <>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            Home
        </>
    )

}

export default Home;