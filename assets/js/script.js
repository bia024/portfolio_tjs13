const about = document.querySelector('#about')
const swiperWrapper = document.querySelector('.swiper-wrapper')
const formulario = document.querySelector('#formulario')
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

async function getAboutGitHub() {
    try {
        const resposta = await fetch(
            'https://api.github.com/users/bia024',
        )

        const perfil = await resposta.json()

        if (!about) return;

        about.innerHTML = ''

        about.innerHTML = `
      
      <figure class="about-image">
        <img src="${perfil.avatar_url}"
             alt="${perfil.name}"
        >
      </figure>

      <article class="about-content">

        <h2>Sobre mim</h2>
        <p>Sou a Bia, tenho 24 anos e moro no Complexo do Alemão. Iniciei minha jornada quando uma amiga da minha mãe me recomendou um curso de Front-end aqui no Alemão, e desde então foi 'ladeira acima'. Me apaixonei pelo ramo e hoje curso Engenharia de Software, já tendo no currículo dois hackathons, um bootcamp e projeto de cibersegurança.</p>
        <p>Oficialmente, Minha trajetória é construída de forma intensiva através de projetos reais e hackathons, desenvolvi diversos projetos individuais e em grupo usando JavaScript, TypeScript e Power Platform. Inclusive, no meu projeto publicado ontem no LinkedIn, o Passoia, eu não me limitei ao Front-end; construí toda a arquitetura de Backend (Node.js/Prisma) para garantir que a solução fosse escalável. Estou pronta para aplicar essa mesma proatividade e visão de engenharia no grande corporativo.</p>


        <div class="about-buttons-data">

          <div class="buttons-container">
            <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
            <a href="https://drive.google.com/file/d/1PWk0ACDmSP73XE3pWCxVzPFltCI9_wMG/view?usp=sharing" target="_blank" class="botao-outline">Currículo</a>
          </div>

          <div class="data-container">

            <div class="data-item">
              <span class="data-number">${perfil.followers}</span>
              <span class="data-label">Seguidores</span>
            </div>

            <div class="data-item">
              <span class="data-number">${perfil.public_repos}</span>
              <span class="data-label">Repositórios</span>
            </div>

          </div>

        </div>
      </article>

    `
    } catch (error) {
        console.error('Erro ao buscar dados no GitHub', error)
    }
}

async function getProjectsGitHub() {
    try {
        const resposta = await fetch(
            'https://api.github.com/users/bia024/repos?sort=updated&per_page=6',
        )

        const repositorios = await resposta.json()

        if (!swiperWrapper) return;

        swiperWrapper.innerHTML = ''

        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'csharp',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift',
            'C': 'c',
            'C++': 'c_plus',
            'GitHub': 'github',
        }

        repositorios.forEach((repositorio) => {

            const linguagem = repositorio.language || 'GitHub'
            const icone = linguagens[linguagem] ?? linguagens['GitHub']
            const urlIcone = `./assets/icons/languages/${icone}.svg`

            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .replace(/\s+t[a-z0-9]+$/i, '')
                .toUpperCase()

            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...'
                : texto

            const descricao = repositorio.description
                ? truncar(repositorio.description, 100)
                : 'Projeto desenvolvido no GitHub'

            const tags = repositorio.topics?.length > 0
                ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
                : `<span class="tag">${linguagem}</span>`;

            const botaoDeploy = repositorio.homepage
                ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
                : ''

            const botoesAcao = `
        <div class="project-buttons">
          <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
            GitHub
          </a>
          ${botaoDeploy}
        </div>
      `;

            swiperWrapper.innerHTML += `
      
          <div class="swiper-slide">

            <article class="project-card">

              <figure class="project-image">
                <img src="${urlIcone}"
                     alt="Ícone - ${linguagem} - Linguagem principal do projeto"
                >
              </figure>

              <div class="project-content">

                <h3>${nomeFormatado}</h3>
                <p>${descricao}</p>

                <div class="project-tags">
                  ${tags}
                </div>

                ${botoesAcao}

              </div>

            </article>

          </div>
      `
        })

        iniciarSwiper()
    } catch (error) {
        console.error('Erro ao buscar dados no GitHub', error)
    }
}

function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false,
            },
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false,
            },
            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 54,
                centeredSlides: false,
            },
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },

        grabCursor: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
    })
}

const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('span') : null;
const body = document.body;

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    if (themeIcon) themeIcon.textContent = '☀️';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        const isDark = body.classList.contains('dark-theme');
        
        if (themeIcon) {
            themeIcon.textContent = isDark ? '☀️' : '🌓';
        }
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

if (formulario) {
    formulario.addEventListener('submit', function (event) {
    event.preventDefault()

    document
        .querySelectorAll('form span')
        .forEach((span) => (span.innerHTML = ''))

    let isValid = true

    const nome = document.querySelector('#nome')
    const erroNome = document.querySelector('#erro-nome')

    if (nome.value.trim().length < 3) {
        erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres'
        if (isValid) nome.focus()
        isValid = false
    }

    const email = document.querySelector('#email')
    const erroEmail = document.querySelector('#erro-email')

    if (!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = 'Digite um endereço de e-mail válido'
        if (isValid) email.focus()
        isValid = false
    }

    const assunto = document.querySelector('#assunto')
    const erroAssunto = document.querySelector('#erro-assunto')

    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML =
            'O assunto deve ter no mínimo 5 caracteres'
        if (isValid) assunto.focus()
        isValid = false
    }

    const mensagem = document.querySelector('#mensagem')
    const erroMensagem = document.querySelector('#erro-mensagem')

    if (mensagem.value.trim().length === 0) {
        erroMensagem.innerHTML = 'A mensagem não pode ser vazia'
        if (isValid) mensagem.focus()
        isValid = false
    }

    if (isValid) {
        const submitButton = formulario.querySelector(
            'button[type="submit"]',
        )
        submitButton.disabled = true
        submitButton.textContent = 'Enviando...'

        formulario.submit()
    }
    })
}

if (about) getAboutGitHub()
if (swiperWrapper) getProjectsGitHub()