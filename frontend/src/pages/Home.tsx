import React from 'react';
import { Link } from 'react-router-dom';
import {  Users, Calendar, Award, Clock, MapPin, Phone, Mail } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Expert Doctors',
      description: 'Access to highly qualified medical professionals across various specialties'
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      title: 'Easy Booking',
      description: 'Book appointments online 24/7 with our user-friendly scheduling system'
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: 'Quality Care',
      description: 'Committed to providing the highest standard of medical care and patient safety'
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: '24/7 Support',
      description: 'Round-the-clock emergency services and patient support available'
    }
  ];

  const stats = [
    { number: '50+', label: 'Expert Doctors' },
    { number: '10,000+', label: 'Happy Patients' },
    { number: '15+', label: 'Medical Specialties' },
    { number: '24/7', label: 'Emergency Care' }
  ];

  const specialties = [
    'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics',
    'Neurology', 'Gastroenterology', 'Oncology', 'Psychiatry'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Health, Our
              <span className="text-blue-600 block">Priority</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience world-class healthcare with our team of expert doctors and 
              state-of-the-art facilities. Book your appointment today for personalized medical care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/doctors"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <Users className="mr-2 h-5 w-5" />
                Find a Doctor
              </Link>
              <Link
                to="/appointments"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 text-lg font-medium rounded-md border border-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MediCare?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive healthcare services with a patient-first approach, 
              combining advanced medical technology with compassionate care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Medical Specialties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive range of medical specialties ensures you receive 
              expert care for any health concern.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-gray-900 font-medium">{specialty}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our services or need to schedule an appointment? 
                We're here to help you with all your healthcare needs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">123 Healthcare Drive, Medical City, MC 12345</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">contact@medicare.com</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Mon - Fri: 8:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="font-semibold text-red-900">Emergency: 911</div>
                  <div className="text-red-700 text-sm">For immediate medical emergencies</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-900">Hospital: +1 (555) 123-4567</div>
                  <div className="text-blue-700 text-sm">24/7 hospital services</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-900">Appointments: +1 (555) 123-4500</div>
                  <div className="text-green-700 text-sm">Schedule non-emergency appointments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;