const freeze = 0.0001
var instance = null,
    frameTime = 0

export default {
    init(config) {
        instance = new Mouse(config)
    },
    render: {
        onMove(e) {
            instance.updateMouse({x: e.clientX, y: e.clientY })
        },
        cycle() {
            instance.cycle()
        }
    },
    vector() {
        return instance
    }
}

class Mouse {
    constructor({friction = .9, min = .1, max = 1, scale = 100, canvas = null }) {
        this._position = new Vector()
        this.position = new Vector()
        this.acceleration = new Vector()
        this.velocity = new Vector()
        this.time = 0
        this.scale = scale
        this.min = min
        this.max = max
        this.friction = friction
        this.deltaTime = 0
    }
    updateMouse(position) {
        this.time = Date.now()
        this._position.feed(this.position)
        this.position.feed(position)
        this.acceleration.feed({
            x: this.position.x - this._position.x,
            y: this.position.y - this._position.y
        })
        this.direction = this.getDirection()
    }
    getDirection() {
        return {
            x: (this.position.x > this._position.x) ? 1 : -1,
            y: (this.position.y > this._position.y) ? 1 : -1
        }
    }
    update(mt) {
        frameTime = Date.now()
        if(mt < this.deltaTime) {
            // mousemove
            // this.acceleration.normalise()
            // this.acceleration.scale(this.scale)
            // this.acceleration.divide(this.deltaTime)
            // this.acceleration.scale(this.scale)
            // console.log('before',this.acceleration.x)
            // this.acceleration.limit(this.min, this.max)

            // this.acceleration.limit(this.min, this.max)
            // console.log('after',this.acceleration.x)
            this.velocity.add(this.acceleration)
            // this.velocity.limit(this.min, this.max)
                        
        } else {
            // mousestop
            this.velocity.scale(this.friction)
        }
        
    }
    capture() {
        return this.velocity
    }
    cycle() {
        let now = Date.now(),            
            mouseTime = now - this.time
        this.deltaTime = now - frameTime
        this.update(mouseTime)
    }
}

class Vector {
    constructor() {
        this.x = 0
        this.y = 0
    }
    feed({ x,y }) {
        this.x = x
        this.y = y
    }
    add({ x,y }) {
        this.x += x
        this.y += y
    }
    divide(val) {
        this.x /= val
        this.y /= val
    }
    limit(min, max) {
        var mag = this.magnitude()
        // console.log(mag, max*max)
        // if(mag > min*min) {
        //   this.divide(mag)
        //   this.scale(min)
        // }
        if(mag > max*max) {
          this.divide(mag)
          this.scale(max)
        }
    }
    scale(n) {
        this.x *= n
        this.y *= n
    }
    magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y))
    }
    normalise() {
        var m = this.magnitude()
        if(m != 0) {
            this.divide(m)
        }
    }
}