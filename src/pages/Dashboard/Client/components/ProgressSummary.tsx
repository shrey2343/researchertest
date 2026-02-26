import { useState, useEffect } from 'react';
import { TrendingUp, Clock, CheckCircle2, Eye } from 'lucide-react';
import { getProgressUpdates } from '../../../../services/api';

interface ProgressUpdate {
  _id: string;
  projectId: string;
  projectTitle: string;
  freelancerId: {
    fullname: string;
  };
  previousProgress: number;
  newProgress: number;
  milestone?: string;
  createdAt: string;
}

interface ProgressSummaryProps {
  projects: any[];
  onViewProgress: (project: any) => void;
}

const getProgressColors = (progress: number) => {
  if (progress >= 80) return 'text-emerald-600';
  if (progress >= 50) return 'text-blue-600';
  if (progress >= 25) return 'text-indigo-600';
  return 'text-purple-600';
};

const ProgressSummary = ({ projects, onViewProgress }: ProgressSummaryProps) => {
  const [recentUpdates, setRecentUpdates] = useState<ProgressUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentUpdates = async () => {
      try {
        setLoading(true);
        const inProgressProjects = projects.filter(p => p.status === 'in-progress');
        const allUpdates: ProgressUpdate[] = [];

        for (const project of inProgressProjects.slice(0, 3)) { // Limit to 3 projects
          try {
            const response = await getProgressUpdates(project._id);
            if (response.progressUpdates && response.progressUpdates.length > 0) {
              // Get the most recent update for each project
              const latestUpdate = response.progressUpdates[0];
              allUpdates.push({
                ...latestUpdate,
                projectTitle: project.title
              });
            }
          } catch (error: any) {
            // Silently handle 404 errors for missing progress updates endpoint
            if (!error.message?.includes('404') && !error.message?.includes('Not Found')) {
              console.error(`Failed to fetch updates for project ${project._id}:`, error);
            }
          }
        }

        // Sort by creation date and take the 5 most recent
        allUpdates.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setRecentUpdates(allUpdates.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch recent updates:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projects.length > 0) {
      fetchRecentUpdates();
    }
  }, [projects]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleViewProgress = (update: ProgressUpdate) => {
    const project = projects.find(p => p._id === update.projectId);
    if (project) {
      onViewProgress(project);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Progress Updates</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recentUpdates.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Progress Updates</h3>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No recent progress updates</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Progress Updates</h3>
      <div className="space-y-4">
        {recentUpdates.map((update) => (
          <div 
            key={update._id} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
            onClick={() => handleViewProgress(update)}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                {update.newProgress === 100 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <TrendingUp className={`w-5 h-5 ${getProgressColors(update.newProgress)}`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-bold ${getProgressColors(update.newProgress)}`}>
                    {update.previousProgress}% → {update.newProgress}%
                  </span>
                  {update.newProgress === 100 && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                      Completed
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 truncate">{update.projectTitle}</p>
                {update.milestone && (
                  <p className="text-xs text-gray-500 truncate">Milestone: {update.milestone}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{formatDate(update.createdAt)}</span>
              <Eye className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSummary;