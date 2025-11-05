import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";

import { componentRegistry } from "../../hooks/page-builder/registry/registry";
import type { ComponentKey } from "../../types/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { alpha, useTheme } from "@mui/material/styles";
import { componentIcons, FallbackIcon } from "../../hooks/page-builder/hooks/icon-registry";
import { AccordionSummary, Grid, Fade } from "@mui/material";
import IconifyIcon from "../../components/icon";

interface DraggableComponentItemProps {
  id: ComponentKey;
  name: string;
  icon: React.ReactNode;
  isLayout?: boolean;
  isImage?: boolean;
  isBlock?: boolean;
}

const DraggableComponentItem: React.FC<DraggableComponentItemProps> = ({
  id,
  name,
  icon,
}) => {
  const theme = useTheme();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: {
        isSidebarComponent: true,
        componentType: id,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.02)`,
      }
    : undefined;

  return (
    <Fade in timeout={300}>
      <Box
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        sx={{
          ...style,
          gap: 1,
          width: "64px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          p: 1.5,
          bgcolor: isDragging
            ? alpha(theme.palette.primary.main, 0.12)
            : theme.palette.background.paper,
          border: `1px solid ${
            isDragging ? theme.palette.primary.main : theme.palette.divider
          }`,
          borderRadius: 2,
          cursor: isDragging ? "grabbing" : "grab",
          boxShadow: isDragging
            ? `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`
            : "0 2px 8px rgba(0,0,0,0.06)",
          userSelect: "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
          "&::before": isDragging
            ? {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }
            : {},
          "&:hover": {
            bgcolor: alpha(theme.palette.primary.main, 0.04),
            borderColor: theme.palette.primary.main,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            transform: "translateY(-2px)",
          },
          ...(isDragging && {
            transform: `translate3d(16px, 10px, 0) scale(1.02)`,
            zIndex: 1000,
          }),
        }}
      >
        <Box
          sx={{
            height: 24,
            width: 24,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: isDragging
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.08),
            color: isDragging
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
            transition: "all 0.2s ease",
            "&:hover": {
              color: theme.palette.primary.main,
              bgcolor: alpha(theme.palette.primary.main, 0.16),
            },
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="caption"
          sx={{
            fontWeight: 500,
            color: isDragging
              ? theme.palette.primary.main
              : theme.palette.text.primary,
            fontSize: "0.625rem",
            lineHeight: 1.2,
            textAlign: "center",
            transition: "color 0.2s ease",
          }}
        >
          {name}
        </Typography>
      </Box>
    </Fade>
  );
};

export const ComponentSidebar: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState({
    one: true,
    two: false,
    three: false,
  });

  const handleExpansion = (key: "one" | "two" | "three") => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const layouts = Object.entries(componentRegistry).filter(
    ([, config]) => config.isLayout
  );
  const images = Object.entries(componentRegistry).filter(
    ([, config]) => config.isImage
  );
  const block = Object.entries(componentRegistry).filter(
    ([, config]) => config.isBlock
  );

  return (
    <Paper
      component="aside"
      elevation={0}
      sx={{
        width: "255px",
        bgcolor: theme.palette.background.default,
        p: 2,
        borderRight: `1px solid ${theme.palette.divider}`,
        overflowY: "auto",
        zIndex: 10,
        backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${theme.palette.background.default} 100%)`,
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: theme.palette.background.default,
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.palette.action.hover,
          borderRadius: "3px",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: "1.125rem",
            mb: 0.5,
          }}
        >
          Components
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.875rem",
          }}
        >
          Drag & drop to build your page
        </Typography>
      </Box>

      {/* Layout Accordion */}
      <Accordion
        expanded={expanded.one}
        onChange={() => handleExpansion("one")}
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          mb: 2,
          "&:before": { display: "none" },
          "&.Mui-expanded": {
            margin: 0,
            mb: 2,
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <IconifyIcon
              icon={expanded.one ? "mdi:chevron-up" : "mdi:chevron-down"}
              style={{
                color: theme.palette.text.secondary,
                fontSize: "20px",
              }}
            />
          }
          sx={{
            px: 2,
            py: 1,
            minHeight: "48px",
            "& .MuiAccordionSummary-content": {
              alignItems: "center",
              gap: 1.5,
            },
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.02),
            },
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "6px",
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.palette.primary.main,
            }}
          >
            <IconifyIcon icon="mdi:view-grid" fontSize="16px" />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            Layout
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2, pt: 1 }}>
          <Grid container spacing={1.5}>
            {layouts.map(([key, { name }]) => (
              <Grid item key={key}>
                <DraggableComponentItem
                  id={key as ComponentKey}
                  name={name}
                  icon={componentIcons[key] || <FallbackIcon />}
                  isLayout={true}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Blocks Panel Accordion */}
      <Accordion
        expanded={expanded.two}
        onChange={() => handleExpansion("two")}
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          mb: 2,
          "&:before": { display: "none" },
          "&.Mui-expanded": {
            margin: 0,
            mb: 2,
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <IconifyIcon
              icon={expanded.two ? "mdi:chevron-up" : "mdi:chevron-down"}
              style={{
                color: theme.palette.text.secondary,
                fontSize: "20px",
              }}
            />
          }
          sx={{
            px: 2,
            py: 1,
            minHeight: "48px",
            "& .MuiAccordionSummary-content": {
              alignItems: "center",
              gap: 1.5,
            },
            "&:hover": {
              bgcolor: alpha(theme.palette.secondary.main, 0.02),
            },
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "6px",
              bgcolor: alpha(theme.palette.secondary.main, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.palette.secondary.main,
            }}
          >
            <IconifyIcon icon="mdi:cube-outline" fontSize="16px" />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            Blocks Panel
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2, pt: 1 }}>
          <Grid container spacing={1.5}>
            {block.map(([key, { name }]) => (
              <Grid item key={key}>
                <DraggableComponentItem
                  id={key as ComponentKey}
                  name={name}
                  icon={componentIcons[key] || <FallbackIcon />}
                  isBlock={true}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Images & Video Blocks Accordion */}
      <Accordion
        expanded={expanded.three}
        onChange={() => handleExpansion("three")}
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          mb: 2,
          "&:before": { display: "none" },
          "&.Mui-expanded": {
            margin: 0,
            mb: 2,
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <IconifyIcon
              icon={expanded.three ? "mdi:chevron-up" : "mdi:chevron-down"}
              style={{
                color: theme.palette.text.secondary,
                fontSize: "20px",
              }}
            />
          }
          sx={{
            px: 2,
            py: 1,
            minHeight: "48px",
            "& .MuiAccordionSummary-content": {
              alignItems: "center",
              gap: 1.5,
            },
            "&:hover": {
              bgcolor: alpha(theme.palette.info.main, 0.02),
            },
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "6px",
              bgcolor: alpha(theme.palette.info.main, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.palette.info.main,
            }}
          >
            <IconifyIcon icon="mdi:image-multiple" fontSize="16px" />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            Media Blocks
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2, pt: 1 }}>
          <Grid container spacing={1.5}>
            {images.map(([key, { name }]) => (
              <Grid item key={key}>
                <DraggableComponentItem
                  id={key as ComponentKey}
                  name={name}
                  icon={componentIcons[key] || <FallbackIcon />}
                  isImage={true}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
