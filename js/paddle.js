// Raquete
class Paddle {
  constructor(x) {
    this.x = x;
    this.y = H / 2 - PADDLE_H / 2;
    this.w = PADDLE_W;
    this.h = PADDLE_H;
    this.vy = 0;      // velocidade atual (para dar efeito na bola)
    this.target = null; // alvo vertical (mouse/toque/IA); null = controle por teclado
    this.dir = 0;     // -1, 0, 1 (teclado)
  }
  get cy() { return this.y + this.h / 2; }

  update(dt) {
    const before = this.y;
    if (this.target !== null) {
      // aproxima do alvo com velocidade limitada para manter suavidade
      const diff = this.target - this.cy;
      const maxStep = (this.maxSpeed || 2000) * dt;
      this.y += Math.abs(diff) < maxStep ? diff : Math.sign(diff) * maxStep;
    } else {
      this.y += this.dir * PADDLE_SPEED * dt;
    }
    this.y = Math.max(0, Math.min(H - this.h, this.y));
    this.vy = dt > 0 ? (this.y - before) / dt : 0;
  }

  reset() { this.y = H / 2 - this.h / 2; this.vy = 0; }
}
