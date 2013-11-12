BreakPointManager
=================

JavaScript file that sets width classes for use in responsive design

Add classes to the html element to denote page width breakpoints, which are added as defaults in this 
file (see window.breakPointManager.breakpoints), or later via a call to the function 
window.breakPointManager.addBreakPoints.  

example: 

    window.breakPointManager.addBreakPoints(['768','1024','1100']);

    <html class="lt768 lt1024 lt1100"> //if the window is 500px wide
    <html class="gt768 e1024 lt1100"> //if the window is 1024px wide
    <html class="gt768 gt1024 lt1100"> //if the window is 1080px wide

CSS for a rule that changes the background color from black to red at widths at and above 1024 
would look like this:

    .e1024 body, .gt1024 body { background-color: red; }
    
  Or:

    body { background-color: red; }
    .lt1024 body { background-color: black; }

  Alternatively, if you have set 1023 as a breakpoint:

    .gt1023 body { background-color: red; }
