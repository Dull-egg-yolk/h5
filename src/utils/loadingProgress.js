
class LoadingProgress {
  constructor () {
    this._init()
  }

  _init () {
    this.el = document.createElement('div')
    document.body.appendChild(this.el)
  }

  destroy () {
    document.body.removeChild(this.el)
  }
}

export default LoadingProgress
