/**
 * AutoScroller
 * Implementation of Bart Stroeken's ProximityController
 * 
 * Scrolls the content the content of a container according to the position of the mouse within it
 * 
 * This version was developed with PrototypeJS 1.6
 * 
 * @author Bart Stroeken
 */
var AutoScroller = Class.create(ProximityController, {

	/**
	 * Instantiate the autoscroller with the id of the target-element
	 * Options are not required.
	 */
	initialize: function($super, id, options) {
		return $super(id,options);
	},

	/**
	 * Performs the actual scroll. 
	 * and calls itself after an interval
	 * 
	 * if the scrollable flag is unset, the method will abort
	 */
	execute: function() {
		if (this.observed === false){
			return;
		}

		if (this.options.active == 'x' || this.options.active == 'both'){
			newpos_x = this.target.scrollLeft - this.proximity.x;
			this.target.scrollLeft = newpos_x;
		}

		if (this.options.active == 'y' || this.options.active == 'both') {		
			newpos_y = this.target.scrollTop - this.proximity.y;
			this.target.scrollTop = newpos_y;
		}
		this.execute.bind(this).delay(this.options.interval);
	}

});