import { useEffect } from 'react'

export function useHeroCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, time = 0, rafId

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * 2, y: Math.random() * 2,
      r: Math.random() * 1.4 + 0.3,
      op: Math.random(),
      spd: Math.random() * 0.008 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }))

    const glows = [
      { x:.3,  y:.55, r:.35, col:'rgba(60,100,200',  op:.35, spd:.003, phase:0   },
      { x:.75, y:.3,  r:.28, col:'rgba(100,30,180',  op:.28, spd:.004, phase:1   },
      { x:.15, y:.4,  r:.25, col:'rgba(180,90,20',   op:.25, spd:.005, phase:2   },
      { x:.6,  y:.65, r:.2,  col:'rgba(20,90,180',   op:.2,  spd:.003, phase:3   },
      { x:.5,  y:.2,  r:.15, col:'rgba(201,168,76',  op:.15, spd:.006, phase:.5  },
    ]

    function resize() {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function draw() {
      ctx.clearRect(0, 0, W, H)
      time += 0.016

      const bg = ctx.createLinearGradient(0, 0, W, H)
      bg.addColorStop(0, '#04050e'); bg.addColorStop(.4, '#0a0515'); bg.addColorStop(1, '#060404')
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

      glows.forEach(g => {
        const pulse = Math.sin(time * g.spd * 60 + g.phase) * .5 + .5
        const grad = ctx.createRadialGradient(g.x*W, g.y*H, 0, g.x*W, g.y*H, g.r*W)
        grad.addColorStop(0, `${g.col},${g.op*(pulse*.4+.6)})`)
        grad.addColorStop(1, `${g.col},0)`)
        ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H)
      })

      stars.forEach(s => {
        ctx.globalAlpha = s.op * (.3 + (Math.sin(time*s.spd*60+s.phase)*.5+.5)*.7)
        ctx.fillStyle = '#f5f2ec'
        ctx.beginPath(); ctx.arc(s.x*W, s.y*H, s.r, 0, Math.PI*2); ctx.fill()
      })

      ctx.globalAlpha = 1
      const hGrad = ctx.createLinearGradient(0, H*.5, 0, H)
      hGrad.addColorStop(0, 'transparent')
      hGrad.addColorStop(.6, `rgba(201,168,76,${.04+Math.sin(time*.5)*.02})`)
      hGrad.addColorStop(1, 'rgba(6,6,10,.9)')
      ctx.fillStyle = hGrad; ctx.fillRect(0, 0, W, H)

      ctx.fillStyle = 'rgba(4,4,8,.9)'
      ctx.beginPath(); ctx.moveTo(0,H); ctx.lineTo(0,H*.68)
      ctx.quadraticCurveTo(W*.1,H*.42,W*.2,H*.55); ctx.quadraticCurveTo(W*.3,H*.3,W*.42,H*.52)
      ctx.quadraticCurveTo(W*.52,H*.38,W*.6,H*.58); ctx.quadraticCurveTo(W*.7,H*.45,W*.8,H*.6)
      ctx.quadraticCurveTo(W*.9,H*.48,W,H*.65); ctx.lineTo(W,H); ctx.fill()

      ctx.fillStyle = 'rgba(6,6,10,.95)'
      ctx.beginPath(); ctx.moveTo(0,H); ctx.lineTo(0,H*.78)
      ctx.quadraticCurveTo(W*.08,H*.7,W*.18,H*.8); ctx.quadraticCurveTo(W*.28,H*.6,W*.38,H*.78)
      ctx.quadraticCurveTo(W*.5,H*.68,W*.6,H*.8); ctx.quadraticCurveTo(W*.72,H*.7,W*.85,H*.82)
      ctx.quadraticCurveTo(W*.93,H*.75,W,H*.8); ctx.lineTo(W,H); ctx.fill()

      ctx.globalAlpha = .035
      for (let y = 0; y < H; y += 4) { ctx.fillStyle='#000'; ctx.fillRect(0,y,W,1) }
      ctx.globalAlpha = 1

      rafId = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(rafId); ro.disconnect() }
  }, [canvasRef])
}
