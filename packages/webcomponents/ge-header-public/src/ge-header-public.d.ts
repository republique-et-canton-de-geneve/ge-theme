import { LitElement } from "lit";

export interface MenuQuickAccessItem {
  label: string;
  url: string;
  variant?: "filled";
}

export interface MenuLink {
  label: string;
  url: string;
}

export interface MenuSection {
  title: string;
  links: MenuLink[];
}

export interface MenuData {
  quickAccess: MenuQuickAccessItem[];
  sections: MenuSection[];
}

export declare class GeHeaderPublic extends LitElement {
  maxWidth: string;
  showMenu: boolean;
  showLogin: boolean;
  loginUrl: string;
  loginLabel: string;
  menuData: MenuData;
}

export declare class GeHeaderPublicMenu extends LitElement {
  menuData: MenuData;
  open: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    "ge-header-public": GeHeaderPublic;
    "ge-header-public-menu": GeHeaderPublicMenu;
  }
}
