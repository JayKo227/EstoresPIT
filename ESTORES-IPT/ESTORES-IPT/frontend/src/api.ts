import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export interface Library {
  library_id: number;
  name: string;
}

export interface Author {
  author_id: number;
  author_name: string;
  phone_number: string;
  gender: string;
}

export interface Book {
  book_id: number;
  book_name: string;
  date_published: string;
  author_id: number;
  author_name: string;
  library_id: number;
}

export interface Member {
  member_id: number;
  member_name: string;
  phone_number: string;
  gender: string;
  birthyear: number;
  book_id: number | null;
}

// Library
export const getLibraries  = () => api.get<Library[]>('libraries/');
export const createLibrary = (data: Omit<Library, 'library_id'>) => api.post<Library>('libraries/', data);
export const updateLibrary = (id: number, data: Omit<Library, 'library_id'>) => api.put<Library>(`libraries/${id}/`, data);
export const deleteLibrary = (id: number) => api.delete(`libraries/${id}/`);

// Author
export const getAuthors  = () => api.get<Author[]>('authors/');
export const createAuthor = (data: Omit<Author, 'author_id'>) => api.post<Author>('authors/', data);
export const updateAuthor = (id: number, data: Omit<Author, 'author_id'>) => api.put<Author>(`authors/${id}/`, data);
export const deleteAuthor = (id: number) => api.delete(`authors/${id}/`);

// Book
export const getBooks  = () => api.get<Book[]>('books/');
export const createBook = (data: Omit<Book, 'book_id' | 'author_name'>) => api.post<Book>('books/', data);
export const updateBook = (id: number, data: Omit<Book, 'book_id' | 'author_name'>) => api.put<Book>(`books/${id}/`, data);
export const deleteBook = (id: number) => api.delete(`books/${id}/`);

// Member
export const getMembers  = () => api.get<Member[]>('members/');
export const createMember = (data: Omit<Member, 'member_id'>) => api.post<Member>('members/', data);
export const updateMember = (id: number, data: Omit<Member, 'member_id'>) => api.put<Member>(`members/${id}/`, data);
export const deleteMember = (id: number) => api.delete(`members/${id}/`);

export default api;
