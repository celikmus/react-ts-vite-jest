import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  it('should add toDo on enter', async () => {
    await userEvent.type(screen.getByTestId('todo-input'), 'hello')
    await userEvent.keyboard('{Enter}')

    expect(screen.getByTestId('todo-item')).toBeInTheDocument()
  })
  it('should add toDo on button click', async () => {
    await userEvent.type(screen.getByTestId('todo-input'), 'hello')
    await userEvent.click(screen.getByText('Add Todo'))

    expect(screen.getByTestId('todo-item')).toBeInTheDocument()
    expect(screen.getAllByTestId('todo-item').length).toBe(1)
  })
  it('should mark item complete upon clicking checkbox', async () => {
    await userEvent.type(screen.getByTestId('todo-input'), 'hello')
    await userEvent.click(screen.getByText('Add Todo'))
    await userEvent.click(screen.getByTestId('todo-toggle'))

    expect(
      screen.getByTestId('todo-item').querySelector('span.line-through'),
    ).toBeInTheDocument()
  })
  it('should toggle the item as incomplete', async () => {
    await userEvent.type(screen.getByTestId('todo-input'), 'hello')
    await userEvent.click(screen.getByText('Add Todo'))
    await userEvent.click(screen.getByTestId('todo-toggle'))
    await userEvent.click(screen.getByTestId('todo-toggle'))

    expect(screen.getByTestId('todo-item')).toBeInTheDocument()
    expect(
      screen.getByTestId('todo-item').querySelector('span.line-through'),
    ).toBe(null)
  })
  it('should delete the item upon clicking Delete button', async () => {
    await userEvent.type(screen.getByTestId('todo-input'), 'hello')
    await userEvent.click(screen.getByText('Add Todo'))
    await userEvent.click(screen.getByText('Delete'))

    expect(screen.queryByTestId('todo-item')).not.toBeInTheDocument()
  })
})
