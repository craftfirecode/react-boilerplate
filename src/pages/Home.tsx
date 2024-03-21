import {useContent} from "../context/ContentContext.tsx";
import {Button} from "../component/Button.tsx";

const Home = () => {
    const content: any = useContent();

    const test = () => {
        alert('Clicked');
    }
    return (
        <div className='container mx-auto'>
            <div className='row'>
                <div className='col'>
                    <h1>{content.title}</h1>
                    <p>{content.description}</p>
                    <Button onClick={test} variant="default">default</Button>
                    <Button onClick={test} variant="secondary">secondary</Button>
                    <Button onClick={test} variant="outline">outline</Button>
                </div>
            </div>
            <div className="row">
                <div className="col-12 md:col-6">col-12 md:col-6</div>
                <div className="col-12 md:col-6">col-12 md:col-6</div>
            </div>
        </div>
    )
}

export default Home;