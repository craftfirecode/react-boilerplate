import {useState} from "react";
import {Link} from "react-router-dom";
import {useSession} from "../context/useSession.tsx";
import {Menu, MenuItem} from "./Dropdown.tsx";

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const loggedIn = useSession();
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="shadow-lg border-100 py-3">
            <div className="container">
                <div className='row'>
                    <div className='col-12'>
                        <div className="flex justify-between items-center">
                            <Link onClick={() => setMenuOpen(false)} to={'/'}>
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0 5C0 2.23858 2.23858 0 5 0H23C25.7614 0 28 2.23858 28 5V23C28 25.7614 25.7614 28 23 28H5C2.23858 28 0 25.7614 0 23V5Z"
                                        fill="url(#paint0_linear_17_14)"/>
                                    <path
                                        d="M19.2 12.9338C19.2 13.5302 19.0496 14.0769 18.749 14.574C18.465 15.071 18.0725 15.4687 17.5713 15.7669C17.0702 16.0651 16.5106 16.2142 15.8926 16.2142H11.2823C11.0819 16.2142 10.9816 16.3219 10.9816 16.5373V21.6568C10.9816 21.9716 10.8647 22.245 10.6308 22.4769C10.4137 22.6923 10.1464 22.8 9.82906 22.8H9.15255C8.83517 22.8 8.55956 22.6923 8.3257 22.4769C8.10855 22.245 7.99998 21.9716 7.99998 21.6568V7.14322C7.99998 6.81186 8.10855 6.53849 8.3257 6.3231C8.55956 6.10772 8.83517 6.00002 9.15255 6.00002H15.8926C16.5106 6.00002 17.0702 6.14914 17.5713 6.44736C18.0725 6.74559 18.465 7.14322 18.749 7.64026C19.0496 8.1373 19.2 8.69233 19.2 9.30535V12.9338ZM16.2434 12.9338V9.30535C16.2434 9.0734 16.1264 8.95742 15.8926 8.95742H11.2823C11.0819 8.95742 10.9816 9.06511 10.9816 9.2805V12.9338C10.9816 13.1491 11.0819 13.2568 11.2823 13.2568H15.8926C16.1264 13.2568 16.2434 13.1491 16.2434 12.9338Z"
                                        fill="white"/>
                                    <defs>
                                        <linearGradient id="paint0_linear_17_14" x1="7.00056e-09" y1="13.6889"
                                                        x2="28.0015"
                                                        y2="13.7658" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#A869FE"/>
                                            <stop offset="0.5142" stopColor="#FF6DAF"/>
                                            <stop offset="1" stopColor="#FFA762"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </Link>
                            <ul className="hidden md:flex items-center space-x-4">
                                {loggedIn ? (
                                    <>
                                        <li>
                                            <Menu className="bg-indigo-300 p-2" label="Edit">
                                                <MenuItem label="Undooooooooooooo" onClick={() => console.log("Undo")}/>
                                                <MenuItem label="Redo" disabled/>
                                                <MenuItem label="Cut"/>
                                                <Menu label="Copy as">
                                                    <MenuItem label="Text"/>
                                                    <MenuItem label="Video"/>
                                                    <Menu label="Image">
                                                        <MenuItem label=".png"/>
                                                        <MenuItem label=".jpg"/>
                                                        <MenuItem label=".svg"/>
                                                        <MenuItem label=".gif"/>
                                                    </Menu>
                                                    <MenuItem label="Audio"/>
                                                </Menu>
                                                <Menu label="Share">
                                                    <MenuItem label="Mail"/>
                                                    <MenuItem label="Instagram"/>
                                                </Menu>
                                            </Menu>
                                        </li>
                                        <li>
                                            <Link to={'/'}>Home</Link>
                                        </li>
                                        <li>
                                            <Link to={'/konto'}>Konto</Link>
                                        </li>
                                        <li>
                                            <Menu label="Edit">
                                                <div className="min-w-[550px]">
                                                    <div
                                                        className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">Dimensions
                                                    </div>
                                                    <div className="row m-0">
                                                        <div className="p-0 col-6">
                                                            <MenuItem className="focus:shadow-violet-700 from-purple-900 to-indigo-900 flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]">
                                                                <svg aria-hidden width="38" height="38"
                                                                     viewBox="0 0 25 25" fill="white">
                                                                    <path
                                                                        d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                                                                    <path d="M12 0H4V8H12V0Z"></path>
                                                                    <path
                                                                        d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                                                                </svg>
                                                                <div
                                                                    className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">
                                                                    Radix Primitives
                                                                </div>
                                                                <p className="text-mauve4 text-[14px] leading-[1.3]">
                                                                    Unstyled, accessible components for React.
                                                                </p>
                                                            </MenuItem>
                                                        </div>
                                                        <div className="pe-0 col-6">
                                                            <MenuItem label="Test"/>
                                                            <MenuItem label="Cut"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <MenuItem label="Undooooooooooooo"
                                                                  onClick={() => console.log("Undo")}/>
                                                        <MenuItem label="Cut"/>
                                                    </div>
                                                </div>
                                            </Menu>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to={'/'}>Login</Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                            <button className="md:hidden focus:outline-none" id="menu-button"
                                    onClick={handleMenuToggle}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={menuOpen ? "block p-3 md:hidden" : "hidden"}>
                <ul>
                    {loggedIn ? (
                        <>
                            <li>
                                <Link onClick={handleMenuToggle} to={'/'}>Home</Link>
                            </li>
                            <li>
                                <Link onClick={handleMenuToggle} to={'/konto'}>Konto</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link onClick={handleMenuToggle} to={'/'}>Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;