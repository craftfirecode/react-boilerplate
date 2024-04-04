type ButtonViewProps = {
    cms: {
        link?: string;
        style?: string;
        content?: string | number;
    };
}

const ButtonView = (cms: ButtonViewProps) => {
    const {link, style, content} = cms.cms;
    return (
        <>
            {style === 'btn-primary' ?
                (
                    <a href={link}
                       className="btn-primary">
                        {content || 'Default Content'}
                    </a>
                )
                :
                (
                    <a href={link} className="btn-outline-primary">
                        <div className="btn-inner">
                            {content || 'Default Content'}
                        </div>
                    </a>
                )
            }
        </>

    );
};

export default ButtonView;