import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ApiService from "../../api/ApiService.tsx";

type PostViewProps = {
    cms: any;
}

function PostView(cms: PostViewProps) {
    const [dataPage, setDataPage] = useState<any>(false);
    const urlParamsObject: any = {
        populate: 'deep',
        filters: {
            category: {
                category: {
                    categoryList: {
                        $eq: cms.cms.category.categoryList
                    }
                }
            },
        },
    };

    useEffect(() => {
        const fetchDataPage = async () => {
            try {
                const apiData = await ApiService.fetchGet(`/posts`, urlParamsObject);
                const newDataPage = apiData.data;
                console.log('Post', newDataPage)
                setDataPage(newDataPage);
            } catch (error) {
                // Fehlerbehandlung
            }
        };

        fetchDataPage().then();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {dataPage && dataPage.map((item: any, index: number) => (
                <div key={index} className="bg-blue-100 text-black rounded-t-[7px] group">
                    <img src={'http://localhost:1337' + item.attributes.img.data.attributes.url}
                         className="group-hover:scale-105 duration-1000" alt="..."/>
                    <div className="p-[15px]">
                        <h4>{item.attributes.title}</h4>
                        <p className="my-[15px]">{item.attributes.description}</p>
                        <Link className="btn-primary text-[16px]" to={'/post/' + item.id}>Anschauen</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostView;

