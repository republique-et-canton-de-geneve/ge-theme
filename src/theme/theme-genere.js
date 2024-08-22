// Tentative de génération par un outil
export default {
    "breakpoints": {
        "keys": [
            "xs",
            "sm",
            "md",
            "lg",
            "xl"
        ],
        "values": {
            "xs": 0,
            "sm": 600,
            "md": 900,
            "lg": 1200,
            "xl": 1536
        },
        "unit": "px"
    },
    "direction": "ltr",
    "components": {
        "MuiCssBaseline": {
            "defaultProps": {
                "enableColorScheme": true
            },
            "styleOverrides": {
                "*::-webkit-scrollbar": {
                    "display": "none"
                }
            }
        },
        "MuiAccordion": {
            "styleOverrides": {
                "root": {
                    "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                    "border": "0px solid #42474e",
                    "color": "#e2e2e5",
                    "backgroundColor": "#38393c",
                    "&:before": {
                        "backgroundColor": "#38393c",
                        "display": "none"
                    },
                    "&.Mui-disabled": {
                        "backgroundColor": "#2f3033",
                        "color": "#e2e2e5",
                        "border": "0px solid #42474e"
                    },
                    "& .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper ": {
                        "color": "#e2e2e5"
                    }
                }
            }
        },
        "MuiAlert": {
            "defaultProps": {
                "variant": "standard"
            },
            "styleOverrides": {
                "root": {
                    "borderRadius": "20px"
                },
                "standardError": {
                    "background": "#93000a",
                    "color": "#ffdad6"
                },
                "standardInfo": {
                    "background": "#004a76",
                    "color": "#cee5ff"
                },
                "standardWarning": {
                    "background": "#5b4300",
                    "color": "#ffdf9f"
                },
                "standardSuccess": {
                    "background": "#005231",
                    "color": "#92f7bc"
                },
                "filledError": {
                    "background": "#ffb4ab",
                    "color": "#690005"
                },
                "filledInfo": {
                    "background": "#97cbff",
                    "color": "#003353"
                },
                "filledWarning": {
                    "background": "#f8bd26",
                    "color": "#402d00"
                },
                "filledSuccess": {
                    "background": "#76daa1",
                    "color": "#003920"
                },
                "outlinedError": {
                    "color": "#ffb4ab"
                },
                "outlinedInfo": {
                    "color": "#97cbff"
                },
                "outlinedWarning": {
                    "color": "#f8bd26"
                },
                "outlinedSuccess": {
                    "color": "#76daa1"
                }
            }
        },
        "MuiAppBar": {
            "defaultProps": {
                "elevation": 0,
                "color": "default"
            },
            "styleOverrides": {
                "colorDefault": {
                    "background": "#1e2022",
                    "color": "#e2e2e5"
                },
                "colorPrimary": {
                    "background": "#121316",
                    "color": "#e2e2e5"
                }
            }
        },
        "MuiBadge": {
            "defaultProps": {
                "color": "default"
            },
            "variants": [
                {
                    "props": {
                        "color": "default"
                    },
                    "style": {
                        ".MuiBadge-badge": {
                            "backgroundColor": "#ffb4ab",
                            "color": "#690005"
                        }
                    }
                }
            ]
        },
        "MuiButton": {
            "styleOverrides": {
                "root": {
                    "borderRadius": "30px",
                    "textTransform": "none",
                    "fontWeight": "bold",
                    "&:has(>svg)": {
                        "padding": "8px",
                        "borderRadius": "50%",
                        "minWidth": "1em",
                        "minHeight": "1em"
                    }
                }
            },
            "variants": [
                {
                    "props": {
                        "variant": "elevated"
                    },
                    "style": {
                        "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                        "backgroundColor": "#1a1c1e",
                        "color": "#98cbff",
                        "&:hover": {
                            "background": "#25292d",
                            "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
                        },
                        "&:focus": {
                            "background": "#2b3035"
                        },
                        "&:active": {
                            "background": "#2b3035"
                        },
                        "&.Mui-disabled": {
                            "backgroundColor": "rgba(226, 226, 229, 0.12)",
                            "color": "rgba(226, 226, 229, 0.38)",
                            "boxShadow": "none"
                        }
                    }
                },
                {
                    "props": {
                        "variant": "filled"
                    },
                    "style": {
                        "backgroundColor": "#98cbff",
                        "color": "#003354",
                        "boxShadow": "none",
                        "&.Mui-disabled": {
                            "backgroundColor": "rgba(226, 226, 229, 0.12)",
                            "color": "rgba(226, 226, 229, 0.38)",
                            "boxShadow": "none"
                        },
                        "&:hover": {
                            "backgroundColor": "#8bbdef",
                            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
                        },
                        "&:focus": {
                            "backgroundColor": "#85b6e7",
                            "boxShadow": "none"
                        },
                        "&:active": {
                            "backgroundColor": "#85b6e7",
                            "boxShadow": "none"
                        }
                    }
                },
                {
                    "props": {
                        "variant": "tonal"
                    },
                    "style": {
                        "backgroundColor": "#3a4857",
                        "color": "#d5e4f7",
                        "boxShadow": "none",
                        "&.Mui-disabled": {
                            "backgroundColor": "rgba(226, 226, 229, 0.12)",
                            "color": "rgba(226, 226, 229, 0.38)",
                            "boxShadow": "none"
                        },
                        "&:hover": {
                            "backgroundColor": "#455362",
                            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
                        },
                        "&:focus": {
                            "backgroundColor": "#4a5868",
                            "boxShadow": "none"
                        },
                        "&:active": {
                            "backgroundColor": "#4a5868",
                            "boxShadow": "none"
                        }
                    }
                },
                {
                    "props": {
                        "variant": "outlined"
                    },
                    "style": {
                        "color": "#98cbff",
                        "borderColor": "#8c9199",
                        "borderWidth": "1px",
                        "boxShadow": "none",
                        "&.Mui-disabled": {
                            "borderColor": "rgba(226, 226, 229, 0.12)",
                            "color": "rgba(226, 226, 229, 0.38)"
                        },
                        "&:hover": {
                            "backgroundColor": "#1f2126",
                            "borderColor": "#8e95a0"
                        },
                        "&:focus": {
                            "backgroundColor": "#25282e",
                            "borderColor": "#98cbff"
                        },
                        "&:active": {
                            "backgroundColor": "#25282e",
                            "borderColor": "#8f97a3"
                        }
                    }
                },
                {
                    "props": {
                        "variant": "text"
                    },
                    "style": {
                        "backgroundColor": "transparent",
                        "color": "#98cbff",
                        "boxShadow": "none",
                        "padding": "5px 15px",
                        "&.Mui-disabled": {
                            "color": "rgba(226, 226, 229, 0.38)"
                        },
                        "&:hover": {
                            "backgroundColor": "#1f2126"
                        },
                        "&:focus": {
                            "backgroundColor": "#25282e"
                        },
                        "&:active": {
                            "backgroundColor": "#25282e"
                        }
                    }
                }
            ]
        },
        "MuiCard": {
            "styleOverrides": {
                "root": {
                    "borderRadius": "20px",
                    "padding": "10px 6px"
                }
            },
            "variants": [
                {
                    "props": {
                        "variant": "elevation"
                    },
                    "style": {
                        "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                        "backgroundColor": "#1a1c1e",
                        "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        "&:hover": {
                            "background": "#25292d",
                            "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
                        },
                        "&:focus": {
                            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                            "background": "#2b3035"
                        },
                        "&:active": {
                            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                            "background": "#2b3035"
                        },
                        "&.Mui-disabled": {
                            "backgroundColor": "rgba(26, 28, 30, 0.38)",
                            "color": "#42474e",
                            "boxShadow": "none"
                        }
                    }
                },
                {
                    "props": {
                        "variant": "filled"
                    },
                    "style": {
                        "boxShadow": "none",
                        "backgroundColor": "#333538",
                        "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        "&:hover": {
                            "background": "#3c4045",
                            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
                        },
                        "&:focus": {
                            "boxShadow": "none",
                            "background": "#40454b"
                        },
                        "&:active": {
                            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                            "background": "#40454b"
                        },
                        "&.Mui-disabled": {
                            "backgroundColor": "rgba(51, 53, 56, 0.38)",
                            "color": "#42474e",
                            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
                        }
                    }
                },
                {
                    "props": {
                        "variant": "outlined"
                    },
                    "style": {
                        "boxShadow": "none",
                        "backgroundColor": "#121316",
                        "borderColor": "#8c9199",
                        "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        "&:hover": {
                            "background": "#1f2126",
                            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
                        },
                        "&:focus": {
                            "boxShadow": "none",
                            "background": "#25282e"
                        },
                        "&:active": {
                            "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
                            "background": "#40454b"
                        },
                        "&.Mui-disabled": {
                            "borderColor": "rgba(51, 53, 56, 0.12)",
                            "boxShadow": "none"
                        }
                    }
                }
            ]
        },
        "MuiDrawer": {
            "styleOverrides": {
                "paper": {
                    "border": "0px",
                    "background": "#1e2022",
                    "color": "#c2c7cf"
                }
            }
        },
        "MuiFab": {
            "defaultProps": {
                "color": "secondary"
            },
            "styleOverrides": {
                "root": {
                    "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
                    "borderRadius": "18px"
                }
            },
            "variants": [
                {
                    "props": {
                        "color": "primary"
                    },
                    "style": {
                        "backgroundColor": "#004a77",
                        "color": "#cfe5ff",
                        "&:hover": {
                            "background": "#1d5580",
                            "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
                        },
                        "&:focus": {
                            "background": "#275a85",
                            "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
                        },
                        "&:active": {
                            "background": "#275a85",
                            "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
                        }
                    }
                },
                {
                    "props": {
                        "color": "secondary"
                    },
                    "style": {
                        "backgroundColor": "#3a4857",
                        "color": "#d5e4f7",
                        "&:hover": {
                            "background": "#455362",
                            "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
                        },
                        "&:focus": {
                            "background": "#4a5868",
                            "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
                        },
                        "&:active": {
                            "background": "#4a5868",
                            "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
                        }
                    }
                },
                {
                    "props": {
                        "color": "surface"
                    },
                    "style": {
                        "backgroundColor": "#1e2022",
                        "color": "#98cbff",
                        "&:hover": {
                            "background": "#292d31",
                            "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
                        },
                        "&:focus": {
                            "background": "#2e3338",
                            "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
                        },
                        "&:active": {
                            "background": "#2e3338",
                            "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
                        }
                    }
                },
                {
                    "props": {
                        "color": "tertiary"
                    },
                    "style": {
                        "backgroundColor": "#504061",
                        "color": "#efdbff",
                        "&:hover": {
                            "background": "#5b4b6c",
                            "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
                        },
                        "&:focus": {
                            "background": "#615072",
                            "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
                        },
                        "&:active": {
                            "background": "#615072",
                            "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
                        }
                    }
                }
            ]
        },
        "MuiListItem": {
            "styleOverrides": {
                "root": {
                    "paddingTop": 1,
                    "paddingBottom": 1,
                    "& .MuiListItemButton-root": {
                        "paddingTop": 8,
                        "paddingBottom": 8
                    }
                }
            }
        },
        "MuiListItemButton": {
            "styleOverrides": {
                "root": {
                    "borderRadius": 50,
                    "color": "#c2c7cf",
                    "&:hover": {
                        "backgroundColor": "#292b2d",
                        "color": "#c4c9d1"
                    },
                    "&:active": {
                        "backgroundColor": "#2f3235",
                        "color": "#c6cad1"
                    },
                    "&.Mui-selected": {
                        "color": "#d5e4f7",
                        "background": "#3a4857",
                        "& > .MuiListItemText-root > .MuiTypography-root": {
                            "fontWeight": "bold"
                        },
                        "&:hover": {
                            "backgroundColor": "#455362",
                            "color": "#c6d5e8"
                        },
                        "&:active": {
                            "backgroundColor": "#4a5868",
                            "color": "#bfcee0"
                        }
                    }
                }
            }
        },
        "MuiListItemIcon": {
            "styleOverrides": {
                "root": {
                    "color": "inherit",
                    "minWidth": 32,
                    "&.Mui-selected": {
                        "fontWeight": "bold"
                    }
                }
            }
        },
        "MuiMenu": {
            "defaultProps": {
                "color": "default"
            },
            "styleOverrides": {
                "root": {},
                "paper": {
                    "backgroundColor": "#1a1c1e",
                    "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
                    "color": "#e2e2e5"
                }
            }
        },
        "MuiSwitch": {
            "styleOverrides": {
                "root": {
                    "width": 42,
                    "height": 26,
                    "padding": 0,
                    "marginLeft": 12,
                    "marginRight": 8,
                    "borderColor": "#8c9199",
                    "& .MuiSwitch-switchBase": {
                        "padding": 0,
                        "margin": 7,
                        "transitionDuration": "100ms",
                        "&.Mui-checked": {
                            "transform": "translateX(16px)",
                            "margin": 4,
                            "& + .MuiSwitch-track": {
                                "backgroundColor": "#98cbff",
                                "opacity": 1,
                                "border": 0
                            },
                            "& .MuiSwitch-thumb": {
                                "color": "#003354",
                                "width": 18,
                                "height": 18
                            },
                            "&.Mui-disabled + .MuiSwitch-track": {
                                "backgroundColor": "rgba(226, 226, 229, 0.1)"
                            },
                            "&.Mui-disabled .MuiSwitch-thumb": {
                                "color": "rgba(18, 19, 22, 0.8)"
                            }
                        },
                        "&.Mui-focusVisible .MuiSwitch-thumb": {
                            "color": "#98cbff",
                            "border": "6px solid #003354"
                        },
                        "&.Mui-disabled .MuiSwitch-thumb": {
                            "color": "rgba(226, 226, 229, 0.3)"
                        }
                    },
                    "& .MuiSwitch-thumb": {
                        "boxSizing": "border-box",
                        "color": "#8c9199",
                        "width": 12,
                        "height": 12,
                        "&:before": {
                            "content": "''",
                            "position": "absolute",
                            "width": "100%",
                            "height": "100%",
                            "left": 0,
                            "top": 0,
                            "backgroundRepeat": "no-repeat",
                            "backgroundPosition": "center"
                        }
                    },
                    "& .MuiSwitch-track": {
                        "borderRadius": 20,
                        "border": "2px solid #8c9199",
                        "backgroundColor": "#333538",
                        "opacity": 1,
                        "transition": "background .2s"
                    }
                }
            }
        },
        "MuiToggleButton": {
            "styleOverrides": {
                "root": {
                    "borderRadius": "50px",
                    "textTransform": "none",
                    "color": "#e2e2e5",
                    "&.Mui-selected": {
                        "color": "#d5e4f7",
                        "backgroundColor": "#3a4857"
                    },
                    "&.MuiToggleButton-primary": {
                        "borderColor": "transparent"
                    },
                    "&.MuiToggleButton-primary.Mui-selected": {
                        "color": "#003354",
                        "backgroundColor": "#98cbff"
                    }
                }
            }
        },
        "MuiToggleButtonGroup": {
            "styleOverrides": {
                "grouped": {
                    "borderRadius": "50px",
                    "borderColor": "#8c9199",
                    "&:not(:first-of-type)": {
                        "marginLeft": 0,
                        "borderLeft": 0
                    },
                    "&:hover": {
                        "background": "#1f2126"
                    },
                    "&.Mui-selected:hover": {
                        "background": "#455362"
                    }
                }
            }
        },
        "MuiTooltip": {
            "styleOverrides": {
                "tooltip": {
                    "background": "#e2e2e5",
                    "color": "#2f3033"
                }
            }
        }
    },
    "palette": {
        "mode": "light",
        "themeMode": "dark",
        "primary": {
            "main": "#98cbff",
            "contrastText": "#003354",
            "light": "rgb(172, 213, 255)",
            "dark": "rgb(106, 142, 178)"
        },
        "onPrimary": {
            "main": "#003354",
            "contrastText": "#98cbff"
        },
        "primaryContainer": {
            "main": "#004a77",
            "contrastText": "#cfe5ff"
        },
        "onPrimaryContainer": {
            "main": "#cfe5ff",
            "contrastText": "#004a77"
        },
        "secondary": {
            "main": "#b9c8da",
            "contrastText": "#243240",
            "light": "rgb(199, 211, 225)",
            "dark": "rgb(129, 140, 152)"
        },
        "onSecondary": {
            "main": "#243240",
            "contrastText": "#b9c8da"
        },
        "secondaryContainer": {
            "main": "#3a4857",
            "contrastText": "#d5e4f7"
        },
        "onSecondaryContainer": {
            "main": "#d5e4f7",
            "contrastText": "#3a4857"
        },
        "tertiary": {
            "main": "#d4bee6",
            "contrastText": "#392a49"
        },
        "onTertiary": {
            "main": "#392a49",
            "contrastText": "#d4bee6"
        },
        "tertiaryContainer": {
            "main": "#504061",
            "contrastText": "#efdbff"
        },
        "onTertiaryContainer": {
            "main": "#efdbff",
            "contrastText": "#504061"
        },
        "error": {
            "main": "#ffb4ab",
            "contrastText": "#690005",
            "light": "rgb(255, 195, 187)",
            "dark": "rgb(178, 125, 119)"
        },
        "onError": {
            "main": "#690005",
            "contrastText": "#ffb4ab"
        },
        "errorContainer": {
            "main": "#93000a",
            "contrastText": "#ffdad6"
        },
        "onErrorContainer": {
            "main": "#ffdad6",
            "contrastText": "#93000a"
        },
        "primaryFixed": {
            "main": "#cfe5ff"
        },
        "primaryFixedDim": {
            "main": "#98cbff"
        },
        "onPrimaryFixed": {
            "main": "#001d33"
        },
        "onPrimaryFixedVariant": {
            "main": "#004a77"
        },
        "secondaryFixed": {
            "main": "#d5e4f7"
        },
        "secondaryFixedDim": {
            "main": "#b9c8da"
        },
        "onSecondaryFixed": {
            "main": "#0e1d2a"
        },
        "onSecondaryFixedVariant": {
            "main": "#3a4857"
        },
        "tertiaryFixed": {
            "main": "#efdbff"
        },
        "tertiaryFixedDim": {
            "main": "#d4bee6"
        },
        "onTertiaryFixed": {
            "main": "#231533"
        },
        "onTertiaryFixedVariant": {
            "main": "#504061"
        },
        "surface": {
            "main": "#121316",
            "contrastText": "#e2e2e5"
        },
        "onSurface": {
            "main": "#e2e2e5",
            "contrastText": "#121316"
        },
        "surfaceDim": {
            "main": "#121316"
        },
        "surfaceBright": {
            "main": "#38393c"
        },
        "surfaceContainerLowest": {
            "main": "#0c0e11"
        },
        "surfaceContainerLow": {
            "main": "#1a1c1e"
        },
        "surfaceContainer": {
            "main": "#1e2022"
        },
        "surfaceContainerHigh": {
            "main": "#282a2d"
        },
        "surfaceContainerHighest": {
            "main": "#333538"
        },
        "surfaceVariant": {
            "main": "#42474e",
            "contrastText": "#c2c7cf"
        },
        "onSurfaceVariant": {
            "main": "#c2c7cf",
            "contrastText": "#42474e"
        },
        "outline": {
            "main": "#8c9199"
        },
        "outlineVariant": {
            "main": "#42474e"
        },
        "inversePrimary": {
            "main": "#00629d",
            "contrastText": ""
        },
        "inverseOnPrimary": {
            "main": "",
            "contrastText": "#00629d"
        },
        "inverseSurface": {
            "main": "#e2e2e5",
            "contrastText": "#e2e2e5"
        },
        "inverseOnSurface": {
            "main": "#2f3033",
            "contrastText": "#e2e2e5"
        },
        "shadow": {
            "main": "#000000"
        },
        "scrim": {
            "main": "#000000"
        },
        "surfaceTintColor": {
            "main": "#98cbff"
        },
        "background": {
            "default": "#1e2022",
            "paper": "#121316"
        },
        "onBackground": {
            "main": "#e2e2e5"
        },
        "common": {
            "white": "#121316",
            "black": "#e2e2e5"
        },
        "text": {
            "primary": "#e2e2e5",
            "secondary": "#d5e4f7",
            "disabled": "rgba(0, 0, 0, 0.38)"
        },
        "info": {
            "main": "#97cbff",
            "contrastText": "#003353",
            "light": "rgb(171, 213, 255)",
            "dark": "rgb(105, 142, 178)"
        },
        "onInfo": {
            "main": "#003353",
            "contrastText": "#97cbff"
        },
        "infoContainer": {
            "main": "#004a76",
            "contrastText": "#cee5ff"
        },
        "onInfoContainer": {
            "main": "#cee5ff",
            "contrastText": "#004a76"
        },
        "success": {
            "main": "#76daa1",
            "contrastText": "#003920",
            "light": "rgb(145, 225, 179)",
            "dark": "rgb(82, 152, 112)"
        },
        "onSuccess": {
            "main": "#003920",
            "contrastText": "#76daa1"
        },
        "successContainer": {
            "main": "#005231",
            "contrastText": "#92f7bc"
        },
        "onSuccessContainer": {
            "main": "#92f7bc",
            "contrastText": "#005231"
        },
        "warning": {
            "main": "#f8bd26",
            "contrastText": "#402d00",
            "light": "rgb(249, 202, 81)",
            "dark": "rgb(173, 132, 26)"
        },
        "onWarning": {
            "main": "#402d00",
            "contrastText": "#f8bd26"
        },
        "warningContainer": {
            "main": "#5b4300",
            "contrastText": "#ffdf9f"
        },
        "onWarningContainer": {
            "main": "#ffdf9f",
            "contrastText": "#5b4300"
        },
        "divider": "#8c9199",
        "grey": {
            "50": "#fafafa",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#e0e0e0",
            "400": "#bdbdbd",
            "500": "#9e9e9e",
            "600": "#757575",
            "700": "#616161",
            "800": "#424242",
            "900": "#212121",
            "A100": "#f5f5f5",
            "A200": "#eeeeee",
            "A400": "#bdbdbd",
            "A700": "#616161"
        },
        "contrastThreshold": 3,
        "tonalOffset": 0.2,
        "action": {
            "active": "rgba(0, 0, 0, 0.54)",
            "hover": "rgba(0, 0, 0, 0.04)",
            "hoverOpacity": 0.04,
            "selected": "rgba(0, 0, 0, 0.08)",
            "selectedOpacity": 0.08,
            "disabled": "rgba(0, 0, 0, 0.26)",
            "disabledBackground": "rgba(0, 0, 0, 0.12)",
            "disabledOpacity": 0.38,
            "focus": "rgba(0, 0, 0, 0.12)",
            "focusOpacity": 0.12,
            "activatedOpacity": 0.12
        }
    },
    "shape": {
        "borderRadius": 4
    },
    "tones": {
        "primary": {
            "0": "#000000",
            "4": "#000f1e",
            "6": "#001526",
            "10": "#001d33",
            "12": "#00213a",
            "17": "#002c4a",
            "20": "#003354",
            "22": "#00375b",
            "24": "#003c62",
            "30": "#004a77",
            "40": "#00629d",
            "50": "#267cbc",
            "60": "#4996d8",
            "70": "#67b1f4",
            "80": "#98cbff",
            "87": "#bfddff",
            "90": "#cfe5ff",
            "92": "#d9eaff",
            "94": "#e3efff",
            "95": "#e8f1ff",
            "96": "#edf4ff",
            "98": "#f7f9ff",
            "99": "#fcfcff",
            "100": "#ffffff"
        },
        "secondary": {
            "0": "#000000",
            "4": "#020f1c",
            "6": "#061422",
            "10": "#0e1d2a",
            "12": "#13212e",
            "17": "#1d2b39",
            "20": "#243240",
            "22": "#283644",
            "24": "#2d3a49",
            "30": "#3a4857",
            "40": "#526070",
            "50": "#6a7889",
            "60": "#8492a3",
            "70": "#9eadbe",
            "80": "#b9c8da",
            "87": "#cddbee",
            "90": "#d5e4f7",
            "92": "#dbeafd",
            "94": "#e3efff",
            "95": "#e8f1ff",
            "96": "#edf4ff",
            "98": "#f7f9ff",
            "99": "#fcfcff",
            "100": "#ffffff"
        },
        "tertiary": {
            "0": "#000000",
            "4": "#150724",
            "6": "#1b0c2a",
            "10": "#231533",
            "12": "#271937",
            "17": "#322342",
            "20": "#392a49",
            "22": "#3e2e4d",
            "24": "#423352",
            "30": "#504061",
            "40": "#695779",
            "50": "#827093",
            "60": "#9d89ae",
            "70": "#b8a3ca",
            "80": "#d4bee6",
            "87": "#e8d2fa",
            "90": "#efdbff",
            "92": "#f3e2ff",
            "94": "#f7e9ff",
            "95": "#f9ecff",
            "96": "#fbf0ff",
            "98": "#fff7ff",
            "99": "#fffbff",
            "100": "#ffffff"
        },
        "neutral": {
            "0": "#000000",
            "4": "#0c0e11",
            "6": "#121316",
            "10": "#1a1c1e",
            "12": "#1e2022",
            "17": "#282a2d",
            "20": "#2f3033",
            "22": "#333538",
            "24": "#38393c",
            "30": "#45474a",
            "40": "#5d5e61",
            "50": "#76777a",
            "60": "#909094",
            "70": "#aaabae",
            "80": "#c6c6c9",
            "87": "#dadadd",
            "90": "#e2e2e5",
            "92": "#e8e8eb",
            "94": "#eeedf1",
            "95": "#f1f0f4",
            "96": "#f3f3f7",
            "98": "#f9f9fc",
            "99": "#fcfcff",
            "100": "#ffffff"
        },
        "neutralVariant": {
            "0": "#000000",
            "4": "#090f14",
            "6": "#0f1419",
            "10": "#171c22",
            "12": "#1b2026",
            "17": "#252a31",
            "20": "#2c3137",
            "22": "#30353c",
            "24": "#343a40",
            "30": "#42474e",
            "40": "#5a5f66",
            "50": "#72777f",
            "60": "#8c9199",
            "70": "#a7abb3",
            "80": "#c2c7cf",
            "87": "#d6dae2",
            "90": "#dee3eb",
            "92": "#e4e8f1",
            "94": "#eaeef6",
            "95": "#edf1f9",
            "96": "#eff4fc",
            "98": "#f7f9ff",
            "99": "#fcfcff",
            "100": "#ffffff"
        },
        "error": {
            "0": "#000000",
            "4": "#280001",
            "6": "#310001",
            "10": "#410002",
            "12": "#490002",
            "17": "#5c0004",
            "20": "#690005",
            "22": "#710005",
            "24": "#790006",
            "30": "#93000a",
            "40": "#ba1a1a",
            "50": "#de3730",
            "60": "#ff5449",
            "70": "#ff897d",
            "80": "#ffb4ab",
            "87": "#ffcfc9",
            "90": "#ffdad6",
            "92": "#ffe2de",
            "94": "#ffe9e6",
            "95": "#ffedea",
            "96": "#fff0ee",
            "98": "#fff8f7",
            "99": "#fffbff",
            "100": "#ffffff"
        }
    },
    "unstable_sxConfig": {
        "border": {
            "themeKey": "borders"
        },
        "borderTop": {
            "themeKey": "borders"
        },
        "borderRight": {
            "themeKey": "borders"
        },
        "borderBottom": {
            "themeKey": "borders"
        },
        "borderLeft": {
            "themeKey": "borders"
        },
        "borderColor": {
            "themeKey": "palette"
        },
        "borderTopColor": {
            "themeKey": "palette"
        },
        "borderRightColor": {
            "themeKey": "palette"
        },
        "borderBottomColor": {
            "themeKey": "palette"
        },
        "borderLeftColor": {
            "themeKey": "palette"
        },
        "outline": {
            "themeKey": "borders"
        },
        "outlineColor": {
            "themeKey": "palette"
        },
        "borderRadius": {
            "themeKey": "shape.borderRadius"
        },
        "color": {
            "themeKey": "palette"
        },
        "bgcolor": {
            "themeKey": "palette",
            "cssProperty": "backgroundColor"
        },
        "backgroundColor": {
            "themeKey": "palette"
        },
        "p": {},
        "pt": {},
        "pr": {},
        "pb": {},
        "pl": {},
        "px": {},
        "py": {},
        "padding": {},
        "paddingTop": {},
        "paddingRight": {},
        "paddingBottom": {},
        "paddingLeft": {},
        "paddingX": {},
        "paddingY": {},
        "paddingInline": {},
        "paddingInlineStart": {},
        "paddingInlineEnd": {},
        "paddingBlock": {},
        "paddingBlockStart": {},
        "paddingBlockEnd": {},
        "m": {},
        "mt": {},
        "mr": {},
        "mb": {},
        "ml": {},
        "mx": {},
        "my": {},
        "margin": {},
        "marginTop": {},
        "marginRight": {},
        "marginBottom": {},
        "marginLeft": {},
        "marginX": {},
        "marginY": {},
        "marginInline": {},
        "marginInlineStart": {},
        "marginInlineEnd": {},
        "marginBlock": {},
        "marginBlockStart": {},
        "marginBlockEnd": {},
        "displayPrint": {
            "cssProperty": false
        },
        "display": {},
        "overflow": {},
        "textOverflow": {},
        "visibility": {},
        "whiteSpace": {},
        "flexBasis": {},
        "flexDirection": {},
        "flexWrap": {},
        "justifyContent": {},
        "alignItems": {},
        "alignContent": {},
        "order": {},
        "flex": {},
        "flexGrow": {},
        "flexShrink": {},
        "alignSelf": {},
        "justifyItems": {},
        "justifySelf": {},
        "gap": {},
        "rowGap": {},
        "columnGap": {},
        "gridColumn": {},
        "gridRow": {},
        "gridAutoFlow": {},
        "gridAutoColumns": {},
        "gridAutoRows": {},
        "gridTemplateColumns": {},
        "gridTemplateRows": {},
        "gridTemplateAreas": {},
        "gridArea": {},
        "position": {},
        "zIndex": {
            "themeKey": "zIndex"
        },
        "top": {},
        "right": {},
        "bottom": {},
        "left": {},
        "boxShadow": {
            "themeKey": "shadows"
        },
        "width": {},
        "maxWidth": {},
        "minWidth": {},
        "height": {},
        "maxHeight": {},
        "minHeight": {},
        "boxSizing": {},
        "fontFamily": {
            "themeKey": "typography"
        },
        "fontSize": {
            "themeKey": "typography"
        },
        "fontStyle": {
            "themeKey": "typography"
        },
        "fontWeight": {
            "themeKey": "typography"
        },
        "letterSpacing": {},
        "textTransform": {},
        "lineHeight": {},
        "textAlign": {},
        "typography": {
            "cssProperty": false,
            "themeKey": "typography"
        }
    },
    "mixins": {
        "toolbar": {
            "minHeight": 56,
            "@media (min-width:0px)": {
                "@media (orientation: landscape)": {
                    "minHeight": 48
                }
            },
            "@media (min-width:600px)": {
                "minHeight": 64
            }
        }
    },
    "shadows": [
        "none",
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
        "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
        "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
        "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
        "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
        "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
        "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
        "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
        "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
        "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
        "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
        "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
        "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
        "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
        "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
    ],
    "typography": {
        "htmlFontSize": 16,
        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500,
        "fontWeightBold": 700,
        "h1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 300,
            "fontSize": "6rem",
            "lineHeight": 1.167,
            "letterSpacing": "-0.01562em"
        },
        "h2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 300,
            "fontSize": "3.75rem",
            "lineHeight": 1.2,
            "letterSpacing": "-0.00833em"
        },
        "h3": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "3rem",
            "lineHeight": 1.167,
            "letterSpacing": "0em"
        },
        "h4": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "2.125rem",
            "lineHeight": 1.235,
            "letterSpacing": "0.00735em"
        },
        "h5": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1.5rem",
            "lineHeight": 1.334,
            "letterSpacing": "0em"
        },
        "h6": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "1.25rem",
            "lineHeight": 1.6,
            "letterSpacing": "0.0075em"
        },
        "subtitle1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1rem",
            "lineHeight": 1.75,
            "letterSpacing": "0.00938em"
        },
        "subtitle2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "0.875rem",
            "lineHeight": 1.57,
            "letterSpacing": "0.00714em"
        },
        "body1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1rem",
            "lineHeight": 1.5,
            "letterSpacing": "0.00938em"
        },
        "body2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.875rem",
            "lineHeight": 1.43,
            "letterSpacing": "0.01071em"
        },
        "button": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "0.875rem",
            "lineHeight": 1.75,
            "letterSpacing": "0.02857em",
            "textTransform": "uppercase"
        },
        "caption": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.75rem",
            "lineHeight": 1.66,
            "letterSpacing": "0.03333em"
        },
        "overline": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.75rem",
            "lineHeight": 2.66,
            "letterSpacing": "0.08333em",
            "textTransform": "uppercase"
        },
        "inherit": {
            "fontFamily": "inherit",
            "fontWeight": "inherit",
            "fontSize": "inherit",
            "lineHeight": "inherit",
            "letterSpacing": "inherit"
        }
    },
    "transitions": {
        "easing": {
            "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
            "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
            "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
            "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
        },
        "duration": {
            "shortest": 150,
            "shorter": 200,
            "short": 250,
            "standard": 300,
            "complex": 375,
            "enteringScreen": 225,
            "leavingScreen": 195
        }
    },
    "zIndex": {
        "mobileStepper": 1000,
        "fab": 1050,
        "speedDial": 1050,
        "appBar": 1100,
        "drawer": 1200,
        "modal": 1300,
        "snackbar": 1400,
        "tooltip": 1500
    }
};