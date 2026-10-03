/* ==========================================================================
   IPS PAOLA PABÓN x BRUISER TECH - JAVASCRIPT NATIVO (VANILLA ES6)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAuraChatSimulator();
  initSkinQuiz();
  initCommandCenterTabs();
});

/* --------------------------------------------------------------------------
   1. NAVEGACIÓN MÓVIL
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer clic fuera o al seleccionar un enlace
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. SIMULADOR INTERACTIVO WHATSAPP (AURA-AI)
   -------------------------------------------------------------------------- */
function initAuraChatSimulator() {
  const chatWindow = document.getElementById('waChatWindow');
  const input = document.getElementById('waInput');
  const sendBtn = document.getElementById('waSendBtn');
  const scenarioBtns = document.querySelectorAll('.scenario-btn');

  if (!chatWindow) return;

  function getTimeString() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function appendMessage(text, isSent) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `wa-msg ${isSent ? 'wa-msg-sent' : 'wa-msg-received'}`;
    msgDiv.innerHTML = `
      <div>${text}</div>
      <div class="wa-time">${getTimeString()}</div>
    `;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function getAuraResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('sculptra') || q.includes('alto ticket') || q.includes('jornada')) {
      return "Dra. Paola Pabón coordina personalmente los protocolos de Sculptra® en Yumbo. Es un bioestimulador de colágeno progresivo que restituye la firmeza natural sin perder la armonía de tus facciones. ¿Te gustaría agendar una valoración facial personalizada esta semana?";
    }
    if (q.includes('horario') || q.includes('ubicacion') || q.includes('donde') || q.includes('yumbo')) {
      return "Nos encontramos ubicados en la Calle 5 #7-24, Barrio Puerto Isaacs, Yumbo. Atendemos de Lunes a Sábado de 8:00 AM a 6:00 PM con cita previa para garantizar la privacidad y atención exclusiva en cabina.";
    }
    if (q.includes('dolor') || q.includes('aguja') || q.includes('miedo') || q.includes('objecion')) {
      return "Comprendemos perfectamente tu cuidado. En la IPS Paola Pabón aplicamos anestesia tópica de grado médico previa a cualquier procedimiento inyectable y utilizamos microcánulas de punta roma. El proceso es sumamente confortable y priorizamos resultados sutiles y elegantes.";
    }
    if (q.includes('botox') || q.includes('linea') || q.includes('arruga')) {
      return "El tratamiento de Toxina Botulínica atenúa las líneas de expresión respetando la gestualidad natural de tu rostro. Nuestro enfoque es prevenir y refrescar. ¿Deseas verificar la disponibilidad de cabina?";
    }
    if (q.includes('precio') || q.includes('costo') || q.includes('cuanto')) {
      return "Cada rostro es único. Para brindarte un presupuesto exacto y ético, realizamos un diagnóstico clínico con nuestro simulador digital en cabina. Te podemos ofrecer una cita de valoración sin costo en nuestra sede de Yumbo.";
    }
    if (q.includes('cita') || q.includes('agendar') || q.includes('cupo')) {
      return "¡Excelente elección! Cuéntame qué día de esta semana te queda más cómodo (mañana o tarde) y coordinamos de inmediato con recepción.";
    }

    return "Gracias por escribir a la IPS Estética y Spa Paola Pabón. Como agente de IA clínica AURA, estoy aquí para guiarte en tu armonización facial. ¿Te gustaría consultar sobre Sculptra®, Toxina Botulínica o agendar una valoración presencial en Yumbo?";
  }

  function handleSend() {
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, true);
    input.value = '';

    setTimeout(() => {
      const response = getAuraResponse(text);
      appendMessage(response, false);
    }, 700);
  }

  if (sendBtn && input) {
    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  // Escenarios predefinidos
  scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const scenarioText = btn.getAttribute('data-scenario') || btn.textContent.trim();
      appendMessage(scenarioText, true);
      setTimeout(() => {
        const response = getAuraResponse(scenarioText);
        appendMessage(response, false);
      }, 600);
    });
  });
}

/* --------------------------------------------------------------------------
   3. SKIN ASSESSMENT QUIZ INTERACTIVO
   -------------------------------------------------------------------------- */
function initSkinQuiz() {
  const quizContainer = document.getElementById('skinQuizContainer');
  if (!quizContainer) return;

  let currentStep = 1;
  const userAnswers = {
    objective: '',
    zone: '',
    recommendation: '',
    protocol: ''
  };

  const step1 = document.getElementById('quizStep1');
  const step2 = document.getElementById('quizStep2');
  const step3 = document.getElementById('quizStep3');
  const progressBar = document.getElementById('quizProgressBar');

  function updateStep(step) {
    currentStep = step;
    [step1, step2, step3].forEach((el, index) => {
      if (el) {
        if (index + 1 === step) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });

    if (progressBar) {
      progressBar.style.width = `${(step / 3) * 100}%`;
    }
  }

  // Paso 1: Objetivo
  document.querySelectorAll('.quiz-opt-step1').forEach(btn => {
    btn.addEventListener('click', () => {
      userAnswers.objective = btn.getAttribute('data-value') || btn.textContent.trim();
      updateStep(2);
    });
  });

  // Paso 2: Zona y Generación de Diagnóstico
  document.querySelectorAll('.quiz-opt-step2').forEach(btn => {
    btn.addEventListener('click', () => {
      userAnswers.zone = btn.getAttribute('data-value') || btn.textContent.trim();

      // Mapear recomendación clínica
      if (userAnswers.objective.includes('Firmeza') || userAnswers.objective.includes('Colágeno')) {
        userAnswers.recommendation = "Protocolo Bioestimulador de Colágeno Sculptra® + Mesoterapia NCTF 135HA";
        userAnswers.protocol = "Especialmente indicado para restaurar la densidad dérmica y firmeza natural en " + userAnswers.zone + ".";
      } else if (userAnswers.objective.includes('Líneas')) {
        userAnswers.recommendation = "Protocolo Armonización Relajante - Toxina Botulínica & Baby Botox";
        userAnswers.protocol = "Diseñado para suavisar arrugas de expresión en " + userAnswers.zone + " preservando total naturalidad.";
      } else {
        userAnswers.recommendation = "Protocolo Labios Party & Hidratación Profunda con Ácido Hialurónico";
        userAnswers.protocol = "Aporta volumen sutil, perfilado y nutrición intensiva en " + userAnswers.zone + ".";
      }

      // Renderizar resultado en Paso 3
      const recTitle = document.getElementById('quizRecTitle');
      const recDesc = document.getElementById('quizRecDesc');
      const waButton = document.getElementById('quizWaButton');

      if (recTitle) recTitle.textContent = userAnswers.recommendation;
      if (recDesc) recDesc.textContent = userAnswers.protocol;

      if (waButton) {
        const msg = encodeURIComponent(
          `Hola IPS Paola Pabón. Realicé el Skin Assessment Quiz en su portal web.\n` +
          `• Objetivo: ${userAnswers.objective}\n` +
          `• Zona: ${userAnswers.zone}\n` +
          `• Diagnóstico Sugerido: ${userAnswers.recommendation}\n` +
          `Me gustaría agendar una valoración presencial en la sede Yumbo.`
        );
        waButton.href = `https://wa.me/573053862774?text=${msg}`;
      }

      updateStep(3);
    });
  });

  // Reiniciar quiz
  const resetBtn = document.getElementById('quizResetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      updateStep(1);
    });
  }
}

/* --------------------------------------------------------------------------
   4. COMMAND CENTER & CRM TABS
   -------------------------------------------------------------------------- */
function initCommandCenterTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const statusToggleBtn = document.getElementById('statusToggleBtn');
  const statusIndicatorText = document.getElementById('statusIndicatorText');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const activeContent = document.getElementById(targetTab);
        if (activeContent) {
          activeContent.classList.add('active');
        }
      });
    });
  }

  if (statusToggleBtn && statusIndicatorText) {
    statusToggleBtn.addEventListener('click', () => {
      if (statusIndicatorText.textContent.includes('CONECTADO')) {
        statusIndicatorText.textContent = 'COMMAND CENTER: MODO MANUAL • Sede Yumbo';
        statusToggleBtn.textContent = 'Conectar AURA-AI';
        statusToggleBtn.style.backgroundColor = '#FFA834';
      } else {
        statusIndicatorText.textContent = 'COMMAND CENTER CONECTADO • Sede Yumbo';
        statusToggleBtn.textContent = 'Modo Manual';
        statusToggleBtn.style.backgroundColor = '';
      }
    });
  }
}
