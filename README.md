# Angular 2/Typescript Math Toolkit Custom Pipes Demo

This demo exercises the Typescript Math Toolkit *NumberFormatter* class both in a standalone context and implementation of a custom Angular 2 Pipe.  This pipe displays numbers in scientific notation, i.e. 1.237 x 10^3.  Although rather basic, the template makes use of *ngModel*, *ngIf*, and several change handlers.

Since this is a basic demo, the application is built in 'dev' mode only.  If you are interested in creating production (bundled) A2 applications without use of a third-party bundler, then the [statistical analysis of tabular data] demo should be of interest.

Note that while the demo uses classes from the Typescript Math Toolkit, the entire library is not included with the source distribution.  Each class used in the demo was manually moved out of the TSMT and placed in the *src/lib* folder.

Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Angular 2: Beta 13

## Installation

Installation involves all the usual suspects

  - npm and gulp installed globally
  - Clone the repository
  - npm install
  - get coffee (this is the most important step)

## Introduction

The goals of this demo are 

* Illustrate usage of Typescript Math Toolkit computational classes in an actual application setting
* Add to the body of knowledge on how to create and run Angular 2/Typescript applications
* Show how to implement a reusable, custom Angular 2 pipe
* Create an excuse for another cup of coffee

I hope that you find something instructive from the code and are interested in improving the demo in some way.

### Version
1.0.0

### Building and Running the demo

All source files are provided in a *src* folder.  Gulp is used to build and run the demo.  Available development and tasks are summarized below.

```sh
$ gulp clean (deletes everything in the dev folder)
$ gulp copy:html (copies the index.html file from /src to /dev)
$ gulp copy:templates (copies all angular 2 templates files into dev folder)
$ gulp copy:css (copies all css files into dev folder - you can add a build step if you like SaSS)
$ gulp copy:assets (copies all visual assets into dev folder)
$ gulp copy:framework (copies all Angular 2 framework files into appropriate location - should only need to be done once)
$ gulp tslint (lints all Typescript files in the source)
$ gulp compile (compiles all src .ts files and places them in the appropriate build location)
$ gulp serve (launch a browser and run the application while watching for file changes)
$ gulp copy:all (copies everything except the framework files)
$ gulp build:all (build a complete, ready-to-run application)
```

After installing the demo, execute _gulp build:all_ to create a ready-to-run application in the *dev* folder.  Execute _gulp serve_ to serve up the application and run the debug version of the demo.  After loading, enter a number into the input box.  The number will be formatted as-you-type using the Typescript Math Toolkit number formatter.  You may also select to insert commas for large numbers and experiment with rounding to the nearest tenth, half, and one for smaller numbers.

![Image of Custom Pipes Demo]
(http://algorithmist.net/image/pipe.jpg)

Scientific notation formatting is implemented as a custom Angular 2 pipe.  The implementation is fully reusable and resides in the *pipes* folder.  A reusable number validator is injected into the main component (see the *validators* folder).  Custom pipes and validators will be a part of the final production release of the Typescript Math Toolkit.

Afterwards, you need only execute the specific task needed for any modifications, and modification is recommended :)

The demo has been tested in late-model Chrome on a Mac. 


### Contributions

Contributions and coffee are highly encouraged as I believe the best demo is one that allows ample room for improvement. In particular, the UI could use some visual enhancement :)

Unless it is a very tiny mod or bug fix, please place your complete source in a new folder, i.e. 'using-jspm' or 'new-framework'.  Submit pull requests to theAlgorithmist [at] gmail [dot] com.


License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <https://www.linkedin.com/in/jimarmstrong>
[statistical analysis of tabular data]: <https://github.com/theAlgorithmist/Table>
