import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const RadioButtons = ({ changeDisplay }) => {
  const [selectedValue, setSelectedValue] = useState("chart");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

    changeDisplay(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          checked={selectedValue === "chart"}
          onChange={handleChange}
          value="chart"
          control={<Radio />}
          label="Chart"
        />
        <FormControlLabel
          checked={selectedValue === "table"}
          onChange={handleChange}
          value="table"
          control={<Radio />}
          label="Table"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtons;
