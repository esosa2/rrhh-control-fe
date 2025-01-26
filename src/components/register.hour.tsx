import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, } from 'react-bootstrap';
import { showAlert } from '../utils/functions';
import { getAdmin } from '../services/register.admin.service';
import { insertHours } from '../services/register.hours.service';

const RegisterHours: React.FC = () => {
    const [admins, setAdmins] = useState<any[]>([]);
    const [selectedAdmin, setSelectedAdmin] = useState('');
    const [date, setDate] = useState('');
    const [hourEntry, setHourEntry] = useState('');
    const [hourExit, setHourExit] = useState('');
    const [showModal, setShowModal] = useState(false);

    const loadAdmins = async () => {
        try {
            const data = await getAdmin();
            setAdmins(data);
        } catch (err) {
            showAlert('Error al cargar los funcionarios.', 'error');
        }
    };

    useEffect(() => {
        loadAdmins();
    }, []);

    const resetForm = () => {
        setSelectedAdmin('');
        setDate('');
        setHourEntry('');
        setHourExit('');
    };

    // Manejar la lógica de guardado
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


            {/* Modal de Confirmación */}
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
