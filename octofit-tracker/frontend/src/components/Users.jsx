import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('users', controller.signal)
      .then(setUsers)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
    return () => controller.abort()
  }, [])

  return (
    <ResourceTable
      title="Users"
      description="Athletes and coaches in your OctoFit community."
      columns={['Name', 'Email', 'Team']}
      rows={users.map((user) => [user.name || user.username || 'Unnamed athlete', user.email || '—', user.team || 'Unassigned'])}
      error={error}
    />
  )
}

function ResourceTable({ title, description, columns, rows, error }) {
  return (
    <section className="resource-page">
      <div className="page-heading"><p className="eyebrow">Directory</p><h1>{title}</h1><p>{description}</p></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="table-shell">
        <table className="table align-middle mb-0"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>
          {rows.length ? rows.map((row, index) => <tr key={row[0] + index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>) : <tr><td className="empty-state" colSpan={columns.length}>No users recorded yet.</td></tr>}
        </tbody></table>
      </div>
    </section>
  )
}

export default Users
