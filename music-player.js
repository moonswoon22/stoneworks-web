/**
 * SoundCloud-style waveform + on-page audio for music feed cards.
 * Requires same-origin audio (serve site over http(s), not file://).
 */
(function () {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;

  let sharedCtx = null;
  function getCtx() {
    if (!sharedCtx) sharedCtx = new AC();
    return sharedCtx;
  }

  function formatTime(sec) {
    if (!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + String(s).padStart(2, '0');
  }

  function computePeaks(audioBuffer, count) {
    const ch = audioBuffer.getChannelData(0);
    const step = Math.max(1, Math.floor(ch.length / count));
    const peaks = [];
    for (let i = 0; i < count; i++) {
      let max = 0;
      const start = i * step;
      for (let j = 0; j < step && start + j < ch.length; j++) {
        max = Math.max(max, Math.abs(ch[start + j]));
      }
      peaks.push(max);
    }
    const m = Math.max(...peaks, 1e-6);
    return peaks.map((p) => p / m);
  }

  function drawWaveform(canvas, peaks, progress) {
    const wrap = canvas.closest('.music-waveform-wrap');
    if (!wrap || !peaks || !peaks.length) return;

    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, wrap.clientWidth);
    const h = Math.max(48, wrap.clientHeight || 64);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const n = peaks.length;
    const prog = Math.min(1, Math.max(0, progress || 0));
    const playX = prog * w;
    const slot = w / n;

    for (let i = 0; i < n; i++) {
      const ph = peaks[i];
      const barh = ph * (h * 0.88);
      const y = (h - barh) / 2;
      const x = i * slot;
      const bw = Math.max(1, slot - 1.5);
      const played = (i + 1) / n <= prog + 1e-9;
      ctx.fillStyle = played ? 'rgba(245, 185, 132, 0.95)' : 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(x + 0.75, y, bw, barh);
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(playX, 2);
    ctx.lineTo(playX, h - 2);
    ctx.stroke();
  }

  const PEAK_BARS = 120;

  async function decodeBuffer(ctx, arrayBuffer) {
    try {
      const p = ctx.decodeAudioData(arrayBuffer.slice(0));
      if (p && typeof p.then === 'function') return await p;
    } catch (_) {
      /* fall through to callback API */
    }
    return new Promise((resolve, reject) => {
      ctx.decodeAudioData(arrayBuffer.slice(0), resolve, reject);
    });
  }

  async function loadPeaksFromUrl(url) {
    const ctx = getCtx();
    const res = await fetch(url);
    if (!res.ok) throw new Error('fetch failed');
    const buf = await res.arrayBuffer();
    const audioBuf = await decodeBuffer(ctx, buf);
    return computePeaks(audioBuf, PEAK_BARS);
  }

  function initCard(card) {
    const audio = card.querySelector('audio.music-audio');
    const btn = card.querySelector('.music-play-btn');
    const canvas = card.querySelector('canvas.music-waveform');
    const curEl = card.querySelector('.music-time-current');
    const durEl = card.querySelector('.music-time-duration');
    const wrap = canvas && canvas.closest('.music-waveform-wrap');
    if (!audio || !btn || !canvas || !wrap) return;

    let peaks = null;
    let peaksLoading = null;

    function ensurePeaks() {
      if (peaks) return Promise.resolve(peaks);
      if (peaksLoading) return peaksLoading;
      peaksLoading = loadPeaksFromUrl(audio.src)
        .then((p) => {
          peaks = p;
          return p;
        })
        .catch(() => {
          peaks = new Array(PEAK_BARS).fill(0.35);
          return peaks;
        })
        .finally(() => {
          peaksLoading = null;
        });
      return peaksLoading;
    }

    function progress() {
      return audio.duration ? audio.currentTime / audio.duration : 0;
    }

    function redraw() {
      drawWaveform(canvas, peaks, progress());
    }

    btn.addEventListener('click', async () => {
      try {
        await getCtx().resume();
      } catch (_) {}

      document.querySelectorAll('[data-music-player] audio.music-audio').forEach((a) => {
        if (a !== audio) {
          a.pause();
          const other = a.closest('[data-music-player]');
          other && other.querySelector('.music-play-btn')?.classList.remove('is-playing');
        }
      });

      if (audio.paused) {
        await ensurePeaks();
        try {
          await audio.play();
          btn.classList.add('is-playing');
        } catch (e) {
          console.warn('Playback failed', e);
        }
      } else {
        audio.pause();
        btn.classList.remove('is-playing');
      }
      redraw();
    });

    audio.addEventListener('timeupdate', () => {
      if (curEl) curEl.textContent = formatTime(audio.currentTime);
      redraw();
    });
    audio.addEventListener('ended', () => {
      btn.classList.remove('is-playing');
      redraw();
    });
    audio.addEventListener('loadedmetadata', () => {
      if (durEl) durEl.textContent = formatTime(audio.duration);
    });

    canvas.addEventListener('click', (e) => {
      if (!audio.duration) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      audio.currentTime = Math.max(0, Math.min(1, x / rect.width)) * audio.duration;
      redraw();
    });

    const ro = new ResizeObserver(() => redraw());
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          ensurePeaks().then(redraw);
          io.disconnect();
        }
      },
      { rootMargin: '80px' }
    );
    io.observe(card);

    redraw();
  }

  function boot() {
    document.querySelectorAll('[data-music-player]').forEach(initCard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
