let audioContext: AudioContext

function initAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)()
}

export function playAntSound() {
  if (!audioContext) initAudio()

  const bufferSize = 4096
  const channels = 1
  const audioBuffer = audioContext.createBuffer(
    channels,
    bufferSize,
    audioContext.sampleRate
  )
  const bufferSource = audioContext.createBufferSource()
  const filter = audioContext.createBiquadFilter()
  const gainNode = audioContext.createGain()

  // Create noise
  const channelData = audioBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    channelData[i] = Math.random() * 2 - 1
  }

  bufferSource.buffer = audioBuffer
  bufferSource.loop = true

  // Set up filter
  filter.type = "bandpass"
  filter.frequency.setValueAtTime(2000, audioContext.currentTime)
  filter.Q.setValueAtTime(10, audioContext.currentTime)

  // Set up gain
  gainNode.gain.setValueAtTime(0, audioContext.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.05)

  // Connect nodes
  bufferSource.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(audioContext.destination)

  // Modulate the filter frequency to create a "scratching" effect
  const now = audioContext.currentTime
  filter.frequency.setValueAtTime(2000, now)
  filter.frequency.linearRampToValueAtTime(3000, now + 0.025)
  filter.frequency.linearRampToValueAtTime(2000, now + 0.05)

  // Start and stop the sound
  bufferSource.start()
  bufferSource.stop(now + 0.05)
}
