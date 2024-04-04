type ContentViewProps = {
    content: string | number | undefined;
}

const ContentView = ({cms}: {
    cms: ContentViewProps;
}) => {
    return (
        <p>{cms.content}</p>
    );
}

export default ContentView;

