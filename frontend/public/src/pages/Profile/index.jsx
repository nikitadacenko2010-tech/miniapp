import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../layouts/Header'
import Empty from '../../components/ui/Empty'
import ReviewItem from '../../components/review/ReviewItem'
import ProfileForm from './ProfileForm'
import { useProfileStore } from '../../store/profile'
import { reviewsApi } from '../../api'
import { useState } from 'react'

export default function Profile() {
  const { profile, load } = useProfileStore()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    load().catch(() => {})
    reviewsApi.list().then(setReviews).catch(() => {})
  }, [load])

  if (!profile) return <Empty>Загрузка...</Empty>

  return (
    <>
      <Header title="Профиль" subtitle="Личные данные и статистика" />

      <div className="avatar">{profile.first_name?.[0] || 'A'}</div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          {profile.first_name} {profile.last_name}
        </div>
        <div style={{ fontSize: 13, color: '#8a8f98' }}>@{profile.username}</div>
      </div>

      <div className="row">
        <div className="card-white" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{profile.deals_count ?? 0}</div>
          <div className="label" style={{ margin: 0 }}>Сделок</div>
        </div>
        <div className="card-white" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{profile.rating?.toFixed(1) ?? '—'}</div>
          <div className="label" style={{ margin: 0 }}>Рейтинг</div>
        </div>
      </div>

      <div className="section-title">Данные</div>
      <ProfileForm />

      <div className="section-title">Отзывы ({reviews.length})</div>
      <div className="card-white">
        {reviews.map(r => <ReviewItem key={r.id} review={r} />)}
        {reviews.length === 0 && <Empty>Отзывов нет</Empty>}
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/withdraw" style={{ textDecoration: 'none' }}>
          <button className="btn btn-secondary">Вывести средства</button>
        </Link>
      </div>
    </>
  )
}