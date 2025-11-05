import type { ComponentConfig, ComponentKey } from "../../../types/types";
import { Paragraph } from "../../../components/page-builder/components/Paragraph";
import FeatureList from "../../../components/page-builder/components/FeatureList";
import ThreeLatestPost from "../../../components/page-builder/components/ThreeLatestPost";
import { FourLatestPost } from "../../../components/page-builder/components/FourLatestPost";
import { SuccessStory } from "../../../components/page-builder/components/SuccessStory";
import { FourColumnLayout } from "../../../components/page-builder/components/FourColumnLayout";
import { ThreeColumnLayout } from "../../../components/page-builder/components/ThreeColumnLayout";
import { TwoColumnLayout } from "../../../components/page-builder/components/TwoColumnLayout";
import { TwoColumnLayout35_65 } from "../../../components/page-builder/components/TwoColumnLayout_35_65";
import { TwoColumnLayout65_35 } from "../../../components/page-builder/components/TwoColumnLayout_65_35";
import { ContainerLayout } from "../../../components/page-builder/components/ContainerLayout";
import { SpacingHorizontal } from "../../../components/page-builder/components/SpacingHorizontal";
import { ImageSection } from "../../../components/page-builder/components/ImageSection";
import { ImageGrid } from "../../../components/page-builder/components/ImageGrid";
import { ImageWithCaption } from "../../../components/page-builder/components/ImageWithCaption";
import { YouTubeVideo } from "../../../components/page-builder/components/YouTubeVideo";

const googleFonts = [
  { label: "Roboto", value: "Roboto" },
  { label: "Open Sans", value: "Open Sans" },
  { label: "Lato", value: "Lato" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Oswald", value: "Oswald" },
  { label: "Source Sans Pro", value: "Source Sans Pro" },
  { label: "Slabo 27px", value: "Slabo 27px" },
  { label: "Raleway", value: "Raleway" },
  { label: "Merriweather", value: "Merriweather" },
  { label: "PT Sans", value: "PT Sans" },
  { label: "Playfair Display", value: "Playfair Display" },
  { label: "Poppins", value: "Poppins" },
];


export const fontsEditor = googleFonts.map((font) => font.value);

export const componentRegistry: Record<ComponentKey, ComponentConfig> = {
  YouTubeVideo: {
    name: "YouTube Video",
    component: YouTubeVideo,
    isImage: true,
    defaultProps: {
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      aspectRatio: "16:9",
      autoplay: false,
      showControls: true,
      loop: false,
    },
    propsSchema: [
      { name: "youtubeUrl", label: "YouTube URL", type: "string" },
      {
        name: "aspectRatio",
        label: "Aspect Ratio",
        type: "select",
        options: [
          { label: "16:9 (Widescreen)", value: "16:9" },
          { label: "4:3 (Standard)", value: "4:3" },
          { label: "1:1 (Square)", value: "1:1" },
          { label: "9:16 (Vertical)", value: "9:16" },
        ],
      },
      { name: "autoplay", label: "Autoplay", type: "boolean" },
      { name: "showControls", label: "Show Controls", type: "boolean" },
      { name: "loop", label: "Loop Video", type: "boolean" },
    ],
  },
  ImageWithCaption: {
    name: "Image with Caption",
    component: ImageWithCaption,
    isImage: true,
    defaultProps: {
      src: "https://placehold.co/800x600",
      alt: "Placeholder image with caption",
      caption: "This is a descriptive caption.",
      objectFit: "cover",
      height: 300,
      borderRadius: 3,
    },
    propsSchema: [
      { name: "src", label: "Image URL", type: "string" },
      { name: "alt", label: "Alt Text", type: "string" },
      { name: "caption", label: "Caption", type: "string" },
      { name: "height", label: "Height (px)", type: "number" },
      { name: "borderRadius", label: "Border Radius (px)", type: "number" },
      {
        name: "objectFit",
        label: "Object Fit",
        type: "select",
        options: [
          { label: "Cover", value: "cover" },
          { label: "Contain", value: "contain" },
        ],
      },
    ],
  },
  ImageGrid: {
    name: "Image Grid",
    component: ImageGrid,
    isImage: true,
    defaultProps: {
      title: "Photo Gallery",
      images: [
        { src: "https://placehold.co/400", alt: "Image 1" },
        { src: "https://placehold.co/400", alt: "Image 2" },
        { src: "https://placehold.co/400", alt: "Image 3" },
        { src: "https://placehold.co/400", alt: "Image 4" },
      ],
      columns: 4,
      gap: 16,
      backgroundColor: "#ffffff",
      objectFit: "cover",
    },
    propsSchema: [
      { name: "title", label: "Title", type: "string" },
      { name: "images", label: "Images", type: "image-array" },
      { name: "columns", label: "Number of Columns", type: "number" },
      { name: "gap", label: "Gap (px)", type: "number" },
      { name: "backgroundColor", label: "Background Color", type: "color" },
      {
        name: "objectFit",
        label: "Image Fit",
        type: "select",
        options: [
          { label: "Cover", value: "cover" },
          { label: "Contain", value: "contain" },
        ],
      },
    ],
  },
  ImageSection: {
    name: "Image",
    component: ImageSection,
    isImage: true,
    defaultProps: {
      src: "https://placehold.co/1200x400",
      alt: "Placeholder image",
      padding: 16,
      objectFit: "cover",
      height: 400,
    },
    propsSchema: [
      { name: "src", label: "Image URL", type: "string" },
      { name: "alt", label: "Alt Text", type: "string" },
      { name: "padding", label: "Padding (px)", type: "number" },
      { name: "height", label: "Height (px)", type: "number" },
      {
        name: "objectFit",
        label: "Object Fit",
        type: "select",
        options: [
          { label: "Cover", value: "cover" },
          { label: "Contain", value: "contain" },
          { label: "Fill", value: "fill" },
          { label: "None", value: "none" },
          { label: "Scale Down", value: "scale-down" },
        ],
      },
    ],
  },
  "spacer-horizontal": {
    name: "Spacer-H",
    component: SpacingHorizontal,
    isBlock: true,
    defaultProps: {
      gap: 16,
    },
    propsSchema: [{ name: "gap", label: "Gap", type: "number" }],
  },
  container: {
    name: "Container",
    component: ContainerLayout,
    isLayout: true,
    defaultProps: {
      columns: [[]],
      backgroundColor: "transparent",
      padding: 12,
      gap: 3,
    },
    propsSchema: [
      { name: "backgroundColor", label: "Background Color", type: "color" },
      { name: "padding", label: "Padding", type: "number" },
      { name: "gap", label: "Gap", type: "number" },
    ],
  },
  "two-column": {
    name: "2-Columns",
    component: TwoColumnLayout,
    isLayout: true,
    defaultProps: {
      columns: [[], []],
      backgroundColor: "transparent",
      gap: 16,
      padding: 16,
    },
    propsSchema: [
      { name: "backgroundColor", label: "Background Color", type: "color" },
      { name: "gap", label: "Gap", type: "number" },
      { name: "padding", label: "Padding", type: "number" },
    ],
  },
  "two-column-35-65": {
    name: "2-Columns 35/65",
    component: TwoColumnLayout35_65,
    isLayout: true,
    defaultProps: {
      columns: [[], []],
      backgroundColor: "transparent",
      gap: 16,
      padding: 16,
    },
    propsSchema: [
      { name: "backgroundColor", label: "Background Color", type: "color" },
      { name: "gap", label: "Gap", type: "number" },
      { name: "padding", label: "Padding", type: "number" },
    ],
  },
  "two-column-65-35": {
    name: "2-Columns 65/35",
    component: TwoColumnLayout65_35,
    isLayout: true,
    defaultProps: {
      columns: [[], []],
      backgroundColor: "transparent",
      gap: 16,
      padding: 16,
    },
    propsSchema: [
      { name: "backgroundColor", label: "Background Color", type: "color" },
      { name: "gap", label: "Gap", type: "number" },
      { name: "padding", label: "Padding", type: "number" },
    ],
  },
  "three-column": {
    name: "3-Columns",
    component: ThreeColumnLayout,
    isLayout: true,
    defaultProps: {
      columns: [[], [], []],
      backgroundColor: "transparent",
      gap: 16,
      padding: 16,
    },
    propsSchema: [
      { name: "backgroundColor", label: "Background Color", type: "color" },
      { name: "gap", label: "Gap", type: "number" },
      { name: "padding", label: "Padding", type: "number" },
    ],
  },
  "four-column": {
    name: "4-Columns",
    component: FourColumnLayout,
    isLayout: true,
    defaultProps: {
      columns: [[], [], [], []],
      backgroundColor: "transparent",
      gap: 16,
      padding: 16,
    },
    propsSchema: [
      { name: "backgroundColor", label: "Background Color", type: "color" },
      { name: "gap", label: "Gap", type: "number" },
      { name: "padding", label: "Padding", type: "number" },
    ],
  },

  paragraph: {
    name: "Paragraph",
    component: Paragraph,
    isBlock: true,
    defaultProps: {
      text: "This is a paragraph. You can edit this text by clicking on it. Use the properties panel on the right to change its style, including font, size, color, alignment, and line height. This component allows for flexible and rich text content on your page.",
      fontFamily: "Roboto",
      fontSize: 16,
      textColor: "#333333",
      textAlign: "left",
      lineHeight: 1.5,
      padding: 1,
    },
    propsSchema: [
      { name: "text", label: "Text", type: "rich-text" },
      {
        name: "fontFamily",
        label: "Font Family [Global]",
        type: "select",
        options: googleFonts,
      },
      { name: "fontSize", label: "Font Size (px) [Global]", type: "number" },
      { name: "textColor", label: "Text Color [Global]", type: "color" },
      {
        name: "textAlign",
        label: "Text Align",
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
          { label: "Justify", value: "justify" },
        ],
      },
      { name: "lineHeight", label: "Line Height", type: "number" },
      { name: "padding", label: "Padding (px)", type: "number" },
    ],
  },
  features: {
    name: "Feature List",
    component: FeatureList,
    isBlock: true,
    defaultProps: {
      title: "Our Features",
      items: ["Feature One", "Feature Two", "Feature Three"],
      titleFontSize: 28,
      itemFontSize: 16,
      titleFontFamily: "Roboto",
      itemFontFamily: "Roboto",
      padding: 32,
      borderRadius: 2,
      backgroundColor: "#ffffff",
      backgroundColorItem: "#dbdbdb",
      iconColor: "#2ebee9",
      titleFontColor: "#272727ff",
      itemsFontColor: "#272727ff",
    },
    propsSchema: [
      { name: "title", label: "Title", type: "string" },
      {
        name: "titleFontFamily",
        label: "Title Font Family",
        type: "select",
        options: googleFonts,
      },
      { name: "titleFontColor", label: "Title FontColor", type: "color" },
      { name: "titleFontSize", label: "Title Font Size (px)", type: "number" },
      { name: "items", label: "Items (one per line)", type: "array" },
      { name: "itemsFontColor", label: "Items Font Color", type: "color" },
      { name: "itemFontSize", label: "Items Font Size (px)", type: "number" },
      {
        name: "itemFontFamily",
        label: "Items Font Family",
        type: "select",
        options: googleFonts,
      },
      { name: "padding", label: "Padding (px)", type: "number" },
      { name: "borderRadius", label: "Border Radius (px)", type: "number" },
      { name: "backgroundColor", label: "Background Color", type: "color" },
      {
        name: "backgroundColorItem",
        label: "Background Color Items",
        type: "color",
      },
      { name: "iconColor", label: "Icon Color", type: "color" },
    ],
  },
  "three-latest-post": {
    name: "3 Latest Post (Lite)",
    component: ThreeLatestPost,
    isBlock: true,
    defaultProps: {
      limit: 3,
      title: "Latest Posts",
      showExcerpt: true,
      showDate: true,
      textAlign: "left",
      padding: 2,
      fontFamily: "Roboto",
      titleColor: "#1e2222ff",
    },
    propsSchema: [
      { name: "title", label: "Title", type: "string" },
      {
        name: "fontFamily",
        label: "Font Family",
        type: "select",
        options: googleFonts,
      },
      { name: "titleColor", label: "Title Color", type: "color" },
      { name: "padding", label: "Padding (px)", type: "number" },
      {
        name: "textAlign",
        label: "Text Align",
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
          { label: "Justify", value: "justify" },
        ],
      },
    ],
  },
  "four-latest-post": {
    name: "4 Latest Post",
    component: FourLatestPost,
    isBlock: true,
    defaultProps: {
      limit: 4,
      title: "Latest Posts",
      showExcerpt: true,
      showDate: true,
      textAlign: "left",
      padding: 2,
      fontFamily: "Roboto",
      titleColor: "#1e2222ff",
    },
    propsSchema: [
      { name: "title", label: "Title", type: "string" },
      {
        name: "fontFamily",
        label: "Font Family",
        type: "select",
        options: googleFonts,
      },
      { name: "titleColor", label: "Title Color", type: "color" },
      { name: "padding", label: "Padding (px)", type: "number" },
      {
        name: "textAlign",
        label: "Text Align",
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
          { label: "Justify", value: "justify" },
        ],
      },
    ],
  },
  "success-story": {
    name: "Success Story",
    component: SuccessStory,
    isBlock: true,
    defaultProps: {
      title: "Success Story",
      subtitle:
        "PUMA presents the latest shoes from its collection. Light & comfortable made with highly durable material.",
      titleFontFamily: "Georgia",
      titleFontSize: 42,
      titleColor: "#008080",
      subtitleFontFamily: "Helvetica",
      subtitleFontSize: 16,
      subtitleColor: "#555555",
      backgroundColor: "#F9F6F1",
      padding: 48,
      cards: [
        {
          imageUrl:
            "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600",
          title: "John Smith",
          subtitle: "PUMA presents the latest shoes from its collection.",
          slug: "#john-smith",
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600",
          title: "Adam Lambert",
          subtitle: "PUMA presents the latest shoes from its collection.",
          slug: "#adam-lambert",
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600",
          title: "Kenny Stewart",
          subtitle: "PUMA presents the latest shoes from its collection.",
          slug: "#kenny-stewart",
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600",
          title: "Michael Stevenson",
          subtitle: "PUMA presents the latest shoes from its collection.",
          slug: "#michael-stevenson",
        },
      ],
    },
    propsSchema: [
      { name: "title", label: "Title", type: "string" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      {
        name: "fontFamily",
        label: "Font Family",
        type: "select",
        options: googleFonts,
      },
      { name: "titleFontSize", label: "Title Font Size (px)", type: "number" },
      { name: "titleColor", label: "Title Color", type: "color" },
      {
        name: "subtitleFontFamily",
        label: "Subtitle Font Family",
        type: "select",
        options: googleFonts,
      },
      {
        name: "subtitleFontSize",
        label: "Subtitle Font Size (px)",
        type: "number",
      },
      { name: "subtitleColor", label: "Subtitle Color", type: "color" },
      { name: "backgroundColor", label: "Background Color", type: "color" },
      { name: "padding", label: "Padding (px)", type: "number" },
      { name: "cards", label: "Post Cards", type: "card-array" },
    ],
  },
};
