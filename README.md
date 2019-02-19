Cyclobots
=========

![screenshot](https://static.catseye.tc/images/screenshots/Cyclobots.jpg)

This is the reference distribution for **Cyclobots**, a dynamical system
desk toy automaton thing put together by Chris Pressey in 1994.  It consists
of a number of virtual turtle robots called "cyclobots".  Each cyclobot moves
forward with a constant velocity, but constantly adjusts its trajectory to try
to follow exactly one other cyclobot.  No cyclobot is followed by more than one
cyclobot.

A group of cyclobots tends to fall into one of several semi-stable patterns.
The simplest of these is just a rotating circle, but more complex,
[trefoil][]-like patterns are common.

You can watch it online here: [Cyclobots installation at catseye.tc][].
(But note that, as of this writing, this is not the version in this
repository; it is the version from the [HTML5 Gewgaws distribution][]).

Being built on [PixiJS][], the version in this repo has the potential to
have much nicer visuals; however, it is still a work-in-progress.
To see it, clone this repository and open
[demo/cyclobots.html](demo/cyclobots.html) in a web browser such as
Firefox.

(If opened as a local file, it may fall back to canvas rendering; to
ensure that WebGL is used, you can [start a local server][], but to be
frank it doesn't seem to make much difference at this point.)

(TODO: bring this implementation up to par with the other one, and install
this one online at catseye.tc instead.)

The core behaviour is implemented in [src/cyclobots.js](src/cyclobots.js) and
does not rely on PixiJS or any other display layer.

### History ###

The first implementation of Cyclobots, now lost, was in Visual Basic 3.0, in
1994.  In 2013 it was [re-implemented in Javascript][], and this implementation
can be found in the [HTML5 Gewgaws distribution][].  In 2019, the Javascript
implementation was re-fitted to use [PixiJS][], and that is the version in this
repository.

[trefoil]: https://en.wikipedia.org/wiki/Trefoil_knot
[Cyclobots installation at catseye.tc]: https://catseye.tc/installation/Cyclobots
[HTML5 Gewgaws distribution]: https://catseye.tc/distribution/HTML5%20Gewgaws%20distribution
[PixiJS]: http://www.pixijs.com/
[start a local server]: https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally#run-local-server
[re-implemented in Javascript]: https://catseye.tc/article/News.md#id-been-meaning-to-re-implement-this-for-ages
