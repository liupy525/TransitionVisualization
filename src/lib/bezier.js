class BezierDrawer {
  constructor(el, startX, startY, endX, endY, data, standard=true) {
    let drawing = document.querySelector(el)
    this.context = drawing.getContext('2d')
    this.startX = startX
    this.startY = startY
    this.endX = endX
    this.endY = endY
    this.width = this.endX - this.startX
    this.height = this.startY - this.endY
    this.standard = standard
    if (standard) {
      this.settings = {bezier: {lineWidth: 5, strokeStyle: '#000000'},
                      linklines: {lineWidth: 3, strokeStyle: '#606060'}}
    } else {
      this.settings = {bezier: {lineWidth: 2, strokeStyle: '#ffffff'},
                      linklines: {lineWidth: 1, strokeStyle: '#ffffff'}}
    }
    this.draw(data)
  }
  drawBorder() {
    let context = this.context
    // 绘制边框
    context.beginPath()
    context.moveTo(this.startX, this.endY)
    context.lineTo(this.startX, this.startY)
    context.lineTo(this.endX, this.startY)
    context.lineWidth = 1
    context.strokeStyle = '#000000'
    context.stroke()
    context.closePath()
  }
  drawStartAndEndPoint() {
    let context = this.context
    // 绘制曲线起点及终点
    context.beginPath()
    context.moveTo(this.startX, this.startY)
    context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, false)
    context.moveTo(this.endX, this.endY)
    context.arc(this.endX, this.endY, 5, 0, 2 * Math.PI, false)
    context.fillStyle = '#000000'
    context.fill()
    context.closePath()
  }
  drawStandardLine() {
    let context = this.context
    // 连接起点和终点
    context.beginPath()
    context.moveTo(this.startX, this.startY)
    context.lineTo(this.endX, this.endY)
    context.lineWidth = 4
    context.strokeStyle = 'rgba(0,0,0,.1)'
    context.stroke()
    context.closePath()
  }
  drawLinklines(x1, y1, x2, y2) {
    let context = this.context
    // 绘制参数点到起始点的连线
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(this.startX, this.startY)
    context.moveTo(x2, y2)
    context.lineTo(this.endX, this.endY)
    context.lineWidth = this.settings.linklines.lineWidth
    context.strokeStyle = this.settings.linklines.strokeStyle
    context.stroke()
    context.closePath()
  }
  drawParamsPoints(x1, y1, x2, y2) {
    let context = this.context
    // 绘制调节bezier曲线的两个点
    context.beginPath()
    context.moveTo(x1, y1)
    context.arc(x1, y1, 1.5, 0, 2 * Math.PI, false)
    context.moveTo(x2, y2)
    context.arc(x2, y2, 1.5, 0, 2 * Math.PI, false)
    context.fillStyle = '#ffffff'
    context.fill()
    context.closePath()
  }
  drawBezier(x1, y1, x2, y2) {
    let context = this.context
    // 绘制bezier曲线
    context.beginPath()
    context.moveTo(this.startX, this.startY)
    context.bezierCurveTo(x1, y1, x2, y2, this.endX, this.endY)
    context.lineWidth = this.settings.bezier.lineWidth
    context.strokeStyle = this.settings.bezier.strokeStyle
    context.stroke()
    context.closePath()
  }
  draw(data) {
    if (this.standard) {
      this.draw = function (data) {
        let x1 = data[0] * this.width + this.startX
        let y1 = this.startY - data[1] * this.height
        let x2 = data[2] * this.width + this.startX
        let y2 = this.startY - data[3] * this.height
        this.clear()
        this.drawBorder()
        this.drawLinklines(x1, y1, x2, y2)
        this.drawStandardLine()
        this.drawBezier(x1, y1, x2, y2)
      }
      this.draw(data)
    } else {
      this.draw = function (data) {
        let x1 = data[0] * this.width + this.startX
        let y1 = this.startY - data[1] * this.height
        let x2 = data[2] * this.width + this.startX
        let y2 = this.startY - data[3] * this.height
        this.clear()
        this.drawParamsPoints(x1, y1, x2, y2)
        this.drawLinklines(x1, y1, x2, y2)
        this.drawBezier(x1, y1, x2, y2)
      }
      this.draw(data)
    }
  }
  clear() {
    let canvas = this.context.canvas
    this.context.clearRect(0, 0, canvas.width, canvas.height)
  }
}

export default BezierDrawer
