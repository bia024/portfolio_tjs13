# 📝 Todo List - Implementações Futuras

Este documento rastreia as melhorias planejadas para o portfólio, com foco em Acessibilidade (a11y) e Experiência do Usuário (UX).

## 🌙 Dark Mode / Temas
- [ ] **Definir Variáveis CSS (Custom Properties):**
    - Criar variáveis para cores de fundo, texto e acentos no `:root`.
    - Criar classe `.dark-mode` redefinindo essas variáveis.
- [ ] **Implementar Toggle (Botão):**
    - Adicionar lógica JS para alternar a classe `.dark-mode` no `body`.
    - Adicionar ícones de Sol/Lua que mudam conforme o estado.
- [ ] **Persistência de Dados:**
    - Salvar a preferência do usuário no `localStorage` para manter o tema ao recarregar.
- [ ] **Detecção do Sistema:**
    - Usar `window.matchMedia('(prefers-color-scheme: dark)')` para carregar o tema padrão do sistema operacional do usuário.

## ♿ Acessibilidade (A11y) & ARIA
- [ ] **Navegação por Teclado:**
    - Garantir que o "Skip Link" (Pular para o conteúdo) esteja funcional e visível ao receber foco.
    - Verificar se o foco (outline) está visível em todos os elementos interativos (links, botões, inputs).
- [ ] **Melhorias no Formulário:**
    - Adicionar atributo `aria-invalid="true"` nos inputs quando houver erro de validação via JS.
    - Associar mensagens de erro aos inputs usando `aria-describedby` (ex: `input aria-describedby="erro-nome"`).
    - Adicionar alertas de status (sucesso/erro) usando `role="alert"` ou `aria-live="polite"`.
- [ ] **Leitores de Tela:**
    - Revisar hierarquia de cabeçalhos (`h1` -> `h2` -> `h3`) para garantir ordem lógica.
    - Em elementos decorativos (ícones sem função semântica), garantir `aria-hidden="true"`.
- [ ] **Movimento Reduzido:**
    - Implementar media query `@media (prefers-reduced-motion: reduce)` para desativar animações (como o "float" do avatar) para usuários que têm sensibilidade a movimento.

## 🚀 Performance & SEO
- [ ] **Otimização de Imagens:**
    - Converter imagens PNG/JPG para formato **WebP**.
    - Adicionar atributos `width` e `height` explícitos nas tags `<img>` para evitar Layout Shift (CLS).
- [ ] **Meta Tags Sociais (Open Graph):**
    - Adicionar tags `og:title`, `og:description`, `og:image` para melhorar a visualização ao compartilhar links no LinkedIn/WhatsApp.
- [ ] **Lighthouse Audit:**
    - Rodar auditoria do Chrome DevTools e buscar pontuação 90+ em todas as categorias.

## 🔧 Manutenção de Código
- [ ] **Refatoração CSS:**
    - Verificar consistência da metodologia BEM (Block Element Modifier).
    - Agrupar media queries para facilitar leitura mobile-first.

---

### 📅 Backlog (Ideias)
- Adicionar blog/artigos técnicos.
- Internacionalização (i18n) - Versão em Inglês.
- Testes automatizados (Cypress ou Playwright) para o formulário.