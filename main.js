/* ============================================================
   PUTRI MAHARANI — PORTFOLIO JAVASCRIPT
   Implementasi DOM Manipulation:
   1. Toggle hamburger menu (mobile)
   2. Navbar scroll state
   3. Animated counter (stats)
   4. Marquee auto-play
   5. Tab switcher (About page)
   6. Project filter (Projects page)
   7. Skill bar animation (Skills page)
   8. Form validation & success state (Contact page)
   9. Character counter (Contact form)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================
     1. HAMBURGER MENU TOGGLE
     DOM: classList.toggle, event listener
  ========================================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Tutup menu kalau klik salah satu link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ==========================================
     2. NAVBAR SCROLL STATE
     DOM: classList.add/remove berdasarkan scroll
  ========================================== */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ==========================================
     3. ANIMATED COUNTER (Home — Stats)
     DOM: textContent diubah bertahap dengan setInterval
  ========================================== */
  const statNums = document.querySelectorAll('.stat-num');

  if (statNums.length > 0) {
    const observerCounter = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const dur    = 1200;
          const step   = Math.ceil(dur / target);
          let current  = 0;

          const timer = setInterval(function () {
            current++;
            el.textContent = current;
            if (current >= target) {
              el.textContent = target;
              clearInterval(timer);
            }
          }, step);

          observerCounter.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(function (el) {
      observerCounter.observe(el);
    });
  }

  /* ==========================================
     4. TAB SWITCHER (About page)
     DOM: classList.add/remove 'hidden', classList.toggle 'active'
  ========================================== */
  const tabBtns     = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabBtns.length > 0) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.getAttribute('data-tab');

        // Update tombol aktif
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Tampilkan konten yang sesuai
        tabContents.forEach(function (content) {
          if (content.id === 'tab-' + target) {
            content.classList.remove('hidden');
          } else {
            content.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ==========================================
     5. PROJECT FILTER (Projects page)
     DOM: classList.toggle 'hidden-card' berdasarkan data-category
  ========================================== */
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('.project-card');
  const noResult      = document.getElementById('no-result');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');

        // Update tombol aktif
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        let visibleCount = 0;

        projectCards.forEach(function (card) {
          const categories = card.getAttribute('data-category') || '';

          if (filter === 'all' || categories.includes(filter)) {
            card.classList.remove('hidden-card');
            visibleCount++;
          } else {
            card.classList.add('hidden-card');
          }
        });

        // Tampilkan pesan kalau tidak ada hasil
        if (noResult) {
          if (visibleCount === 0) {
            noResult.classList.remove('hidden');
          } else {
            noResult.classList.add('hidden');
          }
        }
      });
    });
  }

  /* ==========================================
     6. SKILL BAR ANIMATION (Skills page)
     DOM: style.width diubah ketika elemen masuk viewport
  ========================================== */
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  function animateBars() {
    skillBars.forEach(function (bar) {
      const width = bar.getAttribute('data-width') + '%';
      bar.style.width = width;
    });
  }

  if (skillBars.length > 0) {
    const observerBars = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateBars();
          observerBars.disconnect();
        }
      });
    }, { threshold: 0.2 });

    observerBars.observe(skillBars[0].closest('.skills-grid') || document.body);

    // Tombol "Animasikan Ulang"
    const toggleBarsBtn = document.getElementById('toggle-bars');
    if (toggleBarsBtn) {
      toggleBarsBtn.addEventListener('click', function () {
        // Reset dulu ke 0
        skillBars.forEach(function (bar) { bar.style.width = '0%'; });

        // Sedikit delay biar transisi keliatan
        setTimeout(animateBars, 100);
      });
    }
  }

  /* ==========================================
     7. FORM VALIDATION + SUCCESS STATE (Contact page)
     DOM: createElement, textContent, classList, appendChild
  ========================================== */
  const submitBtn      = document.getElementById('submit-btn');
  const formBlock      = document.getElementById('contact-form-block');
  const formSuccess    = document.getElementById('form-success');
  const sendAgainBtn   = document.getElementById('send-again');

  if (submitBtn && formBlock) {

    // Helper: tampilkan error
    function showError(fieldId, errId, msg) {
      const field = document.getElementById(fieldId);
      const err   = document.getElementById(errId);
      if (field && err) {
        field.classList.add('error');
        err.textContent = msg;
      }
    }

    // Helper: hapus error
    function clearError(fieldId, errId) {
      const field = document.getElementById(fieldId);
      const err   = document.getElementById(errId);
      if (field && err) {
        field.classList.remove('error');
        err.textContent = '';
      }
    }

    // Bersihkan error saat user mulai ketik
    ['name','email','subject','message'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', function () {
          clearError(id, 'err-' + id);
        });
      }
    });

    submitBtn.addEventListener('click', function () {
      let valid = true;

      const name    = document.getElementById('name');
      const email   = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      // Validasi Nama
      if (!name || name.value.trim() === '') {
        showError('name', 'err-name', 'Nama tidak boleh kosong.');
        valid = false;
      }

      // Validasi Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || email.value.trim() === '') {
        showError('email', 'err-email', 'Email tidak boleh kosong.');
        valid = false;
      } else if (!emailRegex.test(email.value.trim())) {
        showError('email', 'err-email', 'Format email tidak valid.');
        valid = false;
      }

      // Validasi Subjek
      if (!subject || subject.value.trim() === '') {
        showError('subject', 'err-subject', 'Subjek tidak boleh kosong.');
        valid = false;
      }

      // Validasi Pesan
      if (!message || message.value.trim() === '') {
        showError('message', 'err-message', 'Pesan tidak boleh kosong.');
        valid = false;
      } else if (message.value.trim().length < 10) {
        showError('message', 'err-message', 'Pesan minimal 10 karakter.');
        valid = false;
      }

      // Kalau valid, tampilkan success state
      if (valid) {
        formBlock.classList.add('hidden');
        if (formSuccess) formSuccess.classList.remove('hidden');
      }
    });

    // Kirim pesan lagi — reset form
    if (sendAgainBtn) {
      sendAgainBtn.addEventListener('click', function () {
        ['name','email','subject','message'].forEach(function (id) {
          const el = document.getElementById(id);
          if (el) { el.value = ''; }
          clearError(id, 'err-' + id);
        });
        const charNum = document.getElementById('char-num');
        if (charNum) charNum.textContent = '0';

        formSuccess.classList.add('hidden');
        formBlock.classList.remove('hidden');
      });
    }
  }

  /* ==========================================
     8. CHARACTER COUNTER (Contact — textarea)
     DOM: textContent diupdate setiap input event
  ========================================== */
  const messageTextarea = document.getElementById('message');
  const charNum         = document.getElementById('char-num');

  if (messageTextarea && charNum) {
    messageTextarea.addEventListener('input', function () {
      const len = messageTextarea.value.length;
      charNum.textContent = len;

      // Ubah warna kalau mendekati batas
      if (len > 270) {
        charNum.style.color = '#f45a8c';
      } else if (len > 200) {
        charNum.style.color = '#c8f45a';
      } else {
        charNum.style.color = '';
      }
    });
  }

});
