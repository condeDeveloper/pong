// Desenho no canvas, estilo retrô monocromático
function drawScene(ctx, g) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // linha central tracejada
  ctx.fillStyle = 'rgba(255,255,255,.35)';
  for (let y = 10; y < H; y += 28) ctx.fillRect(W / 2 - 2, y, 4, 16);

  // placar
  ctx.fillStyle = 'rgba(255,255,255,.9)';
  ctx.font = 'bold 64px "Courier New", monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  ctx.fillText(g.score.left, W / 2 - 90, 20);
  ctx.fillText(g.score.right, W / 2 + 90, 20);

  // nomes
  ctx.font = '13px "Courier New", monospace';
  ctx.fillStyle = 'rgba(255,255,255,.4)';
  ctx.fillText(g.names.left, W / 2 - 90, 92);
  ctx.fillText(g.names.right, W / 2 + 90, 92);

  // rastro da bola
  g.ball.trail.forEach((p, i) => {
    const a = (i / g.ball.trail.length) * 0.35;
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.beginPath(); ctx.arc(p.x, p.y, BALL_R * (0.4 + 0.6 * i / g.ball.trail.length), 0, Math.PI * 2); ctx.fill();
  });

  // raquetes
  ctx.fillStyle = '#fff';
  for (const p of [g.left, g.right]) ctx.fillRect(p.x, p.y, p.w, p.h);

  // bola
  if (g.serveTimer <= 0 || Math.floor(g.serveTimer / 150) % 2 === 0) {
    ctx.beginPath(); ctx.arc(g.ball.x, g.ball.y, BALL_R, 0, Math.PI * 2); ctx.fill();
  }

  // flash de ponto
  if (g.flash > 0) {
    ctx.fillStyle = `rgba(255,255,255,${g.flash * 0.25})`;
    ctx.fillRect(g.flashSide === 'left' ? 0 : W / 2, 0, W / 2, H);
  }
}
