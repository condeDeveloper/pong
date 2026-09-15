// Sons sintetizados com WebAudio
const Sound = (() => {
  let ctx;
  function tone(freq, dur, type = 'square', vol = 0.05) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.connect(g).connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + dur);
    } catch (_) {}
  }
  return {
    paddle: () => tone(440, 0.06, 'square', 0.06),
    wall:   () => tone(220, 0.05, 'square', 0.04),
    score:  () => tone(120, 0.35, 'sawtooth', 0.06),
    win:    () => [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tone(f, 0.2, 'square', 0.06), i * 110)),
    lose:   () => [300, 220, 150].forEach((f, i) => setTimeout(() => tone(f, 0.25, 'sawtooth', 0.06), i * 140)),
  };
})();
