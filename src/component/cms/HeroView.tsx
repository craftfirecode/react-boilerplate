import ButtonView from "./ButtonView";

type HeroViewProps = {
    cms: {
        img: {
            data:
                {
                    attributes: {
                        url: string | undefined;
                    };
                };
        };
        vh: string | undefined;
        title: string | number | undefined;
        button: any;
    }
}

const HeroView = (cms: HeroViewProps) => {
    const backgroundStyle: any = {
        backgroundImage: `url(http://localhost:1337${cms.cms.img?.data?.attributes.url || ''})`,
    };

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
        case 'vh-105':
            vh = 'h-[100vh]';
            break;
        default:
            vh = 'h-[25vh]'; // Default to h1 if the value is not in the range 1-6
            break;
    }

    return (
        <div className={`hero bg-cover bg-center ${cms.cms.vh}`} style={backgroundStyle}>
            <div className={"container mx-auto" + " " + vh}>
                <div className="flex h-[100%] flex-col justify-center items-center">
                    <h1 className="text-[45px] text-white">{cms.cms.title}</h1>
                    <div className="w-auto mt-3">
                        {cms.cms.button && <ButtonView cms={cms.cms.button}></ButtonView>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroView;