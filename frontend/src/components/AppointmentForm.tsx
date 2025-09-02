import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, X } from 'lucide-react';





interface AppointmentFormProps {
  doctorId?: number;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointmentData: any) => void;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  availability: string[];
  consultationFee: number;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctorId,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    appointmentType: 'consultation',
    symptoms: '',
    notes: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Mock doctor data
  const doctors: Doctor[] = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', availability: ['Monday', 'Wednesday', 'Friday'], consultationFee: 200 },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatology', availability: ['Tuesday', 'Thursday', 'Saturday'], consultationFee: 180 },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Pediatrics', availability: ['Monday', 'Tuesday', 'Thursday'], consultationFee: 150 },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedics', availability: ['Wednesday', 'Friday', 'Saturday'], consultationFee: 220 },
    { id: 5, name: 'Dr. Lisa Rodriguez', specialty: 'Neurology', availability: ['Monday', 'Wednesday', 'Friday'], consultationFee: 250 },
    { id: 6, name: 'Dr. Robert Kim', specialty: 'Gastroenterology', availability: ['Tuesday', 'Thursday', 'Saturday'], consultationFee: 190 }
  ];

  const selectedDoctor = doctors.find(d => d.id === doctorId);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  const appointmentTypes = [
    { value: 'consultation', label: 'General Consultation' },
    { value: 'followup', label: 'Follow-up Visit' },
    { value: 'emergency', label: 'Emergency Consultation' },
    { value: 'checkup', label: 'Regular Check-up' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        doctorId,
        doctorName: selectedDoctor?.name,
        consultationFee: selectedDoctor?.consultationFee,
        id: Date.now() // Simple ID generation
      });
      
      // Reset form
      setFormData({
        patientName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        appointmentType: 'consultation',
        symptoms: '',
        notes: ''
      });
      
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg leading-6 font-semibold text-gray-900">
              Book Appointment
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {selectedDoctor && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-blue-900">{selectedDoctor.name}</h4>
              <p className="text-blue-700">{selectedDoctor.specialty}</p>
              <p className="text-sm text-blue-600 mt-1">
                Consultation Fee: ${selectedDoctor.consultationFee}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
                <User className="inline h-4 w-4 mr-1" />
                Patient Name
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.patientName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter patient name"
              />
              {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Type
              </label>
              <select
                id="appointmentType"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {appointmentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
                <MessageSquare className="inline h-4 w-4 mr-1" />
                Symptoms/Reason for Visit
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your symptoms or reason for the visit"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional information..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;