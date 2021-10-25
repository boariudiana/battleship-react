import { Modal, Box, Typography, Button } from "@mui/material";

const CustomModal = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      };
  
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Game over!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`${props.winner} is the winner`}
          </Typography>
          <Button onClick={props.handleClose}>Start new game</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
