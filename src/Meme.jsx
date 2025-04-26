import React from "react";

export default function Meme() {
  //setting object as initial state for meme text and default image
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  //variable [state] to store all memes fetched
  const [allMemes, setAllMemes] = React.useState([]);

  //fetch memes from an API and effect tells it to send the meme to setAllMemes array [thus updating state]
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  //function that returns a random meme image from the allMemes data
  function getMemeImage() {
    const random = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[random].url;
    setMeme((prevMeme) => ({
      //create an object that contains all of the content from the meme array but overwrites the randomImage property to take the random url.
      ...prevMeme,
      randomImage: url,
    }));
  }

  //records each keystroke and each value typed is added relative to the input names
  function handle(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handle}
        />

        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handle}
        />

        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🃏
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
