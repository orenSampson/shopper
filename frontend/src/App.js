import { useState } from "react";

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
    <div>
      <RadioButtons changeDisplay={changeDisplay} />
      {DataDisplay}
    </div>
  );
}

export default App;
