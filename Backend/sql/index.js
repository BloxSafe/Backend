var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var Obfuscator = require("../module/obfuscator");
var Cooler = require("../module/cooler");
var rString = require("../module/rString");
var Cryptor = require("../module/crypt");
var MySQL = require("mysql2");
var path = require("path");
var fs = require("fs");
var Conn = MySQL.createConnection({
    host: "".concat(process.env.MYSQL_HOSTNAME),
    user: "".concat(process.env.MYSQL_USERNAME),
    password: "".concat(process.env.MYSQL_PASSWORD),
    database: "".concat(process.env.MYSQL_DATABASE_NAME),
});
var Master = /** @class */ (function () {
    function Master(data) {
        this["data"] = data;
        Conn.connect();
        fs.readdirSync("".concat(__dirname.replace(path.basename(__dirname), ""), "/databases")).forEach(function (table) {
            try {
                Conn.query(fs.readFileSync("".concat(__dirname.replace(path.basename(__dirname), ""), "/databases/").concat(table), "utf-8"), function (err, results) {
                    if (err) {
                        Cooler.red("Error Initializing MySQL Table '".concat(table, "'\n ").concat(err));
                    }
                    else {
                        Cooler.green("Successfuly Initialized MySQL Table '".concat(table, "'"));
                    }
                });
            }
            catch (err) {
                Cooler.red("Error Initializing MySQL Table '".concat(table, "', Error: ").concat(err));
            }
        });
    }
    /**
     * Create a new user
     */
    Master.prototype.createUser = function (data) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var prexists, token_1, hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data["username"] || !data["password"])
                            rej({ ErrCode: 400 });
                        return [4 /*yield*/, this.userByUsername(data["username"])
                                .then(function (data) {
                                return data["Data"].username || undefined;
                            })
                                .catch(function (err) {
                                Cooler.red(err);
                                return undefined;
                            })];
                    case 1:
                        prexists = _a.sent();
                        if (!!prexists) return [3 /*break*/, 3];
                        token_1 = rString(125);
                        return [4 /*yield*/, Cryptor.hash(data["password"])
                                .then(function (hash) {
                                return hash;
                            })
                                .catch(function (err) {
                                Cooler.red(err);
                                return undefined;
                            })];
                    case 2:
                        hash = _a.sent();
                        Conn.query("INSERT INTO users(username, password, token, created) VALUES(?, ?, ?, ?)", [data["username"], hash, token_1, new Date().getTime()], function (err, results) {
                            if (err) {
                                console.log(err);
                                rej({ ErrCode: 500 });
                            }
                            else {
                                res({ Success: true, Data: { token: token_1 } });
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        rej({
                            ErrCode: 409,
                            DisplayMessage: "An account with this username already exists",
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Get a user by login credentials
     */
    Master.prototype.getUser = function (username, password) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var user, passwowrdCorrect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!username || !password)
                            rej({ ErrCode: 400 });
                        return [4 /*yield*/, this.userByUsername(username)
                                .then(function (data) {
                                return data["Data"];
                            })
                                .catch(function (err) {
                                return undefined;
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, Cryptor.matchHash(password, user["password"])
                                .then(function (hash) {
                                return hash;
                            })
                                .catch(function (err) {
                                Cooler.red(err);
                                return undefined;
                            })];
                    case 2:
                        passwowrdCorrect = _a.sent();
                        if (passwowrdCorrect) {
                            res({ Data: { token: user.token, username: user.username } });
                        }
                        else {
                            rej({
                                ErrCode: 401,
                                DisplayMessage: "The password you entered was invalid",
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        rej({
                            ErrCode: 404,
                            DisplayMessage: "No account with this username exists",
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Get a user's data by a username.
     */
    Master.prototype.userByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        Conn.query("SELECT * FROM users WHERE LOWER(username) = ?", [username.toLowerCase()], function (error, results) {
                            if (error) {
                                rej({ ErrCode: 500 });
                            }
                            else {
                                if (results.length > 0) {
                                    res({ Data: results[0] });
                                }
                                else {
                                    rej({ ErrCode: 403 });
                                }
                            }
                        });
                    })];
            });
        });
    };
    /**
     * Get a user's data by a valid token.
     */
    Master.prototype.userByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        Conn.query("SELECT * FROM users WHERE token = ?", [token], function (error, results) {
                            if (error) {
                                rej({ ErrCode: 500 });
                            }
                            else {
                                if (results.length > 0) {
                                    res(results[0]);
                                }
                                else {
                                    rej({ ErrCode: 403 });
                                }
                            }
                        });
                    })];
            });
        });
    };
    /**
     * Add new script to database
     */
    Master.prototype.createScript = function (token, data) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = rString(13);
                this.userByToken(token)
                    .then(function (Owner) {
                    if (Owner) {
                        var name_1 = data["name"];
                        if (!name_1)
                            rej({ ErrCode: 400 });
                        var content = Cryptor.encrypt(data["content"]);
                        var obcontent = Cryptor.encrypt(Obfuscator(data["content"]));
                        Conn.query("INSERT INTO scripts(name, content, obfuscated_content, owner, id) VALUES(?, ?, ?, ?, ?)", [name_1, content, obcontent, Owner["username"], id], function (err, results) {
                            if (err) {
                                Cooler.red(err);
                                rej({ ErrCode: 500 });
                            }
                            else {
                                res({
                                    Data: { id: id },
                                });
                            }
                        });
                    }
                    else {
                        rej({ ErrCode: 403 });
                    }
                })
                    .catch(function (err) {
                    rej({ ErrCode: 403 });
                });
                return [2 /*return*/];
            });
        }); });
    };
    /**
     * Get script from database
     */
    Master.prototype.getScriptById = function (id) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Conn.query("SELECT * FROM scripts WHERE id = ?", [id], function (err, results) {
                    if (err) {
                        console.log(err);
                        rej({ ErrCode: 500 });
                    }
                    else {
                        if (results.length) {
                            var script = results[0];
                            script.content = Cryptor.decrypt(script.content);
                            script.obfuscated_content = Cryptor.decrypt(script.obfuscated_content);
                            if (script.private == true) {
                                delete script.content;
                            }
                            res({
                                Data: script,
                            });
                        }
                        else {
                            rej({ ErrCode: 404 });
                        }
                    }
                });
                return [2 /*return*/];
            });
        }); });
    };
    /**
     * Get user's scripts by username, private script contetn is removed
     */
    Master.prototype.getScriptsByUser = function (owner) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Conn.query("SELECT * FROM scripts WHERE LOWER(owner) = ?", [owner.toLowerCase()], function (err, results) {
                    if (err) {
                        console.log(err);
                        rej({ ErrCode: 500 });
                    }
                    else {
                        if (results.length) {
                            results = results.filter(function (script) {
                                delete script.content;
                                //  script.content = Cryptor.decrypt(script.content);
                                return script;
                            });
                            res({
                                Data: results,
                            });
                        }
                        else {
                            rej({ ErrCode: 404 });
                        }
                    }
                });
                return [2 /*return*/];
            });
        }); });
    };
    Master.prototype.getScriptsByToken = function (token) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var username;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userByToken(token)
                            .then(function (data) {
                            return data["username"] || undefined;
                        })
                            .catch(function (err) {
                            return undefined;
                        })];
                    case 1:
                        username = _a.sent();
                        if (username) {
                            this.getScriptsByUser(username)
                                .then(function (data) {
                                res({ Data: data["Data"] });
                            })
                                .catch(function (err) {
                                rej({ ErrCode: 404 });
                            });
                        }
                        else {
                            rej({ ErrCode: 403 });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Get user's APIs by token.
     */
    Master.prototype.getAPIsByToken = function (token) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.userByToken(token)
                    .then(function (Owner) {
                    if (Owner) {
                        if (Owner["username"]) {
                            _this.getAPIsByUsername(Owner["username"])
                                .then(function (results) {
                                res({ Data: results["Data"] });
                            })
                                .catch(function (err) {
                                rej({ ErrCode: err.errCode });
                            });
                        }
                        else {
                            rej({ ErrCode: 403 });
                        }
                    }
                    else {
                        rej({ ErrCode: 403 });
                    }
                })
                    .catch(function (err) {
                    rej({ ErrCode: 403 });
                });
                return [2 /*return*/];
            });
        }); });
    };
    /**
     * Get user's APIs by token. Never send back this data to client as response
     */
    Master.prototype.getAPIsByUsername = function (username) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Conn.query("SELECT * FROM apis WHERE owner = ?", [username], function (err, results) {
                    if (err) {
                        rej({ ErrCode: 500 });
                    }
                    else {
                        res({
                            Data: results,
                        });
                    }
                });
                return [2 /*return*/];
            });
        }); });
    };
    return Master;
}());
module.exports = new Master(require("../config/sql.json"));
