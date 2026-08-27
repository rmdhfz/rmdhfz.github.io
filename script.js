document.addEventListener('DOMContentLoaded', () => {

    // Terminal Typing Animation Logic
    const terminalContent = document.getElementById('terminal-content');
    
    if (terminalContent) {
        const terminalSequence = [
            { type: 'command', text: 'whoami' },
            { type: 'output', text: '"Hafiz Ramadhan - IT Development Team Lead, Cyber Security Enthusiast, and builder of robust, high-scale distributed systems."' },
            { type: 'command', text: 'cat profile.json' },
            { type: 'json', text: `{
  <span class="term-string">"name"</span>: <span class="term-string">"Hafiz Ramadhan"</span>,
  <span class="term-string">"domain"</span>: <span class="term-string">"rmdhfz.github.io"</span>,
  <span class="term-string">"focus"</span>: [
    <span class="term-string">"Cyber Security"</span>,
    <span class="term-string">"Distributed Systems"</span>,
    <span class="term-string">"Cloud Architecture"</span>,
    <span class="term-string">"Full-Stack Web Engineering"</span>
  ],
  <span class="term-string">"languages"</span>: [<span class="term-string">"Go"</span>, <span class="term-string">"Python"</span>, <span class="term-string">"TypeScript"</span>, <span class="term-string">"PHP"</span>],
  <span class="term-string">"infrastructure"</span>: [<span class="term-string">"GCP"</span>, <span class="term-string">"Kubernetes"</span>, <span class="term-string">"Docker"</span>, <span class="term-string">"Proxmox"</span>],
  <span class="term-string">"status"</span>: <span class="term-string">"Building the future"</span>
}` }
        ];

        let seqIndex = 0;

        function renderNextSequence() {
            if (seqIndex >= terminalSequence.length) return;

            const seq = terminalSequence[seqIndex];
            const line = document.createElement('div');
            
            if (seq.type === 'command') {
                line.className = 'term-line font-mono';
                line.innerHTML = `<span class="term-prompt">$</span><span class="typing-cmd"></span>`;
                terminalContent.appendChild(line);
                
                typeText(line.querySelector('.typing-cmd'), seq.text, 0, () => {
                    seqIndex++;
                    setTimeout(renderNextSequence, 400); // Wait before next line
                });
            } else if (seq.type === 'output') {
                line.className = 'term-line mb-4 text-secondary font-mono';
                line.innerHTML = seq.text;
                terminalContent.appendChild(line);
                seqIndex++;
                setTimeout(renderNextSequence, 800);
            } else if (seq.type === 'json') {
                line.className = 'term-line font-mono';
                line.innerHTML = `<pre><code>${seq.text}</code></pre>`;
                terminalContent.appendChild(line);
                seqIndex++;
                // Add blinking cursor at the end
                const cursorLine = document.createElement('div');
                cursorLine.className = 'term-line font-mono';
                cursorLine.innerHTML = `<span class="term-prompt">$</span><span class="cursor" style="display:inline-block;width:8px;height:15px;background:#fff;animation:blink 1s step-end infinite;"></span>`;
                terminalContent.appendChild(cursorLine);
            }
        }

        function typeText(element, text, index, callback) {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                setTimeout(() => typeText(element, text, index + 1, callback), 50 + Math.random() * 50);
            } else {
                if (callback) callback();
            }
        }

        // Start animation after a short delay
        setTimeout(renderNextSequence, 1000);
    }

    // Scroll Animation
    const revealElements = document.querySelectorAll('.clean-card, .timeline-item');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    // Setup initial state for scroll animations
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navPill = document.querySelector('.nav-pill');
    
    if (hamburger && navPill) {
        hamburger.addEventListener('click', () => {
            if (navPill.style.display === 'block') {
                navPill.style.display = 'none';
            } else {
                navPill.style.display = 'block';
                navPill.style.position = 'absolute';
                navPill.style.top = '100%';
                navPill.style.right = '2rem';
                navPill.style.marginTop = '1rem';
            }
        });
    }

    // Language Toggle Logic
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            let currentLang = document.documentElement.lang;
            let newLang = currentLang === 'id' ? 'en' : 'id';
            document.documentElement.lang = newLang;
            localStorage.setItem('pref-lang', newLang);
        });
    }
});
