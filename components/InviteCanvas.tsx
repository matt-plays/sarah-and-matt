'use client'
// Three.js letterpressed invite card.
// Front: hero-invite-front.svg  Back: hero-invite-back.svg
// Deboss depth comes from a grayscale bump map generated at runtime from each SVG.
// Drop hero-invite-normal.png into /public/images/ to upgrade to a proper blue-encoded
// normal map (overrides the generated bump map automatically).

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Texture helpers ────────────────────────────────────────────────────────────

type SVGTextures = { color: THREE.Texture; bump: THREE.Texture }

/**
 * Renders an SVG to two canvases:
 *  - color  : full-color, sRGB, letterboxed with #f7ccc3 background
 *  - bump   : grayscale luminance — light paper = raised, dark ink = pressed in (letterpress)
 */
function loadSVGTextures(src: string, w: number, h: number): Promise<SVGTextures> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      // Fit SVG inside canvas (contain), letter-box with card pink
      const imgAspect = img.naturalWidth / img.naturalHeight
      const canvasAspect = w / h
      let dw: number, dh: number, dx: number, dy: number
      if (imgAspect < canvasAspect) {
        dh = h; dw = h * imgAspect; dx = (w - dw) / 2; dy = 0
      } else {
        dw = w; dh = w / imgAspect; dx = 0; dy = (h - dh) / 2
      }

      // ── Color texture ────────────────────────────────────────────────────────
      const colorCvs = document.createElement('canvas')
      colorCvs.width = w; colorCvs.height = h
      const cc = colorCvs.getContext('2d')!
      cc.fillStyle = '#f7ccc3'
      cc.fillRect(0, 0, w, h)
      cc.drawImage(img, dx, dy, dw, dh)
      const colorTex = new THREE.CanvasTexture(colorCvs)
      colorTex.colorSpace = THREE.SRGBColorSpace

      // ── Bump (grayscale luminance) texture ────────────────────────────────────
      // White paper → raised. Dark ink/lines → pressed in. = letterpress.
      const bumpCvs = document.createElement('canvas')
      bumpCvs.width = w; bumpCvs.height = h
      const bc = bumpCvs.getContext('2d')!
      bc.fillStyle = '#fff'
      bc.fillRect(0, 0, w, h)
      bc.drawImage(img, dx, dy, dw, dh)
      const id = bc.getImageData(0, 0, w, h)
      const d = id.data
      for (let i = 0; i < d.length; i += 4) {
        const luma = Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2])
        d[i] = d[i + 1] = d[i + 2] = luma
        d[i + 3] = 255
      }
      bc.putImageData(id, 0, 0)
      const bumpTex = new THREE.CanvasTexture(bumpCvs)

      resolve({ color: colorTex, bump: bumpTex })
    }
    img.onerror = reject
    img.src = src
  })
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function InviteCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Physical card dimensions — 720 × 1008 invite proportion
    const CARD_W = 1.6
    const CARD_H = CARD_W * (1008 / 720) // ≈ 2.24
    const CARD_D = 0.007                  // paper stock depth

    // ── Renderer ────────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.9
    Object.assign(renderer.domElement.style, {
      position: 'absolute', top: '0', left: '0',
      width: '100%', height: '100%', display: 'block',
    })
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(28, mount.clientWidth / mount.clientHeight, 0.01, 100)
    camera.position.z = 6

    // ── Lighting ─────────────────────────────────────────────────────────────────
    // Warm ambient — enough to see the card without washing out the bump
    scene.add(new THREE.AmbientLight(0xfff8ef, 0.4))

    // Key light — upper right, raked at ~43° to the card surface to catch bump normals
    const key = new THREE.DirectionalLight(0xfff5e0, 2.2)
    key.position.set(2.5, 4, 5)
    scene.add(key)

    // Soft fill — opposite corner, dims to preserve bump contrast
    const fill = new THREE.DirectionalLight(0xe8f0ff, 0.25)
    fill.position.set(-3, -1, 3)
    scene.add(fill)

    // Rim — from behind, catches paper edges
    const rim = new THREE.DirectionalLight(0xfff0e0, 0.1)
    rim.position.set(0, -2, -2)
    scene.add(rim)

    // ── Materials ─────────────────────────────────────────────────────────────────
    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0xf0ebe3, // cream paper edge
      roughness: 0.95,
      metalness: 0,
    })

    const frontMat = new THREE.MeshStandardMaterial({
      color: 0xf7ccc3, // pink fallback while SVG loads
      roughness: 0.92,
      metalness: 0,
    })

    const backMat = new THREE.MeshStandardMaterial({
      color: 0xf7ccc3, // pink fallback while SVG loads
      roughness: 0.88,
      metalness: 0,
    })

    // ── Geometry ──────────────────────────────────────────────────────────────────
    // BoxGeometry provides the 4 edges + back face automatically.
    // Front face is hidden here — covered by the high-res PlaneGeometry overlay.
    const boxGeo = new THREE.BoxGeometry(CARD_W, CARD_H, CARD_D)
    const box = new THREE.Mesh(boxGeo, [
      edgeMat, edgeMat, edgeMat, edgeMat,
      new THREE.MeshBasicMaterial({ visible: false }), // front — covered by plane
      backMat,
    ])

    // High-res front plane — supports per-pixel bump/displacement
    const frontGeo = new THREE.PlaneGeometry(CARD_W, CARD_H, 128, 178)
    const frontPlane = new THREE.Mesh(frontGeo, frontMat)
    frontPlane.position.z = CARD_D / 2 + 0.0005

    const group = new THREE.Group()
    group.add(box, frontPlane)
    scene.add(group)

    // ── Load SVG textures (async) ─────────────────────────────────────────────────
    const TEX_W = 1440
    const TEX_H = Math.round(TEX_W * (CARD_H / CARD_W))

    loadSVGTextures('/images/hero-invite-front.svg', TEX_W, TEX_H).then(({ color, bump }) => {
      frontMat.map = color
      frontMat.bumpMap = bump
      frontMat.bumpScale = 0.12   // letterpress depth — dark ink pressed ~0.1mm into paper
      frontMat.color.set(0xffffff)
      frontMat.needsUpdate = true
    })

    loadSVGTextures('/images/hero-invite-back.svg', TEX_W, TEX_H).then(({ color, bump }) => {
      backMat.map = color
      backMat.bumpMap = bump
      backMat.bumpScale = 0.10
      backMat.color.set(0xffffff)
      backMat.needsUpdate = true
    })

    // ── Optional: upgrade to blue-encoded normal map if the PNG is present ────────
    // Drop /public/images/hero-invite-normal.png to replace the generated bump map.
    const tl = new THREE.TextureLoader()
    fetch('/images/hero-invite-normal.png', { method: 'HEAD' }).then((r) => {
      if (!r.ok) return
      const normalMap = tl.load('/images/hero-invite-normal.png')
      const normalScale = new THREE.Vector2(0.6, 0.6)
      ;[frontMat, backMat].forEach((m) => {
        m.bumpMap = null
        m.normalMap = normalMap
        m.normalScale = normalScale
        m.needsUpdate = true
      })
    })

    // ── Interaction ───────────────────────────────────────────────────────────────
    const st = { mx: 0, my: 0, lx: 0, ly: 0, flipTarget: 0, flipCurrent: 0, flipping: false }

    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect()
      st.mx = ((e.clientX - r.left) / r.width - 0.5) * 2
      st.my = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    const onClick = () => {
      st.flipTarget = st.flipTarget === 0 ? Math.PI : 0
      st.flipping = true
    }
    mount.addEventListener('mousemove', onMove)
    mount.addEventListener('click', onClick)

    // ── Animation ─────────────────────────────────────────────────────────────────
    const timer = new THREE.Timer()
    let raf: number

    const tick = () => {
      raf = requestAnimationFrame(tick)
      timer.update()
      const t = timer.getElapsed()

      st.lx += (st.mx - st.lx) * 0.055
      st.ly += (st.my - st.ly) * 0.055

      st.flipCurrent += (st.flipTarget - st.flipCurrent) * 0.045
      if (Math.abs(st.flipCurrent - st.flipTarget) < 0.0005) {
        st.flipCurrent = st.flipTarget
        st.flipping = false
      }

      group.position.y = Math.sin(t * 0.38) * 0.025

      const tiltMul = st.flipping ? 0 : 1
      group.rotation.y = st.flipCurrent + st.lx * 0.15 * tiltMul
      group.rotation.x = -st.ly * 0.1 * tiltMul

      if (!st.flipping && Math.abs(st.mx) < 0.02 && Math.abs(st.my) < 0.02) {
        group.rotation.y += Math.sin(t * 0.20) * 0.014
        group.rotation.x += Math.sin(t * 0.16 + 1.2) * 0.008
      }

      renderer.render(scene, camera)
    }
    tick()

    // ── Resize ────────────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    ro.observe(mount)

    // ── Cleanup ───────────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mount.removeEventListener('mousemove', onMove)
      mount.removeEventListener('click', onClick)
      renderer.dispose()
      boxGeo.dispose()
      frontGeo.dispose()
      frontMat.dispose()
      backMat.dispose()
      edgeMat.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '720 / 1008',
        cursor: 'pointer',
        filter: [
          'drop-shadow(0px 8px 16px rgba(19,32,38,0.04))',
          'drop-shadow(0px 24px 48px rgba(19,32,38,0.08))',
          'drop-shadow(0px 40px 80px rgba(19,32,38,0.10))',
          'drop-shadow(0px 48px 96px rgba(19,32,38,0.12))',
        ].join(' '),
      }}
    />
  )
}
