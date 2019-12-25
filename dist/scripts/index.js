"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
var index_1 = __importDefault(require("../lib/index"));
var l = new index_1.default();
var Oneliner = /** @class */ (function () {
    function Oneliner(config) {
        this.cwd = process.cwd();
        this.command = config.command;
        this.script = config.script;
        this.args = config.args;
    }
    Oneliner.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.script;
                        return [4 /*yield*/, this.getOption(this.args)];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    Oneliner.prototype.getOption = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer_1.default.prompt(args)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Oneliner;
}());
exports.Oneliner = Oneliner;
// to be state less class
exports.Script = {
    echo: function (_a) {
        var msg = _a.msg;
        l.stdout(msg);
    },
    search: function (_a) {
        var target = _a.target;
        var files = l.filterFiles(target);
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var f = files_1[_i];
            l.stdout(f);
        }
    },
    createSnapshottestFileOfReact: function (_a) {
        var match = _a.match;
        return __awaiter(_this, void 0, void 0, function () {
            var files, _i, files_2, f, data, outputFilepath, filename, componentName, outputData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        files = l.filterFiles(/(jsx$)/);
                        _i = 0, files_2 = files;
                        _b.label = 1;
                    case 1:
                        if (!(_i < files_2.length)) return [3 /*break*/, 5];
                        f = files_2[_i];
                        return [4 /*yield*/, l.readf(f)];
                    case 2:
                        data = _b.sent();
                        if (f.match('.test.')) {
                            return [3 /*break*/, 4];
                        }
                        if (!data.match(match)) return [3 /*break*/, 4];
                        outputFilepath = f.replace(/(.*?)\.(jsx$)/, '$1.test.$2');
                        filename = l.getFilename(f);
                        componentName = l.pascalCase(filename.replace(/(.*?)\.(jsx$)/, '$1'));
                        outputData = "import React from 'react';\nimport " + componentName + " from './" + filename + "';\nimport renderer from 'react-test-renderer';\n\nit('renders correctly', () => {\n  const props = {};\n  const tree = renderer.create(<" + componentName + " {...props} />).toJSON();\n  expect(tree).toMatchSnapshot();\n});";
                        return [4 /*yield*/, l.writef(outputFilepath, outputData)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    // ただの grep sed できはするがインターフェース重視
    replaceElementClassName: function (_a) {
        var targetFile = _a.targetFile, fileType = _a.fileType;
        return __awaiter(_this, void 0, void 0, function () {
            var d, classList, files, _i, files_3, f, data, _b, classList_1, c;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, l.readf(l.abpath(targetFile))];
                    case 1:
                        d = _c.sent();
                        classList = d.split('\n,');
                        files = l.filterFiles(fileType);
                        _i = 0, files_3 = files;
                        _c.label = 2;
                    case 2:
                        if (!(_i < files_3.length)) return [3 /*break*/, 5];
                        f = files_3[_i];
                        return [4 /*yield*/, l.readf(f)];
                    case 3:
                        data = _c.sent();
                        for (_b = 0, classList_1 = classList; _b < classList_1.length; _b++) {
                            c = classList_1[_b];
                            if (data.match(c)) {
                                l.stdout(f);
                                data = data.replace(c, '');
                                l.writef(f, data);
                            }
                        }
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    replaceCabab2camel: function (_a) {
        var target = _a.target, output = _a.output;
        return __awaiter(_this, void 0, void 0, function () {
            var files, targetRegExp, _i, files_4, f, data, a, b, c;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        files = l.filterFiles(/\.jsx$/);
                        targetRegExp = new RegExp(target, 'mg');
                        _i = 0, files_4 = files;
                        _b.label = 1;
                    case 1:
                        if (!(_i < files_4.length)) return [3 /*break*/, 5];
                        f = files_4[_i];
                        return [4 /*yield*/, l.readf(f)];
                    case 2:
                        data = _b.sent();
                        if (!data.match(targetRegExp)) return [3 /*break*/, 4];
                        data.replace(targetRegExp, '$1');
                        a = l.pascalCase(RegExp.$1);
                        b = output.replace('$1', a);
                        c = data.replace(targetRegExp, b);
                        return [4 /*yield*/, l.writef(f, c)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
};
