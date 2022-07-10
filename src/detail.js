export default function Detail({ books }) {
  console.log(books);
  let publ = [];

  const mapPublisher = () => {
    books.map((item) => {
      publ = [...publ, item.publisher].filter((x, i, a) => a.indexOf(x) === i);
      return console.log(publ);
    });
    return publ;
  };

  return (
    <div>
      Publisher:
      {mapPublisher()}
    </div>
  );
}
