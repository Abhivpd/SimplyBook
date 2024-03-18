export type Props = {
  page: number;
  pages: number;
  onPageChanges: (page: number) => void;
};

const Paginator = ({page, pages, onPageChanges}: Props) => {
    const pageNumbers = [];

    for(let i=1; i<= pages; i++) {
        pageNumbers.push(i)
    }
  return (
    <div className="flex justify-center">
        <ul className="flex border border-slate-300">
            {pageNumbers.map(number => (
                <li className={`px-2 py-2 ${page === number? "bg-gray-200": ""}`}>
                    <button onClick={() => onPageChanges(number)}>{number}</button>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default Paginator;
