import { LitElement } from "lit";

export interface UserInfo {
  nom: string;
  prenom: string;
  email: string;
  typeCompte: "PP" | "PM" | string;
}

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

export declare class GeHeader extends LitElement {
  maxWidth: string;
  fullWidth: boolean;
  showMenu: boolean;
  menuData: MenuData;
  userInfo: UserInfo;
}

export declare class GeHeaderNavMenu extends LitElement {
  menuData: MenuData;
  open: boolean;
  constrained: boolean;
  rightAligned: boolean;
  getFocusableElements(): HTMLElement[];
}

export declare class GeHeaderAccountMenu extends LitElement {
  userInfo: UserInfo;
  open: boolean;
  getFocusableElements(): HTMLElement[];
}

declare global {
  interface HTMLElementTagNameMap {
    "ge-header": GeHeader;
    "ge-header-nav-menu": GeHeaderNavMenu;
    "ge-header-account-menu": GeHeaderAccountMenu;
  }
}
