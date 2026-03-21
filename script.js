// Navigation Highlighting on Scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
  const scrollPosition = window.scrollY + 150;
  
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-target') === currentSection) {
      link.classList.add('active');
    }
  });
}

// Smooth scroll for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Floating Theme Toggle (Top Right Fixed)
const floatingThemeToggle = document.getElementById('floatingThemeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
}

// Theme toggle event listener
if (floatingThemeToggle) {
  floatingThemeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
}

// Add intersection observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply fade-in to sections and cards
document.querySelectorAll('.section, .project-card, .timeline-item, .capstone-card, .education-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', () => {
  updateActiveNav();
  
  // Set initial hero text
  const heroText = document.querySelector('.hero h2');
  if (heroText) {
    heroText.innerHTML = heroText.innerHTML;
  }
});

// Add hover effect for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Smooth reveal for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
});

// Resume Modal Functionality
const modal = document.getElementById('resumeModal');
const viewBtn = document.getElementById('viewResumeBtn');
const downloadBtn = document.getElementById('downloadResumeBtn');
const closeModal = document.querySelector('.close-modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const downloadFromModal = document.getElementById('downloadFromModal');

// Open modal with animation
if (viewBtn) {
  viewBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
}

// Close modal function
function closeModalFunction() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

if (closeModal) {
  closeModal.addEventListener('click', closeModalFunction);
}
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModalFunction);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModalFunction();
  }
});

// Download Resume as PDF (simulated - opens print dialog)
function downloadResume() {
  // Get resume content
  const resumeContent = document.querySelector('.resume-viewer').cloneNode(true);
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Abhishek Naik - Resume</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          color: #1a1a1a;
          background: white;
        }
        .resume-section {
          margin-bottom: 1.5rem;
        }
        h3 { 
          color: #6366f1; 
          margin-bottom: 0.25rem;
          font-size: 1.5rem;
        }
        h4 { 
          color: #333; 
          border-left: 3px solid #6366f1; 
          padding-left: 0.75rem; 
          margin: 1rem 0 0.75rem 0;
          font-size: 1.1rem;
        }
        .resume-title { 
          color: #6366f1;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        .resume-contact { 
          color: #666; 
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .resume-date { 
          color: #6366f1; 
          font-size: 0.7rem; 
          margin-left: 0.5rem;
          font-weight: normal;
        }
        .resume-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .resume-skills span {
          background: #f0f0f0;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          display: inline-block;
        }
        .resume-item {
          margin-bottom: 1rem;
        }
        .resume-item strong {
          display: block;
          margin-bottom: 0.25rem;
          color: #1a1a1a;
        }
        ul { 
          margin: 0.5rem 0 0 1.2rem; 
        }
        li { 
          margin-bottom: 0.3rem;
          font-size: 0.85rem;
          color: #4a4a4a;
        }
        @media print {
          body {
            padding: 0.5in;
          }
          .resume-skills span {
            background: #f0f0f0;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      ${resumeContent.outerHTML}
      <p style="text-align: center; margin-top: 2rem; color: #999; font-size: 0.7rem;">Generated from Abhishek Naik's Portfolio</p>
    </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.print();
}

// Download from both buttons
if (downloadBtn) {
  downloadBtn.addEventListener('click', downloadResume);
}
if (downloadFromModal) {
  downloadFromModal.addEventListener('click', downloadResume);
}

// Add hover effect for skill logo items
const skillLogos = document.querySelectorAll('.skill-logo-item');
skillLogos.forEach(logo => {
  logo.addEventListener('mouseenter', () => {
    logo.style.transform = 'translateY(-5px) scale(1.05)';
  });
  
  logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'translateY(0) scale(1)';
  });
});

// Add smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
