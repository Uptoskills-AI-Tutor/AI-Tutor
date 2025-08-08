import React, { useMemo, useState, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Trash2,
  Edit2,
  CornerUpLeft
} from 'lucide-react';
import {
  fetchDiscussions,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  addReply,
} from '../api/discussionApi'; // Make sure this file exists

const allTags = ['All', 'React', 'JavaScript', 'CSS'];

const Discussion = () => {
  const [threads, setThreads] = useState([]);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('All');
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', tag: 'React' });
  const [editingThreadId, setEditingThreadId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null);

  // Fetch threads on load
  useEffect(() => {
    const loadDiscussions = async () => {
      try {
        const res = await fetchDiscussions();
        setThreads(res.data);
      } catch (err) {
        console.error('Failed to load discussions:', err);
      }
    };
    loadDiscussions();
  }, []);

  const filtered = useMemo(() => {
    return threads
      .filter((t) => (tag === 'All' ? true : t.tag === tag))
      .filter((t) => {
        const q = query.toLowerCase();
        return t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q);
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [threads, query, tag]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;

    try {
      const res = await createDiscussion({
        title: form.title.trim(),
        body: form.body.trim(),
        tag: form.tag,
        author: 'You',
      });
      setThreads((prev) => [res.data, ...prev]);
      setForm({ title: '', body: '', tag: 'React' });
      setIsCreating(false);
    } catch (err) {
      console.error('Failed to create thread:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDiscussion(id);
      setThreads((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Failed to delete thread:', err);
    }
  };

  const handleEdit = (id) => {
    const thread = threads.find((t) => t._id === id);
    if (!thread) return;
    setEditingThreadId(id);
    setForm({ title: thread.title, body: thread.body, tag: thread.tag });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateDiscussion(editingThreadId, form);
      setThreads((prev) =>
        prev.map((t) => (t._id === editingThreadId ? res.data : t))
      );
      setEditingThreadId(null);
      setForm({ title: '', body: '', tag: 'React' });
    } catch (err) {
      console.error('Failed to update thread:', err);
    }
  };

  const handleReply = async (threadId) => {
    if (!replyText.trim()) return;
    try {
      const res = await addReply(threadId, replyText.trim());
      setThreads((prev) =>
        prev.map((t) => (t._id === threadId ? res.data : t))
      );
      setReplyText('');
      setActiveReplyId(null);
    } catch (err) {
      console.error('Failed to add reply:', err);
    }
  };

  const relTime = (iso) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discussion</h1>
        <button
          className="btn btn-primary flex items-center gap-2 text-white"
          onClick={() => {
            setForm({ title: '', body: '', tag: 'React' });
            setIsCreating(true);
            setEditingThreadId(null);
          }}
        >
          <MessageCircle size={16} className="stroke-current" />
          <span>New Thread</span>
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          className="flex-1 border border-gray-300 rounded-md px-3 py-2"
          placeholder="Search discussions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Threads */}
      {filtered.map((t) => (
        <div key={t._id} className="p-4 border rounded-md mb-4 bg-white">
          <div className="flex justify-between">
            <h3 className="font-semibold">{t.title}</h3>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{t.tag}</span>
          </div>
          <p className="text-sm mt-1">{t.body}</p>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{t.author} • {relTime(t.createdAt)}</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(t._id)}><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(t._id)}><Trash2 size={16} /></button>
              <button onClick={() => setActiveReplyId(t._id)}><CornerUpLeft size={16} /></button>
            </div>
          </div>

          {/* Replies */}
          {t.replies?.length > 0 && (
            <div className="mt-3 space-y-2 pl-4 border-l-2 border-blue-200">
              {t.replies.map((r, idx) => (
                <div key={idx} className="text-sm text-gray-700">
                  <span className="text-blue-700 font-medium">Reply:</span> {r.text} <span className="text-xs">({relTime(r.createdAt)})</span>
                </div>
              ))}
            </div>
          )}

          {/* Reply box */}
          {activeReplyId === t._id && (
            <div className="mt-2 flex gap-2 items-center">
              <input
                className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button className="text-white bg-blue-600 px-2 py-1 rounded" onClick={() => handleReply(t._id)}>Reply</button>
            </div>
          )}
        </div>
      ))}

      {/* Modal for Create/Edit */}
      {(isCreating || editingThreadId) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingThreadId ? 'Edit Thread' : 'New Thread'}
              </h3>
              <button onClick={() => {
                setIsCreating(false);
                setEditingThreadId(null);
              }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={editingThreadId ? handleUpdate : handleCreate} className="space-y-4">
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={3}
                placeholder="Body"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
              />
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
              >
                {allTags.filter((t) => t !== 'All').map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <div className="flex justify-end">
                <button className="btn btn-primary">{editingThreadId ? 'Update' : 'Post'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussion;

