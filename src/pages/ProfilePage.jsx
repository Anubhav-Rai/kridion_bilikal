import React, { useEffect, useState } from 'react';
import { Save, X, Pencil } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Spinner from '../components/ui/Spinner';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { profileApi } from '../api';
import { isValidEmail, isValidPhone } from '../utils/validation';

const emptyForm = (user) => ({
  name: user?.name || '',
  email: user?.email || '',
  phone: user?.phone || '',
});

const FIELDS = [
  { key: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { key: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { key: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
];

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() => emptyForm(user));

  useEffect(() => {
    if (!editing) setForm(emptyForm(user));
  }, [user, editing]);

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error('Name is required');
    if (!isValidEmail(form.email)) return toast.error('Please enter a valid email address');
    if (form.phone && !isValidPhone(form.phone)) return toast.error('Please enter a valid phone number');

    setSaving(true);
    try {
      const updated = await profileApi.update(form);
      updateUser(updated);
      toast.success('Profile updated');
      setEditing(false);
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm(user));
    setEditing(false);
  };

  return (
    <div className="max-w-xl">
      <PageHeader eyebrow="Account" title="Profile" subtitle="Manage your account information." />

      <div className="space-y-5 border-t border-line pt-8">
        {FIELDS.map(({ key, label, type, autoComplete }) => (
          <div key={key}>
            <label htmlFor={`profile-${key}`} className="label">
              {label}
            </label>
            <input
              id={`profile-${key}`}
              type={type}
              value={form[key]}
              readOnly={!editing}
              autoComplete={autoComplete}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
              className={`field ${editing ? '' : 'cursor-default border-transparent bg-sub text-muted'}`}
            />
          </div>
        ))}

        <div className="flex gap-3 pt-2">
          {editing ? (
            <>
              <button type="button" onClick={handleSave} disabled={saving} className="btn btn-primary">
                {saving ? <Spinner size={16} className="text-paper" /> : <Save size={16} strokeWidth={1.5} />}
                Save Changes
              </button>
              <button type="button" onClick={handleCancel} disabled={saving} className="btn btn-outline">
                <X size={16} strokeWidth={1.5} />
                Cancel
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setEditing(true)} className="btn btn-outline">
              <Pencil size={15} strokeWidth={1.5} />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
