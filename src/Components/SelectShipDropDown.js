import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



 const SelectShipDropdown = ({availableShips, selectedShip, onHandleChange}) => {

  return (
    <div>
       <FormControl sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id="demo-simple-select-helper-label">Choose available ship</InputLabel>
        <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedShip}
            label="Choose available ship"
            onChange={onHandleChange}
          >
          {availableShips.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
    </div>
  );
}

export default SelectShipDropdown;