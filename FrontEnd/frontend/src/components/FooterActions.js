// src/components/FooterActions.js
import React from 'react';
import './FooterActions.css';

const FooterActions = ({ onSave, onDelete }) => {
  return (
    <div className="footer-actions">
      <button className="action-button" onClick={onSave}>Guardar</button>
      <button className="action-button" onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default FooterActions;