import { memo, useMemo, useState } from 'react'
import Icon from './Icon'

const initialComments = [
  {
    id: 'comment-1',
    name: 'Priya Sharma',
    avatarSeed: 'Priya',
    time: '2h ago',
    text: 'Great work! 🚀',
    likes: 0,
    replies: [
      {
        id: 'comment-2',
        name: 'IT Ash',
        avatarSeed: 'Ash',
        time: '1h ago',
        text: 'Thanks! 😊',
        likes: 0,
        replies: [
          {
            id: 'comment-3',
            name: 'Rahul Mehta',
            avatarSeed: 'Rahul',
            time: '30m ago',
            text: 'Keep going! 👍',
            likes: 0,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 'comment-4',
    name: 'Neha Kapoor',
    avatarSeed: 'Neha',
    time: '3h ago',
    text: 'Amazing feature! 👏',
    likes: 0,
    replies: [
      {
        id: 'comment-5',
        name: 'IT Ash',
        avatarSeed: 'Ash',
        time: '2h ago',
        text: 'Thank you! 🙌',
        likes: 0,
        replies: [],
      },
    ],
  },
]

let nextCommentId = 6

function avatarUrl(seed) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4`
}

function countComments(comments) {
  return comments.reduce((total, comment) => total + 1 + countComments(comment.replies), 0)
}

function CommentsSection() {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [sort, setSort] = useState('Newest First')

  const sortedComments = useMemo(() => {
    return sort === 'Newest First' ? [...comments].reverse() : [...comments]
  }, [comments, sort])

  const addReply = (items, parentId, reply) => items.map((item) => {
    if (item.id === parentId) {
      return { ...item, replies: [...item.replies, reply] }
    }
    return { ...item, replies: addReply(item.replies, parentId, reply) }
  })

  const handlePostComment = () => {
    const text = newComment.trim()
    if (!text) return
    setComments((current) => [
      ...current,
      {
        id: `comment-${nextCommentId++}`,
        name: 'IT Ash',
        avatarSeed: 'Ash',
        time: 'Just now',
        text,
        likes: 0,
        replies: [],
      },
    ])
    setNewComment('')
  }

  const handlePostReply = (parentId) => {
    const text = replyText.trim()
    if (!text) return
    const reply = {
      id: `comment-${nextCommentId++}`,
      name: 'IT Ash',
      avatarSeed: 'Ash',
      time: 'Just now',
      text,
      likes: 0,
      replies: [],
    }
    setComments((current) => addReply(current, parentId, reply))
    setReplyText('')
    setReplyingTo(null)
  }

  const renderComment = (comment, depth = 0) => (
    <div key={comment.id} className={depth ? 'ml-7 border-l border-slate-200 pl-3 sm:ml-10 sm:pl-4' : ''}>
      <article className="relative py-2.5">
        {depth > 0 && <span className="absolute -left-3 top-8 h-px w-3 bg-slate-200 sm:-left-4 sm:w-4" />}
        <div className="flex items-start gap-2.5">
          <img
            alt=""
            className="h-9 w-9 shrink-0 rounded-full bg-slate-100 object-cover sm:h-10 sm:w-10"
            src={avatarUrl(comment.avatarSeed)}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs leading-5 text-slate-900 sm:text-sm">
                  <strong className="mr-1.5 font-bold">{comment.name}</strong>
                  {comment.name === 'IT Ash' && (
                    <span className="mr-1.5 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700">Author</span>
                  )}
                  <span className="whitespace-nowrap text-[11px] font-normal text-slate-500">{comment.time}</span>
                </p>
                <p className="mt-0.5 break-words text-xs leading-5 text-slate-800 sm:text-sm">{comment.text}</p>
              </div>
              <button
                type="button"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-500 hover:bg-slate-100"
                aria-label={`More options for ${comment.name}'s comment`}
              >
                <Icon name="dots" size={17} />
              </button>
            </div>
            <div className="mt-1 flex items-center gap-3 text-[11px] font-semibold text-slate-500 sm:text-xs">
              <button type="button" className="hover:text-blue-700">Like</button>
              <button
                type="button"
                className="hover:text-blue-700"
                onClick={() => {
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                  setReplyText('')
                }}
              >
                Reply
              </button>
            </div>
            {replyingTo === comment.id && (
              <form
                className="mt-2 flex items-center gap-2"
                onSubmit={(event) => {
                  event.preventDefault()
                  handlePostReply(comment.id)
                }}
              >
                <input
                  autoFocus
                  value={replyText}
                  onChange={(event) => setReplyText(event.target.value)}
                  placeholder={`Reply to ${comment.name}...`}
                  className="h-9 min-w-0 flex-1 rounded-full border border-slate-300 px-3 text-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="submit"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-700 text-white hover:bg-blue-800"
                  aria-label="Post reply"
                >
                  <Icon name="arrowUp" size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </article>
      {comment.replies.map((reply) => renderComment(reply, depth + 1))}
    </div>
  )

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm" aria-labelledby="comments-title">
      <div className="px-4 py-4 sm:px-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 sm:text-base">
            <Icon name="chat" size={18} />
            Comments ({countComments(comments)})
          </h3>
          <select
            aria-label="Sort comments"
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-600"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>

        <form
          className="mb-2 flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            handlePostComment()
          }}
        >
          <img
            alt=""
            className="h-9 w-9 shrink-0 rounded-full bg-slate-100 object-cover"
            src={avatarUrl('Ash')}
          />
          <div className="relative min-w-0 flex-1">
            <input
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              placeholder="Write a comment..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 pr-14 text-xs outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:text-sm"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 h-7 rounded-md bg-blue-700 px-3 text-xs font-bold text-white hover:bg-blue-800"
            >
              Post
            </button>
          </div>
        </form>

        <div className="mt-1">
          {sortedComments.map((comment) => renderComment(comment))}
        </div>
      </div>
    </section>
  )
}

export default memo(CommentsSection)
