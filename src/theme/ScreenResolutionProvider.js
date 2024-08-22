import React, { createContext } from "react";
import {useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material-next";

export const ScreenResolutionContext = createContext({});

export const ScreenResolutionProvider = props => {
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'),{noSsr: true});
    const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'),{noSsr: true});
    const isTablet = useMediaQuery(theme.breakpoints.between('sm','md'),{noSsr: true});
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'),{noSsr: true});
    const isDesktopSmall = useMediaQuery(theme.breakpoints.between('md','lg'),{noSsr: true});
    const isDesktopMedium = useMediaQuery(theme.breakpoints.between('lg','xl'),{noSsr: true});
    const isDesktopLarge = useMediaQuery(theme.breakpoints.up('xl'),{noSsr: true});

    return (
        <ScreenResolutionContext.Provider value={{isMobile,isTablet,isDesktopSmall,isDesktopMedium,isDesktopLarge,isNotMobile,isDesktop}}>
            {props.children}
        </ScreenResolutionContext.Provider>
    );
}