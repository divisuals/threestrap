import { Bootstrap } from "../bootstrap.js";

Bootstrap.registerPlugin("fallback", {
  defaults: {
    force: false,
    fill: true,
    begin:
      '<div class="threestrap-fallback" style="display: table; width: 100%; height: 100%;' +
      'box-sizing: border-box; border: 1px dashed rgba(0, 0, 0, .25);">' +
      '<div style="display: table-cell; padding: 10px; vertical-align: middle; text-align: center;">',
    end: "</div></div>",
    message:
      "<big><strong>This example requires WebGL</strong></big><br>" +
      'Visit <a target="_blank" href="http://get.webgl.org/">get.webgl.org</a> for more info</a>',
  },

  install: function (three) {
    let cnv, gl;
    try {
      cnv = document.createElement("canvas");
      gl = cnv.getContext("webgl") || cnv.getContext("experimental-webgl");
      if (!gl || this.options.force) {
        throw "WebGL unavailable.";
      }
      three.fallback = false;
    } catch (e) { // eslint-disable-line no-unused-vars
      const message = this.options.message;
      const begin = this.options.begin;
      const end = this.options.end;
      const fill = this.options.fill;

      const div = document.createElement("div");
      div.innerHTML = begin + message + end;

      this.children = [];

      while (div.childNodes.length > 0) {
        this.children.push(div.firstChild);
        three.element.appendChild(div.firstChild);
      }

      if (fill) {
        three.install("fill");
      }

      this.div = div;
      three.fallback = true;
      return false; // Abort install
    }
  },

  uninstall: function (three) {
    if (this.children) {
      this.children.forEach(function (child) {
        child.parentNode.removeChild(child);
      });
      this.children = null;
    }

    delete three.fallback;
  },
});
