/**
 * Luntares.com — Midnight Expansion Roadmap
 * Animations & Interactivity
 */

(function () {
    'use strict';

    // ─── Floating Particles ───────────────────────────────
    function initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        const PARTICLE_COUNT = 40;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 15;

            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = left + '%';
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';

            // Randomize color between purple and gold tones
            const hue = Math.random() > 0.8 ? 40 : 270 + Math.random() * 20;
            const lightness = 60 + Math.random() * 20;
            particle.style.background = 'hsl(' + hue + ', 80%, ' + lightness + '%)';

            container.appendChild(particle);
        }
    }

    // ─── Scroll Reveal (IntersectionObserver) ─────────────
    function initScrollReveal() {
        var phases = document.querySelectorAll('.phase');
        if (!phases.length) return;

        var observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.15
        };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        phases.forEach(function (phase) {
            observer.observe(phase);
        });
    }

    // ─── Phase Marker Glow on Hover ──────────────────────
    function initCardInteractions() {
        var cards = document.querySelectorAll('.phase');

        cards.forEach(function (phase) {
            var card = phase.querySelector('.phase__card');
            var glow = phase.querySelector('.phase__marker-glow');

            if (!card || !glow) return;

            card.addEventListener('mouseenter', function () {
                glow.style.opacity = '0.6';
                glow.style.transform = 'scale(1.5)';
                glow.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            });

            card.addEventListener('mouseleave', function () {
                glow.style.opacity = '';
                glow.style.transform = '';
                glow.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            });
        });
    }

    // ─── Smooth Scroll for Hero Indicator ─────────────────
    function initSmoothScroll() {
        var scrollIndicator = document.querySelector('.hero__scroll-indicator');
        if (!scrollIndicator) return;

        scrollIndicator.style.cursor = 'pointer';
        scrollIndicator.addEventListener('click', function () {
            var roadmap = document.querySelector('.roadmap');
            if (roadmap) {
                roadmap.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // ─── Parallax-like Hero Fade on Scroll ────────────────
    function initHeroParallax() {
        var hero = document.querySelector('.hero__content');
        if (!hero) return;

        var ticking = false;

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    var scrollY = window.pageYOffset;
                    var windowHeight = window.innerHeight;
                    var opacity = 1 - (scrollY / (windowHeight * 0.6));
                    var translateY = scrollY * 0.3;

                    if (opacity < 0) opacity = 0;

                    hero.style.opacity = opacity;
                    hero.style.transform = 'translateY(' + translateY + 'px)';
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ─── Timeline Progress Glow ───────────────────────────
    function initTimelineProgress() {
        var line = document.querySelector('.roadmap__line');
        if (!line) return;

        var ticking = false;

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    var roadmap = document.querySelector('.roadmap');
                    if (!roadmap) return;

                    var rect = roadmap.getBoundingClientRect();
                    var roadmapTop = rect.top + window.pageYOffset;
                    var roadmapHeight = roadmap.offsetHeight;
                    var scrollPosition = window.pageYOffset + window.innerHeight * 0.5;
                    var progress = (scrollPosition - roadmapTop) / roadmapHeight;

                    if (progress < 0) progress = 0;
                    if (progress > 1) progress = 1;

                    line.style.background = 'linear-gradient(180deg, ' +
                        'transparent 0%, ' +
                        'var(--color-purple) 3%, ' +
                        'var(--color-purple-glow) ' + (progress * 100) + '%, ' +
                        'var(--color-purple-dark) ' + (progress * 100 + 5) + '%, ' +
                        'transparent 100%)';

                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ─── Init All ─────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        initParticles();
        initScrollReveal();
        initCardInteractions();
        initSmoothScroll();
        initHeroParallax();
        initTimelineProgress();
    });
})();
