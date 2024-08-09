const UXISIMD = {
  init() {
    this.processColors();
    this.processAnimeTags();
    this.processTimeTags();
    this.processInfoTags();
    this.processNewPageTags();
    this.processQRTags();
  },

  // ux-color属性で色を設定
  processColors() {
    document.querySelectorAll('[ux-color]').forEach(el => {
      el.style.color = el.getAttribute('ux-color');
    });
  },

  // ANIMEタグの処理
  processAnimeTags() {
    document.querySelectorAll('ANIME').forEach(el => {
      const frames = parseInt(el.getAttribute('frame')) || 1;
      const loop = el.getAttribute('loop') === 'true';
      const content = el.innerHTML.trim().split('<!-- frame -->');
      let currentFrame = 0;

      const showFrame = () => {
        el.innerHTML = content[currentFrame];
        currentFrame = (currentFrame + 1) % frames;
        if (loop || currentFrame !== 0) {
          setTimeout(showFrame, 1000);
        }
      };
      showFrame();
    });
  },

  // TIMEタグの処理
  processTimeTags() {
    document.querySelectorAll('TIME').forEach(el => {
      const format = el.getAttribute('format') || 'YYYY-MM-DD HH:mm:ss';
      const updateTime = () => {
        el.innerHTML = this.formatDate(new Date(), format);
      };
      setInterval(updateTime, 1000);
      updateTime();
    });
  },

  // INFOタグの処理
  processInfoTags() {
    document.querySelectorAll('INFO').forEach(el => {
      const message = el.getAttribute('message') || 'Info';
      el.innerHTML = `<div class="info-box">${message}</div>`;
    });
  },

  // NEWPAGEタグの処理
  processNewPageTags() {
    document.querySelectorAll('NEWPAGE').forEach(el => {
      const url = el.getAttribute('url') || '#';
      const text = el.innerHTML || 'New Page';
      el.innerHTML = `<a href="${url}" target="_blank">${text}</a>`;
    });
  },

  // QRタグの処理
  processQRTags() {
    document.querySelectorAll('QR').forEach(el => {
      const text = el.getAttribute('text') || '';
      const size = parseInt(el.getAttribute('size')) || 100;
      el.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}" alt="QR Code">`;
    });
  },

  // 日付フォーマットの補助関数
  formatDate(date, format) {
    const map = {
      'YYYY': date.getFullYear(),
      'MM': ('0' + (date.getMonth() + 1)).slice(-2),
      'DD': ('0' + date.getDate()).slice(-2),
      'HH': ('0' + date.getHours()).slice(-2),
      'mm': ('0' + date.getMinutes()).slice(-2),
      'ss': ('0' + date.getSeconds()).slice(-2),
    };
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, matched => map[matched]);
  },

  // シンプルなリクエスト関数 (GET/POST)
  request(url, options = {}) {
    return fetch(url, options).then(response => response.json());
  },

  // シンプルなCSS生成
  createStyle(styles) {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }
};


class UXIHTM {
  constructor() {
    // 自動的に初期化メソッドを呼び出し
    this.init();
  }

  // 初期化メソッド
  init() {
    // 必要な初期化作業
    console.log('UXISIMD Initialized');
  }

  // 新しいHTML要素を作成するメソッド
  createElement(tag, attributes = {}, content = '', styles = {}) {
    const element = document.createElement(tag);

    // 属性の追加
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }

    // コンテンツの追加
    if (content instanceof HTMLElement) {
      element.appendChild(content);
    } else {
      element.innerHTML = content;
    }

    // スタイルの適用
    for (const [property, value] of Object.entries(styles)) {
      element.style[property] = value;
    }

    return element;
  }

  // 作成した要素を指定の親要素に追加するメソッド
  appendTo(parent, child) {
    if (typeof parent === 'string') {
      parent = document.querySelector(parent);
    }
    parent.appendChild(child);
  }

  // 既存の要素をクリアするメソッド
  clearElement(selector) {
    const element = document.querySelector(selector);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  // Pタグ専用メソッドの例 (汎用性のあるタグ作成を想定)
  createParagraph(content, attributes = {}, styles = {}) {
    return this.createElement('p', attributes, content, styles);
  }

  // 他のタグ作成メソッドも追加可能 (div, span, imgなど)
  createDiv(content, attributes = {}, styles = {}) {
    return this.createElement('div', attributes, content, styles);
  }

  createImage(src, alt = '', attributes = {}, styles = {}) {
    const imgAttributes = { src, alt, ...attributes };
    return this.createElement('img', imgAttributes, '', styles);
  }

  // 親要素に新しい要素を追加し、さらにそれを返す
  addToParent(parentSelector, tag, attributes = {}, content = '', styles = {}) {
    const parent = document.querySelector(parentSelector);
    const child = this.createElement(tag, attributes, content, styles);
    parent.appendChild(child);
    return child;
  }
}


UXISIMDD=UXISIMD
UXISIMDD.init()