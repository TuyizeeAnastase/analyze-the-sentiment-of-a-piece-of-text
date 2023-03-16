const submitReview = (e) => {
  e.preventDefault();
  const review = document.getElementById("review").value;
  const options = {
    method: "POST",
    body: JSON.stringify({ review }),
    headers: new Headers({ "Content-Type": "application/json" }),
  };

  const emojiSection = document.getElementById('emojiSection');
  const $sentimentIndicator = document.querySelector("#sentiment-indicator");
  const sentiment_status = document.getElementById("sentiment_status");

  const happy =
    "https://res.cloudinary.com/duhetxdbs/image/upload/v1678914245/happy_kk5sfl.png";
  const sad =
    "https://res.cloudinary.com/duhetxdbs/image/upload/v1678914961/sad-but-relieved-face_1f625_hzermz.png";
  const neutral =
    "https://res.cloudinary.com/duhetxdbs/image/upload/v1678914960/neutral-face_1f610_zgq2fg.png";

  fetch("/api/nlp/s-analyzer", options)
    .then((res) => res.json())
    .then(({ sentiment,analysis }) => {
      sentiment_status.innerHTML = sentiment;
      if (analysis < 0) {
        $sentimentIndicator.src = sad;
      }
      if (analysis === 0) {
        $sentimentIndicator.src = neutral;
      }
      if (analysis > 0) {
        $sentimentIndicator.src = happy;
      }
    })
    .catch((err) => {
      console.log("There was an error processing your request!");
    });
};

document.getElementById("review").addEventListener("keyup", submitReview);
document.getElementById("reviewForm").addEventListener("submit", submitReview);
