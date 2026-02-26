import { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../../../../services/settingsApi';
import { Save, DollarSign, Mail, Shield, Wrench, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PlatformSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await getSettings();
      if (response.success) {
        setSettings(response.settings);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await updateSettings(settings);
      if (response.success) {
        toast.success('Settings updated successfully!');
      }
    } catch (error: any) {
      console.error('Failed to update settings:', error);
      toast.error(error.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (path: string, value: any) => {
    setSettings((prev: any) => {
      const keys = path.split('.');
      const newSettings = { ...prev };
      let current = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!settings) {
    return <div className="text-center py-12 text-gray-500">No settings available</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
            <p className="text-sm text-gray-600">Configure platform behavior and features</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Financial Settings */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="text-blue-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Financial Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50 gap-4">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Platform Commission</div>
              <div className="text-sm text-gray-600">Percentage charged on completed projects</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={settings.platformCommission}
                onChange={(e) => updateSetting('platformCommission', Number(e.target.value))}
                min="0"
                max="100"
                className="w-20 px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-gray-600 font-semibold">%</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50 gap-4">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Minimum Project Budget</div>
              <div className="text-sm text-gray-600">Minimum amount allowed for projects</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-semibold">₹</span>
              <input
                type="number"
                value={settings.minProjectBudget}
                onChange={(e) => updateSetting('minProjectBudget', Number(e.target.value))}
                className="w-32 px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50 gap-4">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Maximum Project Budget</div>
              <div className="text-sm text-gray-600">Maximum amount allowed for projects</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-semibold">₹</span>
              <input
                type="number"
                value={settings.maxProjectBudget}
                onChange={(e) => updateSetting('maxProjectBudget', Number(e.target.value))}
                className="w-32 px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="text-green-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Email Notifications</h3>
        </div>
        <div className="space-y-3">
          {[
            { key: 'projectPosted', label: 'Project Posted', desc: 'Notify admin when new project is posted' },
            { key: 'bidReceived', label: 'Bid Received', desc: 'Notify client when bid is received' },
            { key: 'bidAccepted', label: 'Bid Accepted', desc: 'Notify freelancer when bid is accepted' },
            { key: 'paymentReleased', label: 'Payment Released', desc: 'Notify freelancer when payment is released' },
            { key: 'verificationApproved', label: 'Verification Approved', desc: 'Notify user when verification is approved' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications[item.key]}
                  onChange={(e) => updateSetting(`emailNotifications.${item.key}`, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-purple-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Security Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Require Email Verification</div>
              <div className="text-sm text-gray-600">Users must verify email before accessing platform</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.requireEmailVerification}
                onChange={(e) => updateSetting('security.requireEmailVerification', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50 gap-4">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Max Login Attempts</div>
              <div className="text-sm text-gray-600">Lock account after failed attempts</div>
            </div>
            <input
              type="number"
              value={settings.security.maxLoginAttempts}
              onChange={(e) => updateSetting('security.maxLoginAttempts', Number(e.target.value))}
              min="3"
              max="10"
              className="w-20 px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50 gap-4">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Session Timeout</div>
              <div className="text-sm text-gray-600">Auto logout after inactivity (days)</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSetting('security.sessionTimeout', Number(e.target.value))}
                min="1"
                max="30"
                className="w-20 px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-gray-600 font-semibold">days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Wrench className="text-amber-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Feature Toggles</h3>
        </div>
        <div className="space-y-3">
          {[
            { key: 'aiMatching', label: 'AI Matching', desc: 'Enable AI-powered project-freelancer matching' },
            { key: 'escrowPayments', label: 'Escrow Payments', desc: 'Enable secure escrow payment system' },
            { key: 'disputeResolution', label: 'Dispute Resolution', desc: 'Enable dispute resolution system' },
            { key: 'verification', label: 'User Verification', desc: 'Enable user verification system' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.features[item.key]}
                  onChange={(e) => updateSetting(`features.${item.key}`, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Mode */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="text-red-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Maintenance Mode</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Enable Maintenance Mode</div>
              <div className="text-sm text-gray-600">Temporarily disable platform access</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode.enabled}
                onChange={(e) => updateSetting('maintenanceMode.enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
            <label className="block font-semibold text-gray-900 mb-2">Maintenance Message</label>
            <textarea
              value={settings.maintenanceMode.message}
              onChange={(e) => updateSetting('maintenanceMode.message', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter maintenance message..."
            />
          </div>
        </div>
      </div>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 font-semibold"
        >
          <Save size={20} />
          {saving ? 'Saving Changes...' : 'Save All Settings'}
        </button>
      </div>
    </div>
  );
}
