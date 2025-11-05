import React from "react";

// The keys for all registered components.
export type ComponentKey =
  | "paragraph"
  | "features"
  | "three-latest-post"
  | "success-story"
  | "four-latest-post"
  | "four-column"
  | "three-column"
  | "two-column"
  | "two-column-35-65"
  | "two-column-65-35"
  | "container"
  | "spacer-horizontal"
  | "ImageSection"
  | "ImageGrid"
  | "ImageWithCaption"
  | "YouTubeVideo";

// The structure for a section in the page layout.
export interface Section {
  id: string;
  type: ComponentKey;
  props: Record<string, any>;
  columns?: Section[][];
}

export interface PageStyles {
  padding: number;
  margin: number;
  minHeight: number;
  minHeightUnit: "px" | "rem" | "em" | "%" | "vh";
  maxHeight: number;
  maxHeightUnit: "px" | "rem" | "em" | "%" | "vh";
}

export interface PropSchema {
  label: string;
  name: string;
  type:
    | "string"
    | "number"
    | "color"
    | "boolean"
    | "select"
    | "textarea"
    | "object"
    | "array"
    | "card-array"
    | "text"
    | "rich-text"
    | "image-array";
  options?: { label: string; value: string | number }[];
  itemSchema?: Record<string, PropSchema>; // For array of objects
}

export interface ComponentConfig {
  name: string;
  component: React.FC<any>;
  defaultProps: Record<string, any>;
  propsSchema: PropSchema[];
  isLayout?: boolean;
  isImage?: boolean;
  isBlock?: boolean;
}

export type PreviewDevice = "desktop" | "tablet" | "mobile" | "mobileSmall";
export interface PageData {
  sections: Section[];
  pageStyles?: PageStyles;
}

