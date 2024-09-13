import { Button } from "../component/Button.tsx";
import { useTheme } from "../context/ThemeContext.tsx";
import CtaButton from "../component/CtaButton.tsx";
import ButtonFX from "../component/buttonFX.tsx";

const Konto = () => {
    const {theme, toggleTheme} = useTheme();
    const handleChildClick = () => {
        console.log(`Klick erhalten von Konto`);
    };

    return (
        <div className='container mx-auto'>
            <div className='row'>
                <div className='col-auto'>
                    <Button onClick={() => toggleTheme()}>Switch Theme</Button>
                </div>
                <div className="col">
                    <div className="bg-red-200 p-[6px] rounded-md shadow">
                        Currently Theme is {theme}
                    </div>
                </div>
                <div>
                    <CtaButton></CtaButton>
                </div>
            </div>
        </div>
    )
}

export default Konto;