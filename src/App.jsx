import { useCallback, useState } from 'react'
import ExperienceForm from './components/ExperienceForm'
import ExperienceList from './components/ExperienceList'
import ProfileHeader from './components/ProfileHeader'
import CommentsSection from './components/CommentsSection'

const sampleExperience = {
  id: 'experience-1',
  title: 'Frontend Developer',
  company: 'Nexolabs',
  employmentType: 'Full-time',
  location: 'Gurugram, India',
  startDate: '2024-01',
  endDate: '',
  description: 'Worked on AI-powered web applications and automation tools.',
}

function App() {
  const [experiences, setExperiences] = useState([sampleExperience])
  const [isFormOpen, setIsFormOpen] = useState(true)
  const [editingId, setEditingId] = useState(sampleExperience.id)
  const [formKey, setFormKey] = useState(0)

  const editingExperience = experiences.find(({ id }) => id === editingId)

  const handleAddExperience = useCallback(() => {
    setEditingId(null)
    setFormKey((key) => key + 1)
    setIsFormOpen(true)
  }, [])

  const handleEditExperience = useCallback((experience) => {
    setEditingId(experience.id)
    setIsFormOpen(true)
  }, [])

  const handleDeleteExperience = useCallback((id) => {
    setExperiences((current) => current.filter((experience) => experience.id !== id))
    setEditingId((current) => (current === id ? null : current))
  }, [])

  const handleSaveExperience = useCallback((experience) => {
    setExperiences((current) => {
      const exists = current.some((item) => item.id === experience.id)
      return exists
        ? current.map((item) => (item.id === experience.id ? experience : item))
        : [experience, ...current]
    })
    setEditingId(null)
    setIsFormOpen(false)
  }, [])

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-6 sm:px-6 sm:py-12">
      <section
        className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xl shadow-slate-300/50"
        aria-label="LinkedIn profile experience"
      >
        <ProfileHeader onAddExperience={handleAddExperience} />

        <div className="grid gap-4 p-3 sm:p-5">
          {isFormOpen && (
            <ExperienceForm
              key={`${editingId ?? 'new'}-${formKey}`}
              experience={editingExperience}
              onSave={handleSaveExperience}
              onCancel={() => setIsFormOpen(false)}
            />
          )}
          <ExperienceList
            experiences={experiences}
            onEdit={handleEditExperience}
            onDelete={handleDeleteExperience}
          />
          <CommentsSection />
        </div>
      </section>
    </main>
  )
}

export default App
