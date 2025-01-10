import PropTypes from 'prop-types';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const IconCard = ({ id, name, number, cabinet, onEdit, onDelete }) => {
  return (
    <Card 
      sx={{ 
        boxShadow: 3, 
        '&:hover': { boxShadow: 6 },
        transition: 'box-shadow 0.3s ease-in-out',
        height: '100%',
        width: '100%', // Адаптивна ширина
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="div">
            {name || 'Без назви'}
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
        <Typography color="text.secondary">
          Номер: {number || 'N/A'}
        </Typography>
        <Typography color="text.secondary">
          Шафа: {cabinet || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

IconCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  cabinet: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default IconCard;