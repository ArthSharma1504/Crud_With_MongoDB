const express = require(`express`);
const Item = require(`../models/Item`);
const router = express.Router();

// to create a new route :
router.post('/', async(req,res)=>{
    try{
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    }catch(error){
        res.status(400).json({message : error.message});
    }
});

// route to get all the items:
router.get('/',async (req,res)=>{
    try{const items = await Item.find();
    res.json(items);}catch(error){
        res.status(500).json({message : error.message});
    }
});

// to get single item by ID
router.get('/:id', async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//   Update an item with _ID
router.put('/:id', async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete an item by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedItem = await Item.findByIdAndDelete(req.params.id);
      if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
      res.json({ message: 'Item deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//   To delete everything:
router.delete('/',async(req,res)=>{
    try{
        const deleteItems = await Item.deleteMany();
        res.json(deleteItems);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;