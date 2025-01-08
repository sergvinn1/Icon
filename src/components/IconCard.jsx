
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const IconCard = ({ id, name, number, cabinet, onEdit, onDelete, expanded }) => {
  return (
    <Card 
      sx={{ 
        boxShadow: 3, 
        '&:hover': {
          boxShadow: 6,
        },
        transition: 'box-shadow 0.3s ease-in-out',
        height: '100%'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <IconButton onClick={() => onEdit(id)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        {expanded && (
          <>
            <Typography color="text.secondary">
              Номер: {number}
            </Typography>
            <Typography color="text.secondary">
              Шафа: {cabinet}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

IconCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  cabinet: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  expanded: PropTypes.bool
};

export default IconCard;