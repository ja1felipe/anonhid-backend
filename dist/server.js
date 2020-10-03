"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.default.listen(process.env.PORT || 3333, () => {
  console.log(`server funcionando na porta ${process.env.PORT || 3333}`);
});