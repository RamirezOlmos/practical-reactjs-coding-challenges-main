import './index.scss'

interface BottomResultBoxProps {
  text: string
}

const BottomResultBox = ({
  text
}: BottomResultBoxProps) => {
  const bottomResultBar = [
    {
      title: 'Average Reading Time:',
      value: '-',
    },
    {
      title: 'Longest word:',
      value: '-',
    },
  ]

  function calculateReadingTime(text: string, avgReadingTime = 238) {
    const wordCount = text.split(" ").length;
    return Math.ceil(wordCount / avgReadingTime);
  }

  const avgReadingTime = calculateReadingTime(text);


  bottomResultBar[0].value =
    avgReadingTime === 0 ? '-' : `~${avgReadingTime} minutes`;

  const longestWord = text.split(/\s+/)
    .map(word => word.replace(/[^\w\s]/g, ""))
    .reduce((longest, current) => {
      return current.length > longest.length ? current : longest;
    }, '');


  bottomResultBar[1].value =
    longestWord === '' ? '-' : `${longestWord}`;


  return (
    <div className="bottom-result-bar">
      {bottomResultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox
