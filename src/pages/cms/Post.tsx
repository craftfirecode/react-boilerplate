import {useEffect, useState} from 'react';
import Builder from "./Builder";
import {useParams} from "react-router-dom";
import ApiService from "../../api/ApiService.tsx";

const Post = (pageID: any) => {
    const [dataPage, setDataPage] = useState<any>(false);
    const [ready, setReady] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchDataPage = async () => {
            try {
                const apiData = await ApiService.fetchGet(`/posts/${id}`, {populate: "deep"});
                const newDataPage = apiData.data.attributes.cms;
                // console.log('Builder', newDataPage)
                setDataPage(newDataPage);
                setReady(true);

            } catch (error) {
                // Fehlerbehandlung
            }
        };

        fetchDataPage().then();
    }, [pageID.pageID]);


    if (ready) {
        return (
            <>
                <Builder data={dataPage}/>
            </>);
    } else {
        return <></>
    }

}

export default Post;
