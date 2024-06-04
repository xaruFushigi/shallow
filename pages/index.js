import { useRouter } from "next/router";
import Link from "next/link";
import { format } from "url";

let counter = 0;

export async function getServerSideProps() {
  counter++;
  return { props: { initialPropsCounter: counter } };
}

export default function Index({ initialPropsCounter }) {
  const router = useRouter();
  const { pathname, query } = router;

  // Handle "About" link click with shallow routing
  const handleAboutClick = () => {
    router.push('/about', '/about', { shallow: true });
  };

  const reload = () => {
    router.push(format({ pathname, query }));
  };
  const incrementCounter = () => {
    const currentCounter = query.counter ? parseInt(query.counter) : 0;
    const href = `/?counter=${currentCounter + 1}`;

    router.push(href, href, { shallow: true });
  };

  return (
    <div>
      <h2>This is the Home Page</h2>
      {/* Replace with the About link using handleAboutClick */}
      <button onClick={handleAboutClick}>About</button>
      <button onClick={reload}>Reload</button>
      <button onClick={incrementCounter}>Change State Counter</button>
      <p>"getServerSideProps" ran for "{initialPropsCounter}" times.</p>
      <p>Counter: "{query.counter || 0}".</p>
    </div>
  );
}
