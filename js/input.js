// Teclado, mouse e toque
function bindInput(g) {
  const canvas = document.getElementById('game');
  const keys = new Set();

  function applyKeys() {
    // esquerda: W/S ; direita (2P): setas
    g.left.dir = (keys.has('KeyS') ? 1 : 0) - (keys.has('KeyW') ? 1 : 0);
    if (g.mode === '2p') g.right.dir = (keys.has('ArrowDown') ? 1 : 0) - (keys.has('ArrowUp') ? 1 : 0);
    if (g.left.dir !== 0) g.left.target = null;   // teclado assume o controle do mouse
    if (g.mode === '2p' && g.right.dir !== 0) g.right.target = null;
  }

  window.addEventListener('keydown', e => {
    if (['KeyW', 'KeyS', 'ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) e.preventDefault();
    if (e.code === 'Space' || e.code === 'KeyP' || e.code === 'Escape') { if (!e.repeat) g.togglePause(); return; }
    if (e.code === 'Digit1') return g.setMode('easy');
    if (e.code === 'Digit2') return g.setMode('normal');
    if (e.code === 'Digit3') return g.setMode('hard');
    if (e.code === 'Digit4') return g.setMode('2p');
    keys.add(e.code);
    applyKeys();
    g.onAny();
  });
  window.addEventListener('keyup', e => { keys.delete(e.code); applyKeys(); });
  window.addEventListener('blur', () => { keys.clear(); applyKeys(); });

  // converte coordenada do evento para o espaço do canvas
  function toCanvas(e) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) };
  }

  // mouse: controla a raquete esquerda
  canvas.addEventListener('mousemove', e => {
    if (g.mode === '2p') return;
    g.left.target = toCanvas(e).y;
  });

  // toque: cada dedo controla a raquete do seu lado (multi-touch)
  const onTouch = e => {
    e.preventDefault();
    for (const t of e.changedTouches) {
      const p = toCanvas(t);
      if (p.x < W / 2) g.left.target = p.y;
      else if (g.mode === '2p') g.right.target = p.y;
      else g.left.target = p.y;
    }
    g.onAny();
  };
  canvas.addEventListener('touchstart', onTouch, { passive: false });
  canvas.addEventListener('touchmove', onTouch, { passive: false });

  canvas.addEventListener('click', () => g.onAny());
  document.getElementById('overlay').addEventListener('pointerdown', e => { e.preventDefault(); g.onAny(); });

  document.querySelectorAll('#modes button').forEach(b => {
    b.addEventListener('click', e => { e.stopPropagation(); g.setMode(b.dataset.mode); });
  });
}
