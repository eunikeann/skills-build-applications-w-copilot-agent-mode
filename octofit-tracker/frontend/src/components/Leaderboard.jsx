import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('leaderboard', controller.signal).then(setLeaders).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  const sortedLeaders = [...leaders].sort((first, second) => (second.points || second.score || 0) - (first.points || first.score || 0))
  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p>See who is building momentum this season.</p></div>{error && <div className="alert alert-warning">{error}</div>}<div className="leaderboard-list">{sortedLeaders.length ? sortedLeaders.map((leader, index) => <div className="leader-row" key={(leader.username || leader.name || 'leader') + index}><span className="rank">{String(index + 1).padStart(2, '0')}</span><strong>{leader.username || leader.name || 'Athlete'}</strong><span>{leader.points ?? leader.score ?? 0} pts</span></div>) : <div className="empty-state">No leaderboard results yet.</div>}</div></section>
}

export default Leaderboard
