const Booking = require("./Booking");
const City = require("./City");
const Hotel = require("./Hotel");
const Image = require("./Image");
const Review = require("./Review");
const User = require("./User");


Hotel.belongsTo(City);
City.hasMany(Hotel);

Hotel.hasMany(Image);
Image.belongsTo(Hotel);

Booking.belongsTo(User);
User.hasMany(Booking);

Hotel.hasMany(Booking);
Booking.belongsTo(Hotel);

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Hotel);
Hotel.hasMany(Review);
