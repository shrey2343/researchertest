import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Award, Briefcase, X, CheckCircle, Mail, Phone, Globe, Calendar, DollarSign } from 'lucide-react';
import { getAllFreelancers } from '../../services/api';
import toast from 'react-hot-toast';

interface Freelancer {
  _id: string;
  fullname: string;
  email: string;
  phone?: string;
  profilePhoto?: string;
  expertise?: string;
  skills?: string[];
  experience?: Array<{position?: string; company?: string; duration?: string; description?: string}>;
  education?: Array<{degree?: string; institution?: string; year?: string; field?: string}>;
  location?: string;
  hourlyRate?: number;
  bio?: string;
  portfolio?: string;
  languages?: string[];
  availability?: string;
  completedProjects?: number;
  rating?: number;
  verified?: boolean;
  researchAreas?: string[];
  projects?: Array<{title?: string; description?: string; technologies?: string; link?: string}>;
}

interface ExpertsPageProps {
  onNavigate: (page: string) => void;
}

export default function ExpertsPage({ onNavigate }: ExpertsPageProps) {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpert, setSelectedExpert] = useState<Freelancer | null>(null);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const response = await getAllFreelancers();
      setFreelancers(response.data || []);
    } catch (error) {
      toast.error('Failed to load experts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fafbff 0%, #f0f4ff 25%, #e8f0fe 50%, #dce9ff 75%, #f0f4ff 100%)' }}>
      {/* Header */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4"
          >
            Meet Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Expert Researchers</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Connect with verified professionals from around the world
          </motion.p>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="relative pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/80 rounded-2xl p-6 animate-pulse">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {freelancers.map((expert, index) => (
                <motion.div
                  key={expert._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-lg border border-blue-100 hover:shadow-2xl transition-all cursor-pointer flex flex-col h-full"
                  onClick={() => setSelectedExpert(expert)}
                >
                  {/* Profile Photo */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4">
                    {expert.profilePhoto ? (
                      <img
                        src={expert.profilePhoto}
                        alt={expert.fullname}
                        className="w-full h-full rounded-full object-cover ring-4 ring-blue-100"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-blue-100">
                        {expert.fullname.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                    )}
                    {expert.verified && (
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-white">
                        <CheckCircle size={16} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Name & Expertise */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-1">{expert.fullname}</h3>
                  <p className="text-xs sm:text-sm text-blue-600 font-medium text-center mb-2 sm:mb-3 line-clamp-1">{expert.expertise || 'Expert Researcher'}</p>

                  {/* Bio */}
                  {expert.bio && (
                    <p className="text-xs text-gray-600 text-center mb-2 sm:mb-3 line-clamp-2">{expert.bio}</p>
                  )}

                  {/* Hourly Rate */}
                  {expert.hourlyRate && expert.hourlyRate > 0 && (
                    <div className="flex items-center justify-center gap-1 mb-2 sm:mb-3">
                      <DollarSign size={14} className="text-green-600" />
                      <span className="text-sm font-bold text-green-600">${expert.hourlyRate}/hr</span>
                    </div>
                  )}

                  {/* Stats */}
                  {(expert.rating && expert.rating > 0) || (expert.completedProjects && expert.completedProjects > 0) ? (
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {expert.rating && expert.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star size={14} className="sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs sm:text-sm font-bold text-gray-700">{expert.rating}</span>
                        </div>
                      )}
                      {expert.completedProjects && expert.completedProjects > 0 && (
                        <div className="flex items-center gap-1">
                          <Briefcase size={14} className="sm:w-4 sm:h-4 text-gray-500" />
                          <span className="text-xs sm:text-sm text-gray-600">{expert.completedProjects} projects</span>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* Location */}
                  {expert.location && (
                    <div className="flex items-center justify-center gap-1 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                      <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                      <span>{expert.location}</span>
                    </div>
                  )}

                  {/* Skills */}
                  {expert.skills && expert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-3 sm:mb-4">
                      {expert.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                      {expert.skills.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                          +{expert.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* View Profile Button */}
                  <button className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all mt-auto">
                    View Profile
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Expert Detail Modal */}
      <AnimatePresence>
        {selectedExpert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedExpert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-t-3xl">
                <button
                  onClick={() => setSelectedExpert(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                >
                  <X size={20} className="text-white" />
                </button>

                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    {selectedExpert.profilePhoto ? (
                      <img
                        src={selectedExpert.profilePhoto}
                        alt={selectedExpert.fullname}
                        className="w-32 h-32 rounded-full object-cover ring-4 ring-white/30"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-white/30">
                        {selectedExpert.fullname.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                    )}
                    {selectedExpert.verified && (
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-white">
                        <CheckCircle size={20} className="text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-black text-white mb-2">{selectedExpert.fullname}</h2>
                    <p className="text-xl text-white/90 mb-3">{selectedExpert.expertise || 'Expert Researcher'}</p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      {selectedExpert.rating && selectedExpert.rating > 0 && (
                        <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                          <Star size={16} className="text-yellow-300 fill-yellow-300" />
                          <span className="text-white font-bold">{selectedExpert.rating}</span>
                        </div>
                      )}
                      {selectedExpert.completedProjects && selectedExpert.completedProjects > 0 && (
                        <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                          <Briefcase size={16} className="text-white" />
                          <span className="text-white">{selectedExpert.completedProjects} Projects</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Bio */}
                {selectedExpert.bio && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedExpert.bio}</p>
                  </div>
                )}

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                    <Mail size={20} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedExpert.email}</p>
                    </div>
                  </div>
                  {selectedExpert.phone && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <Phone size={20} className="text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedExpert.phone}</p>
                      </div>
                    </div>
                  )}
                  {selectedExpert.location && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <MapPin size={20} className="text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedExpert.location}</p>
                      </div>
                    </div>
                  )}
                  {selectedExpert.hourlyRate && selectedExpert.hourlyRate > 0 && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <DollarSign size={20} className="text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Hourly Rate</p>
                        <p className="text-sm font-semibold text-gray-900">${selectedExpert.hourlyRate}/hr</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Skills */}
                {selectedExpert.skills && selectedExpert.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExpert.skills.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Research Areas */}
                {selectedExpert.researchAreas && selectedExpert.researchAreas.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Research Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExpert.researchAreas.map((area, i) => (
                        <span key={i} className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg font-medium">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {selectedExpert.education && selectedExpert.education.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Education</h3>
                    <div className="space-y-3">
                      {selectedExpert.education.map((edu, i) => (
                        <div key={i} className="p-4 bg-blue-50 rounded-xl">
                          <p className="font-bold text-gray-900">{edu.degree}</p>
                          <p className="text-sm text-gray-600">{edu.institution}</p>
                          {edu.year && <p className="text-xs text-gray-500">{edu.year}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {selectedExpert.experience && selectedExpert.experience.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Experience</h3>
                    <div className="space-y-3">
                      {selectedExpert.experience.map((exp, i) => (
                        <div key={i} className="p-4 bg-blue-50 rounded-xl">
                          <p className="font-bold text-gray-900">{exp.position}</p>
                          <p className="text-sm text-gray-600">{exp.company}</p>
                          {exp.duration && <p className="text-xs text-gray-500">{exp.duration}</p>}
                          {exp.description && <p className="text-sm text-gray-600 mt-2">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {selectedExpert.languages && selectedExpert.languages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExpert.languages.map((lang, i) => (
                        <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {selectedExpert.projects && selectedExpert.projects.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Projects</h3>
                    <div className="space-y-3">
                      {selectedExpert.projects.map((project, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-xl">
                          <p className="font-bold text-gray-900">{project.title}</p>
                          {project.description && <p className="text-sm text-gray-600 mt-1">{project.description}</p>}
                          {project.technologies && <p className="text-xs text-blue-600 mt-2">{project.technologies}</p>}
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 block">
                              View Project
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio */}
                {selectedExpert.portfolio && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Portfolio</h3>
                    <a
                      href={selectedExpert.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                    >
                      <Globe size={16} />
                      {selectedExpert.portfolio}
                    </a>
                  </div>
                )}

                {/* Availability */}
                {selectedExpert.availability && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                    <Calendar size={20} className="text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">Availability</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedExpert.availability}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all">
                    Contact Expert
                  </button>
                  <button className="flex-1 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all">
                    View Projects
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
