var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const { DateTime } = require("luxon");

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  return this.family_name + ", " + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
  const date_of_death = this.date_of_death ? this.date_of_death.getYear() : new Date().getYear()
  const date_of_birth = this.date_of_birth ? this.date_of_birth.getYear() : new Date().getYear()
  return (
    date_of_death - date_of_birth
  ).toString();
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema.virtual("date_of_birth_input").get(function () {
  return this.date_of_birth ? `${this.date_of_birth.getFullYear()}-${('0' + (this.date_of_birth.getMonth() + 1)).slice(-2)}-${('0' + this.date_of_birth.getDate()).slice(-2)}` : '';
});

AuthorSchema.virtual("date_of_death_input").get(function () {
  return this.date_of_death ? `${this.date_of_death.getFullYear()}-${('0' + (this.date_of_death.getMonth() + 1)).slice(-2)}-${('0' + this.date_of_death.getDate()).slice(-2)}` : '';
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

//Export model
module.exports = mongoose.model("Author", AuthorSchema);
