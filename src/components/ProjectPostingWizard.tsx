import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Upload, CheckCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { createProject } from '../services/api';

interface ProjectPostingWizardProps {
  onClose: () => void;
  onComplete?: (projectData: any) => void;
}

export default function ProjectPostingWizard({ onClose, onComplete }: ProjectPostingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    introduction: '',
    detailedRequirements: '',
    skills: [] as string[],
    deliverables: '',
    deadline: '',
    budgetMin: '',
    budgetMax: '',
    files: [] as File[],
    confidentialityAgreed: false
  });

  const skillsList = [
    'Academic Writing',
    'SPSS',
    'R Programming',
    'Python',
    'Statistical Analysis',
    'Data Visualization',
    'Qualitative Research',
    'NVivo',
    'ATLAS.ti',
    'Content Analysis',
    'Thematic Analysis',
    'Literature Review',
    'Systematic Review',
    'Meta-Analysis',
    'Research Design',
    'Survey Design',
    'Grant Writing',
    'Manuscript Editing',
    'Quantitative Methods',
    'Qualitative Methods',
    'Mixed Methods',
    'Data Collection',
    'Regression Analysis',
    'Factor Analysis',
    'SEM (Structural Equation Modeling)',
    'Machine Learning',
    'Deep Learning',
    'Text Mining'
  ];

  const steps = [
    'Project Details',
    'Requirements',
    'Skills & Deliverables',
    'Timeline & Budget',
    'Review & Post'
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const projectData = {
        title: formData.title,
        introduction: formData.introduction,
        detailedRequirements: formData.detailedRequirements,
        skills: formData.skills,
        deliverables: formData.deliverables,
        deadline: formData.deadline,
        budgetMin: formData.budgetMin,
        budgetMax: formData.budgetMax,
        files: formData.files,
      };

      const response = await createProject(projectData);
      
      if (response.success) {
        toast.success('Project posted successfully!');
        if (onComplete) onComplete(response.project);
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to post project');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title.trim() && formData.introduction.trim();
      case 2:
        return formData.detailedRequirements.trim();
      case 3:
        return formData.skills.length > 0 && formData.deliverables.trim();
      case 4:
        return formData.deadline && formData.budgetMin && formData.budgetMax;
      case 5:
        return formData.confidentialityAgreed;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-[#1F1F1F]">Post Your Research Project</h2>
            <p className="text-sm text-gray-600 mt-1">Step {currentStep} of 5: {steps[currentStep - 1]}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-[#1F1F1F] transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="px-6 py-4 bg-[#F5F7FA] border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep > idx + 1
                        ? 'bg-green-500 text-white'
                        : currentStep === idx + 1
                        ? 'bg-[#2D6CDF] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > idx + 1 ? <CheckCircle size={20} /> : idx + 1}
                  </div>
                  <span className="text-xs text-gray-600 mt-2 hidden md:block text-center">{step}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > idx + 1 ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 1 && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Statistical Analysis for Healthcare Outcomes Study"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Write a clear, descriptive title for your research project</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  Brief Introduction of the Project <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.introduction}
                  onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                  placeholder="Provide a brief overview of your research project, including context and main objectives..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">Summarize what your project is about (200-500 words recommended)</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  Detailed Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.detailedRequirements}
                  onChange={(e) => setFormData({ ...formData, detailedRequirements: e.target.value })}
                  placeholder="Describe your specific requirements:
- Research methodology needed
- Data sources and sample size
- Analysis techniques required
- Any specific frameworks or theories to use
- Output format preferences
- Any constraints or special considerations"
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent resize-none font-mono text-sm"
                />
                <p className="text-sm text-gray-500 mt-1">Be as detailed as possible to help researchers understand your needs</p>
              </div>

              {/* <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  Upload Supporting Files (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#2D6CDF] transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-3" size={40} />
                  <p className="text-gray-600 font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, DOC, XLSX, CSV (Max 200MB)</p>
                  {formData.files.length > 0 && (
                    <p className="text-sm text-[#2D6CDF] mt-3">{formData.files.length} file(s) selected</p>
                  )}
                </div>
              </div> */}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  Skills Required <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-4">Select all skills that are required for this project (minimum 1)</p>
                <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto p-4 border border-gray-200 rounded-xl">
                  {skillsList.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        formData.skills.includes(skill)
                          ? 'bg-[#2D6CDF] text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">Selected: {formData.skills.length} skill(s)</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  Expected Deliverables <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  placeholder="List all deliverables you expect:
- Final research report (Word/PDF)
- Data analysis output files
- Statistical charts and visualizations
- Presentation slides (if applicable)
- Raw data files (if applicable)
- Any other specific outputs"
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  Project Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">When do you need the project completed?</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-3">
                  Budget Range (USD) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Minimum Budget</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={formData.budgetMin}
                        onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                        placeholder="500"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Maximum Budget</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={formData.budgetMax}
                        onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                        placeholder="1000"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Platform commission: 10% • You'll pay the researcher's fee + 10% platform fee
                </p>
              </div>

              <div className="bg-[#F5F7FA] rounded-xl p-6">
                <h4 className="font-bold text-[#1F1F1F] mb-3">Budget Example</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Researcher Fee (Max):</span>
                    <span className="font-semibold">${formData.budgetMax || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Commission (10%):</span>
                    <span className="font-semibold">${formData.budgetMax ? (parseFloat(formData.budgetMax) * 0.1).toFixed(2) : '0'}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="text-gray-600 font-bold">Total You Pay:</span>
                    <span className="font-bold text-[#2D6CDF]">
                      ${formData.budgetMax ? (parseFloat(formData.budgetMax) * 1.1).toFixed(2) : '0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-[#F5F7FA] rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#1F1F1F] mb-6">Project Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Title</div>
                    <div className="font-semibold text-[#1F1F1F]">{formData.title}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Skills Required ({formData.skills.length})</div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, idx) => (
                        <span key={idx} className="bg-white text-[#1F1F1F] px-3 py-1 rounded-lg text-sm font-medium border border-gray-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Budget Range</div>
                      <div className="font-semibold text-[#2D6CDF]">${formData.budgetMin} - ${formData.budgetMax}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Deadline</div>
                      <div className="font-semibold text-[#1F1F1F]">{formData.deadline}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-[#2D6CDF] rounded-xl p-6">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.confidentialityAgreed}
                    onChange={(e) => setFormData({ ...formData, confidentialityAgreed: e.target.checked })}
                    className="mt-1 w-5 h-5 text-[#2D6CDF] border-gray-300 rounded focus:ring-[#2D6CDF]"
                  />
                  <span className="ml-3 text-sm text-gray-700 leading-relaxed">
                    <span className="font-bold text-[#1F1F1F]">Confidentiality Confirmation</span>
                    <br />
                    I confirm that I have read and agree to the platform's Academic Integrity Policy, Terms of Use, and Privacy Policy. I understand that all personal details will remain anonymous and that secure escrow payment will be used for this project.
                  </span>
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-bold text-[#1F1F1F] mb-2 flex items-center gap-2">
                  <Sparkles className="text-[#2D6CDF]" size={20} />
                  AI Matchmaking Ready
                </h4>
                <p className="text-sm text-gray-700">
                  Once you post this project, our AI will instantly analyze your requirements and recommend the top 5 most suitable verified researchers for your project.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-[#F5F7FA]">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#2D6CDF] hover:bg-white'
            }`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                isStepValid()
                  ? 'bg-[#2D6CDF] text-white hover:bg-[#1F1F1F]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                isStepValid()
                  ? 'bg-[#2D6CDF] text-white hover:bg-[#1F1F1F] shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Post Project & Get AI Matches
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
