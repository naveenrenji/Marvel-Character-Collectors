import React, { createContext, useState, useEffect } from "react";

export const CollectorContext = createContext();

const loadCollectorsFromLocalStorage = () => {
  const storedCollectors = localStorage.getItem("collectors");
  return storedCollectors ? JSON.parse(storedCollectors) : [];
};

const CollectorContextProvider = (props) => {
  const [collectors, setCollectors] = useState(
    loadCollectorsFromLocalStorage()
  );
  const [selectedCollector, setSelectedCollector] = useState(null);

  useEffect(() => {
    localStorage.setItem("collectors", JSON.stringify(collectors));
  }, [collectors]);

  const addCollector = (name) => {
    setCollectors([...collectors, { name, characters: [] }]);
  };

  const removeCollector = (index) => {
    if (index === selectedCollector) {
      setSelectedCollector(null);
    }
    setCollectors(collectors.filter((collector, i) => i !== index));
  };

  const addCharacterToCollector = (collectorIndex, character) => {
    if (collectors[collectorIndex].characters.length < 10) {
      const newCollectors = [...collectors];
      newCollectors[collectorIndex].characters.push(character);
      setCollectors(newCollectors);
    } else {
      alert("Maximum Number of Characters per Collection reached (10)");
    }
  };

  const removeCharacterFromCollector = (collectorIndex, characterIndex) => {
    const newCollectors = [...collectors];
    newCollectors[collectorIndex].characters.splice(characterIndex, 1);
    setCollectors(newCollectors);
  };

  return (
    <CollectorContext.Provider
      value={{
        collectors,
        selectedCollector,
        addCollector,
        removeCollector,
        addCharacterToCollector,
        removeCharacterFromCollector,
        setSelectedCollector,
      }}
    >
      {props.children}
    </CollectorContext.Provider>
  );
};

export default CollectorContextProvider;
