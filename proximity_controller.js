/**
 * ProximityController
 * 
 * UI directive controller
 * The cursors' position from the targets' center, and its proximity towards it, determines the controllers' value
 * Instantiate with target id and options-object. 
 * 
 * This version was developed for PrototypeJS 1.6
 * 
 * @author Bart Stroeken
 */

var ProximityController = Class.create({
	
	/** 
	 * Target Element
	 */
	target:null,
	
	/**
	 * Options object
	 *  - control_factor
	 *  - interval for recalling the scroll (in seconds)
	 *  - active: x, y or both. 
	 */
	options: {
		control_factor: {
			x : 5,
			y : 5
		},
		interval: 0.1,
		active: 'both'
	},

	/**
	 * The calculated center of the target
	 */
	centerpoint: {
		x : null,
		y : null
	},
	
	/**
	 * The horizontal and vertical differences
	 */
	difference: {
		x : null,
		y : null
	},
	
	/**
	 * The proximity: the difference corrected with the weight factor from the options-object
	 */
	proximity: {
		x : null,
		y : null
	},
	
	/**
	 * Instntiote with a target id, and an options-object
	**/
	initialize: function(id, options){
		var el = $(id);
		if (!el) {
			return false;
		}
		
		Object.extend(this.options, options || {});
		
		this.target = el;
		this.target.observe('mouseover', this.startObserving.bind(this));
		this.target.observe('mouseout', this.stopObserving.bind(this));
		/**
		 * @TODO Bubbling fix for mouseover/mouseout-events
		 *
		 * Find the centerpoint of the target element for reference
		 */
		var measure_point = this.target.viewportOffset();
		this.centerpoint.x = measure_point[0] + (this.target.getWidth()/2);
		this.centerpoint.y = measure_point[1] + (this.target.getHeight()/2);
	},
	
	/**
	 * Adds an event handler for changing the scrolling speed,
	 * sets a flag, and calls the actual scroll-function
	 */
	startObserving: function(event){
		this.target.observe('mousemove', this.recalculateProximity.bind(this));
		this.observed = true;
		this.recalculateProximity(event)
		this.execute();
	},
	
	/**
	 * Removes the eventhandler for speed control, and unsets the scrollable-flag
	 */
	stopObserving: function(){
		this.target.stopObserving('mousemove', this.recalculateProximity.bind(this));
		this.observed = false;
	},
	
	/**
	 * Speed controller
	 */
	recalculateProximity: function(event){
		this.difference.x = this.centerpoint.x - event.pointerX();
		this.difference.y = this.centerpoint.y - event.pointerY();
		// @todo speed laten afhangen van hoe ver je bij 't einde zit.
		this.proximity.x = (this.difference.x)/(this.centerpoint.x/2)* this.options.control_factor.x;
		this.proximity.y = (this.difference.y)/(this.centerpoint.y/2)* this.options.control_factor.y;
	},
	
	execute: function(){
	}
});
