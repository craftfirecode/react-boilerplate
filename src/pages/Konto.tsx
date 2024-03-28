import {Button} from "../component/Button.tsx";
import {useTheme} from "../context/ThemeContext.tsx";
import CtaButton from "../component/CtaButton.tsx";

const Konto = () => {
    const {theme, toggleTheme} = useTheme();

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