const mongoose = require("mongoose");
const Campsite = require("./models/campsite");

const url = "mongodb://localhost:27017/nucampsite";
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connect.then(() => {
    console.log("Connected correctly to server");

    Campsite.create({
        name: "React Lake Campground2",
        description: "testhello",
    })
        .then((campsite) => {
            console.log(campsite);

            return Campsite.findByIdAndUpdate(
                campsite._id,
                {
                    $set: { description: "Updated Test Document" },
                },
                { new: true }
            );
        })
        .then((campsite) => {
            console.log(campsite);

            campsite.comments.push({
                rating: 2,
                text: "What a shitty view!",
                author: "Billy Boi",
            });

            return campsite.save();
        })
        .then((campsite) => {
            console.log(campsite);
            return Campsite.deleteMany();
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
            mongoose.connection.close();
        });
});
