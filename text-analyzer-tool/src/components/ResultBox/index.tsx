import './index.scss';

interface ResultBoxProps {
  text: string
}

const ResultBox = ({
  text
}: ResultBoxProps) => {
  const pronouns = ["all", "another", "any",
    "anybody", "anyone", "anything", "as",
    "aught", "both", "each", "either",
    "enough", "everybody", "everyone",
    "everything", "few", "he", "her",
    "hers", "herself", "him", "himself",
    "his", "I", "idem", "it", "its",
    "itself", "many", "me", "mine", "most",
    "my", "myself", "naught", "neither",
    "no one", "nobody", "none", "nothing",
    "nought", "one", "one another", "other",
    "others", "ought", "our", "ours", "ourself",
    "ourselves", "several", "she", "some",
    "somebody", "someone", "something", "somewhat",
    "such", "suchlike", "that", "thee", "their",
    "theirs", "theirself", "theirselves", "them",
    "themself", "themselves", "there", "these",
    "they", "thine", "this", "those", "thou",
    "thy", "thyself", "us", "we", "what", "whatever",
    "whatnot", "whatsoever", "whence", "where",
    "whereby", "wherefrom", "wherein", "whereinto",
    "whereof", "whereon", "wherever", "wheresoever",
    "whereto", "whereunto", "wherewith", "wherewithal",
    "whether", "which", "whichever", "whichsoever",
    "who", "whoever", "whom", "whomever", "whomso",
    "whomsoever", "whose", "whosever", "whosesoever",
    "whoso", "whosoever", "ye", "yon", "yonder", "you",
    "your", "yours", "yourself", "yourselves"]

  const resultBar = [
    {
      title: 'Words',
      value: 0,
    },
    {
      title: 'Characters',
      value: 0,
    },
    {
      title: 'Sentences',
      value: 0,
    },
    {
      title: 'Paragraphs ',
      value: 0,
    },
    {
      title: 'Pronouns',
      value: 0,
    },
  ]

  resultBar[0].value = text === "" ? 0 : text.split(" ").filter(
    (word) => word !== ''
  ).length;

  resultBar[1].value = text.length;

  resultBar[2].value = text.split(" ").filter(
    (word) => /[.!?]$/.test(word) || /\r|\n/.test(word)
  ).length;


  resultBar[3].value = text === "" ? 0 : text.split(/\r|\n/).filter(
    (word) => word !== ''
  ).length;

  resultBar[4].value = text.split(/\s+/)
    .map(word => word.replace(/[^\w\s]/g, ""))
    .filter(word => pronouns.includes(word.trim())).length;


  return (
    <div className="result-bar">
      {resultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default ResultBox;
