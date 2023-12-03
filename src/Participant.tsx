import { makeAutoObservable } from 'mobx'

export class Participant {
  secondsSpeaking = 0
  speaking = false
  constructor(public gs: GeneralState, public name: string) {
    makeAutoObservable(this)
  }
  interval: number | null = null

  startSpeaking() {
    this.gs.pause()
    this.speaking = true

    this.interval = setInterval(() => {
      this.secondsSpeaking++
    }, 1000)
  }

  stopSpeaking() {
    this.speaking = false
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  percentSpeaking() {
    if (this.gs.totalTime === 0) return
    return Math.round((this.secondsSpeaking / this.gs.totalTime) * 100)
  }

  get formattedTime() {
    const minutes = Math.floor(this.secondsSpeaking / 60)
    const seconds = this.secondsSpeaking % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }
}

export class GeneralState {
  //
  participants: Participant[] = []

  constructor() {
    makeAutoObservable(this)
    this.participants.push(new Participant(this, 'Tim'))
    this.participants.push(new Participant(this, 'Bob'))
    this.participants.push(new Participant(this, 'Gui'))
  }

  addParticipant() {
    this.participants.push(new Participant(this, 'New'))
  }

  removeParticipant(p: Participant) {
    if (window.confirm('Are you sure?'))
      this.participants = this.participants.filter((p_) => p_ !== p)
  }

  pause() {
    this.participants.forEach((p) => p.stopSpeaking())
  }

  get totalTime() {
    return this.participants.reduce((acc, p) => acc + p.secondsSpeaking, 0)
  }

  reset() {
    window.confirm('Are you sure?') &&
      this.participants.forEach((p) => {
        p.secondsSpeaking = 0
        p.stopSpeaking()
      })
  }
}
