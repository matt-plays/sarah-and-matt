'use client'
// Three.js letterpressed invite card.
// Front: hero-invite-front.svg  Back: hero-invite-back.svg
// PBR maps: hero-invite-{front|back}-{normal|displacement|ambient}.png
// Matte paper stock — metalness disabled, NeutralToneMapping for accurate pink.

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Texture helpers ────────────────────────────────────────────────────────────

/** Renders an SVG to a full-color sRGB CanvasTexture, letterboxed with the card pink. */
function loadSVGColor(src: string, w: number, h: number): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const imgAspect = img.naturalWidth / img.naturalHeight
      const canvasAspect = w / h
      let dw: number, dh: number, dx: number, dy: number
      if (imgAspect < canvasAspect) {
        dh = h; dw = h * imgAspect; dx = (w - dw) / 2; dy = 0
      } else {
        dw = w; dh = w / imgAspect; dx = 0; dy = (h - dh) / 2
      }
      const cvs = document.createElement('canvas')
      cvs.width = w; cvs.height = h
      const ctx = cvs.getContext('2d')!
      ctx.fillStyle = '#f7ccc3'
      ctx.fillRect(0, 0, w, h)
      ctx.drawImage(img, dx, dy, dw, dh)
      const tex = new THREE.CanvasTexture(cvs)
      tex.colorSpace = THREE.SRGBColorSpace
      resolve(tex)
    }
    img.onerror = reject
    img.src = src
  })
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function InviteCanvas({ onReady, triggerEntrance }: {
  onReady?: () => void
  triggerEntrance?: boolean
}) {
  const mountRef = useRef<HTMLDivElement>(null)
  const onReadyRef = useRef(onReady)
  const entranceStartedRef = useRef(false)
  const flipReadyRef = useRef(false)
  const entranceFlipActiveRef = useRef(false) // true = use fast lerp during entrance flip
  onReadyRef.current = onReady

  // When Hero signals "reveal", start scale-down and flip simultaneously
  useEffect(() => {
    if (!triggerEntrance) return
    entranceStartedRef.current = true
    entranceFlipActiveRef.current = true
    flipReadyRef.current = true // flip starts immediately alongside fade-in
  }, [triggerEntrance])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const CARD_W = 1.6
    const CARD_H = CARD_W * (1008 / 720)
    const CARD_D = 0.007

    // ── Renderer ────────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.toneMapping = THREE.NeutralToneMapping
    renderer.toneMappingExposure = 1.0
    Object.assign(renderer.domElement.style, { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'block' })
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(28, mount.clientWidth / mount.clientHeight, 0.01, 100)
    camera.position.z = 6

    // ── Lighting ─────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))

    const key = new THREE.DirectionalLight(0xffffff, 2.8)
    key.position.set(2.5, 4, 5)
    scene.add(key)

    const fill = new THREE.DirectionalLight(0xffffff, 1.0)
    fill.position.set(-3, -1, 3)
    scene.add(fill)

    const rim = new THREE.DirectionalLight(0xffffff, 0.39)
    rim.position.set(0, -2, -2)
    scene.add(rim)

    // ── Materials ─────────────────────────────────────────────────────────────────
    const edgeMat  = new THREE.MeshStandardMaterial({ color: 0xf0ebe3, roughness: 0.95, metalness: 0 })
    const frontMat = new THREE.MeshStandardMaterial({ color: 0xf7ccc3, roughness: 0.78, metalness: 0 })
    const backMat  = new THREE.MeshStandardMaterial({ color: 0xf7ccc3, roughness: 0.78, metalness: 0 })

    // ── Geometry ──────────────────────────────────────────────────────────────────
    const boxGeo   = new THREE.BoxGeometry(CARD_W, CARD_H, CARD_D)
    const box      = new THREE.Mesh(boxGeo, [
      edgeMat, edgeMat, edgeMat, edgeMat,
      new THREE.MeshBasicMaterial({ visible: false }),
      backMat,
    ])

    const frontGeo = new THREE.PlaneGeometry(CARD_W, CARD_H, 128, 178)
    frontGeo.setAttribute('uv2', frontGeo.getAttribute('uv').clone())
    const frontPlane = new THREE.Mesh(frontGeo, frontMat)
    frontPlane.position.z = CARD_D / 2 + 0.0005

    const group = new THREE.Group()
    group.add(box, frontPlane)
    scene.add(group)

    // ── Load color textures from SVG ──────────────────────────────────────────────
    const TEX_W = 1440
    const TEX_H = Math.round(TEX_W * (CARD_H / CARD_W))

    // ── Asset loading tracker ─────────────────────────────────────────────────────
    let loadedCount = 0
    const onAssetLoaded = () => { if (++loadedCount === 6) onReadyRef.current?.() }

    loadSVGColor('/images/hero-invite-front.svg', TEX_W, TEX_H).then((color) => {
      frontMat.map = color; frontMat.color.set(0xffffff); frontMat.needsUpdate = true; onAssetLoaded()
    })
    loadSVGColor('/images/hero-invite-back.svg', TEX_W, TEX_H).then((color) => {
      backMat.map = color; backMat.color.set(0xffffff); backMat.needsUpdate = true; onAssetLoaded()
    })

    // ── Load PBR maps ─────────────────────────────────────────────────────────────
    const tl = new THREE.TextureLoader()

    tl.load('/images/hero-invite-front-normal.png', (tex) => {
      frontMat.normalMap = tex; frontMat.normalScale = new THREE.Vector2(3.0, 3.0); frontMat.needsUpdate = true; onAssetLoaded()
    })
    tl.load('/images/hero-invite-front-ambient.png', (tex) => {
      frontMat.aoMap = tex; frontMat.aoMapIntensity = 0.75; frontMat.needsUpdate = true; onAssetLoaded()
    })

    tl.load('/images/hero-invite-back-normal.png', (tex) => {
      backMat.normalMap = tex; backMat.normalScale = new THREE.Vector2(-3.0, 3.0); backMat.needsUpdate = true; onAssetLoaded()
    })
    tl.load('/images/hero-invite-back-ambient.png', (tex) => {
      backMat.aoMap = tex; backMat.aoMapIntensity = 0.75; backMat.needsUpdate = true; onAssetLoaded()
    })

    // ── Interaction ───────────────────────────────────────────────────────────────
    // Start showing back face; flip to front is triggered by triggerEntrance ref
    const ENTRANCE_ANGLE = (40 * Math.PI) / 180 // 40° tilt — front face always visible
    const st = { mx: 0, my: 0, lx: 0, ly: 0, flipTarget: ENTRANCE_ANGLE, flipCurrent: ENTRANCE_ANGLE, flipping: false, tiltMul: 1, scale: 1.125 }

    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect()
      st.mx = ((e.clientX - r.left) / r.width  - 0.5) * 2
      st.my = ((e.clientY - r.top)  / r.height - 0.5) * 2
    }
    const onClick = () => { st.flipTarget = st.flipTarget === 0 ? Math.PI : 0; st.flipping = true }
    mount.addEventListener('mousemove', onMove)
    mount.addEventListener('click', onClick)

    // ── Animation ─────────────────────────────────────────────────────────────────
    const timer = new THREE.Timer()
    let raf: number

    const tick = () => {
      raf = requestAnimationFrame(tick)
      timer.update()
      const t = timer.getElapsed()

      // Entrance: scale from 1.125 → 1.0
      if (entranceStartedRef.current) {
        st.scale += (1.0 - st.scale) * 0.09
        group.scale.setScalar(st.scale)
      }

      // Flip to front once entrance delay has elapsed
      if (flipReadyRef.current) {
        flipReadyRef.current = false
        st.flipTarget = 0
        st.flipping = true
      }

      // During flip: drain lx/ly toward 0 so pent-up tilt can't snap in on completion
      st.lx += ((st.flipping ? 0 : st.mx) - st.lx) * 0.055
      st.ly += ((st.flipping ? 0 : st.my) - st.ly) * 0.055
      // Entrance flip uses faster lerp (~0.6s) to match Hero fade-in; interactive flips use normal speed
      const flipLerp = entranceFlipActiveRef.current ? 0.09 : 0.10
      st.flipCurrent += (st.flipTarget - st.flipCurrent) * flipLerp
      if (Math.abs(st.flipCurrent - st.flipTarget) < 0.0005) {
        st.flipCurrent = st.flipTarget
        st.flipping = false
        entranceFlipActiveRef.current = false // revert to normal speed for interactive flips
      }
      // Smooth tilt multiplier — fades out when flip starts, fades back in when done
      st.tiltMul += ((st.flipping ? 0 : 1) - st.tiltMul) * 0.08
      group.position.y = Math.sin(t * 0.38) * 0.025
      group.rotation.y = st.flipCurrent + st.lx * 0.165 * st.tiltMul
      group.rotation.x = -st.ly * 0.11 * st.tiltMul
      if (!st.flipping && Math.abs(st.mx) < 0.02 && Math.abs(st.my) < 0.02) {
        group.rotation.y += Math.sin(t * 0.20) * 0.014
        group.rotation.x += Math.sin(t * 0.16 + 1.2) * 0.008
      }
      renderer.render(scene, camera)
    }
    tick()

    // ── Resize ────────────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    ro.observe(mount)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mount.removeEventListener('mousemove', onMove)
      mount.removeEventListener('click', onClick)
      renderer.dispose()
      boxGeo.dispose(); frontGeo.dispose()
      frontMat.dispose(); backMat.dispose(); edgeMat.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'relative', width: '100%', aspectRatio: '720 / 1008', cursor: 'pointer',
        mixBlendMode: 'multiply',
        filter: [
          'drop-shadow(0px 1000px 193px rgba(43,13,0,0.00))',
          'drop-shadow(0px 660px 177px rgba(43,13,0,0.015))',
          'drop-shadow(0px 370px 149px rgba(43,13,0,0.06))',
          'drop-shadow(0px 165px 110px rgba(43,13,0,0.105))',
          'drop-shadow(0px 42px 61px rgba(43,13,0,0.12))',
        ].join(' '),
      }}
    />
  )
}
