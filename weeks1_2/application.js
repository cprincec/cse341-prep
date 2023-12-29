const mongodb = require("./db/connect");
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const router = require("express").Router();

app.use(bodyParser.json());

router.get("/books", async (req, res) => {
    let books = await mongodb.getDb().db(dbname).collection("books").find({});
    books.toArray().then((booksList) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(booksList);
    });
});
router.post("books", async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        publicationDate: req.body.publicationDate,
        totalPages: req.body.totalPages,
    };
    let result = await mongodb.getDb().db(dbname).collection("books").insertOne(book);
    if (result.acknowledged) {
        res.status(201).json(result.insertedId);
    } else {
        res.status(500).json(result.error || "Some error occurred while adding book.");
    }
});

router.delete("books/:id", async (req, res) => {
    const id = new ObjectId(req.params.id);

    let result = await mongodb.getDb().db(dbname).collection("books").deleteOne({ _id: id });
    if (result.deletedCount) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || "Error deleting book.");
    }
});

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, console.log(`Server running at port ${port} and  database connected`));
    }
});
