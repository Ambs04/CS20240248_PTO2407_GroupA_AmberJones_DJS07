import React from "react";

export default function Meme() {
  //setting object as initial state
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  //variables to access state
  const [allMemes, setAllMemes] = React.useState([]);

  //fetch memes from an API
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  });

  //function that returns a random meme image from the allMemes data
  function memeImage() {
    const random = Math.floor(Math.random() * allMemes.length);
    const memeUrl = allMemes[random].memeUrl;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: memeUrl,
    }));
  }

  return (
    <main>
      <div className="form">
        <input type="text" placeholder="Top text" className="form--input" />

        <input type="text" placeholder="Bottom text" className="form--input" />

        <button className="form--button">Get a new meme image 🃏</button>
      </div>
      <div>
        <img className="meme--image" />
        <h2 className="meme--text top"></h2>
        <h2 className="meme--text bottom"></h2>
      </div>
    </main>
  );
}
