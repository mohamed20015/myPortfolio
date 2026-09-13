/* =========================================
   MOHAMED PORTFOLIO - INTERACTIVE JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. NAVBAR SCROLL EFFECT
    ========================================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =========================================
       2. SMOOTH SCROLL
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       3. ACTIVE NAVIGATION
    ========================================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);


    /* =========================================
       4. TYPING EFFECT
    ========================================= */

    const roles = [
        "Frontend Developer",
        "UI Developer",
        "Creative Developer",
        "Web Designer"
    ];

    const roleElement = document.querySelector(".hero-role span");

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!roleElement) return;

        const currentRole = roles[roleIndex];

        if (!deleting) {

            roleElement.textContent =
                currentRole.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentRole.length) {

                deleting = true;

                setTimeout(typeEffect, 1800);

                return;
            }

        } else {

            roleElement.textContent =
                currentRole.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                roleIndex++;

                if (roleIndex >= roles.length) {
                    roleIndex = 0;
                }

            }

        }

        setTimeout(
            typeEffect,
            deleting ? 45 : 90
        );

    }

    typeEffect();


    /* =========================================
       5. MOUSE PARALLAX
    ========================================= */

    const heroVisual =
        document.querySelector(".hero-visual");

    const codeCard =
        document.querySelector(".code-card");

    const circles =
        document.querySelectorAll(".circle");

    if (heroVisual) {

        heroVisual.addEventListener("mousemove", e => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const moveX =
                (x - rect.width / 2) / 25;

            const moveY =
                (y - rect.height / 2) / 25;

            if (codeCard) {

                codeCard.style.transform =
                    `rotateY(${moveX}deg)
                     rotateX(${-moveY}deg)
                     rotateZ(-3deg)`;

            }

            circles.forEach((circle, index) => {

                const strength =
                    index === 0 ? 1.5 : -1;

                circle.style.transform =
                    `translate(
                        ${moveX * strength}px,
                        ${moveY * strength}px
                    )`;

            });

        });


        heroVisual.addEventListener("mouseleave", () => {

            if (codeCard) {

                codeCard.style.transform =
                    "rotateZ(-3deg)";

            }

            circles.forEach(circle => {
                circle.style.transform = "translate(0,0)";
            });

        });

    }


    /* =========================================
       6. PROJECT HOVER TILT
    ========================================= */

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateX =
                ((y - rect.height / 2) / rect.height) * -5;

            const rotateY =
                ((x - rect.width / 2) / rect.width) * 5;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-7px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

        });

    });


    /* =========================================
       7. SKILLS ANIMATION
    ========================================= */

    const skillBars =
        document.querySelectorAll(".skill-bar span");

    skillBars.forEach(bar => {

        const originalWidth =
            bar.style.width;

        bar.style.width = "0%";

        const observer =
            new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        setTimeout(() => {

                            bar.style.transition =
                                "width 1.5s cubic-bezier(.2,.8,.2,1)";

                            bar.style.width =
                                originalWidth;

                        }, 200);

                        observer.unobserve(bar);

                    }

                });

            }, {
                threshold: .5
            });

        observer.observe(bar);

    });


    /* =========================================
       8. COUNTERS
    ========================================= */

    const counters =
        document.querySelectorAll(".stat strong");

    counters.forEach(counter => {

        const text =
            counter.textContent.trim();

        const number =
            parseInt(text);

        if (isNaN(number)) return;

        const suffix =
            text.replace(number, "");

        counter.textContent = "0" + suffix;

        let started = false;

        const observer =
            new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !started
                    ) {

                        started = true;

                        let current = 0;

                        const duration = 1300;
                        const stepTime =
                            duration / number;

                        const timer =
                            setInterval(() => {

                                current++;

                                counter.textContent =
                                    current + suffix;

                                if (current >= number) {
                                    clearInterval(timer);
                                }

                            }, stepTime);

                    }

                });

            }, {
                threshold: .6
            });

        observer.observe(counter);

    });


    /* =========================================
       9. SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".service-card, .project-card, .stat, .contact-item"
        );

    const revealObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        }, {
            threshold: .15
        });

    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =========================================
       10. CONTACT FORM
    ========================================= */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", e => {

            e.preventDefault();

            const name =
                contactForm.querySelector(
                    'input[placeholder="Your Name"]'
                ).value;

            const email =
                contactForm.querySelector(
                    'input[placeholder="Your Email"]'
                ).value;

            const subject =
                contactForm.querySelector(
                    'input[placeholder="Project Subject"]'
                ).value;

            const message =
                contactForm.querySelector(
                    "textarea"
                ).value;


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showNotification(
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }


            showNotification(
                "Message sent successfully 🚀",
                "success"
            );

            contactForm.reset();

        });

    }


    /* =========================================
       11. NOTIFICATION
    ========================================= */

    function showNotification(message, type) {

        const oldNotification =
            document.querySelector(".notification");

        if (oldNotification) {
            oldNotification.remove();
        }

        const notification =
            document.createElement("div");

        notification.className =
            `notification ${type}`;

        notification.innerHTML = `

            <div class="notification-icon">
                ${
                    type === "success"
                    ? "✓"
                    : "!"
                }
            </div>

            <span>${message}</span>

        `;

        document.body.appendChild(notification);


        setTimeout(() => {

            notification.classList.add("hide");

            setTimeout(() => {
                notification.remove();
            }, 400);

        }, 3000);

    }


    /* =========================================
       12. MAGNETIC BUTTON
    ========================================= */

    const buttons =
        document.querySelectorAll(".main-btn");

    buttons.forEach(button => {

        button.addEventListener("mousemove", e => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * .15}px, ${y * .15}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0,0)";

        });

    });


    /* =========================================
       13. CURSOR GLOW
    ========================================= */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "cursor-glow";

    document.body.appendChild(cursorGlow);


    document.addEventListener("mousemove", e => {

        cursorGlow.style.left =
            e.clientX + "px";

        cursorGlow.style.top =
            e.clientY + "px";

    });


    /* =========================================
       14. CODE CARD LIVE EFFECT
    ========================================= */

    const codeContent =
        document.querySelector(".code-content");

    if (codeContent) {

        setInterval(() => {

            codeContent.style.opacity = ".7";

            setTimeout(() => {

                codeContent.style.opacity = "1";

            }, 150);

        }, 3500);

    }


    /* =========================================
       15. SCROLL PROGRESS
    ========================================= */

    const progress =
        document.createElement("div");

    progress.className =
        "scroll-progress";

    document.body.appendChild(progress);


    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            (scrollTop / documentHeight) * 100;

        progress.style.width =
            percentage + "%";

    });


    /* =========================================
       16. MOBILE MENU CLOSE
    ========================================= */

    const navLinksMobile =
        document.querySelectorAll(".navbar .nav-link");

    const navbarCollapse =
        document.querySelector(".navbar-collapse");

    navLinksMobile.forEach(link => {

        link.addEventListener("click", () => {

            if (
                window.innerWidth < 992 &&
                navbarCollapse.classList.contains("show")
            ) {

                const bsCollapse =
                    bootstrap.Collapse.getInstance(
                        navbarCollapse
                    );

                if (bsCollapse) {
                    bsCollapse.hide();
                }

            }

        });

    });


    /* =========================================
       17. PROJECT CLICK
    ========================================= */

    projectCards.forEach(card => {

        card.addEventListener("click", () => {

            const title =
                card.querySelector(
                    ".project-info h3"
                );

            if (title) {

                console.log(
                    `Opening project: ${title.textContent}`
                );

            }

        });

    });


    console.log(
        "%c Mohamed Portfolio 🚀 ",
        "background:#d9ff3f;color:#000;font-size:16px;font-weight:bold;padding:8px;"
    );

});