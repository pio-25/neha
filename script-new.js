// ═══ CURSOR SYSTEM — SAFE VERSION ═══
const cur = document.getElementById("cur");
const curR = document.getElementById("curR");

if (cur && curR) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const isProjectPage = document.body.classList.contains("project-page");

    document.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
    });

    (function loop() {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;

        cur.style.left = mx + "px";
        cur.style.top = my + "px";

        curR.style.left = rx + "px";
        curR.style.top = ry + "px";

        requestAnimationFrame(loop);
    })();

    // Diamond cursor on project pages
    if (isProjectPage) {
        cur.style.transform = "translate(-50%, -50%) rotate(45deg)";
        curR.style.transform = "translate(-50%, -50%) rotate(45deg)";
    }

    const sectionCursorMap = {
        hero: "",
        about: "bim",
        projects: "bim",
        process: "bim",
        "current-thinking": "ai",
        skills: "bim",
        contact: "",
    };

    function setCursorMode(mode) {
        if (isProjectPage) return;
        document.body.classList.remove("cur-open", "cur-ai", "cur-bim");
        if (mode) document.body.classList.add("cur-" + mode);
    }

    // Hover: project rows
    document.querySelectorAll(".proj-plate").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("cur-open");
            cur.style.width = "3px";
            cur.style.height = "3px";
            curR.style.width = "48px";
            curR.style.height = "48px";
        });

        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cur-open");
            cur.style.width = "6px";
            cur.style.height = "6px";
            curR.style.width = "28px";
            curR.style.height = "28px";
        });
    });

    // Hover: links/buttons
    document.querySelectorAll("a,button,.rdot,.ncell").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cur.style.width = "3px";
            cur.style.height = "3px";
            curR.style.width = "38px";
            curR.style.height = "38px";
        });

        el.addEventListener("mouseleave", () => {
            cur.style.width = "6px";
            cur.style.height = "6px";
            curR.style.width = "28px";
            curR.style.height = "28px";
        });
    });

    // ═══ SECTION CURSOR MODE (FIXED) ═══
    if (!isProjectPage && !window.location.hash) {
        const secs = ["hero", "about", "projects", "current-thinking", "contact"];
        const links = document.querySelectorAll(".rlink");

        const io2 = new IntersectionObserver((entries) => {
            let visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;

            const id = visible.target.id;
            const i = secs.indexOf(id);

            if (i >= 0) {
                links.forEach(l => l.classList.remove("on"));
                if (links[i]) links[i].classList.add("on");
                setCursorMode(sectionCursorMap[id] || "");
            }
        }, { threshold: [0.1, 0.2, 0.4, 0.6] });

        secs.forEach((id) => {
            const el = document.getElementById(id);
            if (el) io2.observe(el);
        });
    }
}

// ═══ HERO BG TEXT ═══
const bgEl = document.getElementById("heroBg");

if (bgEl) {
    const letters = bgEl.querySelectorAll(".hero-bg-letter");
    let i = 0;

    function resetLetters() {
        letters.forEach(l => l.classList.remove("visible"));
    }

    function revealNext() {
        if (i < letters.length) {
            letters[i].classList.add("visible");
            i++;
            setTimeout(revealNext, 1400);
        } else {
            // All letters visible — pause, then restart loop
            setTimeout(() => {
                resetLetters();
                i = 0;
                setTimeout(revealNext, 800);
            }, 3000);
        }
    }

    setTimeout(revealNext, 800);
}

// ═══ NAVIGATION (SPA SAFE) ═══
function show(name) {
    document.body.classList.add("fade-out");
    setTimeout(() => {
        const pages = document.querySelectorAll(".page");
        if (!pages.length) return;

        pages.forEach((p) => p.classList.remove("active"));

        const target = document.getElementById("page-" + name);
        if (target) target.classList.add("active");

        window.scrollTo({ top: 0, behavior: "auto" });
        document.body.classList.remove("fade-out");
    }, 200);
}

function goHome() {
    const pages = document.querySelectorAll(".page");
    if (!pages.length) return;

    pages.forEach((p) => p.classList.remove("active"));

    const home = document.getElementById("page-home");
    if (home) home.classList.add("active");
}

function scrollToId(id) {
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 60);
}

// ═══ FIX: HASH SCROLL (IMPORTANT) ═══
window.addEventListener("load", () => {
    if (window.location.hash) {
        const id = window.location.hash.replace("#", "");
        const el = document.getElementById(id);

        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: "auto" });
            }, 80);
        }
    }
});

// ═══ SCROLL REVEAL ═══
const ro = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
    });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((el) => ro.observe(el));

// ═══ SKILL PIPS ═══
let pipsAnimated = false;

const pipObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting && !pipsAnimated) {
            pipsAnimated = true;

            document.querySelectorAll(".spips").forEach((container) => {
                const level = parseInt(container.dataset.level) || 0;
                const type = container.dataset.type || "terra";
                const cls = "filled-" + type;

                const pips = container.querySelectorAll(".spip");

                pips.forEach((pip, i) => {
                    setTimeout(() => {
                        if (i < level) pip.classList.add(cls);
                    }, i * 65);
                });
            });
        }
    });
}, { threshold: 0.2 });

const skillsSection = document.getElementById("skills");
if (skillsSection) pipObserver.observe(skillsSection);

// ═══ SMOOTH NAVIGATION FOR EXTERNAL LINKS ═══
function smoothNavigate(url) {
    document.body.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = url;
    }, 400); // match CSS transition time
}

const isProjectPage = document.body.classList.contains("project-page");

if (isProjectPage) {
    // On project pages: smooth navigation for rail links, back button, and next project links
    document.querySelectorAll('.rlink').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            smoothNavigate(this.href);
        });
    });

    document.querySelectorAll('.cs-back').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            smoothNavigate('../index-new.html');
        });
    });

    document.querySelectorAll('.ncell').forEach(cell => {
        cell.addEventListener('click', function (e) {
            e.preventDefault();
            const onclickAttr = this.getAttribute('onclick');
            const urlMatch = onclickAttr.match(/location\.href\s*=\s*['"]([^'"]+)['"]/);
            if (urlMatch) {
                smoothNavigate(urlMatch[1]);
            }
        });
    });
} else {
    // On main page: no smooth navigation for project plates (instant navigation)
    // document.querySelectorAll('.proj-plate').forEach(plate => {
    //     plate.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         smoothNavigate(this.href);
    //     });
    // });
}



// // ═══ CURSOR SYSTEM — SAFE VERSION ═══
// const cur = document.getElementById("cur");
// const curR = document.getElementById("curR");

// if (cur && curR) {
//     let mx = 0, my = 0, rx = 0, ry = 0;

//     const isProjectPage = document.body.classList.contains("project-page"); // ✅ NEW

//     document.addEventListener("mousemove", (e) => {
//         mx = e.clientX;
//         my = e.clientY;
//     });

//     (function loop() {
//         rx += (mx - rx) * 0.13;
//         ry += (my - ry) * 0.13;

//         cur.style.left = mx + "px";
//         cur.style.top = my + "px";

//         curR.style.left = rx + "px";
//         curR.style.top = ry + "px";

//         requestAnimationFrame(loop);
//     })();

//     // ✅ FORCE DIAMOND CURSOR ON PROJECT PAGES
//     if (isProjectPage) {
//         cur.style.transform = "translate(-50%, -50%) rotate(45deg)";
//         curR.style.transform = "translate(-50%, -50%) rotate(45deg)";
//     }

//     // Cursor state per section
//     const sectionCursorMap = {
//         hero: "",
//         about: "bim",
//         projects: "bim",
//         process: "bim",
//         "current-thinking": "ai",
//         skills: "bim",
//         contact: "",
//     };

//     function setCursorMode(mode) {
//         if (isProjectPage) return; // ✅ disable section modes on project pages
//         document.body.classList.remove("cur-open", "cur-ai", "cur-bim");
//         if (mode) document.body.classList.add("cur-" + mode);
//     }

//     // Hover: project rows
//     document.querySelectorAll(".proj-plate").forEach((el) => {
//         el.addEventListener("mouseenter", () => {
//             document.body.classList.add("cur-open");
//             cur.style.width = "3px";
//             cur.style.height = "3px";
//             curR.style.width = "48px";
//             curR.style.height = "48px";
//         });

//         el.addEventListener("mouseleave", () => {
//             document.body.classList.remove("cur-open");
//             cur.style.width = "6px";
//             cur.style.height = "6px";
//             curR.style.width = "28px";
//             curR.style.height = "28px";
//         });
//     });

//     // Hover: buttons/links
//     document.querySelectorAll("a,button,.rdot,.ncell").forEach((el) => {
//         el.addEventListener("mouseenter", () => {
//             cur.style.width = "3px";
//             cur.style.height = "3px";
//             curR.style.width = "38px";
//             curR.style.height = "38px";
//         });

//         el.addEventListener("mouseleave", () => {
//             cur.style.width = "6px";
//             cur.style.height = "6px";
//             curR.style.width = "28px";
//             curR.style.height = "28px";
//         });
//     });

//     // ═══ SECTION CURSOR MODE (SAFE) ═══
//     if (!isProjectPage) { // ✅ disable on project pages
//         const secs = ["hero", "about", "projects", "current-thinking", "contact"];
//         const links = document.querySelectorAll(".rlink");

//         const io2 = new IntersectionObserver((entries) => {
//             let visible = entries
//                 .filter(e => e.isIntersecting)
//                 .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

//             if (!visible) return;

//             const id = visible.target.id;
//             const i = secs.indexOf(id);

//             if (i >= 0) {
//                 links.forEach(l => l.classList.remove("on"));
//                 if (links[i]) links[i].classList.add("on");
//                 setCursorMode(sectionCursorMap[id] || "");
//             }
//         }, { threshold: [0.1, 0.2, 0.4, 0.6] });

//         secs.forEach((id) => {
//             const el = document.getElementById(id);
//             if (el) io2.observe(el);
//         });
//     }
// }

// // ═══ HERO BG TEXT (SAFE) ═══
// const bgEl = document.getElementById("heroBg");

// if (bgEl) {
//     const seq = ["A", "I", "B", "I", "M", "N", "N"];
//     let si = 0;

//     setInterval(() => {
//         bgEl.style.opacity = "0";
//         setTimeout(() => {
//             si = (si + 1) % seq.length;
//             bgEl.textContent = seq[si];
//             bgEl.style.opacity = "1";
//         }, 550);
//     }, 2200);

//     bgEl.style.transition = "opacity .55s ease";
// }

// // ═══ NAVIGATION (SAFE FOR SPA ONLY) ═══
// function show(name) {
//     const pages = document.querySelectorAll(".page");
//     if (!pages.length) return;

//     pages.forEach((p) => p.classList.remove("active"));

//     const target = document.getElementById("page-" + name);
//     if (target) target.classList.add("active");

//     window.scrollTo({ top: 0, behavior: "smooth" });
// }

// function goHome() {
//     const pages = document.querySelectorAll(".page");
//     if (!pages.length) return;

//     pages.forEach((p) => p.classList.remove("active"));

//     const home = document.getElementById("page-home");
//     if (home) home.classList.add("active");
// }

// function scrollToId(id) {
//     setTimeout(() => {
//         const el = document.getElementById(id);
//         if (el) el.scrollIntoView({ behavior: "smooth" });
//     }, 60);
// }

// // ═══ SCROLL REVEAL (SAFE) ═══
// const ro = new IntersectionObserver((entries) => {
//     entries.forEach((e) => {
//         if (e.isIntersecting) e.target.classList.add("in");
//     });
// }, { threshold: 0.08 });

// document.querySelectorAll(".reveal").forEach((el) => ro.observe(el));

// // ═══ SKILL PIPS (SAFE) ═══
// let pipsAnimated = false;

// const pipObserver = new IntersectionObserver((entries) => {
//     entries.forEach((e) => {
//         if (e.isIntersecting && !pipsAnimated) {
//             pipsAnimated = true;

//             document.querySelectorAll(".spips").forEach((container) => {
//                 const level = parseInt(container.dataset.level) || 0;
//                 const type = container.dataset.type || "terra";
//                 const cls = "filled-" + type;

//                 const pips = container.querySelectorAll(".spip");

//                 pips.forEach((pip, i) => {
//                     setTimeout(() => {
//                         if (i < level) pip.classList.add(cls);
//                     }, i * 65);
//                 });
//             });
//         }
//     });
// }, { threshold: 0.2 });

// const skillsSection = document.getElementById("skills");
// if (skillsSection) pipObserver.observe(skillsSection);

