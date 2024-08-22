export default (geThemeMD3) => {
    return {
        MuiBox: {
            styleOverrides: {
                backgroundColor: "red"
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
                variant: "elevation"
            },
            styleOverrides: {
                root: {
                    padding: geThemeMD3.spacing(2),
                    backgroundColor: geThemeMD3.vars.palette.background.paper,
                },
                outlined: {
                    margin: geThemeMD3.spacing(2),
                    backgroundColor: geThemeMD3.vars.palette.background.highlight
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    padding: 16,
                    borderRadius: 12
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: geThemeMD3.spacing(1)
                },
                outlined: {
                    borderColor: geThemeMD3.vars.palette.primary.main
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    margin: geThemeMD3.spacing(1)
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    backgroundColor: "inherit"
                }
            }
        },
        MuiListSubheader: {
            styleOverrides: {
                root: {
                    backgroundColor: "inherit"
                }
            }
        },
        MuiAppBar: {
            defaultProps: {
                color: "inherit"
            },
            styleOverrides: {
                root: {
                    backgroundColor: geThemeMD3.vars.sys.color.background + " !important",
                    boxShadow: "none",
                    userSelect: "none",
                    zIndex: 7,
                    height: "76px",
                    borderBottom: "1px solid " + geThemeMD3.vars.sys.color.outlineVariant
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: geThemeMD3.vars.sys.color.onSecondaryContainer,
                    backgroundColor: geThemeMD3.vars.sys.color.secondaryContainer
                },
                body: {
                    color: geThemeMD3.vars.sys.color.onBackground,
                    backgroundColor: geThemeMD3.vars.sys.color.background
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    backgroundColor: geThemeMD3.vars.sys.color.background
                }
            }
        },
        MuiMenuList: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    backgroundColor: "inherit"
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    backgroundColor: "inherit"
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: geThemeMD3.vars.palette.background.default
                }
            }
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    margin: geThemeMD3.spacing(1)
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    userSelect: "none"
                },
                h1: {
                    color: geThemeMD3.vars.sys.color.onBackground,
                    margin: geThemeMD3.spacing(1)
                },
                h2: {
                    color: geThemeMD3.vars.sys.color.onBackground,
                    margin: geThemeMD3.spacing(1)
                },
                h3: {
                    color: geThemeMD3.vars.sys.color.onBackground,
                    margin: geThemeMD3.spacing(1)
                },
                h4: {
                    color: geThemeMD3.vars.sys.color.onBackground,
                    margin: geThemeMD3.spacing(1)
                },
                h5: {
                    color: geThemeMD3.vars.sys.color.onBackground,
                    margin: geThemeMD3.spacing(1)
                },
                h6: {
                    color: geThemeMD3.vars.sys.color.onBackground,
                    margin: geThemeMD3.spacing(1)
                },
                body1: {
                    color: geThemeMD3.vars.sys.color.onBackground
                },
                subtitle1: {
                    color: geThemeMD3.vars.sys.color.secondary
                },
                subtitle2: {
                    color: geThemeMD3.vars.sys.color.tertiary
                },
                body2: {
                    color: geThemeMD3.vars.sys.color.secondary
                },
                button: {
                    color: geThemeMD3.vars.sys.color.onBackground
                },
                caption: {
                    color: geThemeMD3.vars.sys.color.onBackground
                },
                overline: {
                    color: geThemeMD3.vars.sys.color.onBackground
                }
            }
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    backgroundColor: geThemeMD3.vars.sys.color.background,
                    padding: 0
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 50
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 8
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    minHeight: 0,
                    textTransform: "none",
                    color: geThemeMD3.vars.sys.color.onBackground
                }
            }
        },
        MuiTabPanel: {
            styleOverrides: {
                root: {
                    padding: 0
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    width: "fit-content",
                    margin: geThemeMD3.spacing(1)
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    backgroundColor: "inherit"
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: geThemeMD3.vars.palette.background.default
                }
            }
        },
        MuiTabScrollButton: {
            styleOverrides: {
                root: {
                    color: geThemeMD3.vars.sys.color.onBackground
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: geThemeMD3.vars.palette.background.default
                }
            }
        },
        MuiPopper: {
            styleOverrides: {
                root: {
                    padding: 0
                }
            }
        }
    }
}