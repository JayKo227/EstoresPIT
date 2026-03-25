import { useEffect, useState } from 'react';
import {
  getLibraries, createLibrary, updateLibrary, deleteLibrary,
  getAuthors, createAuthor, updateAuthor, deleteAuthor,
  getBooks, createBook, updateBook, deleteBook,
  getMembers, createMember, updateMember, deleteMember,
  type Library, type Author, type Book, type Member,
} from './api';

type Tab = 'libraries' | 'authors' | 'books' | 'members';

const EMPTY_LIB    = { name: '' };
const EMPTY_AUTHOR = { author_name: '', phone_number: '', gender: 'Male' };
const EMPTY_BOOK   = { book_name: '', date_published: '', author_id: 0, library_id: 0 };
const EMPTY_MEMBER = { member_name: '', phone_number: '', gender: 'Male', birthyear: 0, book_id: null as number | null };

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>('libraries');

  const [libraries, setLibraries] = useState<Library[]>([]);
  const [authors,   setAuthors]   = useState<Author[]>([]);
  const [books,     setBooks]     = useState<Book[]>([]);
  const [members,   setMembers]   = useState<Member[]>([]);

  const [libForm,    setLibForm]    = useState(EMPTY_LIB);
  const [authorForm, setAuthorForm] = useState(EMPTY_AUTHOR);
  const [bookForm,   setBookForm]   = useState(EMPTY_BOOK);
  const [memberForm, setMemberForm] = useState(EMPTY_MEMBER);

  const [libEditId,    setLibEditId]    = useState<number | null>(null);
  const [authorEditId, setAuthorEditId] = useState<number | null>(null);
  const [bookEditId,   setBookEditId]   = useState<number | null>(null);
  const [memberEditId, setMemberEditId] = useState<number | null>(null);

  const [toast, setToast] = useState('');
  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const loadAll = () => {
    getLibraries().then(r => setLibraries(r.data));
    getAuthors().then(r => setAuthors(r.data));
    getBooks().then(r => setBooks(r.data));
    getMembers().then(r => setMembers(r.data));
  };
  useEffect(() => { loadAll(); }, []);

  // ── LIBRARY ──────────────────────────────────────────────────────────────────
  const handleLibSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (libEditId) { await updateLibrary(libEditId, libForm); notify('Library updated.'); setLibEditId(null); }
    else { await createLibrary(libForm); notify('Library created.'); }
    setLibForm(EMPTY_LIB); loadAll();
  };
  const startEditLib = (l: Library) => { setLibEditId(l.library_id); setLibForm({ name: l.name }); };
  const cancelLib = () => { setLibEditId(null); setLibForm(EMPTY_LIB); };

  // ── AUTHOR ───────────────────────────────────────────────────────────────────
  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authorEditId) { await updateAuthor(authorEditId, authorForm); notify('Author updated.'); setAuthorEditId(null); }
    else { await createAuthor(authorForm); notify('Author created.'); }
    setAuthorForm(EMPTY_AUTHOR); loadAll();
  };
  const startEditAuthor = (a: Author) => { setAuthorEditId(a.author_id); setAuthorForm({ author_name: a.author_name, phone_number: a.phone_number, gender: a.gender }); };
  const cancelAuthor = () => { setAuthorEditId(null); setAuthorForm(EMPTY_AUTHOR); };

  // ── BOOK ─────────────────────────────────────────────────────────────────────
  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookEditId) { await updateBook(bookEditId, bookForm); notify('Book updated.'); setBookEditId(null); }
    else { await createBook(bookForm); notify('Book created.'); }
    setBookForm(EMPTY_BOOK); loadAll();
  };
  const startEditBook = (b: Book) => { setBookEditId(b.book_id); setBookForm({ book_name: b.book_name, date_published: b.date_published, author_id: b.author_id, library_id: b.library_id }); };
  const cancelBook = () => { setBookEditId(null); setBookForm(EMPTY_BOOK); };

  // ── MEMBER ───────────────────────────────────────────────────────────────────
  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (memberEditId) { await updateMember(memberEditId, memberForm); notify('Member updated.'); setMemberEditId(null); }
    else { await createMember(memberForm); notify('Member created.'); }
    setMemberForm(EMPTY_MEMBER); loadAll();
  };
  const startEditMember = (m: Member) => { setMemberEditId(m.member_id); setMemberForm({ member_name: m.member_name, phone_number: m.phone_number, gender: m.gender, birthyear: m.birthyear, book_id: m.book_id }); };
  const cancelMember = () => { setMemberEditId(null); setMemberForm(EMPTY_MEMBER); };

  const TABS: { key: Tab; label: string; count: number }[] = [
    { key: 'libraries', label: 'Libraries', count: libraries.length },
    { key: 'authors',   label: 'Authors',   count: authors.length   },
    { key: 'books',     label: 'Books',     count: books.length     },
    { key: 'members',   label: 'Members',   count: members.length   },
  ];

  return (
    <div className="app">
      <div className="header">
        <h1>Library Management System</h1>
      </div>

      <nav className="tabs">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`tab-btn ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            <span className="tab-count">{t.count}</span>
          </button>
        ))}
      </nav>

      {toast && <div className="toast">{toast}</div>}

      <main className="main">

        {/* ══ LIBRARIES ══ */}
        {tab === 'libraries' && (
          <>
            <div className="card">
              <div className="card-header">
                <h2>{libEditId ? 'Edit Library' : 'Add Library'}</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleLibSubmit}>
                  <div className="form-grid-1">
                    <Field label="Library Name" hint="Letters and numbers only. No special characters.">
                      <input
                        value={libForm.name}
                        onChange={e => setLibForm({ name: e.target.value.replace(/[^a-zA-Z0-9\s]/g, '') })}
                        placeholder="e.g. Central Library"
                        required
                      />
                    </Field>
                    <div className="btn-row">
                      <button type="submit" className="btn-primary">{libEditId ? 'Save Changes' : 'Add Library'}</button>
                      {libEditId && <button type="button" className="btn-secondary" onClick={cancelLib}>Cancel</button>}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h2>All Libraries</h2></div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {libraries.length === 0 && <tr><td colSpan={3} className="empty-row">No libraries yet.</td></tr>}
                  {libraries.map(l => (
                    <tr key={l.library_id}>
                      <td className="td-id">{l.library_id}</td>
                      <td><strong>{l.name}</strong></td>
                      <td className="td-actions">
                        <div className="action-row">
                          <button className="btn-edit" onClick={() => startEditLib(l)}>Edit</button>
                          <button className="btn-delete" onClick={async () => { await deleteLibrary(l.library_id); notify('Deleted.'); loadAll(); }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ══ AUTHORS ══ */}
        {tab === 'authors' && (
          <>
            <div className="card">
              <div className="card-header">
                <h2>{authorEditId ? 'Edit Author' : 'Add Author'}</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleAuthorSubmit}>
                  <div className="form-grid">
                    <Field label="Full Name" hint="Letters and spaces only. No numbers or symbols.">
                      <input
                        value={authorForm.author_name}
                        onChange={e => setAuthorForm(f => ({ ...f, author_name: e.target.value.replace(/[^a-zA-Z\s]/g, '') }))}
                        placeholder="e.g. Juan dela Cruz"
                        required
                      />
                    </Field>
                    <Field label="Phone Number" hint="Numbers only. Max 11 digits.">
                      <input
                        value={authorForm.phone_number}
                        onChange={e => setAuthorForm(f => ({ ...f, phone_number: e.target.value.replace(/\D/g, '').slice(0, 11) }))}
                        placeholder="e.g. 09171234567"
                        required
                      />
                    </Field>
                    <Field label="Gender">
                      <select value={authorForm.gender} onChange={e => setAuthorForm(f => ({ ...f, gender: e.target.value }))}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </Field>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <div className="btn-row">
                        <button type="submit" className="btn-primary">{authorEditId ? 'Save Changes' : 'Add Author'}</button>
                        {authorEditId && <button type="button" className="btn-secondary" onClick={cancelAuthor}>Cancel</button>}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h2>All Authors</h2></div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.length === 0 && <tr><td colSpan={5} className="empty-row">No authors yet.</td></tr>}
                  {authors.map(a => (
                    <tr key={a.author_id}>
                      <td className="td-id">{a.author_id}</td>
                      <td><strong>{a.author_name}</strong></td>
                      <td>{a.phone_number}</td>
                      <td>{a.gender}</td>
                      <td className="td-actions">
                        <div className="action-row">
                          <button className="btn-edit" onClick={() => startEditAuthor(a)}>Edit</button>
                          <button className="btn-delete" onClick={async () => { await deleteAuthor(a.author_id); notify('Deleted.'); loadAll(); }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ══ BOOKS ══ */}
        {tab === 'books' && (
          <>
            <div className="card">
              <div className="card-header">
                <h2>{bookEditId ? 'Edit Book' : 'Add Book'}</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleBookSubmit}>
                  <div className="form-grid">
                    <Field label="Book Title" hint="Letters and numbers only. No special characters.">
                      <input
                        value={bookForm.book_name}
                        onChange={e => setBookForm(f => ({ ...f, book_name: e.target.value.replace(/[^a-zA-Z0-9\s]/g, '') }))}
                        placeholder="e.g. Noli Me Tangere"
                        required
                      />
                    </Field>
                    <Field label="Date Published" hint="Select a date from the calendar.">
                      <input
                        type="date"
                        value={bookForm.date_published}
                        onChange={e => setBookForm(f => ({ ...f, date_published: e.target.value }))}
                        required
                      />
                    </Field>
                    <Field label="Author" hint="Select an existing author from the list.">
                      <select
                        value={bookForm.author_id}
                        onChange={e => setBookForm(f => ({ ...f, author_id: Number(e.target.value) }))}
                        required
                      >
                        <option value={0} disabled>Select author</option>
                        {authors.map(a => <option key={a.author_id} value={a.author_id}>{a.author_name}</option>)}
                      </select>
                    </Field>
                    <Field label="Library" hint="Select which library this book belongs to.">
                      <select
                        value={bookForm.library_id}
                        onChange={e => setBookForm(f => ({ ...f, library_id: Number(e.target.value) }))}
                        required
                      >
                        <option value={0} disabled>Select library</option>
                        {libraries.map(l => <option key={l.library_id} value={l.library_id}>{l.name}</option>)}
                      </select>
                    </Field>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div className="btn-row">
                        <button type="submit" className="btn-primary">{bookEditId ? 'Save Changes' : 'Add Book'}</button>
                        {bookEditId && <button type="button" className="btn-secondary" onClick={cancelBook}>Cancel</button>}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h2>All Books</h2></div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.length === 0 && <tr><td colSpan={5} className="empty-row">No books yet.</td></tr>}
                  {books.map(b => (
                    <tr key={b.book_id}>
                      <td className="td-id">{b.book_id}</td>
                      <td><strong>{b.book_name}</strong></td>
                      <td>{b.author_name}</td>
                      <td>{b.date_published}</td>
                      <td className="td-actions">
                        <div className="action-row">
                          <button className="btn-edit" onClick={() => startEditBook(b)}>Edit</button>
                          <button className="btn-delete" onClick={async () => { await deleteBook(b.book_id); notify('Deleted.'); loadAll(); }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ══ MEMBERS ══ */}
        {tab === 'members' && (
          <>
            <div className="card">
              <div className="card-header">
                <h2>{memberEditId ? 'Edit Member' : 'Add Member'}</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleMemberSubmit}>
                  <div className="form-grid">
                    <Field label="Full Name" hint="Letters and spaces only. No numbers or symbols.">
                      <input
                        value={memberForm.member_name}
                        onChange={e => setMemberForm(f => ({ ...f, member_name: e.target.value.replace(/[^a-zA-Z\s]/g, '') }))}
                        placeholder="e.g. Maria Santos"
                        required
                      />
                    </Field>
                    <Field label="Phone Number" hint="Numbers only. Max 11 digits.">
                      <input
                        value={memberForm.phone_number}
                        onChange={e => setMemberForm(f => ({ ...f, phone_number: e.target.value.replace(/\D/g, '').slice(0, 11) }))}
                        placeholder="e.g. 09171234567"
                        required
                      />
                    </Field>
                    <Field label="Gender">
                      <select value={memberForm.gender} onChange={e => setMemberForm(f => ({ ...f, gender: e.target.value }))}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </Field>
                    <Field label="Birth Year" hint="Numbers only. 4 digits (e.g. 2000).">
                      <input
                        value={memberForm.birthyear === 0 ? '' : memberForm.birthyear}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setMemberForm(f => ({ ...f, birthyear: val === '' ? 0 : Number(val) }));
                        }}
                        placeholder="e.g. 2000"
                        required
                      />
                    </Field>
                    <Field label="Borrowed Book (optional)" hint="Select a book this member is borrowing.">
                      <select
                        value={memberForm.book_id ?? ''}
                        onChange={e => setMemberForm(f => ({ ...f, book_id: e.target.value ? Number(e.target.value) : null }))}
                      >
                        <option value="">— None —</option>
                        {books.map(b => <option key={b.book_id} value={b.book_id}>{b.book_name}</option>)}
                      </select>
                    </Field>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <div className="btn-row">
                        <button type="submit" className="btn-primary">{memberEditId ? 'Save Changes' : 'Add Member'}</button>
                        {memberEditId && <button type="button" className="btn-secondary" onClick={cancelMember}>Cancel</button>}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h2>All Members</h2></div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Birth Year</th>
                    <th>Borrowed Book</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.length === 0 && <tr><td colSpan={7} className="empty-row">No members yet.</td></tr>}
                  {members.map(m => (
                    <tr key={m.member_id}>
                      <td className="td-id">{m.member_id}</td>
                      <td><strong>{m.member_name}</strong></td>
                      <td>{m.phone_number}</td>
                      <td>{m.gender}</td>
                      <td>{m.birthyear}</td>
                      <td>{m.book_id ? (books.find(b => b.book_id === m.book_id)?.book_name ?? `Book #${m.book_id}`) : '—'}</td>
                      <td className="td-actions">
                        <div className="action-row">
                          <button className="btn-edit" onClick={() => startEditMember(m)}>Edit</button>
                          <button className="btn-delete" onClick={async () => { await deleteMember(m.member_id); notify('Deleted.'); loadAll(); }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
