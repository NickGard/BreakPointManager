/**
* BreakPointManager
* 
* Add classes to the html element to denote page width breakpoints, which are added as defaults in this 
* file (see {@link window.breakPointManager.breakpoints}), or later via a call to the function {@link 
* window.breakPointManager.addBreakPoints}.  
* 
* @example window.breakPointManager.addBreakPoints(['768','1024','1100']);
* @example <html class="lt768 lt1024 lt1100"> //if the window is 500px wide
* @example <html class="gt768 e1024 lt1100"> //if the window is 1024px wide
* @example <html class="gt768 gt1024 lt1100"> //if the window is 1080px wide

* CSS for a rule that changes the background color from black to red at widths at and above 1024 
* would look like this:
* 
* @example .e1024 body, .gt1024 body { background-color: red; }
* Or:
* @example body { background-color: red; }
* @example .lt1024 body { background-color: black; }
* Alternatively, if you have set 1023 as a breakpoint:
* @example .gt1023 body { background-color: red; }
* 
* @author Nick.Gard.dev@gmail.com
*/
window.breakPointManager = (function(window, document){

	/**
	* The class-name prefixes for the breakpoints
	* @constant
	*/
	var PREFIXES = {
		LESS_THAN : 'lt',
		GREATER_THAN : 'gt',
		EQUAL : 'e'
	},
	
	/**
	* The array of breakpoints to be used.  Modify the value of this array here to include
	* any global breakpoints (breakpoints that will be used on EVERY PAGE this file is included).
	*  
	* @example breakPoints : ['768','1024','1140'], 
	* @desc Set the default breakpoints.
	*
	* @type {Array<String>}
	*/
	breakPoints = [],
	
	/**
	* Ensures that the breakpoint to add is actually a number and is not already in the 
	* breakPoints array before adding it AS A STRING to the breakPoints array.
	* @private
	* @param {String|Number} bp The breakpoint to add
	*/
	addUniqueBreakPoint = function(bp){
		if( !isNaN(+bp) && !hasBreakPoint(bp) ){
			breakPoints.push(''+bp);
		}
	},
	
	/**
	* Adds new breakpoints to the current page.  The appropriate classes will be appended by
	* this method finishes.  This method should be called as soon as the DOM loads on the page.  
	* For common/global breakpoints see the comment and example on {@link breakPoints}.
	* 
	* @public
	* @param {String|Number|Array<String,Number>} bp The breakpoint(s) to add for this page.
	*/
	addBreakPoints = function(bp){
		var i,
		l;
		
		if(typeof bp === 'string' || typeof bp === 'number'){
			addUniqueBreakPoint(bp);
		} else if(bp instanceof Array){
			for(i=0, l=bp.length; i<l; i++){
				addUniqueBreakPoint(bp[i]);
			}
		} 
		updateClasses();
	},
	
	/**
	* Returns true if and only if the breakpoint already exists in the breakPoints array.
	* @public
	* @param {String|Number} bp The breakpoint to check
	* @returns {boolean}
	*/
	hasBreakPoint = function(bp){
		return breakPoints.indexOf(''+bp) !== -1;
	}
	
	/**
	* Compares the breakpoints to the current window width and modifies the class attribute
	* of the html element with the appropriate classes.
	* @public
	*/
	updateClasses = function(){
		var windowWidth = (document.documentElement || document.body).clientWidth,
		htmlEl = document.getElementsByTagName('html')[0],
		currentClasses = htmlEl.className,
		classesToAdd = [],
		classesToRemove = [],
		bp,
		i, 
		l;
		
		//Construct lists of classes to remove and classes to add
		for(i=0, l=breakPoints.length; i<l; i++){
			bp = breakPoints[i];
			if( windowWidth > bp ){
				classesToAdd.push( PREFIXES.GREATER_THAN + bp );
				classesToRemove.push(PREFIXES.LESS_THAN + bp);
				classesToRemove.push(PREFIXES.EQUAL + bp);
			} else if( windowWidth < bp ){
				classesToAdd.push( PREFIXES.LESS_THAN + bp );
				classesToRemove.push(PREFIXES.GREATER_THAN + bp);
				classesToRemove.push(PREFIXES.EQUAL + bp);
			} else {
				classesToAdd.push( PREFIXES.EQUAL + bp );
				classesToRemove.push(PREFIXES.LESS_THAN + bp);
				classesToRemove.push(PREFIXES.GREATER_THAN + bp);
			}
		}
		
		//Remove classes
		for(i=0, l=classesToRemove.length; i<l; i++){
			currentClasses = currentClasses.replace(classesToRemove[i], '');
		}
		//Add classes
		for(i=0, l=classesToAdd.length; i<l; i++){
			if(currentClasses.indexOf(classesToAdd[i]) === -1){
				currentClasses += ' '+classesToAdd[i];
			}
		}
		htmlEl.className = currentClasses.replace(/\s+/g, ' ');;
	};
	
	return {
		addBreakPoints : addBreakPoints,
		hasBreakPoint : hasBreakPoint,
		updateClasses : updateClasses
	}
})(this, this.document);

(function beginResizeListener(window){
	window.breakPointManager.updateClasses();
	window.addEventListener('resize', window.breakPointManager.updateClasses, false);
})(this);