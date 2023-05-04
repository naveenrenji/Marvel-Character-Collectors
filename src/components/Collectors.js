import React, { useContext } from "react";
import { CollectorContext } from "./CollectorContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./Collectors.css";

const Collectors = () => {
  const {
    collectors,
    selectedCollector,
    addCollector,
    removeCollector,
    setSelectedCollector,
    removeCharacterFromCollector,
  } = useContext(CollectorContext);

  const navigate = useNavigate();

  const buttonStyle = {
    borderBottom: "1px solid #ED1D24",
    fontWeight: "bold",
    fontSize: "1.0rem",
    textAlign: "center",
    margin: "10px",
    backgroundColor: "#006ec8",
    color: "#f0f0f0",
    "&:hover": {
      backgroundColor: "#ED1D24",
    },
  };

  const handleAddCollector = () => {
    const name = prompt("Enter collector name:");
    if (name) {
      addCollector(name);
    }
  };

  const handleRemoveCollector = (index) => {
    removeCollector(index);
  };

  const handleSelectCollector = (index) => {
    if (selectedCollector === index) {
      setSelectedCollector(null);
    } else {
      setSelectedCollector(index);
    }
  };

  const handleCharacterClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  return (
    <div className="collectors">
      <Typography variant="h2" gutterBottom className="collectors-title">
        Marvel Collectors
      </Typography>
      <Typography variant="p" gutterBottom className="collectors-title">
        Click on Collector Name to (un)Select it as Active Collection
      </Typography>
      <br></br>
      <br></br>
      <Button sx={buttonStyle} variant="contained" onClick={handleAddCollector}>
        Add Collector
      </Button>{" "}
      <br></br>
      <br></br>
      <TableContainer component={Paper} className="collector-table-container">
        <Table className="collector-table">
          <TableHead>
            <TableRow>
              <TableCell>Collector</TableCell>
              <TableCell>Characters</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collectors.map((collector, index) => (
              <TableRow key={`collector-${index}`}>
                <TableCell
                  component="th"
                  scope="row"
                  key={`collector-name-${index}`}
                >
                  <div
                    className={`collector-name ${
                      selectedCollector === index ? "selected" : ""
                    }`}
                    onClick={() => handleSelectCollector(index)}
                  >
                    {collector.name} ({collector.characters.length} characters)
                  </div>
                  <br></br>
                  {selectedCollector !== index && (
                    <Button
                      key={`collector-remove-btn-${index}`}
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRemoveCollector(index)}
                      className="remove-collector-btn"
                    >
                      Remove
                    </Button>
                  )}
                </TableCell>
                {collector.characters.map((character, charIndex) => (
                  <TableCell key={`collector-${index}-character-${charIndex}`}>
                    <Button
                      key={`collector-${index}-character-btn-${charIndex}`}
                      onClick={() => handleCharacterClick(character.id)}
                      className="character-btn"
                    >
                      {character.name}
                    </Button>
                    <Button
                      key={`collector-${index}-give-up-btn-${charIndex}`}
                      onClick={() =>
                        removeCharacterFromCollector(index, charIndex)
                      }
                      className="give-up-btn"
                      disabled={selectedCollector !== index}
                    >
                      Give up
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Collectors;
