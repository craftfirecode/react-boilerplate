import { Button } from "../component/Button.tsx";
import { useTheme } from "../context/ThemeContext.tsx";
import CtaButton from "../component/CtaButton.tsx";
import useAxios from "../api/ApiService.tsx";
import ButtonFX from "../component/buttonFX.tsx";

const Konto = () => {
    const {theme, toggleTheme} = useTheme();
    const { data, error, loading } = useAxios('https://jsonplaceholder.typicode.com/posts');
    const { data: userData, error: userError, loading: userLoading } = useAxios("https://jsonplaceholder.typicode.com/posts");
    const { data: postsData, error: postsError, loading: postsLoading } = useAxios("https://jsonplaceholder.typicode.com/posts");

    console.log(data, error, loading);
    console.log(userData, userError, userLoading);
    console.log(postsData, postsError, postsLoading);

    const handleChildClick = () => {
        console.log(`Klick erhalten von Konto`);
    };

    return (
        <div className='container mx-auto'>
            <div className='row'>
                <div className='col-auto'>
                    <Button onClick={() => toggleTheme()}>Switch Theme</Button>
                    <ButtonFX onClick={handleChildClick}>Click me</ButtonFX>
                    <ButtonFX>Click me 2</ButtonFX>
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