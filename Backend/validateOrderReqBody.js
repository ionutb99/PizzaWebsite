const validateReq = (req) => {
  let count = 0;

  console.log(req);
  for (const key in req[0]) {

    switch (key) {
      case `pizzas`:
        for (const value in req[0][key][0]) {
          if (parseInt(req[0][key][0][value]) != NaN) {
            ++count;
          }
        }
        break;
      case `date`:
        for (const value in req[0][key]) {
          if (parseInt(req[0][key][value]) != NaN) {
            ++count;
          }
        }
        break;
      case `customer`:
        for (const value in req[0][key]) {
          if (typeof req[0][key][value] != `object`) {
            if (isNaN(parseInt(req[0][key][value]))) {
              ++count;
            }
          } else {
            for (const value2 in req[0][key][value]) {
              if (isNaN(parseInt(req[0][key][value][value2]))) {
                ++count;
              }
            }
          }
        }
      default:
        break;
    }
  }


  if (count === 11) {
    return true;
  }
  return false;
};

module.exports = validateReq;
