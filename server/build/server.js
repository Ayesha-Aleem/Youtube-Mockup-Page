"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var dotenv_1 = __importDefault(require("dotenv"));
var app = (0, express_1.default)();
var cors_1 = __importDefault(require("cors"));
var port = 9000;
var apiKey = 'AIzaSyDrUn2utkRdkq_Nj0dkodgiDknJZ_QtqIU';
var baseApiUrl = "https://www.googleapis.com/youtube/v3";
var google = require('googleapis').google;
var youtube = google.youtube({
    version: 'v3',
    auth: apiKey,
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
//https://www.googleapis.com/youtube/v3/search?key=apiKey&type=video&partsnippet&q=foo
app.get("/", function (req, res) {
    res.send("Hello from our api");
});
app.get("/search", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var searchQuery, urls, response, description, url, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                searchQuery = req.query.search_query;
                urls = "".concat(baseApiUrl, "/search?key=").concat(apiKey, "&type=video&part=snippet&q=").concat(searchQuery);
                return [4 /*yield*/, axios_1.default.get(urls)];
            case 1:
                response = _a.sent();
                console.log(response);
                description = response.data.items.map(function (item) { return item.snippet.description; });
                url = response.data.items.map(function (item) { return item.snippet.thumbnails.medium.url; });
                res.send({ description: description, url: url });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/search-with-googleapis", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var searchQuery, response, titles;
    return __generator(this, function (_a) {
        try {
            searchQuery = req.query.search_query;
            response = youtube.search.list({
                part: 'snippet',
                q: searchQuery
            });
            titles = response.data.items.map(function (item) { return item.snippet.title; });
            console.log(titles);
        }
        catch (err) {
            next(err);
        }
        return [2 /*return*/];
    });
}); });
app.listen(port, function () {
    console.log("App is running on port ".concat(port));
});
