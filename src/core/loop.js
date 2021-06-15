import * as THREE from "three";
import "../bootstrap";

THREE.Bootstrap.registerPlugin("loop", {
  defaults: {
    start: true,
    each: 1,
  },

  listen: ["ready"],

  install: function (three) {
    this.running = false;

    three.Loop = this.api(
      {
        start: this.start.bind(this),
        stop: this.stop.bind(this),
        running: false,
      },
      three
    );

    this.events = ["pre", "update", "render", "post"].map(function (type) {
      return { type: type };
    });
  },

  uninstall: function (three) {
    this.stop(three);
  },

  ready: function (event, three) {
    if (this.options.start) this.start(three);
  },

  start: function (three) {
    if (this.running) return;

    three.Loop.running = this.running = true;

    var trigger = three.trigger.bind(three);
    var frames = 0;
    var loop = function () {
      this.running && requestAnimationFrame(loop);
      frames = (frames + 1) % Math.max(1, this.options.each);
      if (frames == 0) {
        this.events.map(trigger);
      }
    }.bind(this);

    requestAnimationFrame(loop);

    three.trigger({ type: "start" });
  },

  stop: function (three) {
    if (!this.running) return;
    three.Loop.running = this.running = false;

    three.trigger({ type: "stop" });
  },
});
