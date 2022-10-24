import { useState } from "react";
import Container from "@mui/material/Container";

import RadioButtons from "./components/RadioButtons/RadioButtons";
import ShopperChart from "./components/ShopperChart/ShopperChart";
import ShopperTable from "./components/ShopperTable/ShopperTable";

function App() {
  const [selectedDisplay, setSelectedDisplay] = useState("chart");

  const changeDisplay = (chosenDisplay) => {
    setSelectedDisplay(chosenDisplay);
  };

  let DataDisplay = <ShopperChart />;

  if (selectedDisplay === "chart") {
    DataDisplay = <ShopperChart />;
  }

  if (selectedDisplay === "table") {
    DataDisplay = <ShopperTable />;
  }

  return (
    <Container>
      <RadioButtons changeDisplay={changeDisplay} />
      {DataDisplay}
    </Container>
  );
}

export default App;
