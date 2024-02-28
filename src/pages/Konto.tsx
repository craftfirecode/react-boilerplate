import {useContent} from "../context/ContentContext.tsx";

const Konto = () => {
    const content: any = useContent();

    return (
        <>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            Konto
        </>
    )

}

export default Konto;