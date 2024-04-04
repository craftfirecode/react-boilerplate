import {useEffect, useState} from 'react';
import ButtonView from "./ButtonView";

type VHeroViewProps = {
    cms: {
        file: {
            data: {
                attributes: {
                    url: string | null | undefined
                }
            }
        };
        link: string | null;
        mask: {
            data: {
                attributes: {
                    url: string;
                }
            }
        }
        vh: string;
        content: string | number | undefined;
        button: any;
    };
}

const VHeroView = (cms: VHeroViewProps) => {
    const [link, setLink] = useState("");

    const maskBackgroundStyle = {
        backgroundImage: `url(http://localhost:1337${cms.cms.mask?.data?.attributes.url || ''})`,
    };

    useEffect(() => {
        console.log(cms.cms);

        if (cms.cms.file.data === null || cms.cms.link === null) {
            setLink("");
        }

        if (cms.cms.link !== null) {
            setLink(cms.cms.link);
        }

        if (cms.cms.file.data !== null) {
            setLink('http://localhost:1337' + '' + cms.cms.file.data.attributes.url);
        }
    }, [cms.cms]);

    let vh: any;

    switch (cms.cms.vh) {
        case 'vh-25':
            vh = 'h-[25vh]';
            break;
        case 'vh-50':
            vh = 'h-[50vh]';
            break;
        case 'vh-75':
            vh = 'h-[75vh]';
            break;
        case 'vh-100':
            vh = 'h-[100vh]';
            break;
        default:
            vh = 'h-[25vh]'; // Default to h1 if the value is not in the range 1-6
            break;
    }

    return (
        <div className={vh + " " + "relative"}>
            <div className="absolute top-0 w-full h-full" style={maskBackgroundStyle}></div>
            <div
                className="absolute left-0 right-0 top-0 bottom-0 flex-col justify-center items-center flex align-items">
                {cms.cms.content && <h1 className="relative z-[1]">{cms.cms.content}</h1>}
                {cms.cms.button ? (
                    <div className="mt-3 relative z-[1]">
                        <ButtonView cms={cms.cms.button}></ButtonView>
                    </div>
                ) : null
                }
            </div>
            <video className="h-full" title="video" muted loop autoPlay width="100%" height="100%"
                   style={{objectFit: 'cover'}}
                   src={link}></video>
        </div>
    );
}

export default VHeroView;