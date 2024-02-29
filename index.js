import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const APIKEY = ""

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    const Rovername = req.body["Search-Rover-Name"];
    let RSname = "";
    switch (Rovername) {
        case "Sojourner":
          RSname = "Sojourner";
          break;
        case "Spirit":
          RSname = "Spirit";
          break;
        case "Opportunity":
          RSname = "Opportunity";
          break;
        case "Curiosity":
          RSname = "Curiosity";
          break;
        case "Perseverance":
          RSname = "Perseverance";
          break;
        default:
          RSname = "";
      }
      console.log(RSname);
    res.render("index.ejs", { data: RSname });
});

app.post("/submit2", async (req, res) => {
    const Rname = req.body["NasaRovername"];
    const Dname = req.body["RoverDay"];
    const Cname = req.body["Camera"];
    const desiredCameraName = Cname;

    try {
      const NASARover = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${Rname}/photos?earth_date=${Dname}&api_key=` + APIKEY);
      const photos = NASARover.data.photos;
      const selectedPhotos = [];
      for (const photo of photos) {
        if (photo.camera.name === desiredCameraName) {
          selectedPhotos.push(photo);
        }
      }
      console.log(selectedPhotos);
      res.render("index.ejs", {
        APIphotos: selectedPhotos, // Pass the selected photos to your template
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Error: " + error.message);
    }
  });

app.get("/home", (req, res) => {
    res.render("index.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
