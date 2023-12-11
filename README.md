Cyclobots
=========

_Try it online_ [@ catseye.tc](https://catseye.tc/installation/Cyclobots)
| _See also:_ [Chzrxl](https://codeberg.org/catseye/Chzrxl#chzrxl)
∘ [noit o' mnain worb](https://codeberg.org/catseye/noit-o-mnain-worb#noit-o-mnain-worb)

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

You can watch it online here: **[Cyclobots installation at catseye.tc][]**.

To run it locally, clone this repository and open
[demo/cyclobots.html](demo/cyclobots.html) in a web browser such as
Firefox.  (Note that, if opened as a local file, the browser may fall back
to canvas rendering; to ensure that WebGL is used, you can
[start a local server][], but to be frank it doesn't seem to make much difference
at this stage.)

The core behaviour is implemented in [src/cyclobots.js](src/cyclobots.js) and
does not rely on PixiJS or any other display layer.

The PixiJS driver and visuals are defined in
[demo/cyclobots-pixi-launcher.js](demo/cyclobots-pixi-launcher.js).

### History ###

The first implementation of Cyclobots, now lost, was in Visual Basic 3.0, in
1994.  (Let's call it version 1.0.)  Some things it supported that subsequent
implementations haven't yet replicated include:

*   the cyclobots would collide with each other; a cyclobot would be unable
    to pass through another cyclobot.
*   the user could click the left (or right) mouse button to attract (or repel)
    all the cyclobots towards (or away from) that point instead of each other.

In 2013, Cyclobots was [re-implemented in Javascript][], and this implementation
resided in the [HTML5 Gewgaws distribution][].  (Let's call this one version 2.0).

In 2019, this Javascript implementation was cleaned up and re-fitted to use
[PixiJS][], and that is the version in this repository (which we will call
version 2.1 or greater).  Since PixiJS uses WebGL when possible, this version
has the potential to have much nicer visuals than the previous versions;
however, it is still a work-in-progress in this regard.

[trefoil]: https://en.wikipedia.org/wiki/Trefoil_knot
[Cyclobots installation at catseye.tc]: https://catseye.tc/installation/Cyclobots
[HTML5 Gewgaws distribution]: https://catseye.tc/distribution/HTML5%20Gewgaws%20distribution
[PixiJS]: http://www.pixijs.com/
[start a local server]: https://web.archive.org/web/20190117102459/https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally#run-local-server
[re-implemented in Javascript]: https://catseye.tc/article/News.md#id-been-meaning-to-re-implement-this-for-ages
