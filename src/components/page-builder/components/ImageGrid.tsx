"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

interface ImageItem {
  src: string;
  alt: string;
}

interface ImageGridProps {
  title: string;
  images: ImageItem[];
  columns: number;
  gap: number;
  backgroundColor: string;
  objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  title,
  images,
  columns,
  gap,
  backgroundColor,
  objectFit = "cover",
}) => {
  const validColumns = Number(columns) > 0 ? Math.floor(Number(columns)) : 1;
  const gridTemplateColumns = `repeat(${validColumns}, minmax(0, 1fr))`;

  return (
    <div style={{ backgroundColor }}>
      <Box
        sx={{
          p: { xs: 8, md: 12 },
        }}
      >
        {title && (
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 8, // margin-bottom = theme.spacing(8)
              color: "grey.800",
            }}
          >
            {title}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: `${gap}px`,
          }}
        >
          {(images || []).map((image, index) => (
            <Box
              key={index}
              sx={{
                overflow: "hidden",
                borderRadius: 2, // ≈ rounded-lg
                boxShadow: 2, // ≈ shadow-md
              }}
              style={{
                // Set the flex-basis to create N columns, accounting for the gap.
                // flex-grow: 0, flex-shrink: 1
                flex: `0 1 calc(${100 / validColumns}% - ${(gap * (validColumns - 1)) / validColumns}px)`,
              }}
            >
              <Box
                component="img"
                src={image.src}
                alt={image.alt}
                sx={{
                  width: "100%", // w-full
                  height: "100%", // h-full
                  display: "block", // block
                  aspectRatio: "1 / 1", // aspect-square
                  objectFit: objectFit, // style prop yang kamu sudah punya
                }}
                loading="lazy"
              />
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};
