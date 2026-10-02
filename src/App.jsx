import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Menu, MoveUpRight, X } from 'lucide-react'
import './Cling.css'
import './ClingImages.css'

gsap.registerPlugin(ScrollTrigger)

const media = {
  hero: '/images/hero-banner.jpg',
  logoAnimation: '/images/abstract-art.jpg',
  productFilm: '/images/architecture.jpg',
  aiModel: '/images/circuitry.jpg',
  sscl: '/images/circuitry.jpg',
  mat: '/images/architecture.jpg',
  sunshine: '/images/workspace.jpg',
}

const services = [
  { name: 'App development', detail: 'Thoughtful mobile experiences, made for the way people actually move through the world.', image: media.productFilm },
  { name: 'Custom development', detail: 'Digital products and web platforms shaped around the way your business really works.', image: media.hero },
  { name: 'Website design', detail: 'Distinctive, made-from-scratch websites that give your business a more memorable way to show up.', image: media.hero },
  { name: 'ERP systems', detail: 'Connected front- and back-office applications that bring your business activities into better view.', image: media.sscl },
  { name: 'IT team for entrepreneurship', detail: 'A dedicated technology team with the expertise to help your next idea take shape.', image: media.mat },
  { name: 'Digital marketing', detail: 'Digital channels, search and social, thoughtfully put to work for your brand.', image: media.sunshine },
  { name: '3D animation', detail: 'From product visualization to architectural rendering, ideas brought to life in three dimensions.', image: media.logoAnimation },
  { name: 'AI / ML', detail: 'Intelligent systems using machine learning and language technologies to find new possibilities.', image: media.aiModel },
]

const locations = ['India', 'Saudi Arabia', 'South Africa', 'United States', 'Oman', 'Dubai (UAE)', 'Singapore', 'Ireland', 'Mauritius', 'Australia', 'United Kingdom', 'Spain']

const projects = [
  { name: 'SSCL Logistics ERP', type: 'Enterprise platform', image: media.sscl, style: 'project--sscl' },
  { name: 'MAT Commercial', type: 'Digital experience', image: media.mat, style: 'project--mat' },
  { name: 'Sunshine', type: 'Web and mobile', image: media.sunshine, style: 'project--sunshine' },
]

const testimonials = [
  { quote: 'Working with Cling Info Tech was a game-changer for our business. Their expertise and dedication helped us achieve remarkable results. I highly recommend them to anyone looking for top-notch service.', name: 'Praveen Shetty', role: 'Client' },
  { quote: "Cling Info Tech's professionalism and efficiency surpassed our expectations, understanding our needs exceptionally well. Rarely do we find such a reliable partner in today's market. Their dedication sets them apart.", name: 'Swatee Agrawal', role: 'Founder, Piaah.com' },
]

const milestones = [
  { year: '2019', title: 'A foundation takes shape', text: 'A year of foundational growth and learning, focused on building a strong foundation and establishing an identity.' },
  { year: '2020', title: 'Growing with intention', text: 'Solidifying a presence, diversifying services, and staying committed to quality and customer satisfaction.' },
  { year: '2021', title: 'Momentum, earned', text: 'A growing client base and new technologies and methodologies brought fresh momentum.' },
  { year: '2022', title: 'Ready for more', text: 'A milestone year: a more mature organization, taking on ambitious projects and delivering greater value.' },
]

function ArrowLink({ children, href = '#contact', className = '' }) {
  return <a className={`arrow-link ${className}`} href={href}><span>{children}</span><span className="arrow-link__icon" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.5} /></span></a>
}

function App() {
  const [activeService, setActiveService] = useState(0)
  const [activeLocation, setActiveLocation] = useState('India')
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const smoothScroll = !reducedMotion && window.matchMedia('(min-width: 900px)').matches ? new Lenis({ duration: 1.15, smoothWheel: true }) : null
    let frameId

    if (smoothScroll) {
      const update = (time) => { smoothScroll.raf(time); frameId = requestAnimationFrame(update) }
      frameId = requestAnimationFrame(update)
      smoothScroll.on('scroll', ScrollTrigger.update)
      gsap.ticker.lagSmoothing(0)
    }

    if (!reducedMotion) {
      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 38, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } })
      })

      gsap.utils.toArray('.project__image, .tech-card__visual, .service-detail__image').forEach((element) => {
        gsap.fromTo(element, { clipPath: 'inset(9% 0 9% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 90%', once: true } })
      })

      gsap.utils.toArray('[data-count]').forEach((element) => {
        const counter = { value: 0 }
        gsap.to(counter, {
          value: Number(element.dataset.count), duration: 2.1, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
          onUpdate: () => { element.textContent = Math.round(counter.value).toLocaleString('en-US') },
        })
      })

      gsap.fromTo('.marquee__track', { xPercent: 0 }, { xPercent: -30, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 1.2 } })

      const mediaQuery = gsap.matchMedia()
      mediaQuery.add('(min-width: 900px)', () => {
        const track = document.querySelector('.story-track')
        const section = document.querySelector('.story-scroll')
        if (!track || !section) return undefined
        const distance = () => Math.max(0, track.scrollWidth - section.clientWidth)
        gsap.to(track, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: { trigger: section, pin: true, scrub: 1, start: 'top top', end: () => `+=${distance()}`, invalidateOnRefresh: true },
        })
      })
    }

    let moveCursor
    if (cursorRef.current && window.matchMedia('(pointer: fine)').matches && !reducedMotion) {
      const cursorX = gsap.quickTo(cursorRef.current, 'x', { duration: 0.3, ease: 'power3' })
      const cursorY = gsap.quickTo(cursorRef.current, 'y', { duration: 0.3, ease: 'power3' })
      moveCursor = (event) => { cursorX(event.clientX); cursorY(event.clientY) }
      window.addEventListener('pointermove', moveCursor)
    }

    return () => {
      if (moveCursor) window.removeEventListener('pointermove', moveCursor)
      cancelAnimationFrame(frameId)
      smoothScroll?.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleHeroMove = (event) => {
    if (!heroRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = heroRef.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    heroRef.current.style.setProperty('--tilt-x', `${y * -4}deg`)
    heroRef.current.style.setProperty('--tilt-y', `${x * 5}deg`)
  }
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="cursor-orb" ref={cursorRef} aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Cling Infotech home" onClick={closeMenu}>cling<span className="wordmark__dot">.</span><span className="wordmark__sub">infotech</span></a>
        <nav className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Selected work</a><a href="#services" onClick={closeMenu}>What we do</a><a href="#story" onClick={closeMenu}>Our story</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="header-cta" href="mailto:info@clinginfotech.com"><span>Start a project</span><MoveUpRight size={15} strokeWidth={1.5} aria-hidden="true" /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      <main id="top">
        <section className="hero section-pad" ref={heroRef} onPointerMove={handleHeroMove} onPointerLeave={() => { heroRef.current?.style.setProperty('--tilt-x', '0deg'); heroRef.current?.style.setProperty('--tilt-y', '0deg') }}>
          <div className="hero__topline"><span>Independent digital studio</span><span>Noida · Pune · Moradabad</span></div>
          <div className="hero__heading-wrap">
            <p className="eyebrow hero__eyebrow reveal"><span className="eyebrow__line" /> Ideas deserve to happen.</p>
            <h1 className="hero__title"><span className="hero__title-line">Making your</span><span className="hero__title-line hero__title-line--indent"><em>ideas</em> happen<span className="hero__period">.</span></span></h1>
            <p className="hero__copy reveal">Creative thinking meets considered technology. We build digital experiences, products and platforms for what comes next.</p>
            <a className="round-link hero__scroll" href="#intro" aria-label="Scroll to explore"><ArrowDown size={18} strokeWidth={1.4} /></a>
          </div>
          <div className="hero__visual" aria-hidden="true"><div className="hero__image-frame"><img src={media.hero} alt="" fetchPriority="high" /></div><div className="hero__stamp"><span>Good ideas</span><span>go places</span><span className="hero__stamp-arrow">↗</span></div><p className="hero__image-caption"><span>01 / 04</span><span>Made together, made to matter.</span></p></div>
          <div className="hero__bottomline"><span>Digital experiences · Thoughtfully engineered</span><span>Scroll to explore <ArrowDown size={12} /></span></div>
        </section>

        <section className="intro section-pad" id="intro">
          <div className="intro__side reveal"><span className="eyebrow"><span className="eyebrow__line" /> A little about us</span><span className="intro__index">01 — 06</span></div>
          <div className="intro__content reveal"><h2>We make the <em>complex</em> feel beautifully clear.</h2><p>From websites and mobile apps to ERPs, AI and 3D animation, we bring technology and imagination together to help good ideas become real.</p><ArrowLink href="#services">Get to know what we do</ArrowLink></div>
          <div className="intro__aside reveal"><div className="intro__image"><img src="/images/creative-process.jpg" alt="Paintbrushes and color, a small glimpse of the creative process" loading="lazy" /><span>Ideas take shape</span></div><div className="intro__aside-note"><span className="intro__asterisk" aria-hidden="true">✳</span><span>Curiosity first.<br />Craft all the way through.</span></div></div>
        </section>

        <section className="numbers section-pad" aria-label="Cling Infotech at a glance">
          <div className="numbers__intro reveal"><span className="eyebrow"><span className="eyebrow__line" /> A few things we know</span><p>Built through long partnerships, thoughtful work and one more cup of coffee.</p></div>
          <div className="numbers__grid">
            <div className="number reveal"><span className="number__value"><span data-count="350">0</span><sup>+</sup></span><span className="number__label">Happy clients</span></div>
            <div className="number reveal"><span className="number__value"><span data-count="390">0</span><sup>+</sup></span><span className="number__label">Projects completed</span></div>
            <div className="number reveal"><span className="number__value number__value--code"><span data-count="32387122">0</span></span><span className="number__label">Lines of code</span></div>
            <div className="number reveal"><span className="number__value"><span data-count="1500">0</span><sup>+</sup></span><span className="number__label">Coffees with clients</span></div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true"><div className="marquee__track"><span>Thoughtful by design <i>✳</i> Technology with intention <i>✳</i> Ideas into reality <i>✳</i> </span><span>Thoughtful by design <i>✳</i> Technology with intention <i>✳</i> Ideas into reality <i>✳</i> </span></div></div>

        <section className="work section-pad" id="work">
          <div className="section-heading reveal"><div><span className="eyebrow"><span className="eyebrow__line" /> A few things we have made</span><h2>Good work, <em>in good company.</em></h2></div><ArrowLink href="https://clinginfotech.com/portfolio">Explore all work</ArrowLink></div>
          <div className="work__grid">{projects.map((project, index) => <a className={`project ${project.style} reveal`} href="https://clinginfotech.com/portfolio" key={project.name} aria-label={`${project.name}, view portfolio`}><div className="project__image"><img src={project.image} alt="" aria-hidden="true" loading="lazy" /><span className="project__number">0{index + 1}</span><span className="project__arrow"><ArrowUpRight size={18} strokeWidth={1.5} /></span></div><div className="project__meta"><div><h3>{project.name}</h3><span>{project.type}</span></div><span className="project__index">CLING / WORK</span></div></a>)}</div>
          <div className="work__footnote"><span>Photography is illustrative; names link to Cling's published portfolio</span><span>People first. Always.</span></div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-heading section-heading--services reveal"><div><span className="eyebrow"><span className="eyebrow__line" /> The ways we can help</span><h2>Many disciplines.<br /><em>One thoughtful team.</em></h2></div><p>From the first sketch to the final line of code, we build the right team around the work.</p></div>
          <div className="services__layout"><div className="services__list" role="list" aria-label="Services">{services.map((service, index) => <button className={`service-row${activeService === index ? ' service-row--active' : ''}`} type="button" key={service.name} onMouseEnter={() => setActiveService(index)} onFocus={() => setActiveService(index)} onClick={() => setActiveService(index)} aria-pressed={activeService === index}><span className="service-row__number">0{index + 1}</span><span className="service-row__name">{service.name}</span><span className="service-row__arrow"><ArrowUpRight size={16} strokeWidth={1.5} /></span></button>)}</div>
            <div className="service-detail" key={services[activeService].name}><div className="service-detail__image"><img src={services[activeService].image} alt="" loading="lazy" /><span className="service-detail__counter">0{activeService + 1} / 08</span></div><div className="service-detail__copy"><span className="eyebrow">{services[activeService].name}</span><p>{services[activeService].detail}</p><ArrowLink href="https://clinginfotech.com/services">Explore services</ArrowLink></div></div>
          </div>
        </section>

        <section className="story section-pad" id="story"><div className="story__heading"><span className="eyebrow"><span className="eyebrow__line" /> A journey as dynamic as us</span><p>Scroll through the years <ArrowRight size={15} /></p></div><div className="story-scroll"><div className="story-track"><article className="story-panel story-panel--intro"><span className="story-panel__index">THE CLING STORY</span><h2>A little at a time.<br /><em>A lot together.</em></h2><span className="story-panel__note">Our story so far <ArrowDownRight size={15} /></span></article>{milestones.map((milestone, index) => <article className={`story-panel story-panel--${index + 1}`} key={milestone.year}><span className="story-panel__year">{milestone.year}</span><span className="story-panel__tick" /><h3>{milestone.title}</h3><p>{milestone.text}</p><span className="story-panel__index">CLING / {milestone.year}</span></article>)}<article className="story-panel story-panel--end"><span className="story-panel__index">STILL IN THE MAKING</span><h2>Next up?<br /><em>Let's find out.</em></h2><ArrowLink>Make something together</ArrowLink></article></div></div><div className="story__progress" aria-hidden="true"><span /></div></section>

        <section className="tech section-pad" id="technology"><div className="section-heading reveal"><div><span className="eyebrow"><span className="eyebrow__line" /> An eye on what is next</span><h2>Technology, with <em>imagination.</em></h2></div><p>New tools open new doors. We are exploring the ones with something meaningful on the other side.</p></div><div className="tech__grid">
          <a className="tech-card tech-card--ai reveal" href="https://clinginfotech.com/ai"><div className="tech-card__visual"><img src={media.aiModel} alt="Circuit board components" loading="lazy" /><span className="tech-card__play"><ArrowUpRight size={20} /></span><span className="tech-card__label">Machine learning / 01</span></div><div className="tech-card__meta"><div><span>AI / ML</span><h3>A closer look at the signal.</h3><p>The surveillance model identifies suspicious activity in video.</p></div><ArrowUpRight size={19} /></div></a>
          <a className="tech-card tech-card--3d reveal" href="https://clinginfotech.com/video3d"><div className="tech-card__visual"><img src={media.logoAnimation} alt="Abstract fluid artwork" loading="lazy" /><span className="tech-card__play"><ArrowUpRight size={20} /></span><span className="tech-card__label">3D animation / 02</span></div><div className="tech-card__meta"><div><span>3D ANIMATION</span><h3>Made to move you.</h3><p>Cling logo animation.</p></div><ArrowUpRight size={19} /></div></a>
          <a className="tech-card tech-card--film reveal" href="https://clinginfotech.com/video3d"><div className="tech-card__visual"><img src={media.productFilm} alt="Cling advertisement video, 3D preview" loading="lazy" /><span className="tech-card__play"><ArrowUpRight size={20} /></span><span className="tech-card__label">Product film / 03</span></div><div className="tech-card__meta"><div><span>3D ANIMATION</span><h3>Tell it visually.</h3><p>Advertisement video.</p></div><ArrowUpRight size={19} /></div></a>
        </div></section>

        <section className="global section-pad" id="presence"><div className="global__top reveal"><span className="eyebrow"><span className="eyebrow__line" /> Good people, everywhere</span><span className="global__count">12 <i>MARKETS</i></span></div><div className="global__body"><div className="global__copy reveal"><h2>Rooted here.<br /><em>Open to everywhere.</em></h2><p>Our global presence reaches across diverse markets and cultures.</p><span className="global__selected"><span className="global__live-dot" /> Currently exploring <b>{activeLocation}</b></span></div><div className="globe reveal" aria-label={`Global presence, currently highlighting ${activeLocation}`}><div className="globe__sphere"><span className="globe__latitude globe__latitude--one" /><span className="globe__latitude globe__latitude--two" /><span className="globe__longitude globe__longitude--one" /><span className="globe__longitude globe__longitude--two" /><span className="globe__pin globe__pin--india" /><span className="globe__pin globe__pin--gulf" /><span className="globe__pin globe__pin--europe" /><span className="globe__pin globe__pin--africa" /><span className="globe__pin globe__pin--asia" /><span className="globe__pin globe__pin--america" /><span className="globe__pin globe__pin--australia" /></div><span className="globe__caption">21° 08' N &nbsp; 79° 05' E</span></div><div className="global__places">{locations.map((location, index) => <button type="button" className={activeLocation === location ? 'place place--active' : 'place'} key={location} onClick={() => setActiveLocation(location)} aria-pressed={activeLocation === location}><span>{location}</span><sup>{String(index + 1).padStart(2, '0')}</sup></button>)}</div></div></section>

        <section className="testimonials section-pad" id="testimonials"><div className="testimonials__heading reveal"><span className="eyebrow"><span className="eyebrow__line" /> The kind words matter</span><span className="testimonials__count">0{activeTestimonial + 1} <i>/ 0{testimonials.length}</i></span></div><div className="testimonials__body" aria-live="polite" aria-atomic="true"><span className="quote-mark" aria-hidden="true">“</span><blockquote key={activeTestimonial} className="reveal">{testimonials[activeTestimonial].quote}</blockquote><div className="testimonials__footer"><div><span className="testimonials__name">{testimonials[activeTestimonial].name}</span><span className="testimonials__role">{testimonials[activeTestimonial].role}</span></div><div className="testimonials__controls"><button type="button" aria-label="Previous testimonial" onClick={() => setActiveTestimonial((activeTestimonial + testimonials.length - 1) % testimonials.length)}><ArrowRight className="testimonials__prev" size={18} /></button><button type="button" aria-label="Next testimonial" onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}><ArrowRight size={18} /></button></div></div></div></section>

        <section className="cta section-pad" id="contact"><div className="cta__topline"><span className="eyebrow"><span className="eyebrow__line" /> The next good thing starts somewhere</span><span>YOUR IDEA / OUR NEXT CONVERSATION</span></div><h2 className="cta__title">Have a good<br /><em>feeling</em> about it<span className="hero__period">?</span></h2><div className="cta__bottom"><p>Tell us what you are thinking.<br />We would love to hear about it.</p><a className="cta__button magnetic" href="mailto:info@clinginfotech.com"><span>Let's talk about it</span><ArrowUpRight size={19} strokeWidth={1.5} /></a><span className="cta__email">Or write us at<br /><a href="mailto:info@clinginfotech.com">info@clinginfotech.com</a></span></div><span className="cta__orbit" aria-hidden="true">✳</span></section>
      </main>

      <footer className="footer section-pad"><div className="footer__top"><a className="wordmark wordmark--footer" href="#top">cling<span className="wordmark__dot">.</span><span className="wordmark__sub">infotech</span></a><p>Making your ideas happen.<br />With care, all the way through.</p><a className="footer__back" href="#top">Back to top <ArrowUpRight size={15} /></a></div><div className="footer__details"><div><span className="eyebrow">Find us</span><p>Head office<br />130, 131, 132, 2nd Floor, Wave Galleria,<br />Wave City, NH-24, Noida, Uttar Pradesh 201015</p></div><div><span className="eyebrow">Say hello</span><a href="tel:+918264469132">+91 82644 69132</a><a href="mailto:info@clinginfotech.com">info@clinginfotech.com</a></div><div><span className="eyebrow">Follow along</span><a href="https://www.instagram.com/clinginfotechworks/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/company/cling-multi-solutions-pvt-ltd/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a></div><div><span className="eyebrow">Around the web</span><a href="https://clinginfotech.com/services">Services</a><a href="https://clinginfotech.com/portfolio">Portfolio</a><a href="https://clinginfotech.com/team">Our team</a></div></div><div className="footer__bottom"><span>© {new Date().getFullYear()} Cling Info Tech Works Private Limited</span><span>Made with care in India <i>✳</i></span><a href="https://clinginfotech.com/privacy">Privacy</a></div></footer>
    </>
  )
}

export default App
