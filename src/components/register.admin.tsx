import React, { useEffect, useState } from 'react';
import { getAdmin, insertAdmin, updateAdmin, deleteAdmin } from '../services/register.admin.service';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { showAlert } from '../utils/functions';
import { format } from 'date-fns';

const RegisterAdmin: React.FC = () => {
    // State variables for managing admins, modal visibility, and form data
    const [admins, setAdmins] = useState<any[]>([]); // Admins list
    const [showModal, setShowModal] = useState(false); // Show add/edit modal
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Show delete confirmation modal
    const [isEditing, setIsEditing] = useState(false); // To track if editing or adding
    const [adminData, setAdminData] = useState({ id: '', nombres: '', apellidos: '', cedula: '', fecha_nacimiento: '' }); // Form data for admin
    const [adminIdToDelete, setAdminIdToDelete] = useState<number | null>(null); // Admin ID to delete

    // Function to load the list of admins
    const loadAdmins = async () => {
        try {
            const data = await getAdmin();
            setAdmins(data); // Update state with fetched data
        } catch (err: any) {
            console.log('Error al cargar los administradores.'); // Show error if loading fails
        }
    };

    // UseEffect to load admins when the component mounts
    useEffect(() => {
        loadAdmins();
    }, []);

    // Reset the form data
    const resetForm = () => {
        setAdminData({ id: '', nombres: '', apellidos: '', cedula: '', fecha_nacimiento: '' });
    };

    // Function to handle editing of an admin
    const handleEdit = (admin: any) => {
        setIsEditing(true);

        const formattedDate = new Date(admin.fecha_nacimiento).toISOString().split('T')[0]; // Format date to 'yyyy-MM-dd'
        setAdminData({ ...admin, fecha_nacimiento: formattedDate });
        setShowModal(true); // Show modal for editing
    };

    // Function to show delete confirmation modal
    const handleDeleteClick = (id: number) => {
        setAdminIdToDelete(id);  // Set the ID of the admin to delete
        setShowDeleteModal(true); // Show delete confirmation modal
    };

    // Function to check if the input is valid (not empty)
    const isValidInput = (value: string) => value.trim() !== '';

    // Function to save the form data (add or update admin)
    const handleSave = async () => {
        try {
            if (!adminData.nombres || !adminData.apellidos || !adminData.cedula || !adminData.fecha_nacimiento) {
                showAlert('Todos los campos son obligatorios', 'error'); // Show error if fields are empty
                return;
            }

            if (!isValidInput(adminData.nombres) || !isValidInput(adminData.cedula) || !isValidInput(adminData.fecha_nacimiento)) {
                showAlert('Todos los campos deben estar completos y no pueden contener solo espacios', 'error'); // Show error for invalid input
                return;
            }

            if (adminData.id) {
                // Update admin if ID exists
                const data = await updateAdmin(Number(adminData.id), adminData.nombres, adminData.apellidos, adminData.cedula, adminData.fecha_nacimiento);
                if (data.success) {
                    showAlert('Se actualizo correctamente los datos del funcionario.', 'success');
                } else {
                    showAlert('Ocurrió un error al actualizar los datos del funcionario, intente nuevamente.', 'error');
                }
            } else {
                // Insert new admin if no ID exists
                const data = await insertAdmin(adminData.nombres, adminData.apellidos, adminData.cedula, adminData.fecha_nacimiento);
                if (data.success) {
                    showAlert('Se agrego correctamente el funcionario.', 'success');
                } else {
                    showAlert('Ocurrió un error al agregar los datos del funcionario, intente nuevamente.', 'error');
                }
            }
            loadAdmins(); // Reload admin list
            setShowModal(false); // Close modal
            resetForm(); // Reset form data
        } catch (err: any) {
            showAlert('Error al guardar los datos del funcionario.', 'error'); // Show error if save fails
        }
    }

    // Function to delete an admin
    const handleDelete = async () => {
        if (adminIdToDelete !== null) {
            try {
                const data = await deleteAdmin(adminIdToDelete); // Call delete service
                if (data.success) {
                    showAlert('Se elimino correctamente los datos del funcionario.', 'success');
                } else {
                    showAlert('Ocurrió un error al eliminar los datos del funcionario, intente nuevamente.', 'error');
                }

                loadAdmins(); // Reload admin list after deletion
                setShowDeleteModal(false); // Close delete modal
            } catch (err: any) {
                showAlert('Error al eliminar los datos del funcionario.', 'error'); // Show error if delete fails
            }
        }
    };

    return (
        <div className='App'>
            {/* Button to open modal for adding new admin */}
            <Button variant="primary" onClick={() => {
                setShowModal(true);
                setIsEditing(false);
                resetForm();
            }}>
                Agregar funcionario
            </Button>

            {/* Table to display the list of admins */}
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Cédula</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td>{admin.nombres}</td>
                            <td>{admin.apellidos}</td>
                            <td>{admin.cedula}</td>
                            <td>{format(new Date(admin.fecha_nacimiento), 'dd/MM/yyyy')}</td>
                            <td>
                                {/* Edit button */}
                                <Button variant="warning" onClick={() => handleEdit(admin)} className='me-3'>
                                    Modificar
                                </Button>
                                {/* Delete button */}
                                <Button variant="danger" onClick={() => handleDeleteClick(admin.id)} className='me-3'>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for adding/editing an admin */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar funcionario' : 'Agregar funcionario'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form for admin data */}
                    <Form>
                        <Form.Group controlId="nombres">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese los nombres"
                                value={adminData.nombres}
                                onChange={(e) => setAdminData({ ...adminData, nombres: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="apellidos">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese los apellidos"
                                value={adminData.apellidos}
                                onChange={(e) => setAdminData({ ...adminData, apellidos: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="cedula">
                            <Form.Label>Cédula</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la cédula"
                                value={adminData.cedula}
                                onChange={(e) => setAdminData({ ...adminData, cedula: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="fecha_nacimiento">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                value={adminData.fecha_nacimiento}
                                onChange={(e) => setAdminData({ ...adminData, fecha_nacimiento: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {adminData.id ? 'Guardar cambios' : 'Agregar funcionario'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for confirming delete */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Estás seguro de que quieres eliminar este funcionario?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RegisterAdmin;
