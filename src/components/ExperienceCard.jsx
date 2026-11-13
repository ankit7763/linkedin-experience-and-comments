import { memo } from 'react'
import { formatMonth } from '../utils/experience'
import Icon from './Icon'

function ExperienceCard({ experience, onEdit, onDelete }) {
  const dateRange = `${formatMonth(experience.startDate)} – ${
    experience.endDate ? formatMonth(experience.endDate) : 'Present'
  }`

  return (
    <article className="flex items-start gap-3 border-t border-slate-100 py-4 sm:gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-blue-100 bg-blue-50 text-2xl font-extrabold tracking-tighter text-blue-700 sm:h-12 sm:w-12" aria-hidden="true">
        <span>N</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-slate-900">{experience.title}</h3>
        <p className="mt-1 text-xs text-slate-700">
          {experience.company} <span>·</span> {experience.employmentType}
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-1 text-xs text-slate-500">
          {experience.location && (
            <>
              <Icon name="location" size={13} />
              <span>{experience.location}</span>
              <span>·</span>
            </>
          )}
          <span>{dateRange}</span>
        </p>
        {experience.description && (
          <p className="mt-2 text-xs leading-relaxed text-slate-700">{experience.description}</p>
        )}
      </div>
      <div className="-mr-2 -mt-1 flex shrink-0 gap-0.5">
        <button
          className="grid h-8 w-8 place-items-center rounded-md text-slate-500 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-700"
          onClick={() => onEdit(experience)}
          type="button"
          aria-label={`Edit ${experience.title} at ${experience.company}`}
        >
          <Icon name="pencil" size={17} />
        </button>
        <button
          className="grid h-8 w-8 place-items-center rounded-md text-slate-500 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-700"
          onClick={() => onDelete(experience.id)}
          type="button"
          aria-label={`Delete ${experience.title} at ${experience.company}`}
        >
          <Icon name="trash" size={17} />
        </button>
      </div>
    </article>
  )
}

export default memo(ExperienceCard)
