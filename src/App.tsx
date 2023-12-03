import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import './App.css'
import { GeneralState, Participant } from './Participant'

export const App = observer(function App_() {
  const gs = useMemo(() => new GeneralState(), [])

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {gs.participants.map((participant) => (
        <ParticipantUI participant={participant} />
      ))}

      <button onClick={() => gs.addParticipant()}>Add participant</button>
      <button onClick={() => gs.pause()}>Pause</button>
      <button onClick={() => gs.reset()}>Reset</button>
      <div>total time: {gs.totalTime}</div>
    </div>
  )
})

export const ParticipantUI = observer(function ParticipantUI_(p: {
  participant: Participant
}) {
  return (
    <div
      style={{
        minWidth: 60,
        backgroundColor: '#dfe9df',
        display: 'flex',
        flexDirection: 'column',
        color: 'black',
      }}
    >
      <input
        style={{ padding: 4, border: '2px solid black' }}
        value={p.participant.name}
        onChange={(e) => {
          p.participant.name = e.target.value
        }}
      />
      <div style={{ padding: 4, border: '2px solid black' }}>
        {p.participant.formattedTime}
      </div>
      <div style={{ padding: 8 }}>
        {p.participant.speaking ? (
          <div style={{ backgroundColor: 'green' }}>Bla</div>
        ) : (
          <button onClick={() => p.participant.startSpeaking()}>
            Speaking
          </button>
        )}
      </div>
      <div style={{ padding: 4 }}>{p.participant.percentSpeaking()}%</div>
      <div style={{ padding: 4 }}>
        <button
          onClick={() => p.participant.gs.removeParticipant(p.participant)}
        >
          ❌
        </button>
      </div>
    </div>
  )
})

export default App
