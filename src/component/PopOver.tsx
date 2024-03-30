import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon } from '@radix-ui/react-icons';

const PopOver = () => {
    const [open, setOpen] = React.useState(false);
    let leaveTimer = React.useRef();

    const handleMouseEnter = () => {
        clearTimeout(leaveTimer.current); // Timer abbrechen, wenn der Mauszeiger wieder eintritt
        setOpen(true);
    };

    const handleMouseLeave = () => {
        // Einen Timer setzen, der das Popover nach einer kurzen Verzögerung schließt,
        // falls der Mauszeiger nicht zurückkehrt
        leaveTimer.current = setTimeout(() => {
            setOpen(false);
        }, 300); // 300ms Verzögerung gibt dem Nutzer Zeit, zum Popover zu wechseln
    };

    const handleContentEnter = () => {
        clearTimeout(leaveTimer.current); // Verhindern, dass das Popover schließt, wenn man es betritt
    };

    // Vergessen Sie nicht, den Timer bei der Bereinigung der Komponente zu löschen
    React.useEffect(() => {
        return () => clearTimeout(leaveTimer.current);
    }, []);

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="...">
                    Submenu
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    onMouseEnter={handleContentEnter}
                    onMouseLeave={handleMouseLeave}
                    className="rounded p-5 w-[560px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                >
                    <div className="flex flex-col gap-2.5">
                        <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">Dimensions</p>
                        <ul>
                            <li><button className="...">Demo</button></li>
                            <li><button className="...">Demo</button></li>
                            <li><button className="...">Demo</button></li>
                            <li><button className="...">Demo</button></li>
                            <li><button className="...">Demo</button></li>
                        </ul>
                    </div>
                    <Popover.Close
                        className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-pointer"
                        aria-label="Close"
                    >
                        <Cross2Icon />
                    </Popover.Close>
                    <Popover.Arrow className="fill-white" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default PopOver;
