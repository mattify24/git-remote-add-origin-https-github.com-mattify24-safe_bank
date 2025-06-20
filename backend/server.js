"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
const express_2 = require("express");
const router = (0, express_2.Router)();

router.get('/', (req, res) => {
    res.send('API is working');
});

router.post('/auth/register', (req, res) => {
    res.json({ message: 'Register endpoint working' });
});

router.post('/auth/login', (req, res) => {
    res.json({ message: 'Login endpoint working' });
});

exports.default = router;

dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;

app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error('MONGO_URI is not defined in environment variables.');
    process.exit(1);
}
(0, mongoose_1.connect)(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.use('/api', router);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });