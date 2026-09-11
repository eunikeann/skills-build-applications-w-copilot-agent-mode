import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('workouts', controller.signal).then(setWorkouts).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">Your next session</p><h1>Workouts</h1><p>Personalized ideas for wherever your energy is today.</p></div>{error && <div className="alert alert-warning">{error}</div>}<div className="workout-grid">{workouts.length ? workouts.map((workout, index) => <article className="workout-card" key={(workout.name || workout.title || 'workout') + index}><p className="eyebrow">{workout.level || 'Training plan'}</p><h2>{workout.name || workout.title || 'Workout'}</h2><p>{workout.description || 'A focused session to keep your progress going.'}</p><span>{workout.duration ? `${workout.duration} min` : 'Build your routine'}</span></article>) : <div className="empty-state">No workouts available yet.</div>}</div></section>
}

export default Workouts
