import { formatDate } from '../../lib/format'

export default function ReviewItem({ review }) {
  return (
    <div className="review-item">
      <div className="review-head">
        <span className="review-name">{review.author}</span>
        <span className="review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
      </div>
      <div className="review-text">{review.text}</div>
      <div className="review-date">{formatDate(review.created_at)}</div>
    </div>
  )
}