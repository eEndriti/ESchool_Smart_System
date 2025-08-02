import React, { useState, useEffect } from 'react';

const ClassFormModal = ({ onClose, initialData, generation }) => {
  const [form, setForm] = useState({ name: '', teacher: '', students: 0 });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'students' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form',form)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit Class' : 'Add Class'}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" placeholder="Class Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="teacher" placeholder="Teacher Name" value={form.teacher} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="students" type="number" placeholder="Number of Students" value={form.students} onChange={handleChange} className="w-full border p-2 rounded" required />
          <div className="flex justify-end space-x-2 pt-3">
            <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassFormModal;
