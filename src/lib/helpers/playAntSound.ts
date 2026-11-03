let audioContext: AudioContext | undefined
let noiseBuffer: AudioBuffer | undefined

function createAudioContext() {
  const AudioContextCtor =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext
  if (!AudioContextCtor) return undefined
  return new AudioContextCtor()
}

export function unlockAntSound() {
  if (!audioContext) audioContext = createAudioContext()
  if (!audioContext) return
  if (audioContext.state === "suspended") {
    void audioContext.resume()
  }
  const silence = audioContext.createBuffer(1, 1, audioContext.sampleRate)
  const source = audioContext.createBufferSource()
  const gain = audioContext.createGain()
  source.buffer = silence
  gain.gain.setValueAtTime(0, audioContext.currentTime)
  source.connect(gain)
  gain.connect(audioContext.destination)
  source.start()
}

function getNoiseBuffer(context: AudioContext) {
  if (!noiseBuffer || noiseBuffer.sampleRate !== context.sampleRate) {
    noiseBuffer = context.createBuffer(1, 4096, context.sampleRate)
    const channelData = noiseBuffer.getChannelData(0)
    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = Math.random() * 2 - 1
    }
  }
  return noiseBuffer
}

export function playAntSound() {
  const context = audioContext
  if (!context || context.state !== "running") return

  const bufferSource = context.createBufferSource()
  const filter = context.createBiquadFilter()
  const gainNode = context.createGain()

  bufferSource.buffer = getNoiseBuffer(context)
  bufferSource.loop = true

  filter.type = "bandpass"
  filter.Q.setValueAtTime(10, context.currentTime)

  gainNode.gain.setValueAtTime(0, context.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.01)
  gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.05)

  bufferSource.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(context.destination)

  const now = context.currentTime
  filter.frequency.setValueAtTime(2000, now)
  filter.frequency.linearRampToValueAtTime(3000, now + 0.025)
  filter.frequency.linearRampToValueAtTime(2000, now + 0.05)

  bufferSource.start()
  bufferSource.stop(now + 0.05)
}
