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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var shelljs_1 = __importDefault(require("shelljs"));
var chalk_1 = __importDefault(require("chalk"));
var fsutil = /** @class */ (function () {
    function fsutil() {
    }
    /**
     * `fs.readFile` と `encoding: 'utf8'`の Promise ラッパー
     * @method
     */
    fsutil.prototype.readf = function (filepath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return fs_1.default.readFile(filepath, { encoding: 'utf8' }, function (err, data) {
                            return err ? reject(err) : resolve(data);
                        });
                    })];
            });
        });
    };
    /**
     * `fs.writeFile`の Promise ラッパー
     * @method
     */
    fsutil.prototype.writef = function (filepath, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return fs_1.default.writeFile(filepath, data, function (err) {
                            return err ? reject(err) : resolve();
                        });
                    })];
            });
        });
    };
    /**
     * キャメルケースへ変換 sampleString
     * @method
     */
    fsutil.prototype.camelCase = function (str) {
        str = str.charAt(0).toLowerCase() + str.slice(1);
        return str.replace(/[-_](.)/g, function (match, group1) {
            return group1.toUpperCase();
        });
    };
    /**
     * スネークケースへ変換 sample_string
     * @method
     */
    fsutil.prototype.snakeCase = function (str) {
        var camel = this.camelCase(str);
        return camel.replace(/[A-Z]/g, function (s) {
            return '_' + s.charAt(0).toLowerCase();
        });
    };
    /**
     * パスカルケースへ変換 SampleString
     * @method
     */
    fsutil.prototype.pascalCase = function (str) {
        var camel = this.camelCase(str);
        return camel.charAt(0).toUpperCase() + camel.slice(1);
    };
    /**
     * filepath から filename を所得
     * @method
     */
    fsutil.prototype.getFilename = function (filepath) {
        return path_1.default.basename(this.abpath(filepath));
    };
    /**
     * filepath から filename を所得
     * @method
     */
    fsutil.prototype.abpath = function (filepath) {
        return path_1.default.resolve(process.cwd(), filepath);
    };
    /**
     * @method
     */
    fsutil.prototype.filterFiles = function (match) {
        return this.getUnderlayerFiles().filter(function (f) { return f.match(match); });
    };
    /**
     * @method
     */
    fsutil.prototype.getUnderlayerFiles = function () {
        return shelljs_1.default.find(process.cwd());
    };
    /**
     * @method
     */
    fsutil.prototype.stdout = function (msg) {
        process.stdout.write(chalk_1.default.green(msg + '\n'));
    };
    return fsutil;
}());
exports.default = new fsutil();
