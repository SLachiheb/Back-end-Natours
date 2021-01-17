const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8')
);

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' });
  next();
};

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: { results: tours.length, tours },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find(el => el.id === +req.params.id);
  if (tour === undefined)
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  else
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newId }, req.body);
  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    _ => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTours },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here ...>' },
  });
};

exports.deleteTour = (_, res) => {
  res.status(204).json({ status: 'success', data: null });
};
