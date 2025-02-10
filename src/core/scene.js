import { Scene } from "three";
import { Bootstrap } from "../bootstrap.js";

Bootstrap.registerPlugin("scene", {
  install: function (three) {
    three.scene = new Scene();
  },

  uninstall: function (three) {
    delete three.scene;
  },
});
