import {useEffect, useState} from 'react';
import Builder from "./Builder";
import ApiService from "../../api/ApiService.tsx";

const Page = (pageID: any) => {
    console.log(pageID.pageID)
    const [dataPage, setDataPage] = useState<any>(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchDataPage = async () => {
            try {
                const apiData = await ApiService.fetchGet(`/pages/${pageID.pageID}`, {populate: "deep"});
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

export default Page;
