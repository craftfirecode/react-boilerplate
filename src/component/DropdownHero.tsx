import {
    FloatingFocusManager,
    FloatingPortal,
    autoUpdate,
    flip,
    offset,
    safePolygon,
    shift, useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions
} from "@floating-ui/react";
import {useState} from "react";

const DropdownHero = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            offset({mainAxis: isOpen ? 0 : 4, alignmentAxis: isOpen ? -4 : 0}),
            flip(),
            shift()
        ],
        whileElementsMounted: autoUpdate
    });

    const dismiss = useDismiss(context, {bubbles: true});

    const focus = useFocus(context);

    const hover = useHover(context, {
        enabled: true,
        delay: {open: 75},
        handleClose: safePolygon({blockPointerEvents: true})

    });

    const {getReferenceProps, getFloatingProps} = useInteractions([
        hover, focus, dismiss
    ]);

    return (
        <>
            <button className="focus:shadow-violet-700 " ref={refs.setReference} {...getReferenceProps()}>Button
            </button>
            {isOpen && (
                <FloatingPortal>
                    <FloatingFocusManager context={context} modal={false}>
                        <div
                            className="bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] min-w-[450px] p-2.5 rounded"
                            ref={refs.setFloating} style={floatingStyles}  {...getFloatingProps()}>
                            <div className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">Dimensions</div>
                            <div className="row m-0">
                                <div className="p-0 col-6">
                                    <a
                                        className="focus:shadow-violet-700 from-purple-900 to-indigo-900 flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                                        href="/"
                                    >
                                        <svg aria-hidden width="38" height="38" viewBox="0 0 25 25" fill="white">
                                            <path
                                                d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                                            <path d="M12 0H4V8H12V0Z"></path>
                                            <path
                                                d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                                        </svg>
                                        <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">
                                            Radix Primitives
                                        </div>
                                        <p className="text-mauve4 text-[14px] leading-[1.3]">
                                            Unstyled, accessible components for React.
                                        </p>
                                    </a>
                                </div>
                                <div className="pe-0 col-6">
                                    <ul>
                                        <li>
                                            <button className="...">Demo</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </FloatingFocusManager>
                </FloatingPortal>

            )}
        </>
    );
}

export default DropdownHero;