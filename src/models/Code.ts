const na = /^#.*\r?\n/gm,
  W = /(<#|\/>)/,
  X = /^\[\[([^\]]*)\]\]([\s\S]*)$/,
  Y = /@([a-z$][-_a-z0-9$]*)\s*\{([^}]+)\}/gi

export default class Code {
  static instance: null | Code = null

  private code: string = ''

  constructor() {
    if (Code.instance !== null) {
      throw new Error('Cannot instantiate more than one Singleton, use Singleton.getInstance()')
    }
    // private constructor
  }

  static getInstance() {
    if (Code.instance === null) {
      Code.instance = new Code()
    }
    return Code.instance
  }

  getData(path: string) {
    return fetch(path)
      .then((res) => res.text())
      .then((res) => {
        this.code = res.trim()
      })
  }

  static parseFragmentDirective(code: string, options: { removeLineDirectives?: boolean } = {}) {
    if (options.removeLineDirectives) {
      // 过滤行指令
      code = code.replace(Y, '')
    }
    const list = code.trim().split(W)
    const length = list.length
    const directives = []
    for (let l = 0; l < length; ++l) {
      const m = list[l]
      if (!W.test(m) && m) {
        if (X.test(m)) {
          const [, id, code] = Array.from(X.exec(m) ?? [])
          id && code && directives.push({ id: id, code: code })
        } else {
          m && directives.push({ id: 'default', code: m })
        }
      }
    }
    return directives
  }

  public parseFragmentDirective(options?: { removeLineDirectives?: boolean }) {
    return Code.parseFragmentDirective(this.code, options)
  }

  static splitToLines(str: string) {
    return str
      .replace(/~ *\r\n+/, '')
      .replace(na, '')
      .replace(/^ +/gm, function (b) {
        return '<#[[indent]]  />'.repeat((b.length / 2) | 0) + ' '.repeat(b.length % 2)
      })
      .replace(/\/\/.*$/gm, '<#[[comment]]$&/>')
      .replace(/\/\*([^*]|(\*(?!\/)))+\*\//g, function (b) {
        return b
          .split(/\r?\n/)
          .map(function (d) {
            return '<#[[comment]]' + d + '/>'
          })
          .join('\n')
      })
      .replace(
        /\b(of|class|async|await|use|enum|public|protected|private|extends|static|void|return|new|readonly|override|implements|Pick|super|this|const|set|get|if|else|true|false|constructor)\b/g,
        '<#[[keyword]]$&/>'
      )
      .split(/\r?\n/)
      .map(function (b) {
        return b.replace(/\\n/, '\n')
      })
      .map(function (b) {
        return b ? b : '<#[[newline]] />'
      })
  }

  // 获取指令 line
  static getLineDirective(a: string, b: string) {
    let d: string | undefined
    a.replace(Y, function (l, m, r) {
      if (b === m) {
        d = r
      }
      return l
    })
    return d ? d.trim() : ''
  }
}
