type PageIndicatorsProps = {
  page: number,
  totalPages: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
}

function PageIndicators({page, totalPages, setPage}: PageIndicatorsProps) {
  const pages = Array<number>();

  const space = 9;
  const half = Math.floor(space / 2);

  const selectedStyle: React.CSSProperties = {
    backgroundColor : "blue"
  }

  const unSelectedStyle: React.CSSProperties = {
    backgroundColor : "grey"
  }

  const leftSpace = Math.min(half, page - 1);
  const rightSpace = Math.min(half, totalPages - page);

  let left = Math.min(page - 1, half + half - rightSpace);
  let right = Math.min(totalPages - page, half + half - leftSpace);

  if (space & 1) {
    if (page - left - 1 >= 1) left++;
    else if (page + right + 1 <= totalPages) right++;
  }

  for (let i = page - left; i <= page + right; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        <button disabled={page - 1 < 1} onClick={() => setPage(page - 1)}>Prev</button>
        {pages.map((p) => {
          return <button onClick={() => setPage(p)} style={p == page ? selectedStyle : unSelectedStyle}>{p}</button>;
        })}
        <button disabled={page + 1 > totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default PageIndicators;
