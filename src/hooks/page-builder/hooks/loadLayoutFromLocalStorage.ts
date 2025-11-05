import { LOCAL_STORAGE_KEY } from "../../../pages";
import type { PageStyles, Section } from "../../../types/types";
import defaultPageStyles from "src/types/initialPageTypes";

export const loadStateFromLocalStorage = (): {
  sections: Section[];
  pageStyles: PageStyles;
} => {
  try {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // Basic validation to ensure the keys exist and have the correct type
      if (Array.isArray(parsedData.sections)) {
        return {
          sections: parsedData.sections,
          pageStyles: { ...defaultPageStyles, ...parsedData.pageStyles },
        };
      }
    }
  } catch (error) {
    console.error("Failed to load layout from localStorage:", error);
  }

  // Return defaults if nothing is found, data is invalid, or an error occurs
  return { sections: [], pageStyles: defaultPageStyles };
};
