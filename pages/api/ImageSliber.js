const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const images = req.body;
      console.log("Received images:", images);

      for (let i = 0; i < images.length; i++) {
        const img = new Image({
          id: images[i].id,
          title: images[i].title,
          desc: images[i].desc,
          cover: images[i].cover,
        });

        await img.save();
        console.log(`Saved image ${images[i].id}`);
      }

      res.status(200).json({ success: true, message: "Images added successfully" });
    } catch (error) {
      console.error("Error saving images:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
