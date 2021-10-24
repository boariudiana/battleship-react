import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ALLSHIPS } from './layouHelpers';



 const SelectShipDropdown = ({ selectedShip, onHandleChange, disabledShips}) => {
 

  return (
    <div className={'select'}>
       <FormControl sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id="demo-simple-select-helper-label">Choose available ship</InputLabel>
        <Select

            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedShip}
            label="Choose available ship"
            onChange={onHandleChange}
          >
          {ALLSHIPS.map(item => <MenuItem value={item} key={item} disabled = {disabledShips.includes(item)}>{item}</MenuItem>)}
          </Select>
        </FormControl>
    </div>
  );
}

export default SelectShipDropdown;