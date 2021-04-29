const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [{ model: Product, as: "products" }]
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: "products" }]
    });

    if(!category) {
      res.status(404).json({ message: "There is no category with this id." });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500),json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500),json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, 
      {where: {id: req.params.id} 
    });

    if(!category) {
      res.status(404).json({ message: "There is no category with this id."});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {id: req.params.id}
    });
    if(!category) {
      res.status(404).json({ message: "There is no category with this id." });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500),json(err);
  }
});

module.exports = router;
