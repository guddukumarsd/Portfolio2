// ===== Dark Mode Toggle =====
const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.innerHTML = document.body.classList.contains("dark")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// ===== Typing Effect with Blinking Cursor =====
const typingElement = document.getElementById("typing");
const texts = [
  "Aspiring Full Stack Developer",
  "MERN Stack Enthusiast",
  "Java & Spring Boot Developer",
  "Problem Solver | Tech Learner",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

typingElement.innerHTML =
  '<span id="text"></span><span class="cursor">|</span>';
const textSpan = document.getElementById("text");

function typeEffect() {
  const currentText = texts[textIndex];
  textSpan.textContent = currentText.slice(0, charIndex);

  if (isDeleting) {
    charIndex--;
    if (charIndex <= 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  } else {
    charIndex++;
    if (charIndex >= currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}
document.addEventListener("DOMContentLoaded", typeEffect);

// Blinking cursor style
const style = document.createElement("style");
style.innerHTML = `
  .cursor {
    display: inline-block;
    color: inherit;
    animation: blink 0.7s step-end infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }
`;
document.head.appendChild(style);

// ===== Back to Top Button =====
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 200 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Initialize EmailJS =====
document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("P85yeqkFHOMCMYBBW"); // replace with your EmailJS public key
});

// ===== Contact Form Handler =====
const form = document.getElementById("contact-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = form.querySelector("button");
  const userName = form.user_name.value;

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  try {
    // Send form fields to EmailJS template
    await emailjs.sendForm("service_info", "template_kftmv6d", form);

    Swal.fire({
      icon: "success",
      title: `Hi ${userName}!`,
      text: "Your message has been sent successfully.",
      timer: 3000,
      showConfirmButton: false,
    });

    form.reset();
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: `Oops, ${userName}!`,
      text: "Failed to send your message. Please try again.",
      timer: 3000,
      showConfirmButton: false,
    });
  } finally {
    btn.disabled = false;
    btn.textContent = "Send Message";
  }
});
