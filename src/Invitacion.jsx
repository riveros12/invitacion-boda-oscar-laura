import { useEffect, useRef, useState } from "react";

const FECHA = new Date("2026-11-28T15:00:00-05:00");
const AUDIO_URL = import.meta.env.VITE_AUDIO_URL || "";

function useCountdown() {
  const [restante, setRestante] = useState(() => Math.max(0, FECHA - new Date()));
  useEffect(() => {
    const id = setInterval(() => setRestante(Math.max(0, FECHA - new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return {
    días: Math.floor(restante / 86400000),
    horas: Math.floor((restante % 86400000) / 3600000),
    min: Math.floor((restante % 3600000) / 60000),
    seg: Math.floor((restante % 60000) / 1000),
  };
}

function Reveal({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>{children}</div>;
}

function Paisaje() {
  return (
    <svg viewBox="0 0 600 460" className="paisaje" role="img" aria-label="Pareja entre las montañas de El Rosal">
      <defs>
        <linearGradient id="cielo" x2="0" y2="1"><stop stopColor="#f3e8d3"/><stop offset="1" stopColor="#dce2ca"/></linearGradient>
        <linearGradient id="prado" x2="0" y2="1"><stop stopColor="#6d8a5f"/><stop offset="1" stopColor="#344a31"/></linearGradient>
      </defs>
      <rect width="600" height="460" fill="url(#cielo)"/>
      <path d="M0 210Q120 110 265 190T600 145V460H0Z" fill="#a6b89b"/>
      <path d="M0 275Q180 165 350 240T600 210V460H0Z" fill="#62805b"/>
      <path d="M0 310Q300 260 600 300V460H0Z" fill="url(#prado)"/>
      <path d="M310 300c25 35-35 60-15 95 15 27-20 48-27 65h75c-4-22 28-42 12-75-12-25 30-53 3-83Z" fill="#c9b690"/>
      <g fill="#3b5536"><ellipse cx="35" cy="300" rx="85" ry="150"/><ellipse cx="115" cy="315" rx="65" ry="110"/><ellipse cx="575" cy="345" rx="70" ry="85"/></g>
      <g transform="translate(300 283)">
        <ellipse cx="0" cy="160" rx="75" ry="10" fill="#243720" opacity=".45"/>
        <g transform="translate(-38)">
          <path d="M-22 58Q0 40 22 58l12 68q-34 18-68 0Z" fill="#fffaf0"/>
          <path d="M-13 124v35M9 124v35" stroke="#b88367" strokeWidth="8" strokeLinecap="round"/>
          <circle cy="30" r="17" fill="#c69275"/>
          <path d="M-17 26Q-20 5 0 10q22-5 17 18l-7 38Q5 43 0 42q-8 2-12 25Z" fill="#2e2018"/>
        </g>
        <g transform="translate(38)">
          <path d="M-27 58Q0 40 27 58l7 70q-34 15-68 0Z" fill="#fff"/>
          <path d="M-13 126v34M12 126v34" stroke="#171918" strokeWidth="11"/>
          <circle cy="30" r="17" fill="#b07e58"/>
          <path d="M-15 34Q0 52 15 34Q12 49 0 50-12 48-15 34" fill="#241a12"/>
          <path d="M-25 18Q0 5 25 18" stroke="#efe3c8" strokeWidth="12"/><path d="M-13 15Q-12-5 0-5t13 20" fill="#efe3c8"/>
          <g fill="none" stroke="#1c1c1e" strokeWidth="2"><circle cx="-7" cy="28" r="5"/><circle cx="7" cy="28" r="5"/><path d="M-2 28h4"/></g>
        </g>
        <g transform="translate(0 84)"><path d="M0 12v40M-9 12l6 40M9 12l-6 40" stroke="#47613f" strokeWidth="3"/><g fill="#fbf8ec"><circle cx="-10" cy="7" r="8"/><circle cx="10" cy="7" r="8"/><circle cy="0" r="9"/></g></g>
      </g>
    </svg>
  );
}

export default function Invitacion() {
  const [abierta, setAbierta] = useState(false);
  const [abriendo, setAbriendo] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const audio = useRef(null);
  const cuenta = useCountdown();

  useEffect(() => {
    if (!AUDIO_URL) return undefined;
    const reproductor = new Audio(AUDIO_URL);
    reproductor.loop = true;
    reproductor.preload = "auto";
    reproductor.volume = 0.55;
    audio.current = reproductor;
    return () => {
      reproductor.pause();
      reproductor.src = "";
    };
  }, []);

  useEffect(() => {
    const scroll = () => {
      const d = document.documentElement;
      setProgreso(d.scrollHeight > d.clientHeight ? d.scrollTop / (d.scrollHeight - d.clientHeight) : 0);
    };
    addEventListener("scroll", scroll, { passive: true });
    return () => removeEventListener("scroll", scroll);
  }, []);

  const abrir = () => {
    if (abriendo) return;
    setAbriendo(true);
    audio.current?.play().catch(() => {});
    setTimeout(() => setAbierta(true), 1250);
  };
  const musica = () => {
    const next = !muted;
    setMuted(next);
    if (audio.current) {
      audio.current.muted = next;
      if (!next) audio.current.play().catch(() => {});
    }
  };

  if (!abierta) return (
    <main className={`sobre ${abriendo ? "abriendo" : ""}`}>
      <p className="eyebrow">Tienes una invitación</p>
      <div className="orbita">
        <svg className="texto-circular" viewBox="0 0 300 300" aria-hidden="true">
          <defs>
            <path id="orbitaTexto" d="M150,150 m-118,0 a118,118 0 1,1 236,0 a118,118 0 1,1-236,0" />
          </defs>
          <text>
            <textPath href="#orbitaTexto" startOffset="1%">
              OSCAR &amp; LAURA · 28 · 11 · 2026 · EL ROSAL · CUNDINAMARCA ·
            </textPath>
          </text>
        </svg>
        <button className={`sello ${abriendo ? "romper" : ""}`} onClick={abrir} aria-label="Abrir invitación">
          <img src="./optimized/sello-medieval-ol.webp" alt="Sello medieval de Oscar y Laura" />
        </button>
      </div>
      <button className="abrir" onClick={abrir}>{abriendo ? "Abriendo…" : "Toca el sello para abrir"}</button>
    </main>
  );

  const mensaje = encodeURIComponent("¡Hola! Confirmo mi asistencia a la boda de Oscar y Laura — 28 de noviembre de 2026");
  const calendar = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+Oscar+%26+Laura&dates=20261128T200000Z/20261129T050000Z&details=Celebraci%C3%B3n+del+matrimonio+de+Oscar+y+Laura&location=Hacienda+Pilares+del+Rosal,+El+Rosal,+Cundinamarca,+Colombia";
  return (
    <main className="invitacion">
      <div className="progress" style={{ width: `${progreso * 100}%` }} />
      {AUDIO_URL && <button className="musica" onClick={musica} aria-label={muted ? "Activar música" : "Silenciar música"}>{muted ? "♪̸" : "♪"}</button>}
      <div className="hojas">{Array.from({ length: 10 }, (_, i) => <i key={i} style={{ left: `${(i * 11 + 4) % 100}%`, animationDelay: `${i * 1.8}s`, animationDuration: `${14 + i % 5 * 3}s` }} />)}</div>
      <div className="contenido">
        <header className="hero">
          <div className="portada-editorial">
            <img src="./optimized/foto-portada.webp" alt="Oscar y Laura mirándose" />
            <div className="portada-velo" aria-hidden="true"></div>
            <p className="portada-subtitulo"><i></i><span>Nuestra boda</span><i></i></p>
            <h1><span>Oscar</span><em>&amp;</em><span>Laura</span></h1>
          </div>
        </header>

        <Reveal>
          <section className="padres" aria-labelledby="titulo-padres">
            <div className="ornamento" aria-hidden="true"><span>❦</span></div>
            <p id="titulo-padres" className="bendicion">Con la bendición de nuestros padres…</p>
            <div className="familias">
              <article>
                <h2>Eliseo Riveros García</h2>
                <span>&amp;</span>
                <h2>Fabiola Rey Barbosa</h2>
              </article>
              <div className="separador-familias" aria-hidden="true"><i></i><b>O&L</b><i></i></div>
              <article>
                <h2>Eduardo León Gómez Corena</h2>
                <span>&amp;</span>
                <h2>Ruth Esperanza Peñaloza Beltrán</h2>
              </article>
            </div>
            <div className="ornamento inferior" aria-hidden="true"><span>❦</span></div>
          </section>
        </Reveal>

        <Reveal>
          <section id="historia" className="historia historia-foto">
            <div className="marco-retrato">
              <div className="esquina esquina-izq" aria-hidden="true">❧</div>
              <div className="esquina esquina-der" aria-hidden="true">❧</div>
              <img src="./optimized/foto-donde-comenzo.webp" alt="Oscar y Laura abrazados entre las montañas" />
            </div>
            <p className="cursiva historia-frase">Elegimos caminar juntos y queremos invitarte a celebrarlo:</p>
          </section>
        </Reveal>
        <Reveal><section className="card cuenta"><div className="fecha-contador"><small>Fecha</small><strong>Sábado, 28 de noviembre de 2026</strong><span>3:00 p. m.</span></div><p className="eyebrow">Cuenta regresiva</p><div>{Object.entries(cuenta).map(([k,v]) => <article key={k}><strong>{String(v).padStart(2,"0")}</strong><small>{k}</small></article>)}</div></section></Reveal>
        <Reveal><section className="card lugar-evento"><p className="eyebrow">Lugar</p><h2>Hacienda Pilares del Rosal</h2><p className="direccion">Km 3 - El Rosal, vía Subachoque.</p><p className="inicio">Inicio · 3:00 p. m.</p><div className="momentos"><article><span>⛪</span><b>Ceremonia</b></article><i></i><article><span>♬</span><b>Recepción</b></article></div><p>La ceremonia y la celebración se realizarán en el mismo lugar.</p><a className="boton-mapa" href="https://www.google.com/maps/search/?api=1&query=Hacienda+Pilares+del+Rosal%2C+El+Rosal%2C+Cundinamarca" target="_blank" rel="noreferrer">⌖ Ver ubicación en Google Maps</a></section></Reveal>
        <Reveal><section className="codigo-vestuario"><div className="marco-vestuario"><p className="titulo-script">Código de Vestimenta</p><div className="atuendos"><article><div className="medallon-icono"><svg viewBox="0 0 120 180" aria-hidden="true"><path d="M48 16l12 18 12-18 12 20-11 31 26 91c-24 18-54 18-78 0l26-91-11-31zM47 67c9 8 17 8 26 0M39 97c14 11 29 11 42 0"/></svg></div><h3>Damas</h3><p>Vestido largo<br/>formal</p></article><article><div className="medallon-icono"><svg viewBox="0 0 120 180" aria-hidden="true"><path d="M38 22l22-10 22 10 15 28-10 10-5 100H38L33 60 23 50zM48 20l12 18 12-18M60 38l-9 17 9 15 9-15zM42 68h12M66 68h12M48 160v-55M72 160v-55"/></svg></div><h3>Caballeros</h3><p>Traje formal<br/>con corbata</p></article></div><div className="colores-reservados"><span className="muestra blanco"></span><span className="muestra vinotinto"></span><strong>Te recomendamos no usar los colores<br/>blanco y vinotinto</strong></div><p className="nota-abrigo">El Rosal nos regalará una tarde hermosa y una noche fresca.<br/><b>Te sugerimos llevar abrigo.</b></p></div></section></Reveal>
        <Reveal><section className="seccion-versiculo"><img src="./optimized/foto-versiculo.webp" alt="Las manos de Oscar y Laura unidas, mostrando el anillo"/><div className="capa-versiculo"></div><div className="versiculo"><span>“</span><p>“Mejores son dos que uno, porque juntos reciben el fruto de su esfuerzo. Si uno cae, el otro lo levanta; si dos permanecen unidos, pueden darse calor. Uno solo puede ser vencido, pero dos pueden resistir. Y el cordón de tres dobleces no se rompe.”</p><cite>Eclesiastés 4:9–12</cite></div></section></Reveal>
        <Reveal><section className="card regalos"><div className="sobre-regalo" aria-hidden="true"><span>♥</span></div><p className="frase-regalo">Nuestro mejor regalo es tu presencia; pero si deseas hacernos un detalle, tendremos disponible una <strong>lluvia de sobres.</strong></p><div className="ornamento-regalo">❦</div></section></Reveal>
        <Reveal><section className="card rsvp"><h2>¿Nos acompañas?</h2><p className="mensaje-confirmacion">Para organizar cada detalle con el cuidado que este día merece, te pedimos confirmar tu asistencia a más tardar el <b>20 de octubre de 2026</b>.</p> <br></br> <p className="mensaje-confirmacion">Por favor indícanos si tienes alguna alergia o preferencia alimentaria (vegano / vegetariano) al confirmar tu asistencia.</p><div className="acciones"><a className="principal" href={`https://wa.me/573233252242?text=${mensaje}`} target="_blank" rel="noreferrer">Confirmar con Oscar</a><a className="principal" href={`https://wa.me/573134782033?text=${mensaje}`} target="_blank" rel="noreferrer">Confirmar con Laura</a><a href={calendar} target="_blank" rel="noreferrer">Guardar fecha</a></div></section></Reveal>
        <Reveal><section className="cierre-invitacion"><img src="./optimized/foto-cierre.webp" alt="Oscar y Laura mirándose entre muros de piedra"/><div className="cierre-velo"></div><div className="cierre-texto"><small>Nos vemos muy pronto</small><strong>Oscar <i>&amp;</i> Laura</strong><span>28 · 11 · 2026</span></div></section></Reveal>
        <footer><div>O&L</div><p>28 · 11 · 2026 — El Rosal</p></footer>
      </div>
    </main>
  );
}
