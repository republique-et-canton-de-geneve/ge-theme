import {frFR as coreFrFR} from "@mui/material/locale";
import {frFR as dataGridFrFR} from '@mui/x-data-grid/locales';
import {frFR as pickersfrFR} from '@mui/x-date-pickers/locales';
import {extendTheme} from "@mui/material-next/styles";
import './css/theme.scss';
import './ge-theme.scss';
import {styled} from "@mui/material-next";
import {Tab, TableRow} from "@mui/material";
import baseTheme from './theme-custom';
import themeComponents from './theme-components-custom';

let geThemeMD3 = extendTheme(baseTheme,
    dataGridFrFR, // x-data-grid translations
    pickersfrFR, // x-date-pickers translations
    coreFrFR // core translations
);

geThemeMD3 = extendTheme( {components: themeComponents(geThemeMD3)}, geThemeMD3);

export default geThemeMD3;

export const HoverTab = styled(Tab)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));

export const tableListStyle = {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: geThemeMD3.vars.palette.common.outline,
    padding: 0,
    maxWidth: "100vw",
    "&>*": {
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderColor: geThemeMD3.vars.palette.common.outline,
    },
    "&>*:first-of-type": {
        borderRadius: "4px 4px 0 0"
    },
    "&>*:last-child": {
        borderBottom: "none",
        borderRadius: "0 0 4px 4px"
    }
};

export const ZebraTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const HoverTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    }
}));
