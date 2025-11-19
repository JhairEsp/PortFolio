// Particle Animation
const canvas = document.getElementById("particleCanvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles = []
const particleCount = 100

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 2 - 1
    this.speedY = Math.random() * 2 - 1
    this.color = `rgba(${139 + Math.random() * 100}, ${92 + Math.random() * 100}, ${246}, ${Math.random() * 0.5})`
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > canvas.width || this.x < 0) this.speedX *= -1
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  // Connect particles
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach((b) => {
      const dx = a.x - b.x
      const dy = a.y - b.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 150)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    })
  })

  requestAnimationFrame(animateParticles)
}

initParticles()
animateParticles()

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Navigation
const nav = document.getElementById("nav")
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }
})

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")

    navLinks.forEach((l) => l.classList.remove("active"))
    link.classList.add("active")
  })
})

// Typing Animation
const typingText = document.querySelector(".typing-text")
const texts = [
  "Ingeniero de Sistemas",
  "Analista de Sistemas",
  "Desarrollador Móvil",
  "Especialista en SAP",
  "Desarrollador Full Stack",
]
let textIndex = 0
let charIndex = 0
let isDeleting = false

function typeText() {
  const currentText = texts[textIndex]

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % texts.length
    typeSpeed = 500
  }

  setTimeout(typeText, typeSpeed)
}

typeText()

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")
    }
  })
}, observerOptions)

document.querySelectorAll("[data-aos]").forEach((el) => {
  observer.observe(el)
})

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// 3D Card Effect
const floatingCard = document.querySelector(".floating-card")

if (floatingCard) {
  document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window

    const xRotation = (clientY / innerHeight - 0.5) * 20
    const yRotation = (clientX / innerWidth - 0.5) * 20

    floatingCard.style.transform = `rotateX(${-xRotation}deg) rotateY(${yRotation}deg)`
  })
}

// Project Cards Hover Effect
const projectCards = document.querySelectorAll(".project-card")

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)"
  })
})

// Contact Form
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value

  // Simulate form submission
  console.log("Form submitted:", { name, email, message })

  // Show success message
  alert("¡Gracias por tu mensaje! Te contactaré pronto.")

  // Reset form
  contactForm.reset()
})

// Parallax Effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero-visual, .cube-container")

  parallaxElements.forEach((el) => {
    const speed = 0.5
    el.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Skill Bars Animation
const skillBars = document.querySelectorAll(".skill-bar")

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fillBar 1.5s ease-out forwards"
      }
    })
  },
  { threshold: 0.5 },
)

skillBars.forEach((bar) => {
  skillObserver.observe(bar)
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// Cursor Trail Effect (Desktop only)
if (window.innerWidth > 768) {
  const cursorTrail = []
  const trailLength = 20

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement("div")
    dot.style.position = "fixed"
    dot.style.width = "4px"
    dot.style.height = "4px"
    dot.style.borderRadius = "50%"
    dot.style.background = `rgba(139, 92, 246, ${1 - i / trailLength})`
    dot.style.pointerEvents = "none"
    dot.style.zIndex = "9999"
    dot.style.transition = "all 0.1s ease"
    document.body.appendChild(dot)
    cursorTrail.push(dot)
  }

  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  function animateCursorTrail() {
    let x = mouseX
    let y = mouseY

    cursorTrail.forEach((dot, index) => {
      const nextDot = cursorTrail[index + 1] || cursorTrail[0]

      dot.style.left = x + "px"
      dot.style.top = y + "px"

      x += (Number.parseInt(nextDot.style.left) - x) * 0.3
      y += (Number.parseInt(nextDot.style.top) - y) * 0.3
    })

    requestAnimationFrame(animateCursorTrail)
  }

  animateCursorTrail()
}

console.log("%c¡Hola! 👋", "font-size: 20px; color: #8b5cf6; font-weight: bold;")
console.log("%cGracias por visitar mi portafolio", "font-size: 14px; color: #a78bfa;")
console.log("%c¿Interesado en trabajar juntos? ¡Contáctame!", "font-size: 12px; color: #ec4899;")
