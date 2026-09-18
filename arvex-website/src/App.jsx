import { useEffect, useState } from "react";
import "./App.css";

const benefits = [
  ["01", "Wholesale + Retail", "A dependable kit for every kind of player."],
  ["02", "Pan-India Delivery", "From our workshop to your crease."],
  ["03", "Quality Focused", "Built for repeat sessions, not shelf time."],
  ["04", "Bulk Orders", "Team, academy and retailer-ready supply."],
];

const productImages = {
  workshop: "/assets/products/arvex-workshop.jpg",
  ball: "/assets/products/arvex-ball-closeup.jpg",
  singleBall: "/assets/products/arvex-single-ball.png",
};

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateProgress = () => {
      animationFrame = 0;
      if (reducedMotion.matches) {
        setProgress(0);
        return;
      }
      const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress(Math.min(window.scrollY / scrollableHeight, 1));
    };
    const handleScroll = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateProgress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    reducedMotion.addEventListener("change", updateProgress);
    updateProgress();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      reducedMotion.removeEventListener("change", updateProgress);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return progress;
}

function useReveal() {
  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Logo() {
  return <a className="logo" href="#home" aria-label="ARVEX Sports home">ARV<span>EX</span><small>PLAY BEYOND LIMITS</small></a>;
}

function CricketBall({ progress }) {
  const ballX = Math.sin(progress * Math.PI * 1.45) * 11;
  const ballY = 8 + progress * 76;
  const ballRotation = progress * 1040;
  return (
    <div className="ball-route" aria-hidden="true">
      <svg className="trajectory-line" style={{ strokeDashoffset: `${progress * -36}` }} viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M86 8 C47 21, 94 43, 49 56 S62 83, 23 94" /></svg>
      <div className="scroll-ball" style={{ transform: `translate3d(${ballX}vw, ${ballY}vh, 0) rotate(${ballRotation}deg)` }}>
        <img className="scroll-ball-photo" src={productImages.singleBall} alt="" />
      </div>
      <span className="route-label route-label-start">THE LINE</span>
      <span className="route-label route-label-end">YOUR CREASE</span>
    </div>
  );
}

function ProductCard({ type, number, title, description, progress }) {
  const productPhoto = type === "bat" ? productImages.workshop : productImages.ball;

  return (
    <article className={`product-card product-card-${type}`} style={{ "--parallax": `${Math.sin(progress * Math.PI * (type === "bat" ? 1.2 : 1.8)) * 8}px` }} data-reveal>
      <div className="product-visual">
        <span className="product-number">{number}</span><span className="product-kicker">ARVEX / FIELD SERIES</span>
        <img className={`product-photo product-photo-${type}`} src={productPhoto} loading="lazy" decoding="async" alt={type === "bat" ? "ARVEX cricket bats in a handcrafted workshop" : "ARVEX red leather cricket ball close-up"} />
        <span className="visual-caption">MADE TO BE PLAYED</span>
      </div>
      <div className="product-copy">
        <div><span className="product-type">{type === "bat" ? "BAT / 01" : "BALL / 02"}</span><h3>{title}</h3></div>
        <p>{description}</p>
        <a className="text-link" href="#contact">View collection <span>↗</span></a>
      </div>
    </article>
  );
}

function App() {
  const scrollProgress = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app" style={{ "--scroll-progress": scrollProgress, "--shine-position": `${Math.round(scrollProgress * 140 - 20)}%`, "--shine-opacity": Math.max(0, 1 - Math.abs(scrollProgress - 0.72) / 0.14) }}>
      <CricketBall progress={scrollProgress} />
      <div className="announcement"><span>ARVEX SPORTS / 2026 FIELD NOTES</span><span>QUALITY CRICKET EQUIPMENT</span><span>DELIVERY ACROSS INDIA</span></div>
      <header className="navbar">
        <Logo />
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
          <a href="#home" onClick={closeMenu}>Home</a><a href="#products" onClick={closeMenu}>Products</a><a href="#wholesale" onClick={closeMenu}>Wholesale</a><a href="#about" onClick={closeMenu}>About Us</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <div className="nav-meta">IND / <span>LIVE</span></div>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((isOpen) => !isOpen)}><span /><span /></button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid">
            <div className="hero-copy" data-reveal><p className="eyebrow"><span>01</span> ARVEX SPORTS</p><h1><span>BUILT FOR</span><strong>EVERY</strong><em>INNINGS.</em></h1><p className="hero-description">Premium cricket bats and balls for players, academies, retailers and teams.</p><div className="hero-actions"><a className="button button-lime" href="#products">SHOP RETAIL <span>↗</span></a><a className="button button-quiet" href="#wholesale">WHOLESALE ENQUIRY <span>↗</span></a></div></div>
            <div className="hero-stage" data-reveal><img className="hero-workshop-image" src={productImages.workshop} fetchPriority="high" decoding="async" alt="ARVEX cricket bats and red cricket balls in a handcrafted workshop" /><div className="hero-image-overlay" /><div className="stage-grid" /><div className="stage-stamp">FIELD<br />TESTED</div><div className="stage-spec stage-spec-top"><span>01 / 04</span><b>HANDCRAFTED EQUIPMENT</b></div><div className="stage-spec stage-spec-bottom"><span>ARVEX</span><b>BUILT FOR EVERY INNINGS</b></div></div>
          </div>
          <div className="hero-foot"><span>SCROLL TO FOLLOW THE PLAY</span><span>BUILT FOR EVERY INNINGS <b>↓</b></span></div>
        </section>

        <section className="benefits" aria-label="ARVEX advantages">{benefits.map(([number, title, copy]) => <div className="benefit" key={number} data-reveal><span className="benefit-number">{number}</span><div><h2>{title}</h2><p>{copy}</p></div></div>)}</section>

        <section className="products-section" id="products">
          <div className="section-intro" data-reveal><p className="eyebrow"><span>02</span> THE FIELD KIT</p><div className="section-intro-row"><h2>GEAR WITH<br /><span>A POINT OF VIEW.</span></h2><p>From first net to final over, find the pieces that make your game feel like yours.</p></div></div>
          <div className="product-grid"><ProductCard progress={scrollProgress} type="bat" number="01" title="Cricket Bats" description="Balanced power, clean pickup and a profile made for confident shots." /><ProductCard progress={scrollProgress} type="ball" number="02" title="Cricket Balls" description="Reliable shape and seam for practice, match day and everything between." /></div>
        </section>

        <section className="wholesale-section" id="wholesale"><div className="wholesale-copy" data-reveal><p className="eyebrow"><span>03</span> FOR THE WHOLE TEAM</p><h2>MAKE ROOM<br /><span>FOR MORE PLAY.</span></h2><p>Equip your academy, club, store or team with a partner who understands the pace of the game.</p><a className="button button-dark" href="#contact">Start a conversation <span>↗</span></a></div><div className="order-panel" data-reveal><span className="panel-label">ARVEX / ORDER DESK</span><strong>PLAYERS<br /><i>IN.</i></strong><div className="panel-lines"><span>RETAILERS</span><span>ACADEMIES</span><span>TEAMS</span></div><span className="panel-mark">A / 03</span></div></section>

        <section className="about-section" id="about"><div className="about-heading" data-reveal><p className="eyebrow"><span>04</span> ABOUT ARVEX</p><h2>THE GAME<br /><span>GOES ON.</span></h2></div><div className="about-copy" data-reveal><p className="about-lede">ARVEX is an independent cricket equipment brand for the long sessions, the sharp singles and the next generation of players.</p><p>We keep the focus where it belongs: dependable equipment, honest service and more reasons to get back on the field across India.</p><a className="text-link" href="#contact">Meet the brand <span>↗</span></a></div></section>
      </main>

      <footer id="contact"><div className="footer-top"><div><Logo /><p>Cricket equipment for the way you play.</p></div><div className="contact-methods" aria-label="Contact details"><a className="footer-cta" href="tel:+918630864005"><span className="contact-label">Phone</span> +91 8630864005 <span>↗</span></a><a className="footer-cta" href="mailto:mittalbrothers2026@gmail.com"><span className="contact-label">Email</span> mittalbrothers2026@gmail.com <span>↗</span></a></div></div><div className="footer-bottom"><span>© 2026 ARVEX SPORTS</span><span>MADE FOR EVERY INNINGS.</span><span>INDIA / 28.6139° N</span></div></footer>
    </div>
  );
}

export default App;