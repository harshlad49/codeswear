import Image from "@/models/ImageSchema";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const images = req.body;

      for (let i = 0; i < images.length; i++) {
        const img = new Image({
          id: images[i].id,
          title: images[i].title,
          desc: images[i].desc,
          cover: images[i].cover,
        });
        await img.save();
      }

      res.status(200).json({ success: true, message: "Images added successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const images = await Image.find();
      res.status(200).json({ success: true, images });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
