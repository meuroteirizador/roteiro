function Header() {
  return (
    <header>
      <div className="logo">
        <img
          src="./logisticsRounteImg_noBackground.png"
          alt="Logo logistics route"
        />
        <h1>
          Roteiro
          <br />
          Logístico
        </h1>
      </div>
      <div className="icons">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width="32"
          // height="32"
          fill="currentColor"
          className="bi bi-bar-chart-line-fill"
          viewBox="0 0 16 16"
        >
          <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="bi bi-arrow-clockwise"
        >
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
        </svg>
      </div>
    </header>
  );
}

export default Header;
