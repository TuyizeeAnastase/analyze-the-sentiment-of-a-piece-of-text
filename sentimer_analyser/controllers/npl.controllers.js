import natural from "natural";
import aposToLexForm from "apos-to-lex-form";
import SpellCorrector from "spelling-corrector";
const SW = require("stopword");

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

export class SentimentsControllers {
  async postReview(req, res) {
    try {
      const { review } = req.body;
      const lexedReview = aposToLexForm(review);
      const casedReview = lexedReview.toLowerCase();
      const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, "");
      const { WordTokenizer } = natural;
      const tokenizer = new WordTokenizer();
      const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
      tokenizedReview.forEach((word, index) => {
        tokenizedReview[index] = spellCorrector.correct(word);
      });

      const filteredReview = SW.removeStopwords(tokenizedReview);

      const { SentimentAnalyzer, PorterStemmer } = natural;
      const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
      let analysis = analyzer.getSentiment(filteredReview);

      let sentiment;
      if (analysis < 0) {
        sentiment = "Sad";
      } else if (analysis === 0) {
        sentiment = "Neutral";
      } else {
        sentiment = "Happy";
      }

      return res.status(201).json({
        analysis,
        sentiment,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error while sending request",
        error: err.message,
      });
    }
  }
}

const nlpcontroller = new SentimentsControllers();
export default nlpcontroller;
