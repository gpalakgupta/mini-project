import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, User, Calendar } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  location: string;
  image: string;
  availability: string[];
  consultationFee: number;
  education: string;
}

interface DoctorListProps {
  onBookAppointment: (doctorId: number) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ onBookAppointment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.8,
      experience: '15 years',
      location: 'Downtown Medical Center',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Monday', 'Wednesday', 'Friday'],
      consultationFee: 200,
      education: 'MD, Harvard Medical School'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      rating: 4.9,
      experience: '12 years',
      location: 'City Health Clinic',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      consultationFee: 180,
      education: 'MD, Johns Hopkins University'
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialty: 'Pediatrics',
      rating: 4.7,
      experience: '18 years',
      location: 'Children\'s Hospital',
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Monday', 'Tuesday', 'Thursday'],
      consultationFee: 150,
      education: 'MD, Stanford University'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      rating: 4.6,
      experience: '20 years',
      location: 'Sports Medicine Center',
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Wednesday', 'Friday', 'Saturday'],
      consultationFee: 220,
      education: 'MD, Mayo Clinic'
    },
    {
      id: 5,
      name: 'Dr. Lisa Rodriguez',
      specialty: 'Neurology',
      rating: 4.8,
      experience: '14 years',
      location: 'Brain & Spine Institute',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Monday', 'Wednesday', 'Friday'],
      consultationFee: 250,
      education: 'MD, PhD, UCLA Medical Center'
    },
    {
      id: 6,
      name: 'Dr. Robert Kim',
      specialty: 'Gastroenterology',
      rating: 4.5,
      experience: '16 years',
      location: 'Digestive Health Center',
      image: 'https://images.pexels.com/photos/5452297/pexels-photo-5452297.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      consultationFee: 190,
      education: 'MD, Mount Sinai School of Medicine'
    }
  ];

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  const locations = [...new Set(doctors.map(doctor => doctor.location))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !specialtyFilter || doctor.specialty === specialtyFilter;
    const matchesLocation = !locationFilter || doctor.location === locationFilter;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find a Doctor</h1>
        
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
            
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="flex items-center mr-4">
                    {renderStars(doctor.rating)}
                    <span className="ml-1 font-medium">{doctor.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {doctor.experience}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {doctor.location}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  {doctor.education}
                </div>
                
                <div className="text-sm text-gray-600">
                  <strong>Available:</strong> {doctor.availability.join(', ')}
                </div>
                
                <div className="text-lg font-semibold text-green-600">
                  ${doctor.consultationFee} consultation
                </div>
              </div>
              
              <button
                onClick={() => onBookAppointment(doctor.id)}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;