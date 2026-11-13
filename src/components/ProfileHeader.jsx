import { memo } from 'react'
import Icon from './Icon'

const tabs = ['About', 'Experience', 'Skills', 'Education', 'Activity']

function ProfileHeader({ onAddExperience }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex min-h-32 items-center gap-3 px-4 py-4 sm:min-h-36 sm:gap-5 sm:px-8">
        <div className="relative shrink-0">
          <img
            alt="IT Ash profile"
            className="h-16 w-16 rounded-full border-2 border-white object-cover shadow sm:h-20 sm:w-20"
            src="https://api.dicebear.com/9.x/adventurer/svg?seed=Ash&backgroundColor=b6e3f4"
          />
          <span className="absolute bottom-1 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500" aria-label="Online" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">IT Ankit</h1>
          <p className="mt-0.5 text-sm font-medium text-slate-700">Full Stack Developer</p>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Building AI-Powered Solutions</p>
        </div>
        <button
          className="ml-auto inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full border border-blue-700 px-3 text-blue-700 transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:rounded-lg"
          onClick={onAddExperience}
          type="button"
        >
          <Icon name="pencil" size={15} />
          <span className="hidden text-xs font-semibold sm:inline">Add experience</span>
          <span className="sr-only sm:hidden">Add experience</span>
        </button>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-2 sm:gap-2 sm:px-6" aria-label="Profile sections">
        {tabs.map((tab) => (
          <button
            className={`shrink-0 border-b-[3px] px-3 py-3 text-xs font-semibold transition sm:px-4 sm:text-sm ${
              tab === 'Experience'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-blue-700'
            }`}
            key={tab}
            type="button"
            aria-current={tab === 'Experience' ? 'page' : undefined}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default memo(ProfileHeader)
