let audioCtx: AudioContext = null

export function playNotes(freq: number, type: "square" | "sine") {
  if (audioCtx == null) {
    audioCtx = new (AudioContext || window.webkitAudioContext)()
  }
  const dur = 0.1
  const osc = audioCtx.createOscillator()
  osc.frequency.value = freq
  osc.start()
  osc.type = type
  osc.stop(audioCtx.currentTime + dur)
  const node = audioCtx.createGain()
  node.gain.value = 0.2
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur)
  osc.connect(node)
  node.connect(audioCtx.destination)
}
