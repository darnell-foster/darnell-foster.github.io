(function () {
  "use strict";

  window.addEventListener('load', function () {
    AOS.init({
      anchorPlacement: 'top-left',
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  });

  /* Navbar shadow + scroll-to-top on scroll */
  var navbar    = document.getElementById('header-nav');
  var body      = document.getElementsByTagName("body")[0];
  var scrollTop = document.getElementById('scrolltop');

  window.onscroll = function () {
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-top', 'shadow-sm');
      body.style.paddingTop = navbar.offsetHeight + "px";
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity    = 1;
    } else {
      navbar.classList.remove('fixed-top', 'shadow-sm');
      body.style.paddingTop      = "0px";
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity    = 0;
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Terminal animation                                                  */
  /* ------------------------------------------------------------------ */
  (function () {
    var termBody = document.getElementById('terminal-body');
    if (!termBody) return;

    var COMMANDS = [
      {
        cmd: 'whoami',
        output: [{ arrow: false, text: 'Darnell Foster' }]
      },
      {
        cmd: 'echo $ROLE',
        output: [{ arrow: false, text: 'Full-Stack Developer with Cybersecurity Foundations' }]
      },
      {
        cmd: 'cat interests.txt',
        output: [
          { arrow: true, text: 'Security & Systems' },
          { arrow: true, text: 'Full Stack Development' },
          { arrow: true, text: 'DevOps & Infrastructure' },
          { arrow: true, text: 'Always Learning' }
        ]
      }
    ];

    function sleep(ms) {
      return new Promise(function (resolve) { setTimeout(resolve, ms); });
    }

    function clearTerm() { termBody.innerHTML = ''; }

    function removeCursor() {
      var c = termBody.querySelector('.t-cursor');
      if (c) c.parentNode.removeChild(c);
    }

    function addGap() {
      var d = document.createElement('div');
      d.className = 't-gap';
      termBody.appendChild(d);
    }

    function addOutputLine(item) {
      var d = document.createElement('div');
      d.className = 't-line t-out';
      if (item.arrow) {
        var arr = document.createElement('span');
        arr.className = 't-arr';
        arr.textContent = '\u2192 ';
        d.appendChild(arr);
        d.appendChild(document.createTextNode(item.text));
      } else {
        d.textContent = item.text;
      }
      termBody.appendChild(d);
    }

    function addIdleCursor() {
      var d = document.createElement('div');
      d.className = 't-line';
      d.innerHTML = '<span class="t-prompt">$ </span><span class="t-cursor">&#9612;</span>';
      termBody.appendChild(d);
    }

    async function runCmd(cmdObj) {
      clearTerm();

      /* Build prompt line with cursor */
      var line   = document.createElement('div');
      line.className = 't-line';
      var prompt = document.createElement('span');
      prompt.className = 't-prompt';
      prompt.textContent = '$ ';
      var typed  = document.createElement('span');
      var cursor = document.createElement('span');
      cursor.className = 't-cursor';
      cursor.innerHTML = '&#9612;';
      line.appendChild(prompt);
      line.appendChild(typed);
      line.appendChild(cursor);
      termBody.appendChild(line);

      /* Type command character by character */
      for (var i = 0; i < cmdObj.cmd.length; i++) {
        typed.textContent += cmdObj.cmd[i];
        await sleep(50 + Math.random() * 55);
      }

      /* Brief pause before "executing" */
      await sleep(320);
      removeCursor();
      addGap();

      /* Print output lines */
      for (var j = 0; j < cmdObj.output.length; j++) {
        addOutputLine(cmdObj.output[j]);
        await sleep(110);
      }

      /* Hold result so the user can read it */
      await sleep(2400);
    }

    async function loop() {
      await sleep(700);       /* initial pause after page load */
      while (true) {
        for (var i = 0; i < COMMANDS.length; i++) {
          await runCmd(COMMANDS[i]);
        }
        /* Idle state briefly before restarting the cycle */
        clearTerm();
        addIdleCursor();
        await sleep(1100);
      }
    }

    loop();
  })();

  /* ------------------------------------------------------------------ */
  /*  Dark mode toggle                                                    */
  /* ------------------------------------------------------------------ */
  (function () {
    var btn  = document.getElementById('theme-toggle');
    var icon = document.getElementById('theme-icon');
    if (!btn) return;

    function applyTheme(dark) {
      if (dark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.className = 'bi bi-sun-fill';
      } else {
        document.documentElement.removeAttribute('data-theme');
        icon.className = 'bi bi-moon-fill';
      }
    }

    /* Sync icon with whatever FOUC script set */
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark');

    btn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(!isDark);
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  })();

})();
