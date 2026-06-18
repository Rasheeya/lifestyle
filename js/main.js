
/* =========================
   HEALTHIO MAIN JS
========================= */

/* Page Loader */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* =========================
   LOGIN REDIRECT
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const role = document.getElementById("role").value;

        if (role === "admin") {

            window.location.href =
                "admin-dashboard.html";

        } else {

            window.location.href =
                "user-dashboard.html";
        }

    });

}


/* =========================
   SIGNUP VALIDATION
========================= */

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit",
        function (e) {

            e.preventDefault();

            const password =
                document.getElementById(
                    "signupPassword"
                ).value;

            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;

            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match!"
                );

                return;

            }

            alert(
                "Account Created Successfully!"
            );

            window.location.href =
                "login.html";

        });

}


/* =========================
   PASSWORD TOGGLE
========================= */

function toggleLoginPassword() {

    const input =
        document.getElementById(
            "loginPassword"
        );

    const icon = input.parentElement.querySelector("i.fa-eye, i.fa-eye-slash");

    if (input.type === "password") {

        input.type = "text";
        if (icon) { icon.classList.remove("fa-eye"); icon.classList.add("fa-eye-slash"); }

    } else {

        input.type = "password";
        if (icon) { icon.classList.remove("fa-eye-slash"); icon.classList.add("fa-eye"); }

    }

}

function toggleSignupPassword() {

    const input =
        document.getElementById(
            "signupPassword"
        );

    const icon = input.parentElement.querySelector("i.fa-eye, i.fa-eye-slash");

    if (input.type === "password") {

        input.type = "text";
        if (icon) { icon.classList.remove("fa-eye"); icon.classList.add("fa-eye-slash"); }

    } else {

        input.type = "password";
        if (icon) { icon.classList.remove("fa-eye-slash"); icon.classList.add("fa-eye"); }

    }

}

function toggleConfirmPassword() {

    const input =
        document.getElementById(
            "confirmPassword"
        );

    const icon = input.parentElement.querySelector("i.fa-eye, i.fa-eye-slash");

    if (input.type === "password") {

        input.type = "text";
        if (icon) { icon.classList.remove("fa-eye"); icon.classList.add("fa-eye-slash"); }

    } else {

        input.type = "password";
        if (icon) { icon.classList.remove("fa-eye-slash"); icon.classList.add("fa-eye"); }

    }

}


/* =========================
   LOGOUT
========================= */

function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );

    if (confirmLogout) {

        window.location.href =
            "login.html";

    }

}


/* =========================
   COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            const suffix = counter.getAttribute("data-suffix") || "";
            const isFloat = counter.getAttribute("data-is-float") === "true";
            let count = 0;
            const updateCounter = () => {
                const increment = target / 60;
                if (count < target) {
                    count += increment;
                    counter.innerText = (isFloat ? count.toFixed(1) : Math.floor(count)) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + suffix;
                }
            };
            updateCounter();
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* =========================
   SCROLL REVEAL
========================= */

const reveals =
    document.querySelectorAll(
        ".reveal"
    );

function revealElements() {

    reveals.forEach(item => {

        const top =
            item.getBoundingClientRect()
                .top;

        const windowHeight =
            window.innerHeight;

        if (
            top <
            windowHeight - 100
        ) {

            item.classList.add(
                "active"
            );

        }

    });

}

window.addEventListener(
    "scroll",
    revealElements
);

revealElements();


/* =========================
   NAVBAR SHADOW
========================= */

window.addEventListener(
    "scroll",
    () => {

        const navbar =
            document.querySelector(
                ".navbar"
            );

        if (!navbar) return;

        if (
            window.scrollY > 50
        ) {

            navbar.style.boxShadow =
                "0 10px 25px rgba(0,0,0,.12)";

        } else {

            navbar.style.boxShadow =
                "none";

        }

    }
);


/* =========================
   SMOOTH SCROLL
========================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                const target =
                    document.querySelector(
                        this.getAttribute(
                            "href"
                        )
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior:
                            "smooth"
                    });

                }

            }
        );

    });


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.querySelector(
        ".contact-form form"
    );

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            alert(
                "Message Sent Successfully!"
            );

            contactForm.reset();

        }
    );

}


/* =========================
   BUTTON RIPPLE EFFECT
========================= */

document
    .querySelectorAll(
        "button"
    )
    .forEach(btn => {

        btn.addEventListener(
            "click",
            function (e) {

                const ripple =
                    document.createElement(
                        "span"
                    );

                ripple.classList.add(
                    "ripple"
                );

                const rect =
                    btn.getBoundingClientRect();

                ripple.style.left =
                    e.clientX -
                    rect.left +
                    "px";

                ripple.style.top =
                    e.clientY -
                    rect.top +
                    "px";

                btn.appendChild(
                    ripple
                );

                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


/* =========================
   TESTIMONIAL AUTO SLIDER
========================= */

const testimonialCards =
    document.querySelectorAll(
        ".testimonial-card"
    );

let current = 0;

if (
    testimonialCards.length > 0
) {

    setInterval(() => {

        testimonialCards.forEach(
            card => {

                card.style.opacity =
                    "0.5";

            }
        );

        testimonialCards[
            current
        ].style.opacity =
            "1";

        current++;

        if (
            current >=
            testimonialCards.length
        ) {

            current = 0;

        }

    }, 3000);

}


/* =========================
   PROGRESS BAR ANIMATION
========================= */

const progressBars =
    document.querySelectorAll(
        ".progress-fill"
    );

window.addEventListener(
    "load",
    () => {

        progressBars.forEach(
            bar => {

                const width =
                    bar.style.width ||
                    getComputedStyle(
                        bar
                    ).width;

                bar.style.width =
                    "0";

                setTimeout(() => {

                    bar.style.transition =
                        "2s";

                    bar.style.width =
                        width;

                }, 500);

            }
        );

    }
);


/* =========================
   ACTIVE NAV LINK
========================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop();

document
    .querySelectorAll(
        ".nav-links a"
    )
    .forEach(link => {

        if (
            link.getAttribute(
                "href"
            ) === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    });


/* =========================
   BACK TO TOP BUTTON
========================= */

const topBtn =
    document.createElement(
        "button"
    );

topBtn.innerHTML =
    "↑";

topBtn.classList.add(
    "top-btn"
);

document.body.appendChild(
    topBtn
);

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 300
        ) {

            topBtn.style.display =
                "block";

        } else {

            topBtn.style.display =
                "none";

        }

    }
);

topBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================
   Mobile Menu Toggle
========================= */
document.querySelectorAll('.menu-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const navbar = this.closest('.navbar');
        const navLinks = navbar.querySelector('.nav-links');
        const icon = this.querySelector('i');
        
        navLinks.classList.toggle('mobile-active');
        navbar.classList.toggle('mobile-active');
        
        if (navLinks.classList.contains('mobile-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});


// Mobile Dashboard Sidebar
const dashMenuBtn = document.querySelector('.dashboard-menu-btn');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    if (sidebar) sidebar.classList.add('active');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    if (sidebar) sidebar.classList.remove('active');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (dashMenuBtn) {
    dashMenuBtn.addEventListener('click', openSidebar);
}

// Close sidebar when clicking outside (overlay)
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
});

// Video Testimonials Player
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', function() {
        const video = this.querySelector('video');
        const playBtn = this.querySelector('.play-btn');
        const title = this.querySelector('h3');
        if (video) {
            video.style.display = 'block';
            video.controls = true;
            video.play();
            if(playBtn) playBtn.style.display = 'none';
            if(title) title.style.display = 'none';
            this.style.background = 'none';
            this.style.padding = '0';
        }
    });
});
