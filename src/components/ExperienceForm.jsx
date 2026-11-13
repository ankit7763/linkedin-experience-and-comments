import { memo, useState } from 'react'
import Icon from './Icon'

const emptyExperience = {
  title: '',
  company: '',
  employmentType: 'Full-time',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
}

function ExperienceForm({ experience, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({ ...emptyExperience, ...experience }))
  const [error, setError] = useState('')

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (form.endDate && form.startDate && form.endDate < form.startDate) {
      setError('End date must be after the start date.')
      return
    }

    onSave({
      ...form,
      id: experience?.id ?? `experience-${Date.now()}`,
    })
  }

  const isEditing = Boolean(experience)

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5" aria-labelledby="form-title">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-slate-800">
          <Icon name="briefcase" size={21} />
          <h2 className="text-base font-bold tracking-tight" id="form-title">
            {isEditing ? 'Edit Experience' : 'Add Experience'}
          </h2>
        </div>
        <button
          className="grid h-8 w-8 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-700"
          type="button"
          onClick={onCancel}
          aria-label="Close experience form"
        >
          <Icon name="close" size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
          <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-slate-700">
            <span>Job Title <b className="text-red-600">*</b></span>
            <input
              className="h-10 min-w-0 rounded-lg border border-slate-300 px-3 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              autoComplete="organization-title"
              name="title"
              onChange={updateField}
              placeholder="Ex: Frontend Developer"
              required
              value={form.title}
            />
          </label>
          <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-slate-700">
            <span>Company Name <b className="text-red-600">*</b></span>
            <input
              className="h-10 min-w-0 rounded-lg border border-slate-300 px-3 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              autoComplete="organization"
              name="company"
              onChange={updateField}
              placeholder="Ex: Nexolabs"
              required
              value={form.company}
            />
          </label>
          <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-slate-700">
            <span>Employment Type</span>
            <span className="relative flex min-w-0 items-center">
              <select
                className="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 pr-9 text-sm font-normal text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                name="employmentType"
                onChange={updateField}
                value={form.employmentType}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Self-employed</option>
                <option>Freelance</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Apprenticeship</option>
                <option>Seasonal</option>
              </select>
              <Icon className="pointer-events-none absolute right-3 text-slate-500" name="chevron" size={16} />
            </span>
          </label>
          <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-slate-700">
            <span>Location</span>
            <span className="relative flex min-w-0 items-center">
              <Icon className="pointer-events-none absolute left-2.5 text-slate-500" name="location" size={16} />
              <input
                className="h-10 min-w-0 w-full rounded-lg border border-slate-300 pl-9 pr-3 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                autoComplete="address-level2"
                name="location"
                onChange={updateField}
                placeholder="Ex: Gurugram, India"
                value={form.location}
              />
            </span>
          </label>
          <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-slate-700">
            <span>Start Date <b className="text-red-600">*</b></span>
            <span className="relative flex min-w-0 items-center">
              <Icon className="pointer-events-none absolute left-2.5 text-slate-500" name="calendar" size={16} />
              <input
                className="h-10 min-w-0 w-full rounded-lg border border-slate-300 pl-9 pr-2 text-sm font-normal text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                aria-label="Start date"
                max={form.endDate || undefined}
                name="startDate"
                onChange={updateField}
                required
                type="month"
                value={form.startDate}
              />
            </span>
          </label>
          <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-slate-700">
            <span>End Date</span>
            <span className="relative flex min-w-0 items-center">
              <Icon className="pointer-events-none absolute left-2.5 text-slate-500" name="calendar" size={16} />
              <input
                className="h-10 min-w-0 w-full rounded-lg border border-slate-300 pl-9 pr-2 text-sm font-normal text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                aria-label="End date (leave blank for Present)"
                min={form.startDate || undefined}
                name="endDate"
                onChange={updateField}
                type="month"
                value={form.endDate}
              />
            </span>
          </label>
        </div>

        <label className="relative mt-3 grid gap-1.5 text-xs font-semibold text-slate-700">
          <span>Description</span>
          <textarea
            className="min-h-20 w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 pb-7 text-sm font-normal leading-relaxed text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            maxLength={500}
            name="description"
            onChange={updateField}
            placeholder="Describe your responsibilities and achievements"
            rows={3}
            value={form.description}
          />
          <span className="absolute bottom-2 right-2.5 text-[11px] font-medium text-slate-500">
            {form.description.length}/500
          </span>
        </label>

        {error && <p className="mt-2 text-xs text-red-700" role="alert">{error}</p>}

        <div className="mt-3 flex justify-end gap-2">
          <button
            className="inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-700 bg-white px-3 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-blue-700 px-3 text-xs font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            type="submit"
          >
            {isEditing ? 'Save changes' : 'Save experience'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default memo(ExperienceForm)
