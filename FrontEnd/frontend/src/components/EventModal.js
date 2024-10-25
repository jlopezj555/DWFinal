import React from 'react';
import './CalendarView.css'; // Importa estilos si tienes otros estilos personalizados

const EventModal = ({ isOpen, onClose, onSubmit, event }) => {
    return (
        <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered mw-650px">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="fw-bold">{event ? "Edit Event" : "Add Event"}</h2>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Event Name</label>
                            <input type="text" className="form-control" name="eventName" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Event Description</label>
                            <input type="text" className="form-control" name="eventDescription" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Event Location</label>
                            <input type="text" className="form-control" name="eventLocation" />
                        </div>
                        <div className="mb-3">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" /> All Day
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Event Start Date</label>
                                <input type="date" className="form-control" name="startDate" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Event Start Time</label>
                                <input type="time" className="form-control" name="startTime" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Event End Date</label>
                                <input type="date" className="form-control" name="endDate" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Event End Time</label>
                                <input type="time" className="form-control" name="endTime" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={onSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModal;