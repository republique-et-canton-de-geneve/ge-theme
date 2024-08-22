import * as React from "react";
import {useColorScheme} from "@mui/material-next";
import LogoGEFooterDark from "../icons/footer-logo-dark.svg";
import LogoGEFooterLight from "../icons/footer-logo-light.svg";
import {useContext} from "react";
import {ScreenResolutionContext} from "./ScreenResolutionProvider";

export const ModeSwitcher = () => {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    const { isMobile } = useContext(ScreenResolutionContext);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // for server-side rendering
        // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
        return null;
    }

    const switcherOnClick = () => {
        if (mode === 'light') {
            setMode('dark');
        } else {
            setMode('light');
        }
    };

    const switcherLogoStyle = { height: "50px", margin: isMobile? "8px 16px" : "8px 32px", textAlign: "left" };

    return (
        <>
            {/*<div id="header-mode" style={{visibility: "hidden"}}>{mode}</div>*/}
            {mode === 'light' && <LogoGEFooterLight id="logo-ge-footer" style={switcherLogoStyle} onClick={switcherOnClick}/>}
            {mode === 'dark' && <LogoGEFooterDark id="logo-ge-footer" style={switcherLogoStyle} onClick={switcherOnClick}/>}
        </>
    );
};
