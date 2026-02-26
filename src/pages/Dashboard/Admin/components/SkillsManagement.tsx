export default function SkillsManagement({ skills }: { skills: string[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Skills Database ({skills.length})</h3>
        <button className="bg-cyan-100 text-cyan-600 border border-cyan-300 px-6 py-2.5 rounded-xl font-semibold hover:bg-cyan-200 hover:scale-105 hover:shadow-md transition-all duration-200">
          Add New Skill
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-100 hover:shadow-md hover:scale-105 transition-all duration-200">
            <span className="font-medium text-gray-900">{skill}</span>
            <button className="text-red-600 hover:text-red-700">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
