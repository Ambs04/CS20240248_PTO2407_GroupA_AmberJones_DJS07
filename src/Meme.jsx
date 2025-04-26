import React from "react";

export default function Meme() {
  //variables to access state
  const [allMemes, setAllMemes] = React.useState([]);

  //fetch memes from an API
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  });

  return (
    <main>
      <div className="form">
        <input type="text" placeholder="Top text" className="form--input" />

        <input type="text" placeholder="Bottom text" className="form--input" />

        <button className="form--button">Get a new meme image 🃏</button>
      </div>
    </main>
  );
}
