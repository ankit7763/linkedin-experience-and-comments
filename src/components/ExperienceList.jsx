import { memo } from 'react'
import ExperienceCard from './ExperienceCard'
import Icon from './Icon'

function ExperienceList({ experiences, onEdit, onDelete }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-5" aria-labelledby="experience-title">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-slate-800">
          <Icon name="briefcase" size={21} />
          <h2 className="text-base font-bold tracking-tight" id="experience-title">Experience</h2>
        </div>
        <span className="grid h-6 min-w-6 place-items-center rounded-full bg-blue-50 px-1.5 text-[11px] font-bold text-blue-800">
          {experiences.length}
        </span>
      </div>
      {experiences.length ? (
        <div className="mt-3">
          {experiences.map((experience) => (
            <ExperienceCard
              experience={experience}
              key={experience.id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        <p className="my-5 text-center text-sm text-slate-500">No experience added yet. Add one to get started.</p>
      )}
    </section>
  )
}

export default memo(ExperienceList)
