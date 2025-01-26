import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Alert } from 'react-bootstrap';
import { getHoursReport } from '../services/report.hours.service';
import { getAdmin } from '../services/register.admin.service';
import { showAlert } from '../utils/functions';
import { format } from 'date-fns';

const ReportHours: React.FC = () => {
    // State to store the reports data
    const [reports, setReports] = useState<any[]>([]);
    // State to store the list of admins
    const [admins, setAdmins] = useState<any[]>([]);
    // State to store the selected admin's ID
    const [selectedAdmin, setSelectedAdmin] = useState('');
    // State to store the start date for the report
    const [dateFrom, setDateFrom] = useState('');
    // State to store the end date for the report
    const [dateTo, setDateTo] = useState('');

    // Function to load admins from the API
    const loadAdmins = async () => {
        try {
            const data = await getAdmin();
            setAdmins(data);
        } catch (err) {
            console.log('Error al cargar los funcionarios.', 'error');
        }
    };

    // useEffect hook to load admins when the component mounts
    useEffect(() => {
        loadAdmins();
    }, []);

    // Function to fetch the report data based on selected admin and date range
    const fetchReports = async (adminId?: string, from?: string, to?: string) => {
        try {
            const data = await getHoursReport(Number(adminId), from, to);
            setReports(data);
        } catch (err: any) {
            setReports([]); // In case of error, clear reports data
        }
    };

    // useEffect hook to fetch reports when the component mounts
    useEffect(() => {
        fetchReports();
    }, []);

    // Handle form submission to generate the report
    const handleGenerateReport = (e: React.FormEvent) => {
        e.preventDefault();
        fetchReports(selectedAdmin, dateFrom, dateTo);
    };

    // Function to format hours worked into a readable format
    const formatHoursWorked = (hoursWorked: any) => {
        if (hoursWorked) {
            if (hoursWorked.hasOwnProperty('hours') && hoursWorked.hasOwnProperty('minutes')) {
                // Convert to readable format: "X hours Y minutes"
                return `${hoursWorked.hours} horas ${hoursWorked.minutes} minutos`;
            } else if (hoursWorked.hasOwnProperty('hours')) {
                // If only hours are available, return hours
                return `${hoursWorked.hours} horas`;
            }
        }
        return 'N/A'; // Default return if no data
    };

    return (
        <div className="App">
            <h3 className="mt-3">Reportes de Entrada y Salida</h3>

            {/* Form to select admin and date range */}
            <Form onSubmit={handleGenerateReport} className="mt-4">
                <div className="col-md-4">
                    <Form.Group controlId="userId">
                        <Form.Label>Seleccionar Usuario</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedAdmin}
                            onChange={(e) => setSelectedAdmin(e.target.value)}
                        >
                            <option value='0'>Todos</option>
                            {admins.map((admin) => (
                                <option key={admin.id} value={admin.id}>
                                    {admin.nombres} {admin.apellidos}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    {/* Date range selection */}
                    <Form.Group controlId="dateFrom" className="mt-3">
                        <Form.Label>Fecha Desde</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="dateTo" className="mt-3">
                        <Form.Label>Fecha Hasta</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                    </Form.Group>

                    {/* Button to generate the report */}
                    <Button variant="primary" type="submit" className="mt-3">
                        Generar Reporte
                    </Button>
                </div>
            </Form>

            {/* Displaying the report table if reports are available */}
            {reports.length > 0 ? (
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Fecha</th>
                            <th>Hora Entrada</th>
                            <th>Hora Salida</th>
                            <th>Cantidad de Horas Trabajadas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={index}>
                                <td>{report.nombres}</td>
                                <td>{report.apellidos}</td>
                                <td>{new Date(report.fecha).toISOString().split('T')[0].split('-').reverse().join('/')}</td>
                                <td>{report.hora_entrada}</td>
                                <td>{report.hora_salida}</td>
                                <td>{formatHoursWorked(report.horas_trabajadas)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="mt-3">No hay registros disponibles.</p> // Message if no reports are found
            )}
        </div>
    );
};

export default ReportHours;