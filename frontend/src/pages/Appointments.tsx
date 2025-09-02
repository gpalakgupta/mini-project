import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin,  CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';
import AppointmentForm from '../components/AppointmentForm';

interface Appointment {
  id: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  appointmentType: string;
  location: string;
  consultationFee: number;
  symptoms: string;
  notes?: string;
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      patientName: 'John Doe',
      doctorId: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-01-15',
      time: '10:00',
      status: 'confirmed',
      appointmentType: 'consultation',
      location: 'Downtown Medical Center',
      consultationFee: 200,
      symptoms: 'Chest pain and shortness of breath',
      notes: 'Patient has history of hypertension'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctorId: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: '2024-01-16',
      time: '14:30',
      status: 'pending',
      appointmentType: 'followup',
      location: 'City Health Clinic',
      consultationFee: 180,
      symptoms: 'Skin rash follow-up',
      notes: 'Second visit for treatment review'
    },
    {
      id: 3,
      patientName: 'Bob Wilson',
      doctorId: 3,
      doctorName: 'Dr. Emily Davis',
      specialty: 'Pediatrics',
      date: '2024-01-17',
      time: '09:15',
      status: 'confirmed',
      appointmentType: 'checkup',
      location: 'Children\'s Hospital',
      consultationFee: 150,
      symptoms: 'Regular pediatric checkup',
      notes: 'Annual wellness visit'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | undefined>();

  const filteredAppointments = appointments.filter(appointment => {
    if (filterStatus === 'all') return true;
    return appointment.status === filterStatus;
  });

  const handleNewAppointment = (appointmentData: any) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: appointments.length + 1,
      status: 'pending',
      location: 'MediCare Medical Center',
      specialty: 'General Medicine'
    };
    
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointmentStatus = (id: number, status: 'confirmed' | 'pending' | 'cancelled') => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your medical appointments and consultations</p>
        </div>
        <button
          onClick={() => {
            setSelectedDoctorId(undefined);
            setIsFormOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'all', label: 'All Appointments', count: appointments.length },
              { key: 'confirmed', label: 'Confirmed', count: appointments.filter(a => a.status === 'confirmed').length },
              { key: 'pending', label: 'Pending', count: appointments.filter(a => a.status === 'pending').length },
              { key: 'cancelled', label: 'Cancelled', count: appointments.filter(a => a.status === 'cancelled').length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilterStatus(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  filterStatus === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  filterStatus === tab.key ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-600 mb-4">
            {filterStatus === 'all' 
              ? "You don't have any appointments scheduled yet."
              : `You don't have any ${filterStatus} appointments.`
            }
          </p>
          <button
            onClick={() => {
              setSelectedDoctorId(undefined);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Your First Appointment
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredAppointments.map(appointment => (
            <div
              key={appointment.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <User className="h-12 w-12 text-gray-400 bg-gray-100 rounded-full p-2" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                      <p className="text-blue-600 font-medium">{appointment.specialty}</p>
                      <p className="text-sm text-gray-600">Patient: {appointment.patientName}</p>
                    </div>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    <span className="ml-1 capitalize">{appointment.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <div>
                      <div className="font-medium">{formatDate(appointment.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <div>
                      <div className="font-medium">{appointment.time}</div>
                      <div className="text-xs text-gray-500 capitalize">{appointment.appointmentType}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <div className="font-medium">{appointment.location}</div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="font-medium text-green-600">${appointment.consultationFee}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Symptoms/Reason:</h4>
                  <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                  {appointment.notes && (
                    <>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 mt-3">Notes:</h4>
                      <p className="text-sm text-gray-600">{appointment.notes}</p>
                    </>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  {appointment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                        className="px-4 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                        className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {appointment.status === 'confirmed' && (
                    <>
                      <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
                        Reschedule
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                        className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {appointment.status === 'cancelled' && (
                    <button
                      onClick={() => updateAppointmentStatus(appointment.id, 'pending')}
                      className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md hover:bg-yellow-100 transition-colors"
                    >
                      Reactivate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Appointment Form Modal */}
      <AppointmentForm
        doctorId={selectedDoctorId}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleNewAppointment}
      />
    </div>
  );
};

export default Appointments;