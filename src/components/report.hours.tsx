import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Alert } from 'react-bootstrap';
import { getHoursReport } from '../services/report.hours.service';
import { getAdmin } from '../services/register.admin.service';
import { showAlert } from '../utils/functions';
import { format } from 'date-fns';

const ReportHours: React.FC = () => {
    const [reports, setReports] = useState<any[]>([]);
    const [admins, setAdmins] = useState<any[]>([]);
    const [selectedAdmin, setSelectedAdmin] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

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

    const fetchReports = async (adminId?: string, from?: string, to?: string) => {
        try {
            const data = await getHoursReport(Number(adminId), from, to);
            setReports(data);
        } catch (err: any) {
            setReports([]);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleGenerateReport = (e: React.FormEvent) => {
        e.preventDefault();
        fetchReports(selectedAdmin, dateFrom, dateTo);
    };

    const formatHoursWorked = (hoursWorked: any) => {
        if (hoursWorked) {
            if (hoursWorked.hasOwnProperty('hours') && hoursWorked.hasOwnProperty('minutes')) {
                // Convertir a un formato legible: "X horas Y minutos"
                return `${hoursWorked.hours} horas ${hoursWorked.minutes} minutos`;
            } else if (hoursWorked.hasOwnProperty('hours')) {
                // Si solo tiene 'hours', simplemente mostrar esas horas
                return `${hoursWorked.hours} horas`;
            }
        }
        return 'N/A';
    };

    return (
        <div className="App">
            <h3 className="mt-3">Reportes de Entrada y Salida</h3>

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

                    <Button variant="primary" type="submit" className="mt-3">
                        Generar Reporte
                    </Button>
                </div>
            </Form>

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
                                <td>{format(new Date(report.fecha), 'dd/MM/yyyy')}</td>
                                <td>{report.hora_entrada}</td>
                                <td>{report.hora_salida}</td>
                                <td>{formatHoursWorked(report.horas_trabajadas)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="mt-3">No hay registros disponibles.</p>
            )}
        </div>
    );
};

export default ReportHours;
