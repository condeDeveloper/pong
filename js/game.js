// Estados, regras e loop
class Game {
  constructor() {
    this.ctx = document.getElementById('game').getContext('2d');
    this.overlayEl = document.getElementById('overlay');
    this.left = new Paddle(PADDLE_MARGIN);
    this.right = new Paddle(W - PADDLE_MARGIN - PADDLE_W);
    this.ball = new Ball();
    this.ai = new AI(this.right, 'normal');
    this.mode = 'normal';
    this.names = { left: 'VOCÊ', right: 'CPU' };
    this.state = 'ready'; // ready | playing | paused | over
    this.score = { left: 0, right: 0 };
    this.serveTimer = SERVE_DELAY;
    this.flash = 0; this.flashSide = 'left';
    bindInput(this);
    this.last = performance.now();
    requestAnimationFrame(t => this.loop(t));
  }

  setMode(mode) {
    this.mode = mode;
    document.querySelectorAll('#modes button').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    if (mode === '2p') { this.names = { left: 'P1', right: 'P2' }; this.right.target = null; this.right.maxSpeed = 2000; }
    else { this.names = { left: 'VOCÊ', right: 'CPU' }; this.ai.setLevel(mode); }
    this.newMatch();
    this.state = 'ready';
    this.showOverlay('PONG', `Modo: <strong>${this.modeLabel()}</strong><br><span class="cta">Toque ou pressione uma tecla para começar</span>`);
  }
  modeLabel() { return { easy: 'Fácil', normal: 'Normal', hard: 'Difícil', '2p': '2 Jogadores' }[this.mode]; }

  newMatch() {
    this.score = { left: 0, right: 0 };
    this.left.reset(); this.right.reset();
    this.ball.reset(Math.random() < 0.5 ? 1 : -1);
    this.serveTimer = SERVE_DELAY;
  }

  onAny() {
    if (this.state === 'ready') this.start();
    else if (this.state === 'over') { this.newMatch(); this.start(); }
    else if (this.state === 'paused') this.start();
  }
  start() { this.state = 'playing'; this.overlayEl.classList.add('hidden'); }
  togglePause() {
    if (this.state === 'playing') { this.state = 'paused'; this.showOverlay('PAUSADO', 'Espaço ou toque para continuar'); }
    else this.onAny();
  }

  update(dt) {
    this.left.update(dt);
    if (this.mode !== '2p') this.ai.update(dt, this.ball);
    this.right.update(dt);
    if (this.flash > 0) this.flash = Math.max(0, this.flash - dt * 3);

    if (this.serveTimer > 0) { this.serveTimer -= dt * 1000; return; }

    const ev = this.ball.update(dt);
    if (ev === 'wall') Sound.wall();
    if (this.ball.hit(this.left, 'left') || this.ball.hit(this.right, 'right')) Sound.paddle();

    if (ev === 'left' || ev === 'right') {
      const scorer = ev === 'left' ? 'right' : 'left';
      this.score[scorer]++;
      this.flash = 1; this.flashSide = scorer;
      Sound.score();
      if (this.score[scorer] >= WIN_SCORE) return this.endMatch(scorer);
      this.ball.reset(ev === 'left' ? -1 : 1); // quem sofreu o ponto saca
      this.serveTimer = SERVE_DELAY;
    }
  }

  endMatch(winner) {
    this.state = 'over';
    const humanWon = this.mode === '2p' || winner === 'left';
    humanWon ? Sound.win() : Sound.lose();
    const title = this.mode === '2p' ? `${this.names[winner]} VENCEU` : (winner === 'left' ? 'VOCÊ VENCEU' : 'CPU VENCEU');
    this.showOverlay(title, `<span class="big">${this.score.left} × ${this.score.right}</span><br>Toque ou pressione uma tecla para jogar de novo`);
  }

  loop(now) {
    const dt = Math.min(0.033, (now - this.last) / 1000);
    this.last = now;
    if (this.state === 'playing') this.update(dt);
    drawScene(this.ctx, this);
    requestAnimationFrame(t => this.loop(t));
  }

  showOverlay(title, html) {
    this.overlayEl.innerHTML = `<h1>${title}</h1><p>${html}</p>`;
    this.overlayEl.classList.remove('hidden');
  }
}

window.addEventListener('DOMContentLoaded', () => { window.game = new Game(); });
