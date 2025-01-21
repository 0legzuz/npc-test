import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CardListTable from "../components/CardListTable";
import CardDetails from "../../cardDetails/ui/CardDetails";
import { Modal } from "@mui/material";

const CardList = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: "1440px", width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Картотека
      </Typography>
      <Box display="flex" width={1}>
        <Box flex={1} width={1}>
          <CardListTable onSelectPerson={handleSelectPerson} />
        </Box>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : 800,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            maxHeight: "90vh",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {selectedPerson && (
            <CardDetails person={selectedPerson} onClose={handleCloseModal} />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default CardList;
