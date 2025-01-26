import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, } from 'react-bootstrap';
import { showAlert } from '../utils/functions';
import { getAdmin } from '../services/register.admin.service';
import { insertHours } from '../services/register.hours.service';

const RegisterHours: React.FC = () => {
    // State to store the list of admins
    const [admins, setAdmins] = useState<any[]>([]);
    // State to store the selected admin
    const [selectedAdmin, setSelectedAdmin] = useState('');
    // State to store the selected date
    const [date, setDate] = useState('');
    // State to store the entry hour
    const [hourEntry, setHourEntry] = useState('');
    // State to store the exit hour
    const [hourExit, setHourExit] = useState('');
    // State to control modal visibility
    const [showModal, setShowModal] = useState(false);

    // Function to load the admins from the API
    const loadAdmins = async () => {
        try {
            const data = await getAdmin();
            setAdmins(data);
        } catch (err) {
            console.log('Error al cargar los funcionarios.', 'error');
        }
    };

    // useEffect to load admins when the component mounts
    useEffect(() => {
        loadAdmins();
    }, []);

    // Function to reset form fields
    const resetForm = () => {
        setSelectedAdmin('');
        setDate('');
        setHourEntry('');
        setHourExit('');
    };

    // Handle the save action and validate fields
    const handleSave = async () => {
        if ((!selectedAdmin || !date || !hourEntry || !hourExit)) {
            showAlert('Todos los campos son obligatorios', 'error');
            return;
        }

        try {
            const response = await insertHours(Number(selectedAdmin), date, hourEntry, hourExit)
            if (response.success) {
                showAlert('Se agrego correctamente el registro de horas.', 'success');
            } else {
                showAlert('Ocurrió un error al agregar el registro de horas del funcionario, intente nuevamente.', 'error');
            }
        } catch (err) {
            showAlert('Error al guardar el registro.', 'error');
        }

        resetForm();
        setShowModal(false);
    };

    return (
        <div className='App'>
            <h3 className='mt-3'>Registro de Entrada y Salida</h3>
            <Form className='mt-4'>
                <div className="col-md-4">
                    <Form.Group className='mb-3'>
                        <Form.Label>Seleccionar Funcionario</Form.Label>
                        <Form.Select
                            value={selectedAdmin}
                            onChange={(e) => setSelectedAdmin(e.target.value)}
                        >
                            <option value=''>Seleccione un funcionario</option>
                            {admins.map((admin) => (
                                <option key={admin.id} value={admin.id}>
                                    {admin.nombres} {admin.apellidos}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Hora de Entrada</Form.Label>
                        <Form.Control
                            type='time'
                            value={hourEntry}
                            onChange={(e) => setHourEntry(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Hora de Salida</Form.Label>
                        <Form.Control
                            type='time'
                            value={hourExit}
                            onChange={(e) => setHourExit(e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        variant='primary'
                        onClick={() => setShowModal(true)}
                        disabled={!selectedAdmin || !date || !hourEntry || !hourExit}
                    >
                        Guardar Registro
                    </Button>
                </div>
            </Form>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de guardar el registro para este funcionario?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant='primary' onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RegisterHours;
