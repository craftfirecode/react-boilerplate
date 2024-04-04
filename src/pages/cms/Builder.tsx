import React, {useEffect, useState} from 'react';
import AccordionView from "../../component/cms/AccordionView.tsx";
import ContentView from "../../component/cms/ContentView.tsx";
import ModalView from "../../component/cms/ModalView.tsx";
import ContentImageView from "../../component/cms/ContentImageView.tsx";
import PostView from "../../component/cms/PostView.tsx";
import VHeroView from "../../component/cms/VHeroView.tsx";
import HeroView from "../../component/cms/HeroView.tsx";
import ButtonView from "../../component/cms/ButtonView.tsx";
import HeadlineView from "../../component/cms/HeadlineView.tsx";
import MarginView from "../../component/cms/MarginView.tsx";
import ListView from "../../component/cms/ListView.tsx";


const Builder = (prop: any) => {
    const [dataPage, setDataPage] = useState<any>(false);
    const [ready, setReady] = useState(false);

    console.log(prop.data)
    useEffect(() => {
        setDataPage(prop.data);
        setReady(true);
    }, [prop.data]);
    const renderComponent = (component: any) => {
        switch (component.__component) {
            case 'cms.accordion':
                return (
                    <div className="container mx-auto">
                        <AccordionView cms={component}/>
                    </div>
                );
            case 'cms.content':
                // @ts-ignore
                return (
                    <div className="container mx-auto">
                        <ContentView cms={component}/>
                    </div>
                );
            case 'cms.modal':
                return (
                    <div className="container mx-auto">
                        <ModalView cms={component}/>
                    </div>
                );
            case 'cms.content-image':
                return (
                    <div className="container mx-auto">
                        <ContentImageView cms={component}/>
                    </div>
                );
            case 'cms.post-category':
                return (
                    <div className="container mx-auto">
                        <PostView cms={component}/>
                    </div>
                );
            case 'cms.v-hero':
                return (
                    <VHeroView cms={component}/>
                );
            case 'cms.hero':
                return (
                    <HeroView cms={component}/>
                );
            case 'cms.button':
                return (
                    <div className="container mx-auto">
                        <ButtonView cms={component}/>
                    </div>
                );
            case 'cms.headline':
                return (
                    <div className="container mx-auto">
                        <HeadlineView cms={component}/>
                    </div>
                );
            case 'cms.margin':
                return (
                    <MarginView cms={component}/>
                );
            case 'cms.list':
                return (
                    <div className="container mx-auto">
                        <ListView cms={component}/>
                    </div>
                );
            default:
                return null;
        }
    };

    if (ready) {
        return (
            <>
                {dataPage.map((component: any, index: any) => (
                    <React.Fragment key={index}>
                        {renderComponent(component)}
                    </React.Fragment>
                ))}
            </>);
    } else {
        return <></>
    }
}

export default Builder;
