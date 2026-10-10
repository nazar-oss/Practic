export interface User {
  id: string
  name: string
  email: string
  role: 'reader' | 'librarian'
}
