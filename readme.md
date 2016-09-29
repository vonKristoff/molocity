#Molocity

A mouse velocity class. This will track the mouse movement as a `vector` and return the current **velocity** based on **acceleration** and any other forces it can be initiated with. 

#### setup
Create a new instance

	import mv from './molocity'
	
	mv.init({})
Attach to the window

	window.addEventListner('mousemove', mv.render.omMove)
Bind to app animation loop

	function loop() {
		mv.render.cycle()
		update(mv.vector()) // app update
		requestAnimationFrame(loop)
	}

---

#### public methods

* `init({ friction, min, max, scale })` : create new instance with all params optional
*  `render`
	*  	`cycle` : pass to animation loop
	* 	`onMove`: pass to **mousemove** listener
* `vector` : returns the mouse vector as an object
	* `direction` : `{ x: 1 || -1, y: 1 || -1 }`
	* `acceleration` : `{ x,y }`
	* `velocity` : `{ x,y }`
	* `deltaTime` : `float`
	
#### App update
	function update(v) {
	
		this.position += v.velocity	
	}
	update(mv.vector())