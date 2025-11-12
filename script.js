const timeContainer = document.getElementById('time');
    const dateContainer = document.getElementById('date');
    const ampmContainer = document.getElementById('ampm');
    const infoText = document.getElementById('info-text');

    function createFlipCard(digit = '0') {
      const card = document.createElement('div');
      card.className = 'flip-card';
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-front">${digit}</div>
          <div class="flip-back">${digit}</div>
        </div>
      `;
      return card;
    }

    function createSeparator(text) {
      if (text === 's') {
        const spacer = document.createElement('div');
        spacer.className = 'spacer';
        return spacer;
      }
      
      const sep = document.createElement('span');
      sep.className = 'separator';
      sep.textContent = text;
      
      if (text === '/') {
        sep.classList.add('text-3xl', 'sm:text-4xl', 'lg:text-5xl');
      } else {
        sep.classList.add('text-6xl', 'sm:text-7xl', 'lg:text-8xl');
      }
      return sep;
    }

    function initDisplay() {
      timeContainer.appendChild(createFlipCard('0'));
      
      const hourCardTwo = createFlipCard('0');
      hourCardTwo.classList.add('glow-right');
      timeContainer.appendChild(hourCardTwo);
      
      timeContainer.appendChild(createSeparator('s'));
      
      const minuteCardOne = createFlipCard('0');
      minuteCardOne.classList.add('glow-left');
      timeContainer.appendChild(minuteCardOne);
      
      const minuteCardTwo = createFlipCard('0');
      minuteCardTwo.classList.add('glow-right');
      timeContainer.appendChild(minuteCardTwo);

      timeContainer.appendChild(createSeparator('s'));
      
      const secondCardOne = createFlipCard('0');
      secondCardOne.classList.add('glow-left');
      timeContainer.appendChild(secondCardOne);
      
      timeContainer.appendChild(createFlipCard('0'));

      dateContainer.appendChild(createFlipCard('0'));
      dateContainer.appendChild(createFlipCard('0'));
      dateContainer.appendChild(createSeparator('/'));
      dateContainer.appendChild(createFlipCard('0'));
      dateContainer.appendChild(createFlipCard('0'));
      dateContainer.appendChild(createSeparator('/'));
      dateContainer.appendChild(createFlipCard('0'));
      dateContainer.appendChild(createFlipCard('0'));
      dateContainer.appendChild(createFlipCard('0'));
      dateContainer.appendChild(createFlipCard('0'));
    }

    function pad(num) {
      return String(num).padStart(2, '0');
    }

    function updateFlipCards(container, digits) {
      const cards = container.querySelectorAll('.flip-card');
      let idx = 0;
      digits.forEach(d => {
        if (d === '/' || d === 's') return; 
        
        const card = cards[idx++];
        if (!card) return;
        
        const front = card.querySelector('.flip-front');
        const back = card.querySelector('.flip-back');

        if (front.textContent !== d) {
          back.textContent = d;
          card.classList.add('flipped');
          setTimeout(() => {
            front.textContent = d;
            card.classList.remove('flipped');
          }, 700);
        }
      });
    }

    function updateClock() {
      const now = new Date();
      
      let h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();
      const d = now.getDate();
      const mo = now.getMonth() + 1;
      const y = now.getFullYear();

      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12;

      const h_str = pad(h);
      const m_str = pad(m);
      const s_str = pad(s);
      const d_str = pad(d);
      const mo_str = pad(mo);
      const y_str = String(y);

      updateFlipCards(timeContainer, [h_str[0], h_str[1], 's', m_str[0], m_str[1], 's', s_str[0], s_str[1]]);
      updateFlipCards(dateContainer, [d_str[0], d_str[1], '/', mo_str[0], mo_str[1], '/', y_str[0], y_str[1], y_str[2], y_str[3]]);
      
      ampmContainer.textContent = ampm;

      if (ampm === 'PM') {
        ampmContainer.classList.add('glow-neon-text');
        ampmContainer.classList.remove('glow-red-text');
      } else {
        ampmContainer.classList.add('glow-red-text');
        ampmContainer.classList.remove('glow-neon-text');
      }

      timeContainer.setAttribute('aria-label', `Current time: ${h} ${m} ${s} ${ampm}`);
      dateContainer.setAttribute('aria-label', `Current date: ${d} ${mo} ${y}`);

      const options = { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
        hour: 'numeric', minute: 'numeric', hour12: true, timeZoneName: 'short' 
      };
      const locale = navigator.language || 'en-US';
      infoText.textContent = now.toLocaleString(locale, options);
    }

    window.onload = function() {
      initDisplay();
      updateClock();
      setInterval(updateClock, 1000);
    }