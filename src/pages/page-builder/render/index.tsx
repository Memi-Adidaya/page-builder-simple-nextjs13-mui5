"use client";

import { useEffect, useState } from "react";
import BlankLayout from "../../../layouts/BlankLayout";
import type { Section } from "../../../types/types";
import { PreviewRenderer } from "../../../views/editor/PreviewRenderer";
import { loadStateFromLocalStorage } from "../../../hooks/page-builder/hooks/loadLayoutFromLocalStorage";
import { Box, Container, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        height: "12px",
        bgcolor: "rgba(0,0,0,.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: "2rem",
      }}
    >
      <Typography variant="subtitle2" textAlign={"center"} color={"#fff"}>
        Your Awesome Header
      </Typography>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box
      sx={{
        height: "12px",
        bgcolor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: "2rem",
      }}
    >
      <Typography variant="subtitle2" textAlign={"center"} color={"#fff"}>
        Your Awesome Footer
      </Typography>
    </Box>
  );
};

export default function ArticlePage() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const savedState = loadStateFromLocalStorage();
    setSections(savedState.sections);
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      // Jalankan ulang perintah kamu di sini
      const newState = loadStateFromLocalStorage().sections;
      setSections(newState);
      console.log("Tab aktif kembali — layout dimuat ulang");
    };

    // Bisa pakai salah satu, tapi ini kombinasi aman
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") handleFocus();
    });

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  return (
    <BlankLayout>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          mb: 12,
          zIndex: 9999,
        }}
      >
        <Header />
      </Box>
      <Container
        sx={{
          mt: { xs: "1rem", md: "1rem", lg: "6rem" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <PreviewRenderer sections={sections} />
      </Container>

      <Box
        sx={{
          width: "100%",
          position: "static",
          bottom: 0,
          zIndex: 9999,
          mt: 12,
        }}
      >
        <Footer />
      </Box>
    </BlankLayout>
  );
}
