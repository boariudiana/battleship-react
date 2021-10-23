
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



 const DirectionDropDown = ({direction, onHandleChange}) => {


  return (
    <div>
       <FormControl sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id="demo-simple-select-helper-label">Choose direction</InputLabel>
        <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={direction}
            label="Choose available ship"
            onChange={onHandleChange}
          >
          <MenuItem value={'horizontal'} >horizontal</MenuItem>
          <MenuItem value={'vertical'} >vertical</MenuItem>
          </Select>
        </FormControl>
    </div>
  );
}

export default DirectionDropDown;