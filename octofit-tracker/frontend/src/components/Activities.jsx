import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('activities', controller.signal).then(setActivities).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <ResourceTable title="Activities" description="Every run, ride, and workout logged by the community." columns={['Athlete', 'Type', 'Duration', 'Points']} rows={activities.map((activity) => [activity.user || activity.username || 'Unknown athlete', activity.type || activity.activity_type || 'Activity', activity.duration ? `${activity.duration} min` : '—', activity.points ?? '—'])} error={error} />
}

function ResourceTable({ title, description, columns, rows, error }) {
  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">Movement log</p><h1>{title}</h1><p>{description}</p></div>{error && <div className="alert alert-warning">{error}</div>}<div className="table-shell"><table className="table align-middle mb-0"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={row[0] + index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>) : <tr><td className="empty-state" colSpan={columns.length}>No activities recorded yet.</td></tr>}</tbody></table></div></section>
}

export default Activities
