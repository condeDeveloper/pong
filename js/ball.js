// Bola: movimento, quiques e rebatidas
class Ball {
  constructor() { this.trail = []; this.reset(1); }

  reset(dir) {
    this.x = W / 2; this.y = H / 2;
    const angle = (Math.random() * 0.6 - 0.3);           // ±17°
    this.vx = Math.cos(angle) * BALL_SPEED * dir;
    this.vy = Math.sin(angle) * BALL_SPEED;
    this.speed = BALL_SPEED;
    this.trail.length = 0;
  }

  // Retorna 'left' | 'right' se saiu por um lado, 'wall' se bateu em cima/baixo, senão null
  update(dt) {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 12) this.trail.shift();

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    let event = null;
    if (this.y - BALL_R <= 0) { this.y = BALL_R; this.vy = Math.abs(this.vy); event = 'wall'; }
    else if (this.y + BALL_R >= H) { this.y = H - BALL_R; this.vy = -Math.abs(this.vy); event = 'wall'; }

    if (this.x < -BALL_R * 4) return 'left';
    if (this.x > W + BALL_R * 4) return 'right';
    return event;
  }

  // Testa e resolve colisão com uma raquete. Retorna true se rebateu.
  hit(paddle, side) {
    const withinY = this.y + BALL_R >= paddle.y && this.y - BALL_R <= paddle.y + paddle.h;
    if (!withinY) return false;
    const movingToward = side === 'left' ? this.vx < 0 : this.vx > 0;
    if (!movingToward) return false;
    const edge = side === 'left' ? paddle.x + paddle.w : paddle.x;
    const crossed = side === 'left' ? this.x - BALL_R <= edge : this.x + BALL_R >= edge;
    if (!crossed) return false;

    // ângulo depende de onde bateu na raquete; efeito extra pela velocidade da raquete
    const rel = (this.y - paddle.cy) / (paddle.h / 2);        // -1..1
    const angle = Math.max(-1, Math.min(1, rel)) * MAX_BOUNCE_ANGLE;
    this.speed = Math.min(BALL_MAX_SPEED, this.speed * BALL_SPEED_UP);
    const dir = side === 'left' ? 1 : -1;
    this.vx = Math.cos(angle) * this.speed * dir;
    this.vy = Math.sin(angle) * this.speed + paddle.vy * 0.15;
    this.x = side === 'left' ? edge + BALL_R : edge - BALL_R;
    return true;
  }
}
