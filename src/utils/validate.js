const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

function checkID(id) {
  /**
   * This function is used to check if the id passe in is valid
   */

  if (ObjectId.isValid(id)) {
    return true;
  } else {
    return false;
  }
}

module.exports = { checkID };
