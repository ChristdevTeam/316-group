export interface MenuItem {
  type: "link" | "subheading" | "divider" | "text";
  label?: string; // For link, subheading, and text
  href?: string; // For links only
  description?: string; // For explanatory text under links
}

export interface MenuSection {
  title: string;
  hasMegaMenu: boolean;
  items?: MenuItem[];
  href?: string;
}
