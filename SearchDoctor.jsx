import React, { useEffect, useMemo, useState } from 'react';
import { Search, MapPin, Star, Clock, Phone, Calendar, Filter, User, Stethoscope, Heart, Brain, Eye, Bone } from 'lucide-react';
import apiClient from '../services/apiClient';

const SearchDoctor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fallbackDoctors = [
      {
        id: 'in-1',
        name: 'Dr. Aisha Mehta',
        email: 'aisha.mehta@example.com',
        specialty: 'Cardiologist',
        rating: 4.9,
        reviews: 327,
        location: 'Mumbai, Maharashtra',
        experience: '15 years',
        availability: 'Available Today',
        phone: '+91 22 5555 1111',
        consultationFee: '₹1,200',
        languages: ['English', 'Hindi', 'Marathi'],
        education: 'AIIMS Delhi',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'in-2',
        name: 'Dr. Rohan Iyer',
        email: 'rohan.iyer@example.com',
        specialty: 'Neurologist',
        rating: 4.8,
        reviews: 289,
        location: 'Bengaluru, Karnataka',
        experience: '12 years',
        availability: 'Available Tomorrow',
        phone: '+91 80 5555 2222',
        consultationFee: '₹1,500',
        languages: ['English', 'Kannada', 'Hindi'],
        education: 'NIMHANS Bengaluru',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'in-3',
        name: 'Dr. Priya Nair',
        email: 'priya.nair@example.com',
        specialty: 'Dermatologist',
        rating: 4.7,
        reviews: 198,
        location: 'Kochi, Kerala',
        experience: '10 years',
        availability: 'Available Today',
        phone: '+91 484 555 3333',
        consultationFee: '₹900',
        languages: ['English', 'Malayalam', 'Hindi'],
        education: 'CMC Vellore',
        image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'in-4',
        name: 'Dr. Arjun Singh',
        email: 'arjun.singh@example.com',
        specialty: 'Orthopedist',
        rating: 4.6,
        reviews: 250,
        location: 'New Delhi, Delhi',
        experience: '18 years',
        availability: 'Available Next Week',
        phone: '+91 11 5555 4444',
        consultationFee: '₹1,400',
        languages: ['English', 'Hindi', 'Punjabi'],
        education: 'PGI Chandigarh',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'in-5',
        name: 'Dr. Kavya Rao',
        email: 'kavya.rao@example.com',
        specialty: 'Pediatrician',
        rating: 4.9,
        reviews: 310,
        location: 'Hyderabad, Telangana',
        experience: '14 years',
        availability: 'Available Today',
        phone: '+91 40 5555 6666',
        consultationFee: '₹1,000',
        languages: ['English', 'Telugu', 'Hindi'],
        education: 'Osmania Medical College',
        image: 'https://images.unsplash.com/photo-1528763380143-df11e1300f01?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'in-6',
        name: 'Dr. Rahul Bhatnagar',
        email: 'rahul.bhatnagar@example.com',
        specialty: 'General Physician',
        rating: 4.8,
        reviews: 265,
        location: 'Agra, Uttar Pradesh',
        experience: '13 years',
        availability: 'Available Today',
        phone: '+91 562 555 7777',
        consultationFee: '₹850',
        languages: ['English', 'Hindi'],
        education: 'King George’s Medical University',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'agra-1',
        name: 'Dr. M. L. Gupta',
        email: 'ml.gupta@example.com',
        specialty: 'Cardiologist',
        rating: 4.8,
        reviews: 210,
        location: 'Agra, Uttar Pradesh',
        experience: '20 years',
        availability: 'Available Today',
        phone: '+91 562 400 1111',
        consultationFee: '₹1,500',
        languages: ['English', 'Hindi'],
        education: 'AIIMS Delhi',
        image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'agra-2',
        name: 'Dr. Anurag Jain',
        email: 'anurag.jain@example.com',
        specialty: 'Neurologist',
        rating: 4.7,
        reviews: 189,
        location: 'Agra, Uttar Pradesh',
        experience: '15 years',
        availability: 'Available Tomorrow',
        phone: '+91 562 400 2222',
        consultationFee: '₹1,700',
        languages: ['English', 'Hindi'],
        education: 'NIMHANS Bengaluru',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'agra-3',
        name: 'Dr. Shipra Jaiswal',
        email: 'shipra.jaiswal@example.com',
        specialty: 'Dermatologist',
        rating: 4.9,
        reviews: 245,
        location: 'Civil Lines, Agra',
        experience: '12 years',
        availability: 'Available Today',
        phone: '+91 562 400 3333',
        consultationFee: '₹1,200',
        languages: ['English', 'Hindi'],
        education: 'CMC Vellore',
        image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'agra-4',
        name: 'Dr. M. K. Maheshwari',
        email: 'mk.maheshwari@example.com',
        specialty: 'Orthopedist',
        rating: 4.6,
        reviews: 178,
        location: 'Sanjay Place, Agra',
        experience: '18 years',
        availability: 'Available Next Week',
        phone: '+91 562 400 4444',
        consultationFee: '₹1,400',
        languages: ['English', 'Hindi'],
        education: 'PGI Chandigarh',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'agra-5',
        name: 'Dr. Neelima Agarwal',
        email: 'neelima.agarwal@example.com',
        specialty: 'Ophthalmologist',
        rating: 4.8,
        reviews: 205,
        location: 'Kamla Nagar, Agra',
        experience: '16 years',
        availability: 'Available Today',
        phone: '+91 562 400 5555',
        consultationFee: '₹1,100',
        languages: ['English', 'Hindi'],
        education: 'L V Prasad Eye Institute',
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'agra-6',
        name: 'Dr. Gaurav Gupta',
        email: 'gaurav.gupta@example.com',
        specialty: 'General Physician',
        rating: 4.7,
        reviews: 233,
        location: 'Raja Ki Mandi, Agra',
        experience: '14 years',
        availability: 'Available Today',
        phone: '+91 562 400 6666',
        consultationFee: '₹900',
        languages: ['English', 'Hindi'],
        education: 'King George’s Medical University',
        image: 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'agra-7',
        name: 'Dr. Rachna Kulshrestha',
        email: 'rachna.kulshrestha@example.com',
        specialty: 'Gynecologist',
        rating: 4.9,
        reviews: 312,
        location: 'Agra, Uttar Pradesh',
        experience: '17 years',
        availability: 'Available Tomorrow',
        phone: '+91 562 400 7777',
        consultationFee: '₹1,600',
        languages: ['English', 'Hindi'],
        education: 'Lady Hardinge Medical College',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'agra-8',
        name: 'Dr. Vivek Chaturvedi',
        email: 'vivek.chaturvedi@example.com',
        specialty: 'Pediatrician',
        rating: 4.8,
        reviews: 198,
        location: 'Dayal Bagh, Agra',
        experience: '13 years',
        availability: 'Available Today',
        phone: '+91 562 400 8888',
        consultationFee: '₹950',
        languages: ['English', 'Hindi'],
        education: 'SMS Medical College',
        image: 'https://images.unsplash.com/photo-1524504388940-021b67dc4d19?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'agra-9',
        name: 'Dr. Pankaj Agarwal',
        email: 'pankaj.agarwal@example.com',
        specialty: 'ENT Specialist',
        rating: 4.6,
        reviews: 162,
        location: 'Shahganj, Agra',
        experience: '19 years',
        availability: 'Available Next Week',
        phone: '+91 562 400 9999',
        consultationFee: '₹1,300',
        languages: ['English', 'Hindi'],
        education: 'Armed Forces Medical College',
        image: 'https://images.unsplash.com/photo-1521579994865-0fa228bad5b3?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'agra-10',
        name: 'Dr. Rajesh Sharma',
        email: 'rajesh.sharma@example.com',
        specialty: 'Dentist',
        rating: 4.9,
        reviews: 275,
        location: 'Sanjay Place, Agra',
        experience: '15 years',
        availability: 'Available Today',
        phone: '+91 562 401 0000',
        consultationFee: '₹800',
        languages: ['English', 'Hindi'],
        education: 'Maulana Azad Dental College',
        image: 'https://images.unsplash.com/photo-1544723795-43253775d5ae?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'mathura-1',
        name: 'Dr. Seema Bhargava',
        email: 'seema.bhargava@example.com',
        specialty: 'Gynecologist',
        rating: 4.8,
        reviews: 188,
        location: 'Mathura, Uttar Pradesh',
        experience: '16 years',
        availability: 'Available Today',
        phone: '+91 565 400 1111',
        consultationFee: '₹1,200',
        languages: ['English', 'Hindi'],
        education: 'Lady Hardinge Medical College',
        image: 'https://images.unsplash.com/photo-1524504388940-021b67dc4d19?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'mathura-2',
        name: 'Dr. Amit Khurana',
        email: 'amit.khurana@example.com',
        specialty: 'Cardiologist',
        rating: 4.7,
        reviews: 175,
        location: 'Mathura, Uttar Pradesh',
        experience: '14 years',
        availability: 'Available Tomorrow',
        phone: '+91 565 400 2222',
        consultationFee: '₹1,500',
        languages: ['English', 'Hindi'],
        education: 'AIIMS Delhi',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=80',
      },
      {
        id: 'mathura-3',
        name: 'Dr. Nitin Saxena',
        email: 'nitin.saxena@example.com',
        specialty: 'Orthopedist',
        rating: 4.6,
        reviews: 162,
        location: 'Vrindavan, Mathura',
        experience: '18 years',
        availability: 'Available Next Week',
        phone: '+91 565 400 3333',
        consultationFee: '₹1,350',
        languages: ['English', 'Hindi'],
        education: 'PGI Chandigarh',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&h=300&q=80',
      },
    ];

    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('doctors/getalldoctors');
        const normalizedDoctors = data.map((doctor) => ({
          id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          specialty: doctor.specialization || 'General Physician',
          rating: doctor.rating || 4.8,
          reviews: doctor.reviews || 0,
          location: doctor.location || 'Not provided',
          experience: doctor.experience || '5 years',
          availability: doctor.availability || 'Available',
          phone: doctor.phone || 'N/A',
          consultationFee: doctor.consultationFee
            ? (doctor.consultationFee.toString().includes('₹') ? doctor.consultationFee : `₹${doctor.consultationFee}`)
            : '₹1,000',
          languages: doctor.languages?.length ? doctor.languages : ['English', 'Hindi'],
          education: doctor.education || 'Not provided',
          image: doctor.avatar ||
            'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=300&h=300&q=80',
        }));

        if (!normalizedDoctors.length) {
          setDoctors(fallbackDoctors);
          return;
        }

        const mergedByKey = new Map();
        const normalize = (value = '') => value.toString().trim().toLowerCase();
        const upsertDoctor = (doc) => {
          const key =
            (doc.email && normalize(doc.email)) ||
            `${normalize(doc.name)}|${normalize(doc.location)}|${normalize(doc.specialty)}`;
          if (!mergedByKey.has(key)) {
            mergedByKey.set(key, doc);
          }
        };

        normalizedDoctors.forEach(upsertDoctor);
        fallbackDoctors.forEach(upsertDoctor);

        setDoctors(Array.from(mergedByKey.values()));
      } catch (err) {
        setError('Unable to fetch doctors at the moment. Showing recommended specialists nearby.');
        setDoctors(fallbackDoctors);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specialties = [
    { name: 'Cardiologist', icon: Heart },
    { name: 'Neurologist', icon: Brain },
    { name: 'Dermatologist', icon: User },
    { name: 'Orthopedist', icon: Bone },
    { name: 'Ophthalmologist', icon: Eye },
    { name: 'General Physician', icon: Stethoscope }
  ];

  const locations = useMemo(() => {
    const uniqueLocations = new Set(
      doctors
        .map((doctor) => doctor.location)
        .filter(Boolean)
    );
    return Array.from(uniqueLocations);
  }, [doctors]);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesLocation = !selectedLocation || doctor.location === selectedLocation;

    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const getSpecialtyIcon = (specialty) => {
    const specialtyObj = specialties.find(s => s.name === specialty);
    return specialtyObj ? specialtyObj.icon : Stethoscope;
  };

  const handleBookAppointment = (doctor) => {
    console.log('Booking appointment with:', doctor.name);
    // Add booking logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Doctor</h1>
            <p className="text-xl text-blue-100 mb-8">
              Search from thousands of qualified healthcare professionals
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by doctor name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
              
              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Specialty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Specialty
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map(specialty => (
                      <option key={specialty.name} value={specialty.name}>
                        {specialty.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick Specialty Icons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quick Select
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {specialties.slice(0, 6).map(specialty => {
                      const IconComponent = specialty.icon;
                      return (
                        <button
                          key={specialty.name}
                          onClick={() => setSelectedSpecialty(specialty.name)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-1 ${
                            selectedSpecialty === specialty.name
                              ? 'border-blue-500 bg-blue-50 text-blue-600'
                              : 'border-gray-200 hover:border-blue-300 text-gray-600'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="text-xs font-medium">{specialty.name.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {loading ? 'Fetching doctors...' : `Available Doctors (${filteredDoctors.length})`}
              </h2>
              <p className="text-gray-600">
                {searchTerm && `Results for "${searchTerm}"`}
                {selectedSpecialty && ` in ${selectedSpecialty}`}
                {selectedLocation && ` at ${selectedLocation}`}
              </p>
            </div>

            {/* Doctor Cards */}
            <div className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
                  {error}
                </div>
              )}

              {filteredDoctors.map(doctor => {
                const SpecialtyIcon = getSpecialtyIcon(doctor.specialty);
                return (
                  <div key={doctor.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Doctor Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-32 h-32 rounded-lg object-cover"
                          />
                        </div>

                        {/* Doctor Info */}
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {doctor.name}
                              </h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <SpecialtyIcon className="w-4 h-4 text-blue-600" />
                                <span className="text-blue-600 font-medium">{doctor.specialty}</span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="font-medium">{doctor.rating}</span>
                                  <span>({doctor.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{doctor.experience}</span>
                                </div>
                              </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span>{doctor.location}</span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600 mb-1">
                                {doctor.consultationFee}
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                Consultation Fee
                              </div>
                              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                doctor.availability.includes('Today') 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {doctor.availability}
                              </div>
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Education:</span> {doctor.education}
                            </div>
                            <div>
                              <span className="font-medium">Languages:</span> {doctor.languages.join(', ')}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => handleBookAppointment(doctor)}
                              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                            >
                              <Calendar className="w-4 h-4" />
                              <span>Book Appointment</span>
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center space-x-2">
                              <Phone className="w-4 h-4" />
                              <span>Call Now</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!loading && filteredDoctors.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters to find more results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDoctor;