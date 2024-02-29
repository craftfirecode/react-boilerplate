import {useContent} from "../context/ContentContext.tsx";

const Konto = () => {
    const content: any = useContent();

    return (
        <div className='container mx-auto'>
            <div className='row'>
                <div className='col'>
                    <h1>{content.title}</h1>
                    <p>{content.description}</p>
                </div>
            </div>
            Konto
        </div>
    )

}

export default Konto;