import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Collapse, CardActions, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const IconCard = ({ id, name, number, cabinet, info, expanded }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editNumber, setEditNumber] = useState(number);
  const [editCabinet, setEditCabinet] = useState(cabinet);
  const [editInfo, setEditInfo] = useState(info);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'icons', id));
      toast.success('Ікону видалено успішно!');
    } catch (error) {
      console.error('Помилка при видаленні ікони: ', error);
      toast.error('Сталася помилка при видаленні ікони.');
    }
  };

  const confirmDelete = () => {
    confirmAlert({
      title: 'Підтвердіть видалення',
      message: 'Ви впевнені, що хочете видалити цю ікону?',
      buttons: [
        {
          label: 'Так',
          onClick: handleDelete
        },
        {
          label: 'Ні',
          onClick: () => {}
        }
      ]
    });
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'icons', id), {
        name: editName,
        number: editNumber,
        cabinet: editCabinet,
        info: editInfo
      });
      setIsEditing(false);
      toast.success('Ікону оновлено успішно!');
    } catch (error) {
      console.error('Помилка при оновленні ікони: ', error);
      toast.error('Сталася помилка при оновленні ікони.');
    }
  };

  return (
    <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3 }}>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              label="Назва ікони"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Номер ікони"
              fullWidth
              value={editNumber}
              onChange={(e) => setEditNumber(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Номер шафи"
              fullWidth
              value={editCabinet}
              onChange={(e) => setEditCabinet(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Додаткова інформація"
              fullWidth
              value={editInfo}
              onChange={(e) => setEditInfo(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          </>
        ) : (
          <>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
              Номер ікони: <Box component="span" sx={{ fontWeight: 'bold' }}>{number}</Box>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
              Номер шафи: <Box component="span" sx={{ fontWeight: 'bold' }}>{cabinet}</Box>
            </Typography>
            {info && (
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body2" color="text.secondary">
                  Додаткова інформація: <Box component="span" sx={{ fontWeight: 'bold' }}>{info}</Box>
                </Typography>
              </Collapse>
            )}
          </>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {isEditing ? (
          <Button onClick={handleSave} color="primary" startIcon={<SaveIcon />}>
            Зберегти
          </Button>
        ) : (
          <IconButton onClick={() => setIsEditing(true)} aria-label="редагувати">
            <EditIcon />
          </IconButton>
        )}
        <IconButton aria-label="видалити" onClick={confirmDelete} sx={{ marginLeft: 'auto' }}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default IconCard;