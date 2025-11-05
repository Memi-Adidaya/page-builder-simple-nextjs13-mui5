import React, { useCallback, ChangeEvent } from "react";
import {
  Box,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
  IconButton,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { componentRegistry } from "../../hooks/page-builder/registry/registry";
import type { Section, PropSchema } from "../../types/types";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import { fontsEditor } from "../../hooks/page-builder/registry/registry";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

interface PropInputProps {
  schema: PropSchema;
  value: any;
  onChange: (value: any) => void;
}

const PropInput: React.FC<PropInputProps> = ({ schema, value, onChange }) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (schema.type === "number") {
      onChange(Number(e.target.value));
    } else if (schema.type === "boolean") {
      onChange((e.target as HTMLInputElement).checked);
    } else {
      onChange(e.target.value);
    }
  };

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  const handleArrayChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value.split("\n");
    onChange(newValue);
  };

  switch (schema.type) {
    case "string":
    case "number":
    case "color":
      return (
        <TextField
          fullWidth
          type={schema.type === "string" ? "text" : schema.type}
          size="small"
          value={value ?? ""}
          onChange={handleChange}
        />
      );

    case "boolean":
      return (
        <Checkbox
          checked={!!value}
          onChange={handleChange}
          color="primary"
          sx={{ height: 32, width: 32 }}
        />
      );

    case "textarea":
      return (
        <TextField
          fullWidth
          multiline
          rows={4}
          size="small"
          value={value ?? ""}
          onChange={handleChange}
        />
      );

    case "rich-text":
      return (
        <SunEditor
          onChange={handleEditorChange}
          defaultValue={value ?? ""}
          setDefaultStyle="font-family:Roboto; font-size:16px;"
          setOptions={{
            fontSize: [8, 10, 12, 14, 16, 18, 20, 24, 32, 36, 48],
            font: fontsEditor,
            mode: "classic",
            height: "300px",
            buttonList: [
              ["font", "fontSize", "formatBlock"],
              ["bold", "underline", "italic", "strike"],
              ["fontColor", "list", "link", "fullScreen"],
            ],
          }}
        />
      );

    case "array":
      const numRows = Array.isArray(value) ? Math.max(4, value.length + 1) : 4;

      return (
        <TextField
          fullWidth
          multiline
          rows={numRows}
          size="small"
          value={Array.isArray(value) ? value.join("\n") : ""}
          onChange={handleArrayChange}
          placeholder="Enter one item per line"
          InputProps={{
            sx: {
              fontFamily: "monospace",
              fontSize: "0.875rem",
            },
          }}
        />
      );

    case "select":
      return (
        <Select
          fullWidth
          size="small"
          value={value}
          onChange={handleChange as any}
        >
          {schema.options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      );

    case "card-array":
      const cards = Array.isArray(value) ? value : [];

      const handleCardChange = (
        index: number,
        field: string,
        fieldValue: string
      ) => {
        const newCards = [...cards];
        newCards[index] = { ...newCards[index], [field]: fieldValue };
        onChange(newCards);
      };

      const addCard = () => {
        const newCard = {
          imageUrl: "https://placehold.co/400x300",
          title: "New Card",
          subtitle: "Description",
          slug: "#",
        };
        onChange([...cards, newCard]);
      };

      const removeCard = (index: number) => {
        const newCards = cards.filter((_, i) => i !== index);
        onChange(newCards);
      };

      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cards.map((card, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                position: "relative",
                p: 2,
                bgcolor: "grey.50",
              }}
            >
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCard(index);
                }}
                sx={{
                  zIndex: 999,
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "error.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                  "& svg": {
                    width: 12,
                    height: 12,
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              {["imageUrl", "title", "subtitle", "slug"].map((field) => (
                <Box key={field} sx={{ mb: 1.5 }}>
                  <InputLabel
                    sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    value={card[field] || ""}
                    onChange={(e) =>
                      handleCardChange(index, field, e.target.value)
                    }
                  />
                </Box>
              ))}
            </Paper>
          ))}

          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={addCard}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "blue.50",
              "&:hover": { bgcolor: "blue.100" },
            }}
          >
            Add Card
          </Button>
        </Box>
      );

    case "image-array":
      const images = Array.isArray(value) ? value : [];

      const handleImageChange = (
        index: number,
        field: "src" | "alt",
        fieldValue: string
      ) => {
        const newImages = [...images];
        newImages[index] = { ...newImages[index], [field]: fieldValue };
        onChange(newImages);
      };

      const addImage = () => {
        const newImage = { src: "https://placehold.co/400", alt: "New Image" };
        onChange([...images, newImage]);
      };

      const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
      };

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5, // space-y-3 → 0.75rem × 3 = 12px → 1.5 * 8px = 12px
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                p: 1.5, // p-3 → 12px (karena 1 unit MUI = 8px)
                border: "1px solid",
                borderColor: "grey.300", // Tailwind: border → abu-abu terang
                borderRadius: 2, // rounded-md → 8px
                bgcolor: "grey.50", // bg-gray-50
                position: "relative",
              }}
            >
              <Box
                component="button"
                onClick={() => removeImage(index)}
                sx={{
                  position: "absolute",
                  top: 4, // top-1 → 4px
                  right: 4, // right-1 → 4px
                  height: 20, // h-5 → 1.25rem
                  width: 20, // w-5 → 1.25rem
                  bgcolor: "#EF4444", // bg-red-500
                  color: "#fff", // text-white
                  borderRadius: "50%", // rounded-full
                  fontSize: "0.75rem", // text-xs
                  fontWeight: "bold", // font-bold
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    bgcolor: "#DC2626", // hover lebih gelap (≈ red-600)
                  },
                }}
              >
                &times;
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  fontWeight={500}
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  Image URL
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={image.src}
                  onChange={(e) =>
                    handleImageChange(index, "src", e.target.value)
                  }
                  InputProps={{
                    sx: {
                      fontSize: "0.875rem", // text-sm
                      borderRadius: 1, // rounded
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "background.paper",
                      "& fieldset": { borderColor: "#E5E7EB" }, // border-gray-200
                      "&:hover fieldset": { borderColor: "#D1D5DB" },
                      "&.Mui-focused fieldset": { borderColor: "#3B82F6" }, // blue-500
                    },
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  fontWeight={500}
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  Alt Text
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={image.alt}
                  onChange={(e) =>
                    handleImageChange(index, "alt", e.target.value)
                  }
                  InputProps={{
                    sx: {
                      fontSize: "0.875rem", // text-sm
                      borderRadius: 1, // rounded
                      p: 0.5, // padding kecil setara p-1
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "background.paper",
                      "& fieldset": { borderColor: "#E5E7EB" }, // border-gray-200
                      "&:hover fieldset": { borderColor: "#D1D5DB" },
                      "&.Mui-focused fieldset": { borderColor: "#3B82F6" }, // focus:ring-blue-500
                    },
                  }}
                />
              </Box>
            </Box>
          ))}
          <Button
            fullWidth
            variant="contained"
            onClick={addImage}
            sx={{
              bgcolor: "blue.100",
              color: "blue.800",
              fontWeight: 600,
              fontSize: "0.875rem", // text-sm
              borderRadius: 2, // rounded-md
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "blue.200",
                boxShadow: "none",
              },
            }}
          >
            Add Image
          </Button>
        </Box>
      );

    default:
      return (
        <Typography variant="body2" color="error">
          Unsupported prop type: {schema.type}
        </Typography>
      );
  }
};

export const PropsSidebar: React.FC<{
  section: Section;
  onUpdateProps: (id: string, newProps: Record<string, any>) => void;
}> = ({ section, onUpdateProps }) => {
  const componentConfig = componentRegistry[section.type];

  const handlePropChange = useCallback(
    (propName: string, value: any) => {
      onUpdateProps(section.id, {
        ...section.props,
        [propName]: value,
      });
    },
    [onUpdateProps, section.id, section.props]
  );

  if (!componentConfig) {
    return (
      <Box
        sx={{
          width: '300px',
          bgcolor: "background.paper",
          p: 2,
          borderLeft: 1,
          borderColor: "divider",
          overflowY: "auto",
        }}
      >
        <Typography>
          Component configuration not found for type: {section.type}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '300px',
        bgcolor: "background.paper",
        p: 3,
        borderLeft: 1,
        borderColor: "divider",
        overflowY: "auto",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 2, mb: 3 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {componentConfig.name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Component Properties
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {componentConfig.propsSchema.map((schema) => (
          <Box key={schema.name}>
            <InputLabel sx={{ fontSize: "0.875rem", fontWeight: 500, mb: 0.5 }}>
              {schema.label}
            </InputLabel>
            <PropInput
              schema={schema}
              value={section.props[schema.name]}
              onChange={(value) => handlePropChange(schema.name, value)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
