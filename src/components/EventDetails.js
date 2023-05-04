import React, { useState, useEffect, useContext } from "react";
import { CollectorContext } from "./CollectorContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import md5 from 'blueimp-md5';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledTitle = styled("h1")({
  fontFamily: "'Bangers', cursive",
  fontWeight: 800,
  fontSize: "3rem",
  color: "#ec0d19",
  marginBottom: "2rem",
  textAlign: "center",
  animation: `${fadeIn} 1s ease-in`,
});

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

const CollectButtons = ({ character }) => {
  const {
    collectors,
    selectedCollector,
    addCharacterToCollector,
    removeCharacterFromCollector,
  } = useContext(CollectorContext);

  const handleCollectClick = () => {
    if (selectedCollector !== null) {
      addCharacterToCollector(selectedCollector, character);
    } else {
      alert("select a collection first");
    }
  };

  const handleGiveUpClick = () => {
    const collector = collectors[selectedCollector];
    const characterIndex = collector.characters.findIndex(
      (c) => c.id === character.id
    );

    if (characterIndex !== -1) {
      removeCharacterFromCollector(selectedCollector, characterIndex);
    }
  };

  const isCharacterCollected = () => {
    if (selectedCollector !== null) {
      return collectors[selectedCollector].characters.some(
        (collectedCharacter) => collectedCharacter.id === character.id
      );
    }
    return false;
  };

  // Render the buttons
  return (
    <div>
      {isCharacterCollected() ? (
        <Button
          sx={buttonStyle}
          variant="contained"
          onClick={handleGiveUpClick}
        >
          Give up
        </Button>
      ) : (
        <Button
          sx={buttonStyle}
          variant="contained"
          onClick={handleCollectClick}
        >
          Collect
        </Button>
      )}
    </div>
  );
};

const buildEvent = (characterdata) => {
  return (
    <div>
      <CollectButtons character={characterdata} />
      <Card
        key={characterdata.id}
        variant="outlined"
        sx={{
          maxWidth: 850,
          mx: "auto",
          borderRadius: 5,
          border: "1px solid #ec0d19",
          boxShadow: "0 5px 5px rgba(0,0,0,0.30), 0 5px 5px rgba(0,0,0,0.22)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: `${fadeIn} 1s ease-in`,
        }}
      >
        <br></br>
        <CardMedia
          sx={{
            height: "70%",
            width: "70%",
            borderRadius: 5,
            border: "1px solid #ec0d19",
            boxShadow: "0 5px 5px rgba(0,0,0,0.30), 0 5px 5px rgba(0,0,0,0.22)",
          }}
          component="img"
          image={characterdata.image ? characterdata.image : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png?20210219185637"}
          title={characterdata.name}
        />
        <CardContent>
          <br></br>
          <div className="event-header">
            <StyledTitle>{characterdata.name}</StyledTitle>
          </div>

          <h2>Character Details</h2>

          {characterdata.description && (
            <>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>Description - </strong>
                {characterdata.description}
              </Typography>
            </>
          )}
          <br></br>
          {characterdata.comic && (
            <>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>Comic - </strong>
                {characterdata.comic}
              </Typography>
            </>
          )}
          <br></br>
          {characterdata.urls &&
            characterdata.urls.map((urlObj, index) => {
              if (urlObj && urlObj.url) {
                return (
                  <React.Fragment key={index}>
                    <Button
                      sx={buttonStyle}
                      variant="contained"
                      href={urlObj.url}
                    >
                      {urlObj.type}
                    </Button>
                    <br />
                  </React.Fragment>
                );
              }
              return null;
            })}

          <Button
            sx={{ ...buttonStyle, backgroundColor: "#d30080" }}
            variant="contained"
            href={`/marvel-characters/page/1`}
          >
            Back to all characters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const EventDetails = () => {
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(true);
  const [showsWrongPage, setShowsWrongPage] = useState(false);
  const { id } = useParams();

  const publickey = '8fd857c8d1a419a427e45f7b26f3d946';
  const privatekey = '294f35098a938885603fcefef98045971f42b0c3';
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
  
  useEffect(() => {
    console.log(`on load useEffect for page ${id}`);
    const fetchEvent = async () => {
      try {
        let url =
          baseUrl +
          '/' +
          id +
          '?ts=' +
          ts +
          '&apikey=' +
          publickey +
          '&hash=' +
          hash;
        const response = await axios.get(url);
        if (response.data.data.results.length === 0) {
          setShowsWrongPage(true);
        } else {
          const characterData = response.data.data.results.map((character) => {
            const thumbnail =
              character.thumbnail.path + '.' + character.thumbnail.extension;
            const description =
              character.description === '' ? 'No Description' : character.description;
            const comic =
              character.comics.items.length === 0
                ? 'No Comic Available'
                : character.comics.items[0].name;
            return {
              id: character.id,
              name: character.name,
              description: description,
              comic: comic,
              image: thumbnail,
              urls: character.urls,
            };
          });
          setEvent(characterData[0]);
        }
        setLoading(false);
      } catch (e) {
        setShowsWrongPage(true);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);
  

  if (loading) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  } else if (showsWrongPage || event.length === 0) {
    if (!loading) {
      return (
        <div>
          <h1>404, Page not found!</h1>
          <br />
          <Button
            sx={buttonStyle}
            variant="contained"
            href={`/marvel-characters/page/1`}
          >
            Back to all characters
          </Button>
        </div>
      );
    }
  } else {
    return (
      <div>
        <StyledTitle>
          <span>Character Details</span>
        </StyledTitle>
        {buildEvent(event)}
        <br></br>
      </div>
    );
  }
};

export default EventDetails;
