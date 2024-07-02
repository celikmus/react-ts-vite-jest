import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('should render title', () => {
    expect(screen.getByText('Todo App')).toBeInTheDocument()
  })
  it('should have input box', () => {
    expect(screen.getByTestId('todo-input')).toBeInTheDocument()
  })
  it('should have Add Todo button', () => {
    expect(screen.getByText('Add Todo')).toBeInTheDocument()
  })
})
