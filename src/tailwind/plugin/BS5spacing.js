import plugin from "tailwindcss/plugin";

const TailwindUiKitPlugin = plugin(
    function ({addComponents}) {
        const sizes = [
            {nameSpace: '1', value: '0.25'},
            {nameSpace: '2', value: '.5'},
            {nameSpace: '3', value: '1'},
            {nameSpace: '4', value: '1.5'},
            {nameSpace: '5', value: '3'}
        ]; // Adjust sizes as needed

        const utilityClasses = {}; // Objekt zum Sammeln von Utility-Klassen

        // Schleife durch die Größen und Erstellung der Utility-Klassen
        sizes.forEach(size => {
            utilityClasses[`.ms-${size.nameSpace}`] = {marginLeft: `${size.value}rem !important`};
            utilityClasses[`.me-${size.nameSpace}`] = {marginRight: `${size.value}rem !important`};
            utilityClasses[`.mt-${size.nameSpace}`] = {marginTop: `${size.value}rem !important`};
            utilityClasses[`.mb-${size.nameSpace}`] = {marginBottom: `${size.value}rem !important`};

            utilityClasses[`.ps-${size.nameSpace}`] = {paddingLeft: `${size.value}rem !important`};
            utilityClasses[`.pe-${size.nameSpace}`] = {paddingRight: `${size.value}rem !important`};
            utilityClasses[`.pt-${size.nameSpace}`] = {paddingTop: `${size.value}rem !important`};
            utilityClasses[`.pb-${size.nameSpace}`] = {paddingBottom: `${size.value}rem !important`};

            // y - for classes that set both *-top and *-bottom
            utilityClasses[`.my-${size.nameSpace}`] = {
                marginTop: `${size.value}rem !important`,
                marginBottom: `${size.value}rem !important`
            };
            utilityClasses[`.py-${size.nameSpace}`] = {
                paddingTop: `${size.value}rem !important`,
                paddingBottom: `${size.value}rem !important`
            };

        });
        addComponents([utilityClasses]);
    }
);

export default TailwindUiKitPlugin;
