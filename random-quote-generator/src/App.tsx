import classnames from "classnames";
import { useEffect, useState } from "react";
import { ReactComponent as Button } from "../src/assets/icons/button.svg";
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg";
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg";
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg";
import axios from "axios";
import "./App.css";
import { randomizeArray } from "./utils";


function App() {
  const [quoteList, setQuoteList] = useState<Quote[]>([]);
  const [arrayCount, setArrayCount] = useState<number>(0);


  const fetchData = async () => {
    try {

      const response = await axios.get('http://localhost:4000/quotes');
      const data = randomizeArray(response.data);
      setQuoteList(data);

    } catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPreviosQuote = (
    arrayCount: number,
    direction: string
  ) => {
    if (
      direction === 'Next' && arrayCount < quoteList.length - 1
    ) setArrayCount(arrayCount += 1);

    if (
      direction === 'Previous' && arrayCount > 0
    ) setArrayCount(arrayCount -= 1);
  }

  if (arrayCount === 18) {
    fetchData();
    setArrayCount(0);
  }

  const shareOnWhatsApp = (quote: string, author: string) => {
    const text = `${quote}\n- ${author}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  const shareOnTwitter = (quote: string, author: string) => {
    const text = `${quote}\n- ${author}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
  }


  return (
    <>
      <header>
        <div className="top-strip" />
      </header>
      <div className="container">
        <div className="quotation-box ">
          <Quotation />
          <div className="quote">
            <p>
              {
                quoteList.length === 0 ? '' :
                  quoteList[arrayCount].quote
              }
            </p>
            <span>
              {
                quoteList.length === 0 ? '' :
                  `- ${quoteList[arrayCount].author}`
              }
            </span>
          </div>
          <div className="bottom-navigation">
            <div>
              <Button className={
                arrayCount === 0 ? classnames("rotate cp disabled-button") :
                  classnames("rotate cp")
              }
                onClick={() => handleNextPreviosQuote(arrayCount, "Previous")}
              />
              <Button className="cp"
                onClick={() => handleNextPreviosQuote(arrayCount, "Next")}
              />
            </div>
            <div className="share">
              <span>Share At:</span>
              <Twitter title="Post this quote on twitter!" className="cp"
                onClick={() => shareOnTwitter(
                  quoteList[arrayCount].quote,
                  quoteList[arrayCount].author
                )}
              />
              <Whatsapp title="Post this quote on WhatsApp!" className="cp"
                onClick={() => shareOnWhatsApp(
                  quoteList[arrayCount].quote,
                  quoteList[arrayCount].author
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-strip" />
    </>
  )
}

export default App
