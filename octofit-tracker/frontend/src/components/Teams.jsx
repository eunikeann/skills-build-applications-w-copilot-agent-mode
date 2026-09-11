import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchCollection } from '../api'

const TEAMS_API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : `${API_BASE_URL}/api/teams/`

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('teams', controller.signal, TEAMS_API_URL).then(setTeams).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">Find your people</p><h1>Teams</h1><p>Train together, celebrate progress, and keep each other moving.</p></div>{error && <div className="alert alert-warning">{error}</div>}<div className="team-grid">{teams.length ? teams.map((team, index) => <article className="team-card" key={(team.name || 'team') + index}><span className="team-mark">{(team.name || 'T').charAt(0)}</span><h2>{team.name || 'Unnamed team'}</h2><p>{team.members?.length ?? team.member_count ?? 0} members</p></article>) : <div className="empty-state">No teams created yet.</div>}</div></section>
}

export default Teams
