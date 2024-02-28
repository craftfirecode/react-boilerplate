import {useContent} from "../context/ContentContext.tsx";

const Dashboard = () => {
    const content: any = useContent();

    return (
        <>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            Home
        </>
    )

}

export default Dashboard;