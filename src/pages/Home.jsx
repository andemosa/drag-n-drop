/* eslint-disable react/prop-types */
import { cards } from "../data";
import { useState } from "react";
import Desktop from "../components/Desktop";
import Mobile from "../components/Mobile";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cardsToShow, setCardsToShow] = useState(cards);

  const handleSearch = () => {
    console.log("here");
    if (!searchTerm) return setCardsToShow(cards);
    const searchedCards = cards.filter((item) =>
      item.category.includes(searchTerm.toLowerCase())
    );
    setCardsToShow(searchedCards);
  };

  return (
    <div className="w-11/12 xl:w-4/5 max-w-7xl mx-auto">
      <div className="flex gap-2 items-center w-full">
        <div className="relative flex-1">
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 z-10"
            onClick={handleSearch}
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="" onClick={() => signOut(auth)}>
          Log out
        </button>
      </div>

      <HomeDisplay cards={cardsToShow} searchTerm={searchTerm} />
    </div>
  );
};

const HomeDisplay = ({ cards, searchTerm }) => {
  console.log(cards);
  if (searchTerm && cards.length === 0)
    return (
      <section className="my-8">
        <div className="flex items-center justify-center">
          <p>
            No cards with{" "}
            <span className="text-xl font-semibold">{searchTerm}</span> tag
          </p>
        </div>
      </section>
    );

  return (
    <>
      <div className="hidden md:block">
        <Desktop cards={cards} key={cards.length} />
      </div>
      <div className="md:hidden">
        <Mobile cards={cards} key={cards.length} />
      </div>
    </>
  );
};

export default Home;
